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
	./node_modules/jscs/bin/jscs src/**/*.js test/**/*.js
}

jshint() {
	labeledLine 'JSHINT' 
	./node_modules/jshint/bin/jshint src/**/*.js test/**/*.js
}

mocha() {
	labeledLine 'MOCHA' 
	./node_modules/mocha/bin/mocha
}

case $BANKER_TEST_SUITE in
	style) 	jshint && jscs;;
	mocha) 	mocha ;;
	*)		jscs && jshint && mocha;;
esac