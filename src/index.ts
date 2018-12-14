import app from './server';

app.init().then(() => {
    app.start();
}).catch((err) => {
    console.log(err.message);
});