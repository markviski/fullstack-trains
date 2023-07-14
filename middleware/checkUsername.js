import jwt from 'jsonwebtoken';
import { Router } from 'express';
import { secret } from '../config/myconfig.js';

const router = Router();

router.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, secret, (err, payload) => {
      res.locals.user = payload.user;
      next();
    });
  } else {
    next();
  }
});

export default router;
