
var usage = require('../')
var ssbDb = require('./data/ssb-db')

var tape = require('tape')

tape('simple tests based on ssb-db', function (t) {
  t.equal(usage.quick(ssbDb), 'createLogStream|get|publish')
  //quick, on a command returns a the list of options.
  t.equal(usage.quick(ssbDb,['createLogStream']), '--gte|lte|gt|lt|reverse|live|old|keys|values')
  t.equal(usage.quick(ssbDb,['get']), '--id|private|meta')

  t.equal(
  usage.quick(ssbDb, true),
`createLogStream --gte|lte|gt|lt|reverse|live|old|keys|values
get --id|private|meta
publish`)

  t.end()
})

//remove extra whitespace
function rmws(s) {
  return s.replace(/ +/g, ' ')
}

tape('deep tests based on ssb-db', function (t) {

  var text = usage.deep(ssbDb, ['createLogStream'])
  console.log(text)
  t.equal(rmws(text),
rmws(
`createLogStream # stream of all locally stored messages, in order received
  --gte [timestamp]? # only results greater than or equal to timestamp
  --lte [timestamp]? # only results less than or equal to timestamp
  --gt [timestamp]? # only results greater than timestamp
  --lt [timestamp]? # only results less than timestamp
  --reverse [boolean]? # output is reversed
  --live [boolean]? # include live results
  --old [boolean]? # include old results
  --keys [boolean]? # include keys
  --values [boolean]? # include values
`))

  t.end()

})



