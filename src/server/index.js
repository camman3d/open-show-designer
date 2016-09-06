let koa = require('koa');
let app = koa();

app.use(function *() {
    this.body('Hello world');
});

app.listen(3000);