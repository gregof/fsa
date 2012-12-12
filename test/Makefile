test:
	node run.test.js

init:
	node -e "require('./../lib').init('.', function (err) {err && console.log(err)})"

status:
	node -e "require('./../lib').status('.', function (err, status) {console.log(err || JSON.stringify(status))})"

commit:
	date > 1.js
	node -e "require('./../lib').commit('.', function (err) {err && console.log(err)})"

version:
	node -e "require('./../lib').version('.', function (err, version) {console.log(err || version)})"


clean:
	rm -rf .fsa
	rm 1.js

.PHONY : clean test init status commit