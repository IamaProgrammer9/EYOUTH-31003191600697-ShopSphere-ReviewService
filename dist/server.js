import app from './index.js';
const port = process.env.PORT || 5200;
app.listen(port, () => {
    console.log(`Reviews service server started on url http://localhost:${port}`);
});
