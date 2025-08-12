import { Router, Request, Response } from 'express';
import habbitController from '../controllers/habbitController';
const habbitRouter = Router();

habbitRouter.post(
    '/', habbitController.createHabbit
);

habbitRouter.get('/', habbitController.getHabbits);

habbitRouter.put(
    '/:id',
    (req: Request, res: Response) => {
        const { id } = req.params;
        const updatedData = req.body;
        console.log(`Updating habbit with id: ${id}`, updatedData);
        res.status(200).json({message: `Habbit with id ${id} updated!`});
    }
);

habbitRouter.delete('/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(`Deleting habbit with id: ${id}`);
    res.status(200).json({message: `Habbit with id ${id} deleted!`});
}); 


export default habbitRouter;