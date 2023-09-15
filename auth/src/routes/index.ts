import express from 'express';
import currentUser from './currentUser';
import {
  currentUser as currentUserMiddleware,
  validateRequest,
  requireAuth,
} from '@schattenbrottv/common';
import signIn, { signInValidator } from './signIn';
import signOut from './signOut';
import signUp, { signUpValidator } from './signUp';

const router = express.Router();

router.get('/currentuser', currentUserMiddleware, currentUser);
router.post('/signin', signInValidator, validateRequest, signIn);
router.post('/signout', signOut);
router.post('/signup', signUpValidator, validateRequest, signUp);

export default router;
