(function () {
    var fsa = require(conf.fixPath('../../lib/index.js'));
    var childProcess = require('child_process');
    var abc = require('abc');

    function exec (inText, tc, callback) {
        var commands;
        try {
            eval('commands=' + inText);
        } catch (e) {
            console.log('commands parse error: ' + e);
            callback();
            return;
        }

        abc.async.sequence(
            commands,
            function (command, callback) {
                execCommand(command, tc, callback);
            },
            callback
        );

    }
    
    function execCommand (command, tc, callback) {
        switch (command) {
            case "INIT":
                fsa.init('tmp', function () {
                    callback();
                })
                break;
            case "STATUS": 
                fsa.status('tmp', function (err, status) {
                    tc.out(JSON.stringify(status));
                    callback();
                })
                break;
            case "COMMIT": 
                fsa.commit('tmp', function () {
                    callback();
                })
                break;
            case "GET_VERSION": 
                fsa.version('tmp', function (err, version) {
                    if (!version) {
                        tc.out('Empty version!')
                    }
                    tc.version = version;
                    callback();
                })
                break;
            case "CHECK_VERSION": 
                fsa.version('tmp', function (err, version) {
                    tc.out(tc.version == version ? 'same' : 'different');
                    callback();
                })
                break;
            default:
                childProcess.exec(command, function (err, stdout, stderr) {
                    if (err) {
                        console.log('ERROR:', err);
                    } else {
                        callback();
                    }
                });
        }
    }

    return {
        exec: exec
    };

})();