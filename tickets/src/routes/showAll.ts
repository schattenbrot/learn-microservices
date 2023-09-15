import { Request, Response } from 'express';
import { Ticket } from '../models/ticket';

export const showTicketValidator = [];

export const showAllTickets = async (req: Request, res: Response) => {
  const tickets = await Ticket.find({});
  res.send(tickets);
};
