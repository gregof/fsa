//in
var StatusManager = require(tc.fixPath('../../lib/status-manager.js')).StatusManager;

var sm = new StatusManager({
    added: ['a', 'b/', 'c'],
    deleted: [],
    modified: []
});

tc.out(sm.getAddedFiles());
tc.out(sm.getAddedDirs());
//out
a,c
b/