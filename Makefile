RJS=/usr/bin/r.js
VERSION=0.1.0

build:
	r.js -o baseUrl=lib/ name=JSComposer out=js_composer_$(VERSION).js
