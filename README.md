## fbs
File system auditor. Show changes after previous audit session. Work over git.

### Example
```
mkdir tmp
touch tmp/1
fbs.init
fbs.status -> {"modified":[],"added":["1"],"deleted":[]}
fbs.commit 
fbs.status -> {"modified":[],"added":[],"deleted":[]}
touch tmp/2
fbs.status -> {"modified":[],"added":["2"],"deleted":[]}
```

### init(dirname, callback)
```javascript
fbs.init('tmp', function (err) {
	if (err) {
		console.log(err)
	} else {
		// ...
	}
})
```

### status(dirname, callback)
```javascript
fbs.status('tmp', function (err, status) {
	if (err) {
		console.log(err)
	} else {
		console.log(JSON.stringify(status)) // -> {"modified":[],"added":["1"],"deleted":[]}
	}
})
```

### commit(dirname, callback)
```javascript
fbs.commit('tmp', function (err) {
	if (err) {
		console.log(err)
	} else {
		// ...
	}
})
```
