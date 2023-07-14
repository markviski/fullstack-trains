import { Router } from 'express';
import * as felhasznalo from '../database/felhasznalo.js';
import * as jarat from '../database/jarat.js';
import * as foglalas from '../database/foglalas.js';
import checkBookingParams from '../middleware/checkBookingParams.js';

const router = Router();

router.post('/:id', async (req, resp) => {
  try {
    let error = '';
    const userID = await felhasznalo.getUseridByName(resp.locals.user);
    const trainID = req.params.id;

    error += checkBookingParams(userID, trainID);

    const alreadybooked = await foglalas.selectFoglalasByJaratAndUser(trainID, userID);
    if (alreadybooked.length > 0) {
      error += 'You already have a seat booked for this train.';
    }

    if (error !== '') {
      const [thisroute, bookingwithnames, allusers] = await Promise.all([
        jarat.getJaratById(trainID),
        foglalas.selectFoglalasByJaratWithNames(trainID),
        felhasznalo.selectFelhasznaloAll()]);
      resp.render('bookingDetails', {
        error, trainID, bookingwithnames, thisroute, allusers,
      });
    } else {
      await foglalas.insertFoglalas(trainID, userID);
      const [thisroute, bookingwithnames, allusers] = await Promise.all([
        jarat.getJaratById(trainID),
        foglalas.selectFoglalasByJaratWithNames(trainID),
        felhasznalo.selectFelhasznaloAll()]);
      resp.render('bookingDetails', {
        error, trainID, bookingwithnames, thisroute, allusers,
      });
    }
  } catch (err) {
    console.error(err);
    resp.status(500);
    resp.write('error');
    resp.end();
  }
});

router.post('/', async (req, resp) => {
  try {
    let error = '';
    const userID = await felhasznalo.getUseridByName(resp.locals.user);
    const trainID = Number(req.body.trainid);

    error += checkBookingParams(userID, trainID);

    const alreadybooked = await foglalas.selectFoglalasByJaratAndUser(trainID, userID);
    if (alreadybooked.length > 0) {
      error += 'You already have a seat booked for this train.';
    }

    if (error !== '') {
      const [thisroute, bookingwithnames, allusers] = await Promise.all([
        jarat.getJaratById(trainID),
        foglalas.selectFoglalasByJaratWithNames(trainID),
        felhasznalo.selectFelhasznaloAll()]);
      resp.render('bookingDetails', {
        error, trainID, bookingwithnames, thisroute, allusers,
      });
    } else {
      await foglalas.insertFoglalas(trainID, userID);
      const [thisroute, bookingwithnames, allusers] = await Promise.all([
        jarat.getJaratById(trainID),
        foglalas.selectFoglalasByJaratWithNames(trainID),
        felhasznalo.selectFelhasznaloAll()]);
      resp.render('bookingDetails', {
        error, trainID, bookingwithnames, thisroute, allusers,
      });
    }
  } catch (err) {
    console.error(err);
    resp.status(500);
    resp.write('error');
    resp.end();
  }
});

export default router;
