#!/bin/sh

if [ "$BANKER_TEST_SUITE" ]; then
	echo "Running test suite: $BANKER_TEST_SUITE"
else
	echo "Running all tests and checks"
fi

labeledLine() {
	echo "============ $1 ============";
}

jscs() {
	labeledLine 'JSCS'
	./node_modules/.bin/jscs index.js server.js datasource/*.js test/**/*.js
}

jshint() {
	labeledLine 'JSHINT'
	./node_modules/.bin/jshint index.js server.js datasource/*.js test/**/*.js
}

mocha() {
	labeledLine 'MOCHA'
	./node_modules/.bin/babel-node ./node_modules/.bin/mocha --harmony
}

case $BANKER_TEST_SUITE in
	style) 	jshint && jscs;;
	mocha) 	mocha ;;
	*)		jshint && jscs && mocha;;
esac
