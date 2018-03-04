var beep = require('beepbeep')
var Readable = require('stream').Readable


module.exports = (minutes, fast) => {
    if( !!minutes ) {
        var rs = new Readable()
        rs._read = function () {}
        
        if( !Array.isArray(minutes)) throw new Error('arguments should be an array')
        if( minutes.length === 0 ) throw new Error('array can\'t be empty')
        
        var currentTime = 0

        var interval = setInterval( () => {
            currentTime += fast ? 20000 : 1000
            rs.push(`${currentTime/1000} seconds\n`)
        }, 1000)

        setTimeout(function () {
            clearInterval(interval)
            rs.push(`${minutes[0]} minute${minutes[0] > 1 ? 's' : '' }!\n`)
            rs.push(null)
            beep()
        }, calcWhenToStop(minutes[0], fast))//stop after x minutes

        return rs
    }
}

function calcWhenToStop(minute, fast) {
    return minute * (fast ? 3 : 60) * 1000
} 
