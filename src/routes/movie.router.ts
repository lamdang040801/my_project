import { Router } from 'express';
import MovieController from '../controllers/movie.controller';

const movieRouter = Router();

movieRouter.get('/', MovieController.getAll);

export default movieRouter;