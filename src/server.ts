import express from 'express';
import mainRouter from './routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(mainRouter.getExpressRouter());

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});