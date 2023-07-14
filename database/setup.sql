CREATE DATABASE IF NOT EXISTS web;

USE web;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'rootsql';
flush privileges;

create table if not exists Jarat  (
    trainID int auto_increment primary key,
    origin varchar(50),
    destination varchar(50),
    dayofweek varchar(15),
    hour int,
    price int,
    traintype varchar(20)
);

create table if not exists Felhasznalo (
    userID int auto_increment primary key, 
    fullName varchar(60) unique,
    pass varchar(150),
    role varchar(50)
);

-- alter table Felhasznalo
-- add pass varchar(150);
-- alter table Felhasznalo
-- add role varchar(50);

create table if not exists Foglalas (
    foglalasID int auto_increment primary key,
    trainID int,
    userID int,
    foreign key (userID) references Felhasznalo(userID) on delete cascade,
    foreign key (trainID) references Jarat(trainID) on delete cascade
);

insert into Felhasznalo(fullName,pass,role) values('Mark', '731a14d536cc1d073fd5d26d1f670fb54dd44d57f554eb045b2ece63ae2187822d85bcbaea0a4e905b4d921277f6c2fd', 'user'); -- pass: user
insert into Felhasznalo(fullName,pass,role) values('Anne', '731a14d536cc1d073fd5d26d1f670fb54dd44d57f554eb045b2ece63ae2187822d85bcbaea0a4e905b4d921277f6c2fd', 'user'); -- pass: user
insert into Felhasznalo(fullName,pass,role) values('Dan Smith', '731a14d536cc1d073fd5d26d1f670fb54dd44d57f554eb045b2ece63ae2187822d85bcbaea0a4e905b4d921277f6c2fd', 'user'); -- pass: user
insert into Felhasznalo(fullName,pass,role) values('Admin', 'e025ec29b4f2dc7f5fab53f679dd7648ad207334875bf9f86b34a8f3dcbe10b0b85d5179dbfe734448502e0925a542c4', 'admin'); -- pass: admin
insert into Felhasznalo(fullName,pass,role) values('User', '731a14d536cc1d073fd5d26d1f670fb54dd44d57f554eb045b2ece63ae2187822d85bcbaea0a4e905b4d921277f6c2fd', 'user'); -- pass: user
insert into Felhasznalo(fullName,pass,role) values('Test', '9fdf221e6e60b38fd5423f0d88488a6ea76e3e6412da7a10ecd236dd3138f54fc03b143bf2456f47ba93b37935128fdb', 'user'); -- pass: test

insert into Jarat(origin, destination, dayofweek, hour, price, traintype) values ('Cluj Napoca', 'Satu Mare', 'Monday', '12', '25', 'Intercity');