import { Router } from 'express';
import * as jarat from '../database/jarat.js';
import checkCreate from '../middleware/checkCreate.js';

const router = Router();

router.post('/', async (req, resp) => {
  try {
    let error = '';
    const { origin } = req.body;
    const { destination } = req.body;
    const { weekday } = req.body;
    const hour = Number(req.body.hour);
    const price = Number(req.body.price);
    const { traintype } = req.body;

    error = checkCreate(origin, destination, weekday, hour, price, traintype);

    if (error !== '') {
      resp.render('createRoute', { error });
    } else {
      await jarat.insertJarat(origin, destination, weekday, hour, price, traintype);
      resp.redirect('/');
    }
  } catch (err) {
    console.error(err);
    resp.status(500);
    resp.write('error');
    resp.end();
  }
});

export default router;
