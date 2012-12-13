var exec = require('child_process').exec;
var path = require('path');

/**
 * @param {String} dir
 * @param {Object} [options]
 * @param {Function} callback
 */
exports.init = function (dir, options, callback) {
    exec(getGitCommand(dir, 'init', options), getCallback(options, callback));
};

/**
 * @param {String} dir
 * @param {Object} [options]
 * @param {Function} callback
 */
exports.status = function (dir, options, callback) {
    exec(getGitCommand(dir, 'status --porcelain \\[^.]*', options), function (error, response) {
        getCallback(options, callback)(error, parseStatusResponse(response));
    });
};

/**
 * @param {String} dir
 * @param {Object} [options]
 * @param {Function} callback
 */
exports.add = function (dir, options, callback) {
    exec(getGitCommand(dir, 'add -A \\[^.]*', options), getCallback(options, callback));
};

/**
 * @param {String} dir
 * @param {Object} [options]
 * @param {Function} callback
 */
exports.commit = function (dir, options, callback) {
    exec(getGitCommand(dir, 'commit -m \"' + new Date() + '\"', options), getCallback(options, callback));
};

/**
 * @param {String} dir
 * @param {Object} [options]
 * @param {Function} callback
 */
exports.version = function (dir, options, callback) {
    exec(getGitCommand(dir, 'rev-parse HEAD', options), getCallback(options, callback));
};

function getGitCommand (dir, command, options) {
    var gitDir = options && options.gitDir || '.fsa';
    return 'git --git-dir=' + path.join(dir, gitDir) + ' --work-tree=' + dir + ' ' + command;
}

function getCallback (options, callback) {
    if (!callback && typeof options === 'function') {
        callback = options;
    }
    if (!callback) {
        callback = function () {}
    }
    return callback;
}

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