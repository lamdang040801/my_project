import { Router } from 'express';
import actorRouter from './actor.router';
import movieRouter from './movie.router';
import userRouter from './user.router'

const router = Router();

router.use('/actor', actorRouter);
router.use('/movie', movieRouter);
router.use('/user', userRouter);

export default router;