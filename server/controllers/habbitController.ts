import { Request, Response } from 'express';

import habbitModel from '../models/habbitModel';

const habbitController = {
    createHabbit: async (req: Request, res: Response) => {
        try {
            const habbitData = req.body;
            console.log("Creating habbit with data:", habbitData);
            
            // call a method from habbitModel to save the data
            const allHabbits = await habbitModel.query('SELECT * FROM habbits'); 
            console.log("All habbits:", allHabbits.rows);
            return res.status(201).json({ message: "Habbit created successfully!" });
        } catch (error) {
            console.error("Error creating habbit:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    getHabbits: async (req: Request, res: Response) => {
        try {
            // fetch data from the database
            // const habbits = await habbitModel.getAll();
            return res.status(200).json({ message: "List of habbits" });
        } catch (error) {
            console.error("Error fetching habbits:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    updateHabbit: async (req: Request, res: Response) => {
        const { id } = req.params;
        const updatedData = req.body;
        console.log(`Updating habbit with id: ${id}`, updatedData);
        // call a method from habbitModel to update the data
        // await habbitModel.update(id, updatedData);
        return res.status(200).json({ message: `Habbit with id ${id} updated!` });
    },

    deleteHabbit: async (req: Request, res: Response) => {
        const { id } = req.params;
        console.log(`Deleting habbit with id: ${id}`);
        // call a method from habbitModel to delete the data
        // await habbitModel.delete(id);
        return res.status(200).json({ message: `Habbit with id ${id} deleted!` });
    }
}

export default habbitController;