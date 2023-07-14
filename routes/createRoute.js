import { Router } from 'express';
import * as felhasznalo from '../database/felhasznalo.js';

const router = Router();

router.get('/', async (req, resp) => {
  try {
    const error = '';
    const role = await felhasznalo.getFelhasznaloRoleByName(resp.locals.user);
    resp.render('createRoute', { error, role });
  } catch (err) {
    console.error(err);
    resp.status(500);
    resp.write('error');
    resp.end();
  }
});

export default router;
