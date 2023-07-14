import util from 'util';
import { pool } from './database.js';

const qp = util.promisify(pool.query).bind(pool);

export const insertFelhasznalo = async (newName) => {
  const query = 'insert into Felhasznalo(fullName) values(?)';
  return qp(query, [newName]);
};

export const selectFelhasznaloAll = async () => {
  const query = 'select * from Felhasznalo';
  return qp(query);
};

export const selectFelhasznaloNames = async () => {
  const query = 'select fullName from Felhasznalo';
  return qp(query);
};

export const getFelhasznaloNameById = async (id) => {
  const query = 'select fullName from Felhasznalo where userID = ?';
  return qp(query, [id]);
};

export const selectFelhasznaloIds = async () => {
  const query = 'select userID from Felhasznalo';
  return qp(query);
};

export const getFelhasznaloById = async (id) => {
  const query = 'select * from Felhasznalo where userID = ?';
  return qp(query, [id]);
};

export const getFelhasznaloByName = async (name) => {
  const query = 'select * from Felhasznalo where fullName = ?';
  const rawResp = await qp(query, [name]);
  return rawResp[0];
};

export const getUseridByName = async (name) => {
  const query = 'select userID from Felhasznalo where fullName = ?';
  const rawResp = await qp(query, [name]);
  return rawResp[0].userID;
};

export const insertFelhasznaloRegister = async (newName, pass) => {
  const role = 'user';
  const query = 'insert into Felhasznalo(fullName, pass, role) values(?, ?, ?)';
  return qp(query, [newName, pass, role]);
};

export const getFelhasznaloRoleByName = async (name) => {
  const query = 'select role from Felhasznalo where fullName = ?';
  const rawResp = await qp(query, [name]);
  return rawResp[0].role;
};

const users = ['Mark', 'Anne', 'Dan Smith', 'Sarah'];
for (let i = 0; i < users.length; i += 1) {
  if (getFelhasznaloByName(users[i]) === '') {
    insertFelhasznalo(users[i]);
  }
}
