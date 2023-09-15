import { Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';

export const createTicketValidator = [
  body('title').not().isEmpty().withMessage('Title is required'),
  body('price')
    .isFloat({ gt: 0 })
    .withMessage('Price must be greater than zero'),
];

export const createTicket = async (req: Request, res: Response) => {
  const { title, price } = req.body;

  const ticket = Ticket.build({
    title,
    price,
    userId: req.currentUser!.id,
  });
  await ticket.save();

  res.status(201).send(ticket);
};
