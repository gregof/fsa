# fsa
Утилита позволяющая быстро узнать были ли изменения в определенной папке. Характерным примером использования является кеширование результатов сборки кода, с последующей инкрементальной пересборкой только изменившегося кода. Работает поверх git, так что для работы утилиты требуется предустановленный git.

## Класс fsa.DirCache
### new fsa.DirCachee(targetDir, cacheDirName)
Создает новый инстанс кеша для папки `targetDir`. Служебная информация кеша будет помещена в папку `cacheDirName` внутри папки `targetDir`.
```javascript
var dc = new fsa.DirCache('test', '.exmpl');
```
### dc.load(callback)
Загружает закешированное состояние и привязанные к состоянию дополнительные данные. Одновременно рассчитывает изменения в папке по отношению к закешированному состоянию. По завершению работы будет вызван `callback` в который будут переданы данные `data`, привязанные к закешированному состоянию, и менеджер изменений [`changeManager`](#fsarepgetchangespath-options-callback).
```javascript
dc.load(function (data, changeManager) {
  if (!data) {
    console.log('Кеш пустой');
  } else {
    console.log(JSON.stringify(data, null, '  '));
  }
  console.log('Changes:');
  console.log(JSON.stringify(changeManager.changes, null, '  '));
})
```
### dc.save(data, callback)
Сохраняет текущее состояние и привязанные к нему данные в кеш.
```javascript
var data =  {/* Данные которые нужно сохранить */}; 
dc.save(data, function () {
  console.log('Операция сохранения завершена.');
})
```
### dc.remove(callback)
Удаляет кеш.
```javascript
dc.remove(function () {
  console.log('Операция удаления завершена.');
})
```

## Класс fsa.ChangeManager
### new fsa.ChangeManager(changes)
Создает объект упрощающий работу со списком изменений [`changes`](#fsarepgetchangespath-options-callback).
```javascript
var cm = new fsa.ChangeManager(changes);
```
### cm.getFileStatus(fileName)
Возвращает статус ранее закешированного файла. Возвращает строку 'D' если файл удален, 'M' если он изменился и '-' если остался без изменений.
```javascript
var status = cm.getFileStatus('test.js');
switch (status) {
  case 'D':
    console.log('Файл удален.');
    break;
  case 'M':
    console.log('Файл изменен.')
    break;
  case '-':
    console.log('Файл не изменился.')
}
```

### cm.getAddedFiles()
Возвращает список добавленных файлов.
```javascript
console.log('Список добавленных файлов:')
cm.getAddedFiles().forEach(function (newFileName) {
  console.log(newFileName);
})
```
### cm.getAddedDirs()
Возвращает список добавленных папок.
```javascript
console.log('Список добавленных папок:')
cm.getAddedDirs().forEach(function (newDir) {
  console.log(newDir);
})
```

## fsa.rep

Методы для работы с репозиторием. Все методы принимают одни и теже параметры:
  * `path` - Путь до папки в которой нужно создать репозиторий.
  * `options` - Опции для репозитория.
    * `repDir` - Имя папки в которой будут храниться служебные файлы репозитория. По умолчанию `'.fsa'`.
  * `callback` - Функция, которая будет вызвана по окончанию работы.

Метод `fsa.rep.init` должен быть вызван раньше любого другого.

### fsa.rep.init(path, [options], callback)
Инициирует работу с репозиторием.
```javascript
fsa.rep.init('test', function (err) {
  if (err) throw err;
  console.log('Репозиторий создан.')
}
```
### fsa.rep.getChanges(path, [options], callback)
Возвращает список изменений в папке:
```javascript
{
 "added": [], // список добавленных файлов и папок
 "modified": [], // список изменившихся файлов
 "deleted": [] // список удаленных файлов
}
```
```javascript
fsa.rep.getChanges('test', function (err, changes) {
  if (err) throw err;
  console.log('Changes:');
  console.log(JSON.stringify(changes, null, '  '));
}
```
### fsa.rep.add(path, [options], callback)
Добавляет текущее состояние папки в готовящийся комит.
```javascript
fsa.rep.add('test', function (err) {
  if (err) throw err;
  console.log('Изменения готовы к комиту.')
}
```
### fsa.rep.commit(path, [options], callback)
Осуществляет комит в репозиторий.
```javascript
fsa.rep.commit('test', function (err) {
  if (err) throw err;
  console.log('Изменения добавлены в репозиторий.')
}
```
### fsa.rep.getVersion(path, [options], callback)
Возврает текущую версию репозитория.
```javascript
fsa.rep.getVersion('test', function (err, version) {
  if (err) throw err;
  console.log('Текущая версия репозитория:' + version);
}
```

##Пример
В данном примере рассчитывается и выводится хеш для каждого файла в текщей папке.
```javascript
var fsa = require('fsa');
var abc = require('abc');
var crypto = require('crypto');
var path = require('path');

var startDate = new Date();
var dc = new fsa.DirCache('.', '.exmpl');

dc.load(function (data, changes) {
    processDir(data, changes, function (newData) {
        dc.save(newData, function () {
            console.log(JSON.stringify(newData, null, '  '))
            console.log('Done. Time - ' + (new Date() - startDate));
        })
    });
});    

function processDir (cachedData, changes, callback) {
    var newData = [];
    var sm = new fsa.ChangeManager(changes);
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
