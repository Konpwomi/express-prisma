import { Request,Response } from "express";
import prisma from "../prisma/prismaClient";

export const getTodos = async (req: Request, res: Response) => {
    try {
        const todos = await prisma.todo.findMany();
      res.json(todos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch todos' });
    }
  };

export const createTodo = async (req: Request, res: Response) => {
  try {
      const { title, content} = req.body
      const newTodo = await prisma.todo.create({
        data: { title, content}
      })
      res.status(201).json(newTodo)
  } catch (error){
      console.error("Error creating todo:", Error)
      res.status(500).json({error:'Failed to create todo'})
  }
}

export const getTodoById = async (req: Request, res: Response) => {
  try {
      const { id } = req.params;
      const todo = await prisma.todo.findUnique({
          where: { id: Number(id) },
      });
      if (todo) {
          res.json(todo);
      } else {
          res.status(404).json({ error: 'Todo not found' });
      }
  } catch (error) {
      console.error("Error fetching todo by id:", error);
      res.status(500).json({ error: 'Failed to fetch todo' });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
      const { id } = req.params;
      const { title, content } = req.body;
      const updatedTodo = await prisma.todo.update({
          where: { id: Number(id) },
          data: { title, content },
      });
      res.json(updatedTodo);
  } catch (error) {
      console.error("Error updating todo:", error);
      res.status(500).json({ error: 'Failed to update todo' });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
      const { id } = req.params;
      const deletedTodo = await prisma.todo.delete({
          where: { id: Number(id) }
      });
      res.json({ message: 'Todo deleted successfully', deletedTodo });
  } catch (error) {
      console.error("Error deleting todo:", error);
      res.status(500).json({ error: 'Failed to delete todo' });
  }
};