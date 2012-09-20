## fsa
File system auditor. Shows changes after previous audit session. Works over git.

### Example
```
mkdir tmp
touch tmp/1
fsa.init
fsa.status -> {"modified":[],"added":["1"],"deleted":[]}
fsa.commit 
fsa.status -> {"modified":[],"added":[],"deleted":[]}
touch tmp/2
fsa.status -> {"modified":[],"added":["2"],"deleted":[]}
```

### init(dirname, callback)
```javascript
fsa.init('tmp', function (err) {
	if (err) {
		console.log(err)
	} else {
		// ...
	}
})
```

### status(dirname, callback)
```javascript
fsa.status('tmp', function (err, status) {
	if (err) {
		console.log(err)
	} else {
		console.log(JSON.stringify(status)) // -> {"modified":[],"added":["1"],"deleted":[]}
	}
})
```

### commit(dirname, callback)
```javascript
fsa.commit('tmp', function (err) {
	if (err) {
		console.log(err)
	} else {
		// ...
	}
})
```