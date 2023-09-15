import express, { Request, Response } from 'express';
import { body, param } from 'express-validator';
import { NotFoundError, UnauthorizedError } from '@schattenbrottv/common';
import { Ticket } from '../models/ticket';
import mongoose from 'mongoose';

export const updateTicketValidator = [
  param('id')
    .isHexadecimal()
    .isLength({ min: 24, max: 24 })
    .custom(id => {
      if (!mongoose.isValidObjectId(id)) {
        throw new Error('ID is not a valid ObjectId or HexString');
      }
      return true;
    }),
  body('title').not().isEmpty().withMessage('Title is required'),
  body('price')
    .isFloat({ gt: 0 })
    .withMessage('Price must be greater than zero'),
];

export const updateTicket = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, price } = req.body;
  const { id: userId } = req.currentUser!;

  const ticket = await Ticket.findById(id);
  if (!ticket) {
    throw new NotFoundError();
  }

  if (ticket.userId !== userId) {
    throw new UnauthorizedError();
  }

  ticket.set({
    title,
    price,
  });

  await ticket.save();

  res.send(ticket);
};
