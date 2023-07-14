import crypto from 'crypto';
import util from 'util';
import {
  hashSize,
  saltSize,
  hashAlgorithm,
  iterations,
} from '../config/myconfig.js';

const pbkdf2 = util.promisify(crypto.pbkdf2);

export async function createHash(password) {
  const salt = crypto.randomBytes(saltSize);
  const hash = await pbkdf2(String(password), salt, iterations, hashSize, hashAlgorithm);
  return Buffer.concat([hash, salt]).toString('hex');
}

export async function checkHash(password, hashWithSalt) {
  const expectedHash = hashWithSalt.substring(0, hashSize * 2),
    salt = Buffer.from(hashWithSalt.substring(hashSize * 2), 'hex');
  const binaryHash = await pbkdf2(password, salt, iterations, hashSize, hashAlgorithm);
  const actualHash = binaryHash.toString('hex');
  return expectedHash === actualHash;
}
