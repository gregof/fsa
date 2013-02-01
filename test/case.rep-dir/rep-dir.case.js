//in
var abc = require('abc');

var localPath = tc.fixPath('.');

abc.async.sequence(
    [
        function (callback) {
            tc.callRep('init', localPath, {repDir: '.my2'}, callback);
        },
        function (callback) {
            tc.callRep('getChanges', localPath, {repDir: '.my2'}, function (changes) {
                tc.out(JSON.stringify(changes));
                callback();
            });
        },
        function (callback) {
            tc.callRep('commit', localPath, {repDir: '.my2'}, callback);
        },
        function (callback) {
            tc.callRep('getVersion', localPath, {repDir: '.my2'}, function (version) {
                tc.out(version.length);
                callback();
            });
        },
        function (callback) {
            tc.execConsole('rm -r ' + tc.fixPath('./.my2'), callback);
        }
    ], function () {
    tc.finish();
})

//out
{"modified":[],"added":["rep-dir.case.js","tc.conf.js"],"deleted":[]}
40