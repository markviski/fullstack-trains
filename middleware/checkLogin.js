import { Router } from 'express';

const router = Router();

router.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    next();
  } else {
    res.status(401);
    const error = 'You are not logged in. Please log in to access this page.';
    res.render('error', {
      error,
    });
  }
});

export default router;
