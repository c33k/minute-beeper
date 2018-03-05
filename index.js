var beep = require('beepbeep')
var Readable = require('stream').Readable
var Duplex = require('stream').Duplex
var concat = require('concat-stream')

module.exports = (minutes, fast) => {
    if( !!minutes ) {
        var rs = new Readable()
        rs._read = function () {}

        start(minutes, fast, rs)

        return rs;
    } else {
        var ds = new Duplex()

        var buffer = '';
        ds._write = (chunk, enc, next) => {
            buffer += chunk.toString()
            next()
        }
        ds._read = () => {}
        ds._final = (cb) => {
            start(buffer.toString().split(' '), fast, ds)
            cb()
        }

        return ds;
    }
}

function start(minutes, fast, rs) {
    if( !Array.isArray(minutes)) throw new Error('arguments should be an array')
    if( minutes.length === 0 ) throw new Error('array can\'t be empty')

    var milliseconds = minutes.sort().filter(number => number > 0).map(minute => minute*60*1000);
    startCounting(milliseconds, fast, rs)
}

function startCounting(millisecs, fast, rs) {
    var minute;
    var currentTime = 0

    var timeToBeep = millisecs.shift()

    var interval = setInterval( () => {
        currentTime += fast ? 20000 : 1000

        if( currentTime === timeToBeep ) {
            beep();
            minute = timeToBeep/60000
            
            rs.push(`${minute} minute${minute > 1 ? 's' : ''}\!\n`)

            timeToBeep = millisecs.shift()

            if( !timeToBeep ) {
                clearInterval(interval)
                rs.push(null)
            }
        } else {
            rs.push(`${currentTime/1000}\n`)
        }

    }, 1000)
}
