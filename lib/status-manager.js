var path = require('path');

exports.StatusManager = function (status) {
    this.status = status;
}

exports.StatusManager.prototype = {
    // returned three variants - 'D' - deleted, 'M' - modified, '-' - not modifined.
    getFileStatus: function (file) {
        var status = '-';

        if (this.status.modified.indexOf(file) !== -1) {
            status = 'M';
        } else if (this.status.deleted.indexOf(file) !== -1) {
            status = 'D';
        }

        return status;
    },
    getAddedFiles: function () {
        return this.status.added.filter(function (line) {
            return line[line.length - 1] !== path.sep;
        })
    },
    getAddedDirs: function () {
        return this.status.added.filter(function (line) {
            return line[line.length - 1] === path.sep;
        })
    }
}