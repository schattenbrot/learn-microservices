import { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import { BadRequestError } from '@schattenbrottv/common';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';

export const signInValidator = [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').trim().notEmpty().withMessage('You must supply a password'),
];

export default async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new BadRequestError('Invalid credentials');
  }

  const passwordsMatch = await Password.compare(
    existingUser.password,
    password
  );
  if (!passwordsMatch) {
    throw new BadRequestError('Invalid credentials');
  }

  // Generate JWT token and store it on session object
  const userJWT = jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email,
    },
    process.env.JWT_KEY!
  );
  req.session = {
    jwt: userJWT,
  };

  res.status(200).send(existingUser);
};
