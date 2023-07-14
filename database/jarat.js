import util from 'util';
import { pool } from './database.js';

const qp = util.promisify(pool.query).bind(pool);

export const insertJarat = async (origin, destination, dayofweek, hour, price, traintype) => {
  const query = 'insert into Jarat(origin, destination, dayofweek, hour, price, traintype) values (?, ?, ?, ?, ?, ?);';
  return qp(query, [origin, destination, dayofweek, hour, price, traintype]);
};

export const deleteJarat = async (id) => {
  const query = 'delete from Jarat where trainID = ?;';
  return qp(query, [id]);
};

export const selectJarat = async () => {
  const query = 'select *, trainID as divID from Jarat';
  return qp(query);
};

export const selectJaratWithOneTransfer = async () => {
  const query = `select A.trainID as AtrainID,
                      B.trainID as BtrainID,
                      CONCAT("tr", A.trainID, "a", B.trainID, "b") as divID,
                      A.price + B.price as totalprice from jarat as A
                  join jarat as B on A.destination=B.origin
                  where B.destination<>A.origin`;
  return qp(query);
};

export const selectJaratWithTwoTransfer = async () => {
  const query = `select A.trainID as AtrainID,
                      B.trainID as BtrainID,
                      C.trainID as CtrainID,
                      CONCAT("tr", A.trainID, "a", B.trainID, "b", C.trainID, "c") as divID,
                      A.price + B.price + C.price as totalprice from jarat as A
                    join jarat as B on A.destination=B.origin
                    join jarat as C on B.destination=C.origin
                    where B.destination<>A.origin`;
  return qp(query);
};

export const searchJarat = async (origin, destination, minprice, maxprice) => {
  const query = 'select *, trainID as divID from Jarat where origin like ? and destination like ? and price between ? and ?';
  return qp(query, [origin, destination, minprice, maxprice]);
};

export const searchJaratWithOneTransfer = async (origin, destination, minprice, maxprice) => {
  const query = `select A.trainID as AtrainID,
                        B.trainID as BtrainID,
                        CONCAT("tr", A.trainID, "a", B.trainID, "b") as divID,
                        A.price + B.price as totalprice from jarat as A
                      join jarat as B on A.destination=B.origin
                      where B.destination<>A.origin and A.origin like ? and B.destination like ?
                      having totalprice between ? and ?`;
  return qp(query, [origin, destination, minprice, maxprice]);
};

export const searchJaratWithTwoTransfer = async (origin, destination, minprice, maxprice) => {
  const query = `select A.trainID as AtrainID,
                        B.trainID as BtrainID,
                        C.trainID as CtrainID,
                        CONCAT("tr", A.trainID, "a", B.trainID, "b", C.trainID, "c") as divID,
                        A.price + B.price + C.price as totalprice from jarat as A
                      join jarat as B on A.destination=B.origin
                      join jarat as C on B.destination=C.origin
                      where B.destination<>A.origin and A.origin like ? and C.destination like ?
                      having totalprice between ? and ?`;
  return qp(query, [origin, destination, minprice, maxprice]);
};

export const selectJaratBookedByUser = async (name) => {
  const query = `select jarat.*, jarat.trainID as divID from jarat 
                 join foglalas on jarat.trainID=foglalas.trainID
                 join felhasznalo on felhasznalo.userID=foglalas.userID
                 where felhasznalo.fullName = ?
                 order by jarat.trainID;`;
  return qp(query, [name]);
};

export const getJaratIds = async () => {
  const query = 'select trainID from Jarat';
  return qp(query);
};

export const getJaratById = async (id) => {
  const query = 'select * from Jarat where trainID = ?';
  return qp(query, [id]);
};

export const updateJaratPrice = async (price, id) => {
  const query = 'update Jarat set price = ? where trainID = ?';
  return qp(query, [price, id]);
};
