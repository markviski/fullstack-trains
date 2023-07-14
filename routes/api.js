import { Router } from 'express';
import * as jarat from '../database/jarat.js';
import * as foglalas from '../database/foglalas.js';

const router = Router();

router.get('/:trainID', async (req, res) => {
  try {
    const items = await jarat.getJaratById(req.params.trainID);
    if (items) {
      res.json(items);
    } else {
      res.status(404);
      res.json({ message: 'Route does not exist!' });
    }
  } catch (err) {
    res.status(500);
    res.json({ message: 'Server error!' });
    console.log(err);
  }
});

router.delete('/delete_booking/:foglalasID', async (req, res) => {
  try {
    await foglalas.deleteFoglalas(req.params.foglalasID);
    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500);
    res.json({ message: 'Server hiba!' });
    console.log(err);
  }
});

export default router;
