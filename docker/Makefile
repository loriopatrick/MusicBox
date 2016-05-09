all: clean build_go website

clean:
	rm -rf dist || 1
	mkdir dist
build_go:
	GOARCH=amd64 GOOS=linux go build -o dist/app ../main.go ../app.go
website:
	mkdir dist/public
	browserify ../public/src/index.js | uglifyjs > dist/public/app.js
	cp -r ../public/lib dist/public/lib
	cp ../public/index.html dist/public/
	cp ../public/app.less dist/public/
