import jwt from 'jsonwebtoken';
import { Router } from 'express';
import { checkHash } from '../utils/hash.js';
import { secret } from '../config/myconfig.js';
import { getFelhasznaloByName } from '../database/felhasznalo.js';
import * as jarat from '../database/jarat.js';

const router = Router();

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  const [felhasznaloDB, jaratok] = await Promise.all([getFelhasznaloByName(username),
    await jarat.selectJarat()]);

  const error = 'Invalid username/password combination.';
  if (Object.keys(felhasznaloDB).length > 0) {
    const userDB = felhasznaloDB.fullName;
    const passDB = felhasznaloDB.pass;

    if (await checkHash(password, passDB) && (username === userDB)) {
      const token = jwt.sign({ user: username }, secret);
      res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });
      console.log('logged in successfully');
      res.redirect('/');
    } else {
      res.render('landing', {
        error, jaratok,
      });
    }
  } else {
    res.render('landing', {
      error, jaratok,
    });
  }
});

router.post('/logout', async (req, res) => {
  res.clearCookie('token');
  console.log('logged out successfully');
  res.redirect('/');
});

export default router;
