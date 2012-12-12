var exec = require('child_process').exec;

function getGitCommand (dir, command) {
    return 'git --git-dir=' + dir + '/.fsa --work-tree=' + dir + ' ' + command;
}

function execCommand (command, callback) {
    exec(
        command,
        function (error, stdout, stderr) {
            if (stderr) {
                console.log(stderr);
            }
            if (callback) {
                callback(error, stdout);
            }
        }
    );
}

exports.init = function (dir, callback) {
    execCommand(getGitCommand(dir, 'init'), callback);
};

exports.status = function (dir, callback) {
    execCommand(getGitCommand(dir, 'status --porcelain \\[^.]*'), function (error, response) {
        callback(error, parseStatusResponse(response));
    });
};

function parseStatusResponse (response) {
    var lines = response.split('\n');
    var statusResult = {
        modified: [],
        added: [],
        deleted: []
    };

    lines.forEach(function (line) {
        if (line) {
            var type = line.substr(0, 2);
            var file = line.substr(3);
            switch(type) {
                case " M":
                    statusResult.modified.push(file);
                    break;
                case "??":
                    statusResult.added.push(file);
                    break;
                case " D":
                    statusResult.deleted.push(file);
                    break;
            }
        }
    })
    return statusResult;
}

exports.commit = function (dir, callback) {
    execCommand(getGitCommand(dir, 'add -A \\[^.]*'), function (err) {
        if (err) {
            callback(err);
        } else {
            execCommand(getGitCommand(dir, 'commit -m \"' + new Date() + '\"'), callback);
        }
    });
};