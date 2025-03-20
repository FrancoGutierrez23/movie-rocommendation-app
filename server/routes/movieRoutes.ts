import { Router } from 'express';
import * as movieController from '../controllers/movieController';

const router = Router();

// Define routes
router.get('/search', movieController.searchMovies);
router.get('/:id', movieController.getMovieDetails);
router.get('/:id/related', movieController.getRelatedMovies);
router.get('/:id/recommendations', movieController.getMovieRecommendations);

export default router;
