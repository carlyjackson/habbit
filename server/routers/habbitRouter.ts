import { Router, Request, Response } from 'express';
import habbitController from '../controllers/habbitController';
const habbitRouter = Router();

habbitRouter.post(
    '/', habbitController.createHabbit
);

habbitRouter.get('/', habbitController.getHabbits);

habbitRouter.post(
    '/complete/:id', habbitController.completeHabbit
);

habbitRouter.delete('/:id', habbitController.deleteHabbit); 


export default habbitRouter;