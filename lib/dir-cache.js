exports.DirCache = DirCache;

var path = require('path');
var fs = require('fs');
var abc = require('abc');
var childProcess = require('child_process');

var rep = require('./rep.js');

function DirCache (targetDir, cacheDirName) {
    var cacheDirPath = path.join(targetDir, cacheDirName);
    var cacheFilePath = path.join(cacheDirPath, 'cache.json');
    var repOptions = {repDir: path.join(cacheDirName, '.fsa')};

    this.load = function (callback) {
        abc.dir(cacheDirPath, function () {
            
            var cacheData = null;
            var status = null;
            var version = null;
            
            abc.async.forEach(
                [
                    function (callback) {
                        loadCacheData(function (loadedCacheData) {
                            cacheData = loadedCacheData;
                            callback();
                        });
                    },
                    function (callback) {
                        getStatus(function (gotStatus) {
                            status = gotStatus;
                            getVersion(function (gotVersion) {
                                version = gotVersion;
                                callback();
                            });
                        });
                    }
                ],
                function () {
                    if (cacheData) {
                        if (cacheData.version === version) {
                            cacheData = cacheData.data;
                        } else {
                            cacheData = null;
                        }
                    }
                    callback(cacheData, status);
                }
            );
        });
    }

    function loadCacheData (callback) {
        fs.exists(cacheFilePath, function (exists) {
            if (exists) {
                abc.file.read(
                    cacheFilePath,
                    function (cacheText) {
                        callback(cacheText ? JSON.parse(cacheText) : null);
                    }
                );
            } else {
                callback(null);
            }
        });
    }

    function getStatus (callback) {
        rep.init(targetDir, repOptions, getErrorCallback(function () {
            rep.status(targetDir, repOptions, function (err, status) {
                if (err) {
                    throw err;
                }
                callback(status);
            });
        }));
    }

    function getVersion (callback) {
        rep.version(targetDir, repOptions, function (err, version) {
            callback(version);
        });
    }


    this.remove = function (callback) {
        childProcess.exec('rm -r ' + cacheDirPath, callback);
    }

    this.save = function (data, callback) {
        abc.async.sequence(
            [
                function (callback) {
                    abc.dir(cacheDirPath, getWarningCallback(callback));
                },
                function (callback) {
                    rep.init(targetDir, repOptions, getWarningCallback(callback));
                },
                function (callback) {
                    rep.add(targetDir, repOptions, getWarningCallback(callback));
                },
                function (callback) {
                    rep.commit(targetDir, repOptions, getWarningCallback(callback));
                },
                function (callback) {
                    rep.version(targetDir, repOptions, getVersion(function (version) {
                        if (version) {
                            abc.file.write(
                                cacheFilePath,
                                JSON.stringify({
                                    version: version,
                                    data: data 
                                }),
                                getWarningCallback(callback)
                            );
                        } else {
                            callback();
                        }
                    }));      
                }
            ],
            callback
        );
    }

    function getErrorCallback (callback) {
        return function (err) {
            if (err) {
                throw err;
            } else {
                callback.apply(null, Array.prototype.slice.call(arguments, 1));
            }
        }
    }

    function getWarningCallback (callback) {
        return function (err) {
            if (err) {
                console.log('WARNING: ')
                console.log(err.message);
            }
            callback.apply(null, Array.prototype.slice.call(arguments, 1));
        }
    }
}