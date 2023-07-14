import mysql from 'mysql';

export const pool = mysql.createPool({
  database: 'web',
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'rootsql',
  connectionLimit: 5,
});

export const createDataBase = () => {
  pool.query(`create table if not exists Jarat  (
    trainID int auto_increment primary key,
    origin varchar(50),
    destination varchar(50),
    dayofweek varchar(15),
    hour int,
    price int,
    traintype varchar(20)
  );`, (error) => {
    if (error) {
      console.error(`Create table error: ${error.message}`);
      process.exit(1);
    } else {
      console.log('Table created successfully: Jarat!');
    }
  });

  pool.query(`create table if not exists Felhasznalo (
    userID int auto_increment primary key, 
    fullName varchar(60) unique,
    pass varchar(150),
    role varchar(50)
  );`, (error) => {
    if (error) {
      console.error(`Create table error: ${error.message}`);
      process.exit(1);
    } else {
      console.log('Table created successfully: Felhasznalo!');
    }
  });

  pool.query(`create table if not exists Foglalas (
    foglalasID int auto_increment primary key,
    trainID int,
    userID int,
    foreign key (userID) references Felhasznalo(userID) on delete cascade,
    foreign key (trainID) references Jarat(trainID) on delete cascade
  );`, (error) => {
    if (error) {
      console.error(`Create table error: ${error.message}`);
      process.exit(1);
    } else {
      console.log('Table created successfully: Foglalas!');
    }
  });
};

createDataBase();
