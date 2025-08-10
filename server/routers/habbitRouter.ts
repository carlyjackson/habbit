import { Router, Request, Response } from 'express';
import habbitController from '../controllers/habbitController';
const habbitRouter = Router();

interface HabbitRequestBody {
    // Add properties as needed, e.g.:
    // name: string;
    // frequency: string;
    [key: string]: any;
}

habbitRouter.post(
    '/', habbitController.createHabbit,
    (req: Request<object, object, HabbitRequestBody>, res: Response) => {
        const requestBody = req.body;
        console.log("received data:", requestBody);
        return res.status(200).json({message: "habbit created!"});
    }
);

habbitRouter.get('/', (req: Request, res: Response) => {
    // This is where you would typically fetch data from a database
    res.status(200).json({message: "List of habbits"});
});

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