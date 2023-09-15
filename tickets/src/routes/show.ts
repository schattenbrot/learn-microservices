import { Request, Response } from 'express';
import { Ticket } from '../models/ticket';
import { NotFoundError } from '@schattenbrottv/common';
import { param } from 'express-validator';
import mongoose from 'mongoose';

export const showTicketValidator = [
  param('id')
    .isHexadecimal()
    .isLength({ min: 24, max: 24 })
    .custom(id => {
      if (!mongoose.isValidObjectId(id)) {
        throw new Error('ID is not a valid ObjectId or HexString');
      }
      return true;
    }),
];

export const showTicket = async (req: Request, res: Response) => {
  const { id } = req.params;

  const ticket = await Ticket.findById(id);

  if (!ticket) {
    throw new NotFoundError();
  }

  res.send(ticket);
};
