import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { auth } from '../middlewares/auth.middleware';

const actorRouter = Router();

actorRouter.post('/login', UserController.login);

actorRouter.use('/*', auth)
actorRouter.get('/', UserController.getAll);
actorRouter.post('/', UserController.createUser);
actorRouter.put('/', UserController.updateUser);
actorRouter.delete('/', UserController.deleteUser);

export default actorRouter;