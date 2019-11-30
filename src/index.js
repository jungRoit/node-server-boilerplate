import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';

const app = express();
const port = 9090;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//router
app.use(router);

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
