//in
var fsa = require(tc.fixPath('../../lib/index.js'));

var sm = new fsa.StatusManager({
    added: ['a', 'b/', 'c'],
    deleted: ['d', 'sub/a'],
    modified: ['sub2/a', 'f', 'g']
});

tc.out(sm.getFileStatus('file'));
tc.out(sm.getFileStatus('b'));
tc.out(sm.getFileStatus('a'));
tc.out(sm.getFileStatus('sub/a'));
tc.out(sm.getFileStatus('sub2/a'));
tc.out(sm.getFileStatus('d'));
tc.out(sm.getFileStatus('f'));
tc.out(sm.getFileStatus('g'));
//out
-
-
-
D
M
D
M
M