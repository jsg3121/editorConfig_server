import express from 'express';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = 80;

app.listen(PORT, () => {
  console.log('server start!!');
  console.log('12312');
  console.log(PORT);
});
