var test = require('tape')
var MinuteTimer = require('../')
var concat = require('concat-stream')

test('Array with one minute should output "1 minute"', function (t) {
    var mt = MinuteTimer( [1], 58000)  
    mt.pipe(concat(function (output) {
        var oneMinuteOutput = /1\sminute\!/.test(output)
        t.ok( oneMinuteOutput )
        t.end()
    })) 
})

test('throw error when empty array is provided as argument', function (t) {
    t.plan(1)
    t.throws(() => MinuteTimer([]) )
})

test('throw error if argument is not an array', function (t) {
    t.plan(1)
    t.throws( () => MinuteTimer('notarray') )
})
