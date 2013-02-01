exports.ChangeManager = ChangeManager;

var path = require('path');

function ChangeManager(changes) {
    this.changes = changes;
}

// returned three variants - 'D' - deleted, 'M' - modified, '-' - not modifined.
ChangeManager.prototype.getFileStatus = function (file) {
    var status = '-';

    if (this.changes.modified.indexOf(file) !== -1) {
        status = 'M';
    } else if (this.changes.deleted.indexOf(file) !== -1) {
        status = 'D';
    }

    return status;
}

ChangeManager.prototype.getAddedFiles = function () {
    return this.changes.added.filter(function (line) {
        return line[line.length - 1] !== path.sep;
    })
}

ChangeManager.prototype.getAddedDirs = function () {
    return this.changes.added.filter(function (line) {
        return line[line.length - 1] === path.sep;
    })
}
