import { Router } from 'express';
import ActorController from '../controllers/actor.controller';

const actorRouter = Router();

actorRouter.get('/', ActorController.getAll);

export default actorRouter;