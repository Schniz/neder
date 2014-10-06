Neder
=====

really simple and jewish javascript promises.
suitable for both browsers and node environments.

Le'Chaiym! :beer:

Installation
------------
### npm
```bash
npm install --save neder
```

### bower
```bash
bower install --save neder
```

Usage
-----
### Neder
```javascript
var myAsyncMethod = function() {
  var neder = new Neder();
  somethingAsync("some input data", function(err, data) {
    if (err) return neder.reject("some reason");
    neder.resolve(data);
  });
  return neder;
};
```

#### `Neder#then`
accepts a callback with the format of `function(data, next)`.
`next` evaluates your next block. pass it your errors and data: `next(err, data)`

```javascript
myAsyncMethod().then(function(data, next) {
  // Do whatever and call "next" to pass your data to the next block
  next(null, "some data");
});
```

### Shorthand `Neder.amen` function
```javascript
Neder.amen(function(next) {
  doSomethingAsync("next", "is a callback", "with next(err, data) format", next);
}).then(function(data, next) {
  doSomethingElse("now you can use", data, "when you pipe it", next);
}).then(function(data, next) {
  // You can call "next" explicitly:
  doSomething(function(response) {
    if (response.isError) return next(response.error);
    next(null, response.data);
  });
}).then(function(data, next) {
  console.log("results: ", data);
});
```

Contributing
------------
1. Clone this repo
2. Make sure the tests run awesomely in your machine (`npm test`)
3. Branch this mofo :smirk:
4. Write fantastic code
5. Pull request me
6. That's it :shipit:

TODO
----
- `Neder#catch` method and using the `error` in the `next` blocks.
