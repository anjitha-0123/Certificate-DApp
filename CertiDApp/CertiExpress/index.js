import express,{json} from 'express';
import userRouter from './Routes/userRoute.js';

const app = express();
const PORT = 8000;

app.use(json());
app.use('/',userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});