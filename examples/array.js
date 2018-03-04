const Timer = require('../')

// returns a readable stream if receives array of minutes
var minutes = [1, 2];
Timer(minutes).pipe(process.stdout);
