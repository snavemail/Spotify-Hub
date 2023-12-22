import express from 'express';

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', (req: any, res: { send: (arg0: string) => void; }) => {
  res.send('Hello, this is your server!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
