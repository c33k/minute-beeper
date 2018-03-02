var test = require('tape')
var MinuteTimer = require('../')
var concat = require('concat-stream')

test('Array with one minute should output "1 minute"', function (t) {
    t.plan(1)

    var mt = MinuteTimer( [1], 58000)  

    mt.pipe(concat(function (output) {
        t.ok( /1\sminute\!/.test(output))
    })) 
})
