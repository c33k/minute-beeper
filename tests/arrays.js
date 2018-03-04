var test = require('tape')
var MinuteTimer = require('../')
var concat = require('concat-stream')

test('Array with one minute should output "1 minute"', function (t) {
    var mt = MinuteTimer( [1], true)  
 
    mt.pipe(concat(function (output) {
        t.ok( /1\sminute\!/.test(output) )
        t.end()
    })) 
})

test('[1, 2], should output "1 minute" and "2 minutes"', function (t) {
    t.plan(2)
    var mt = MinuteTimer( [1,2], true )  
 
    mt.pipe(concat(function (output) {
        t.ok( /1\sminute\!/.test(output) )
        t.ok( /2\sminutes\!/.test(output) )
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
