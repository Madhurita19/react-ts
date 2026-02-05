import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRoute from './routes/chatRoute';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', chatRoute);

app.listen(5000, () => {
  console.log('✅ Backend running on http://localhost:5000');
});
