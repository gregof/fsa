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

####Пример
```javascript
var fsa = require('fsa');
var dc = new DirCache('test', '.exmpl');
dc.load(function (data, status) {
    doSomething(data, status, function (newData) {
        dc.save(newData, fucntion () {
            console.log('done')
        })
    });
});
```

###fsa.StatusManager
####Конструктор
`fsa.StatusManager(status)`
  * `status` - Статус изменений.
####Методы
  * `getFileStatus(fileName)` - returned three variants - 'D' - deleted, 'M' - modified, '-' - not modifined.
  * `getAddedFiles()` - addedFiles - array of added files
  * `getAddedDirs()` - addedDirs - array of added directiries

####Пример
```javascript
function doSomethng (data, status, callback) {
    см. пример для StatusManager
    
    var sm = new fsa.StatusManager();    
    // обрабатываем status
    ...
}
```

fsa.rep
  .init(dir, options, callback) -> err
  .status(dir, options, callback) -> err, status
  .add(dir, options, callback) -> err 
  .commit(dir, options, callback) -> err
  .version(dir, options, callback) -> err, version