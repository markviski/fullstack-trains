import { Router } from 'express';
import * as jarat from '../database/jarat.js';
import substituteInvalidSearchParams from '../middleware/substituteInvalidSearchParams.js';

const router = Router();

router.post('/', async (req, resp) => {
  try {
    let error = '';
    let { origin } = req.body;
    let { destination } = req.body;
    let minprice = Number(req.body.minprice);
    let maxprice = Number(req.body.maxprice);

    const checkResp = substituteInvalidSearchParams(origin, destination, minprice, maxprice);
    [error, origin, destination, minprice, maxprice] = checkResp;

    if (error !== '') {
      const [jaratok, jtransferone, jtransfertwo] = await Promise.all([
        jarat.selectJarat(),
        jarat.selectJaratWithOneTransfer(),
        jarat.selectJaratWithTwoTransfer()]);
      const jdirect = jaratok;
      resp.render('landing', {
        error, jaratok, jdirect, jtransferone, jtransfertwo,
      });
    } else {
      const [jaratok, jdirect, jtransferone, jtransfertwo] = await Promise.all([
        jarat.selectJarat(),
        jarat.searchJarat(origin, destination, minprice, maxprice),
        jarat.searchJaratWithOneTransfer(origin, destination, minprice, maxprice),
        jarat.searchJaratWithTwoTransfer(origin, destination, minprice, maxprice)]);
      resp.render('landing', {
        error, jaratok, jdirect, jtransferone, jtransfertwo,
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
