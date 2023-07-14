import { Router } from 'express';
import { createHash } from '../utils/hash.js';
import { insertFelhasznaloRegister } from '../database/felhasznalo.js';

const router = Router();

router.post('/', async (req, resp) => {
  const { username } = req.body;
  const { password } = req.body;
  const hashedPass = await createHash(password);
  await insertFelhasznaloRegister(username, hashedPass);
  resp.redirect('/');
});

export default router;
