import { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '@schattenbrottv/common';

export const signUpValidator = [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters'),
];

export default async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new BadRequestError('Email is already in use');
  }

  // hash password
  const user = User.build({ email, password });
  await user.save();

  // Generate JWT token and store it on session object
  const userJWT = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_KEY!
  );
  req.session = {
    jwt: userJWT,
  };

  res.status(201).send(user);
};
