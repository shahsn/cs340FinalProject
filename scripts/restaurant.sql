-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: classmysql.engr.oregonstate.edu:3306
-- Generation Time: Dec 02, 2019 at 03:42 PM
-- Server version: 10.3.13-MariaDB-log
-- PHP Version: 7.0.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_bishopz`
--

-- --------------------------------------------------------

--
-- Table structure for table `Employee`
--

CREATE TABLE `Employee` (
  `eID` int(9) NOT NULL,
  `FName` char(20) NOT NULL,
  `LName` char(20) NOT NULL,
  `Job` char(20) NOT NULL,
  `sID` int(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Employee`
--

INSERT INTO `Employee` (`eID`, `FName`, `LName`, `Job`, `sID`) VALUES
(111111111, 'John', 'Smith', 'Cashier', 100000001),
(111111112, 'Morgan', 'Bonds', 'Manager', 100000002),
(111111113, 'Jacob', 'Edgerton', 'Cashier', 100000003),
(111111114, 'Josh', 'Adams', 'Delivery', 100000004),
(111111115, 'George', 'Brown', 'Drive-through', 100000005),
(111111116, 'Bob', 'Shields', 'Cook', 100000006),
(111111117, 'Jaiden', 'Cline', 'Cashier', 100000007),
(111111118, 'Ronaldo', 'Newman', 'Manager', 100000008),
(111111119, 'Hannah', 'Brooker', 'Cook', 100000009),
(111111120, 'Tylor', 'Garrison', 'Drive-through', 100000020);

-- --------------------------------------------------------

--
-- Table structure for table `Menu`
--

CREATE TABLE `Menu` (
  `Item Name` char(20) NOT NULL,
  `Item Price` decimal(3,2) NOT NULL,
  `sID` int(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Menu`
--

INSERT INTO `Menu` (`Item Name`, `Item Price`, `sID`) VALUES
('Burger', '3.00', 100000001),
('Chicken Sandwhich', '3.00', 100000004),
('Double Burger', '5.00', 100000007),
('French Fries', '3.00', 100000001),
('Ice Cream', '2.00', 100000003),
('Milkshake', '2.99', 100000006),
('Nuggets', '2.00', 100000005),
('Pizza', '6.99', 100000001),
('Soda', '1.00', 100000002),
('Triple Burger', '6.00', 100000008);

-- --------------------------------------------------------

--
-- Table structure for table `Order_Items`
--

CREATE TABLE `Order_Items` (
  `oID` int(9) NOT NULL,
  `Item Name` char(20) NOT NULL,
  `Quantity` int(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Order_Items`
--

INSERT INTO `Order_Items` (`oID`, `Item Name`, `Quantity`) VALUES
(1, 'French Fries', 1),
(1, 'Pizza', 1),
(2, 'Soda', 9),
(3, 'Burger', 1),
(4, 'Burger', 2),
(5, 'Triple Burger', 1),
(6, 'Double Burger', 1),
(7, 'Nuggets', 2),
(8, 'Ice Cream', 1),
(9, 'Ice Cream', 1),
(10, 'Soda', 4);

-- --------------------------------------------------------

--
-- Table structure for table `Order_Log`
--

CREATE TABLE `Order_Log` (
  `oID` int(9) NOT NULL,
  `Customer FName` char(20) NOT NULL,
  `Total Price` decimal(5,2) NOT NULL,
  `Date` char(20) NOT NULL,
  `sID` int(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Order_Log`
--

INSERT INTO `Order_Log` (`oID`, `Customer FName`, `Total Price`, `Date`, `sID`) VALUES
(1, 'Zach', '9.99', '11/28/19', 100000001),
(2, 'Bob', '9.00', '11/29/19', 100000002),
(3, 'Andre', '3.00', '11/28/19', 100000003),
(4, 'Jane', '6.00', '11/28/19', 100000001),
(5, 'Jennet', '6.00', '11/28/19', 100000008),
(6, 'Aaron', '5.00', '11/28/19', 100000007),
(7, 'Bob', '4.00', '11/28/19', 100000005),
(8, 'Mark', '2.00', '11/28/19', 100000003),
(9, 'Cody', '2.00', '11/28/19', 100000002),
(10, 'Kate', '4.00', '11/28/19', 100000002);

-- --------------------------------------------------------

--
-- Table structure for table `Store`
--

CREATE TABLE `Store` (
  `sID` int(9) NOT NULL,
  `Street` char(20) NOT NULL,
  `City` char(20) NOT NULL,
  `ZIP` int(9) NOT NULL,
  `Hours` char(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Store`
--

INSERT INTO `Store` (`sID`, `Street`, `City`, `ZIP`, `Hours`) VALUES
(100000001, '2661 Farm Meadow Dri', 'Lake Havasu City', 86403, '7:00am - 11:00pm'),
(100000002, '1902 McKinley Avenue', 'Englewood', 80110, '8:00am - 11:59pm'),
(100000003, '4057 Denver Avenue', 'Pomona', 91766, '7:00am - 11:00pm'),
(100000004, '4871 Sussex Court', 'Dallas', 75207, '7:00am - 11:00pm'),
(100000005, '2965 Jewell Road', 'Minneapolis', 55406, '7:00am - 11:00pm'),
(100000006, '4346 Hoffman Avenue', 'Brooklyn', 11206, '7:00am - 11:00pm'),
(100000007, '856 Timberbrook Lane', 'Greeley', 80631, '7:00am - 11:00pm'),
(100000008, '2562 Dovetail Drive', 'Hickory Hills', 60457, '7:00am - 11:00pm'),
(100000009, '1970 Heron Way', 'Portland', 97205, '7:00am - 11:00pm'),
(100000020, '688 Jones Street', 'Blue Mound', 76131, '7:00am - 11:00pm');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Employee`
--
ALTER TABLE `Employee`
  ADD PRIMARY KEY (`eID`),
  ADD KEY `sID` (`sID`);

--
-- Indexes for table `Menu`
--
ALTER TABLE `Menu`
  ADD PRIMARY KEY (`Item Name`,`sID`),
  ADD KEY `sID` (`sID`);

--
-- Indexes for table `Order_Items`
--
ALTER TABLE `Order_Items`
  ADD PRIMARY KEY (`oID`,`Item Name`),
  ADD KEY `oID` (`oID`),
  ADD KEY `Item Name` (`Item Name`);

--
-- Indexes for table `Order_Log`
--
ALTER TABLE `Order_Log`
  ADD PRIMARY KEY (`oID`),
  ADD KEY `sID` (`sID`);

--
-- Indexes for table `Store`
--
ALTER TABLE `Store`
  ADD PRIMARY KEY (`sID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Employee`
--
ALTER TABLE `Employee`
  ADD CONSTRAINT `Employee_ibfk_1` FOREIGN KEY (`sID`) REFERENCES `Store` (`sID`);

--
-- Constraints for table `Menu`
--
ALTER TABLE `Menu`
  ADD CONSTRAINT `Menu_ibfk_1` FOREIGN KEY (`sID`) REFERENCES `Store` (`sID`);

--
-- Constraints for table `Order_Items`
--
ALTER TABLE `Order_Items`
  ADD CONSTRAINT `Order_Items_ibfk_1` FOREIGN KEY (`oID`) REFERENCES `Order_Log` (`oID`),
  ADD CONSTRAINT `Order_Items_ibfk_2` FOREIGN KEY (`Item Name`) REFERENCES `Menu` (`Item Name`);

--
-- Constraints for table `Order_Log`
--
ALTER TABLE `Order_Log`
  ADD CONSTRAINT `Order_Log_ibfk_1` FOREIGN KEY (`sID`) REFERENCES `Store` (`sID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
