import { Router, Request, Response } from 'express';
import chatController from '../controllers/chatController';
const chatRouter = Router();

interface chatRequestBody {
  // Add properties as needed, e.g.:
  // name: string;
  // frequency: string;
  [key: string]: any;
}

chatRouter.post('/', chatController.sendMessage);

export default chatRouter;
