import { Router } from 'express';
import * as movieController from '../controllers/movieController';

const router = Router();

router.get('/search', movieController.searchMovies);
router.get('/:id', movieController.getMovieDetails);
router.get('/:id/related', movieController.getRelatedMovies);
router.get('/:id/recommendations', movieController.getMovieRecommendations);
router.get('/now_playing', movieController.getNowPlayingMovies);
router.get('/popular', movieController.getPopular);
router.get('/top_rated', movieController.getTopRated);
router.get('/upcoming', movieController.getUpcoming);
router.get('/getByGenre/:genre', movieController.getByGenre);

export default router;
