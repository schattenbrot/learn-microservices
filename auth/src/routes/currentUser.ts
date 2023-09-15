import { Request, Response } from 'express';

export default (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser || null });
};
