import { Router } from 'express';
import UserController from '../controllers/user.controller';

const actorRouter = Router();

actorRouter.get('/', UserController.getAll);
actorRouter.post('/', UserController.createUser);
actorRouter.put('/', UserController.updateUser);
actorRouter.delete('/', UserController.deleteUser);

export default actorRouter;