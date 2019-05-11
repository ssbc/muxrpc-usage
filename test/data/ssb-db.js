function rangeArg (desc, type) {
  return {
    type: type,
    description: 'only results ' + desc + ' ' + type,
    optional: true
  }
}

function rangeArgs (type) {
  return {
    gte: rangeArg('greater than or equal to', type),
    lte: rangeArg('less than or equal to', type),
    gt: rangeArg('greater than ', type),
    lt: rangeArg('less than', type),
    reverse: {type: 'boolean', test: 'boolean', description: 'output is reversed', optional: true},
    live: {type: 'boolean', test: 'boolean', description: 'include live results', optional: true},
    old: {type: 'boolean', test: 'boolean', description: 'include old results', optional: true}
  }
}

function isTimestamp (arg) {
  return !isNaN(+arg) && +arg >= 0
}

var keysValues = {
   keys: {
      type: 'boolean',
      description: 'include keys',
      optional: true
    },
    values: {
      type: 'boolean',
      description: 'include values',
      optional: true
    }
}

var MessageId = {
  type: 'MessageId',
  description: 'ssb message identity',
  test: /^%[a-zA-Z0-9\+\/]+={0,2}\.\w+$/
}

var Private = {
  type: 'boolean',
  description: 'decrypt private messages, defaults to false',
  optional: true,
  default: false
}

module.exports = {
  description: 'append-only log database',
  commands: {
    createLogStream: {
      type: "source",
      description: 'stream of all locally stored messages, in order received',
      args:
        Object.assign(rangeArgs('timestamp'), keysValues)
    },
    get: {
      type: "async",
      description: 'retrive a locally stored message',
      single: 'id',
      args: {
        id: MessageId,
        private: Private,
        meta: {
          type: 'boolean',
          description: 'include key,value,timestamp, defaults to false',
          optional: true,
          default: false
        }
      }
    },
    publish: {
      type: 'async',
      description: 'publish a message',
      args: {}
    }
  }
}

//ways to call usage:

//quick: lists commands, or help
//deep: print all options or all subcommands
//help: print all subcommands

/*

quick: command1|command2|command3...

deep: command1.foo
    --blah <type> # description
    ...

help:
  command1.foo --{blah,...}
  command1.bar --{blah,...}

*/

