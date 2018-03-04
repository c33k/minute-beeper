var beep = require('beepbeep')
var Readable = require('stream').Readable


module.exports = (minutes, fast) => {
    if( !!minutes ) {
        var rs = new Readable()
        rs._read = function () {}

        if( !Array.isArray(minutes)) throw new Error('arguments should be an array')
        if( minutes.length === 0 ) throw new Error('array can\'t be empty')
 
        var milliseconds = minutes.sort().map(minute => minute*60*1000);
        startCounting(milliseconds, fast, rs)
        
        return rs
    }
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

            if( millisecs.length ) {
                timeToBeep = millisecs.shift()
            } else {
                clearInterval(interval)
                rs.push(null)
            }
        } else {
            rs.push(`${currentTime/1000}\n`)
        }

    }, 1000)
}
