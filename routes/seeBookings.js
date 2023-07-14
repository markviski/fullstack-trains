import { Router } from 'express';
import * as jarat from '../database/jarat.js';
import * as foglalas from '../database/foglalas.js';

const router = Router();

router.get('/:id', async (req, resp) => {
  try {
    const error = '';
    const trainID = req.params.id;
    const [thisroute, bookingwithnames] = await Promise.all([jarat.getJaratById(trainID),
      foglalas.selectFoglalasByJaratWithNames(trainID)]);
    resp.render('bookingDetails', {
      trainID, error, bookingwithnames, thisroute,
    });
  } catch (err) {
    console.error(err);
    resp.status(500);
    resp.write('error');
    resp.end();
  }
});

export default router;
