//in
var DirCache = require(tc.fixPath('../../lib/dir-cache.js')).DirCache;
var dc = new DirCache('tmp', '.test');
dc.load(function (data, status) {
    tc.out(data || 'empty');
    tc.out(JSON.stringify(status));
    tc.finish();
});
//out
empty
{"modified":[],"added":["1"],"deleted":[]}