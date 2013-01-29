## fsa
Утилита позволяющая быстро узнать были ли изменения в определенной директории. Характерным примером использования является кеширование результатов сборки кода, с последующей инкрементальной пересборкой только изменившегося кода. Работает поверх git, так что для работы утилиты требуется предустановленный git.

###Принцип работы (TODO: кажется не нужно)
При первом запуске все содержимое помечается как новое. После чего состояние запоминается. При следующем запуске расcчитываются изменения по отношению к предыдущему сохраненному состоянию.

###fsa.DirCache
####Конструктор
`fsa.DirCache(targetDir, cacheDirName)`
Параметры:
  * `targetDir` - Путь до целевой дирректории.
  * `cacheDirName` - Имя для дирректории с кешом.

####Методы
  * `load(callback)` - Загружает закешированное состояние и привязанные к состоянию дополнительные данные. Одновременно рассчитывает изменения в дирректории по отношению к закешированному состоянию.
    * `callback` - Функция, которая будет вызвана по завершению работы. Параметры которые будут в нее переданны:
      * `data` - Данные привязанные к закешированному состоянию. При первом запуске будут равны null.
      * `status` - Статус изменений в дирректории. TODO: описание формата status, а также примеры того как разные изменения на fs в нем отражаются
  * `save(data, callback)` - Сохраняет текущее состояние и привязанные к нему данные в кеш.
    * `data` - Данные которые нужно привязать к текущему состоянию.
    * `callback` - Фунция, которая будет вызвана по окончанию работы.
  * `remove(callback)` - Удалить сохраненное закешированное состояние.
    * `callback` - Фунция, которая будет вызвана по окончанию работы.

###fsa.StatusManager
####Конструктор
`fsa.StatusManager(status)`
  * `status` - Статус изменений.
####Методы
  * `getFileStatus(fileName)` - Возвращает статус конкретного файла. Возвращает строку 'D' если файл удален, 'M' если он изменился и '-' если остался без изменений.
  * `getAddedFiles()` - Возвращает список добавленных файлов.
  * `getAddedDirs()` - Возвращает список добавленных дирректорий.

###fsa.rep
Содержит методы для работы с репозиторием.
####Методы
  * `init(dir, options, callback)` -> err
  * `status(dir, options, callback)` -> err, status
  * `add(dir, options, callback)` -> err 
  * `commit(dir, options, callback)` -> err
  * `version(dir, options, callback)` -> err, version


##Пример
```javascript
var fsa = require('fsa');
var abc = require('abc');
var crypto = require('crypto');
var path = require('path');

var startDate = new Date();
var dc = new fsa.DirCache('../test', '.exmpl');

dc.load(function (data, status) {
    processDir(data, status, function (newData) {
        dc.save(newData, function () {
            console.log(JSON.stringify(newData, null, '  '))
            console.log('Done. Time - ' + (new Date() - startDate));
        })
    });
});    

function processDir (cachedData, status, callback) {
    var newData = [];
    var sm = new fsa.StatusManager(status);
    abc.async.forEach(
        [
            function (callback) {
                if (cachedData) {
                    checkCachedFiles(cachedData, sm, newData, callback)
                } else {
                    callback();
                }
            },
            function (callback) {
                readFiles(sm.getAddedFiles(), newData, callback)
            },
            function (callback) {
                readDirs(sm.getAddedDirs(), newData, callback)
            }
        ], 
        function () {
            callback(newData);
        }
    );    
}

function checkCachedFiles (cachedData, sm, newData, callback) {
    abc.async.forEach(
        cachedData,
        function (file, callback) {
            var fileStatus = sm.getFileStatus(file.name);
            if (fileStatus === 'M') {
                readFile(file.name, function (rereadFile) {
                    newData.push(rereadFile);
                    callback();
                })
                return;
            } else if (fileStatus === '-') {
                newData.push(file);
            }
            callback();
        },
        callback
    );
}

function readFile (file, callback) {
    abc.file.read(file, function (text) {
        callback({
            name: file,
            hash: crypto.createHash('md5').update(text).digest('hex')
        });
    })
}

function readFiles (files, newData, callback) {
    abc.async.forEach(
        files,
        function (file, callback) {
            readFile(file, function (readedFile) {
                newData.push(readedFile);
                callback();
            })
        },
        callback
    );
}

function readDirs (dirs, newData, callback) {
    abc.async.forEach(
        dirs,
        function (dir, callback) {
            readDir(dir, newData, callback);
        },
        callback
    );
}

function readDir (dir, newData, callback) {
    var newFiles = []
    abc.find(
        dir,
        function (file, dirPath) {
            newFiles.push(path.join(dirPath, file))
        },
        function () {
            readFiles(newFiles, newData, callback);
        }
    );
}
```