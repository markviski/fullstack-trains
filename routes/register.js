import { Router } from 'express';

const router = Router();

router.get('/', async (req, resp) => {
  resp.render('register');
});

export default router;
