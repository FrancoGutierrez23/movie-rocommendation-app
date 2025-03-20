import express from 'express';
import cors from 'cors';
import movieRoutes from './routes/movieRoutes';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/movies', movieRoutes);

export default app;
