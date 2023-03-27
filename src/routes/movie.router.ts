import { Router } from 'express';

import MovieController from '../controllers/movie.controller';
import { auth } from '../middlewares/auth.middleware';

const movieRouter = Router();

movieRouter.get('/', MovieController.getAll);

movieRouter.use('/*', auth);

movieRouter.post('/rate', MovieController.RateMovie);

export default movieRouter;