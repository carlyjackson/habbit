import { Router, Request, Response } from 'express';
import chatController from '../controllers/chatController';
const chatRouter = Router();

interface chatRequestBody {
  [key: string]: any;
}

chatRouter.post('/', chatController.sendMessage);

export default chatRouter;
