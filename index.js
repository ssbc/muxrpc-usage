//var nested = require('libnested')
var pad = require('right-pad')

function isCommand (o) {
  return o.type && o.args
}

function isGroup (o) {
  return o.commands
}

function get(object, path) {
  for(var i = 0; i < path.length; i++) {
    if(isGroup(object))
      object = object.commands[path[i]]
    else return
  }
  return object
}

function isEmpty (o) {
  for(var k in o) return false
  return true
}

exports.get = function (api, path) {
  return get(api, path || [])
}

exports.isGroup = isGroup
exports.isCommand = isCommand

exports.quick = function (api, path) {
  if(path == true)
    return Object.keys(api.commands).map(function (key) {
      return (key + ' ' + exports.quick(api.commands[key])).trim()
    }).join('\n')

  var object = get(api, path || [])
  if(isCommand(object))
    return isEmpty(object.args) ? '' : ('--'+Object.keys(object.args).join('|'))
  else {
    return Object.keys(object.commands).join('|')
  }
}

function align (rows) {
  var widths = []
  rows.forEach(function (row) {
    row.forEach(function (col, i) {
      widths[i] = Math.max(widths[i] || 0, col.length || 0)
    })
  })

  return rows.map(function (row) {
    return row.map(function (cell, i) {
      return pad(cell, widths[i], ' ')
    }).join(' ').replace(/\s+$/, '')
  }).join('\n')
}

exports.deep = function (api, path, prefix) {
  prefix = prefix || []
  var object = get(api, path || [])

  if(isCommand(object))
    return (
      [(prefix.concat(path)).join('.') + ' # ' + object.description,
        align(Object.keys(object.args).map(function (key) {
          var arg = object.args[key]
          return ['  ' + '--' + key,  '[' + arg.type + (arg.optional ? ']?' : ']') ,  '# ' + object.args[key].description]
        }))].filter(Boolean).join('\n')
    ) + '\n'
  else {
    return Object.keys(object.commands).map(function (key) {
      return exports.deep(api, (path || []).concat(key), prefix)
    }).join('\n')
  }
}


