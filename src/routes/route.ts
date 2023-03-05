import { Router } from 'express';
import actorRouter from './actor.router';
import movieRouter from './movie.router';

const router = Router();

router.use('/actor', actorRouter);
router.use('/movie', movieRouter);

export default router;