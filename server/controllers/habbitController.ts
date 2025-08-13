import { Request, Response } from 'express';

import {
  createHabbit,
  getAllHabbits,
  deleteHabbit,
  completeHabbit,
  getCompletedHabbitsToday,
    getUncompletedHabbitsToday,
  getSpecificHabbitCompletions
} from '../models/habbitModel';

const habbitController = {
  createHabbit: async (req: Request, res: Response) => {
    try {
      const { habbitName, habbitDescription, habbitCategory } = req.body;

      // call a method from habbitModel to save the data
      const created = await createHabbit({
        name: habbitName,
        description: habbitDescription,
        category: habbitCategory,
      });
      console.log('created entry', created);
      return res.status(201).json({ message: 'Habbit created successfully!' });
    } catch (error) {
      console.error('Error creating habbit:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  getHabbits: async (req: Request, res: Response) => {
    try {
      // fetch data from the database
      const habbits = await getAllHabbits();
      return res.status(200).json({ habbits });
    } catch (error) {
      console.error('Error fetching habbits:', error);
      return res.status(500).json({ message: 'Internal server error' });
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
    await deleteHabbit(id);
    return res.status(200).json({ message: `Habbit with id ${id} deleted!` });
  },
  completeHabbit: async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(`Completing habbit with id: ${id}`);
    const completedHabbit = await completeHabbit(parseInt(id));
    console.log(completedHabbit);
    return res
      .status(200)
      .json({
        message: `Habbit with id ${id} completed!`,
        habbit: completedHabbit,
      });
  },
  getHabbitCompletionsToday: async (req: Request, res: Response) => {
    try {
      const completedHabbits = await getCompletedHabbitsToday();
      const uncompletedHabbits = await getUncompletedHabbitsToday();
      return res.status(200).json({ completedHabbits, uncompletedHabbits });
    } catch (error) {
      console.error('Error fetching habbit completion data:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
    },
    getSpecificHabbitCompletions: async (req: Request, res: Response) => {
      const { selectedHabbit } = req.params;
      try {
        const completions = await getSpecificHabbitCompletions(parseInt(selectedHabbit));
        return res.status(200).json({ completions });
      } catch (error) {
        console.error('Error fetching specific habbit completions:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

};

export default habbitController;
