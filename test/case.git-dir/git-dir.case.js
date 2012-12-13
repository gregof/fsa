//in
var localPath = tc.fixPath('.');

tc.callFSA('init', localPath, {gitDir: '.my2'}, function () {
    tc.out(1);
    tc.callFSA('status', localPath, {gitDir: '.my2'}, function (status) {
        tc.out(2);
        tc.out(JSON.stringify(status));
        tc.callFSA('add', localPath, {gitDir: '.my2'}, function () {
            tc.out(3);
            tc.callFSA('commit', localPath, {gitDir: '.my2'}, function () {
                tc.out(4);
                tc.callFSA('version', localPath, {gitDir: '.my2'}, function (version) {
                    tc.out(version.length);
                    tc.execConsole('rm -r ' + tc.fixPath('./.my2'), function () {
                        tc.out(5);
                        tc.finish();
                    });
                });
            });            
        });
    });
});
//out
1
2
{"modified":[],"added":["git-dir.case.js","tc.conf.js"],"deleted":[]}
3
4
41
5