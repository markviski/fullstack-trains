import { Router } from 'express';
import * as jarat from '../database/jarat.js';

const router = Router();

router.get('/', async (req, resp) => {
  try {
    const [jaratok, jtransferone, jtransfertwo] = await Promise.all([jarat.selectJarat(),
      jarat.selectJaratWithOneTransfer(), jarat.selectJaratWithTwoTransfer()]);
    const jdirect = jaratok;
    const error = '';
    resp.render('landing', {
      error, jaratok, jdirect, jtransferone, jtransfertwo,
    });
  } catch (err) {
    console.error(err);
    resp.status(500);
    resp.write('error');
    resp.end();
  }
});

export default router;
