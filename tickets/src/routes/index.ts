import express from 'express';
import {
  validateRequest,
  requireAuth,
  currentUser,
} from '@schattenbrottv/common';
import { createTicket, createTicketValidator } from './create';
import { showTicket } from './show';
import { showAllTickets } from './showAll';
import { updateTicket, updateTicketValidator } from './update';

const router = express.Router();

router.use(currentUser);

router.post(
  '/',
  requireAuth,
  createTicketValidator,
  validateRequest,
  createTicket
);

router.get('/:id', showTicket);

router.put(
  '/:id',
  requireAuth,
  updateTicketValidator,
  validateRequest,
  updateTicket
);

router.get('/', showAllTickets);

export default router;
