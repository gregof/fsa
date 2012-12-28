exports.StatusManager = StatusManager;

var path = require('path');

function StatusManager(status) {
    this.status = status;
}

// returned three variants - 'D' - deleted, 'M' - modified, '-' - not modifined.
StatusManager.prototype.getFileStatus = function (file) {
    var status = '-';

    if (this.status.modified.indexOf(file) !== -1) {
        status = 'M';
    } else if (this.status.deleted.indexOf(file) !== -1) {
        status = 'D';
    }

    return status;
}

StatusManager.prototype.getAddedFiles = function () {
    return this.status.added.filter(function (line) {
        return line[line.length - 1] !== path.sep;
    })
}

StatusManager.prototype.getAddedDirs = function () {
    return this.status.added.filter(function (line) {
        return line[line.length - 1] === path.sep;
    })
}
