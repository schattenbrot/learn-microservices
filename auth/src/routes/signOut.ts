import { Request, Response } from 'express';

export default (req: Request, res: Response) => {
  req.session = null;

  res.send({});
};
