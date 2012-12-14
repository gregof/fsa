//in
var fsa = require(tc.fixPath('../../lib/index.js'));

var sm = new fsa.StatusManager({
    added: ['a', 'b/', 'c'],
    deleted: [],
    modified: []
});

tc.out(sm.getAddedFiles());
tc.out(sm.getAddedDirs());
//out
a,c
b/