import util from 'util';
import { pool } from './database.js';

const qp = util.promisify(pool.query).bind(pool);

export const insertFoglalas = async (trainID, userID) => {
  const query = 'insert into Foglalas(trainID, userID) values(?, ?)';
  return qp(query, [trainID, userID]);
};

export const selectFoglalas = async () => {
  const query = 'select * from Foglalas';
  return qp(query);
};

export const selectFoglalasByJarat = async (trainID) => {
  const query = 'select * from Foglalas where trainID = ?';
  return qp(query, [trainID]);
};

export const selectFoglalasByJaratAndUser = async (trainID, userID) => {
  const query = 'select * from Foglalas where trainID = ? and userID = ?';
  return qp(query, [trainID, userID]);
};

export const selectFoglalasByJaratWithNames = async (trainID) => {
  const query = 'SELECT * FROM Foglalas JOIN Felhasznalo ON Foglalas.userID = Felhasznalo.userID WHERE trainID = ?';
  return qp(query, [trainID]);
};

export const deleteFoglalas = async (foglalasID) => {
  const query = 'delete from Foglalas where foglalasID = ?;';
  return qp(query, [foglalasID]);
};
