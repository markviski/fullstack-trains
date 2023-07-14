import { Router } from 'express';
import * as jarat from '../database/jarat.js';

const router = Router();

router.get('/', async (req, resp) => {
  try {
    const error = '';
    const jaratok = await jarat.selectJarat();
    resp.render('userBookingForm', {
      error, jaratok,
    });
  } catch (err) {
    console.error(err);
    resp.status(500);
    resp.write('error');
    resp.end();
  }
});

export default router;
