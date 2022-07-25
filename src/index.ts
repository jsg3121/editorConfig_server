import express from 'express';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log('server start!!');
  console.log('12312');
  console.log(PORT);
});

app.get('/', (req: any, res: any) => {
  res.send('asdfasdfasdf');
  res.end();
});
