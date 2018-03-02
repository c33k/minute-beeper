var beep = require('beepbeep')
var Readable = require('stream').Readable


module.exports = (minutes, startMilisec) => {
    if( !!minutes ) {
        if( !Array.isArray(minutes)) throw new Error('arguments should be an array')
        if( minutes.length === 0 ) throw new Error('array can\'t be empty')
        
        var rs = new Readable()
        rs._read = function () {}

        var currentTime = startMilisec || 0
        var interval = setInterval( () => {
            currentTime += 1000
            rs.push(`${currentTime/1000} seconds\n`)
        }, 1000)

        setTimeout(function () {
            clearInterval(interval)
            rs.push(`${minutes[0]} minute${minutes[0] > 1 ? 's' : '' }!\n`)
            rs.push(null)
            beep()
        }, minutes[0] * (60 * 1000 - startMilisec) )//stop after x minutes

        return rs
    }
}
