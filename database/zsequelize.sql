-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 02, 2019 at 08:12 AM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `zsequelize`
--

-- --------------------------------------------------------

--
-- Table structure for table `article`
--

CREATE TABLE `article` (
  `id` int(11) UNSIGNED NOT NULL,
  `memberid` int(11) NOT NULL,
  `title` varchar(255) NOT NULL DEFAULT '',
  `body` varchar(255) NOT NULL DEFAULT '',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `article`
--

INSERT INTO `article` (`id`, `memberid`, `title`, `body`, `createdAt`, `updatedAt`) VALUES
(2, 1, 'Test Judul1', 'Test Body1', '2019-05-19 04:53:56', '2019-05-19 04:55:11'),
(3, 1, 'Test Judul2', 'Test Body2', '2019-05-19 04:53:56', '2019-05-19 04:55:10'),
(4, 1, 'Test Judul3', 'Test Body3', '2019-05-19 04:53:56', '2019-05-19 04:55:09'),
(5, 1, 'Test Judul4', 'Test Body4', '2019-05-19 04:53:56', '2019-05-19 04:55:08'),
(6, 1, 'Test Judul5', 'Test Body5', '2019-05-19 04:53:56', '2019-05-19 04:55:06'),
(7, 4, 'Test Judul6', 'Test Body6', '2019-05-19 04:53:56', '2019-06-01 02:27:27'),
(8, 4, 'Test Judul7', 'Test Body7', '2019-05-19 04:53:56', '2019-06-01 02:27:30');

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `id` int(11) UNSIGNED NOT NULL,
  `roleid` int(11) NOT NULL,
  `name` varchar(50) NOT NULL DEFAULT '',
  `password` varchar(50) NOT NULL DEFAULT '',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`id`, `roleid`, `name`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Riqqqq1', 'Riqqqq01', '2019-05-19 04:51:15', '2019-06-06 06:20:09'),
(4, 1, 'BenriskaAlfa', 'Ben', '2019-05-18 05:04:58', '2019-05-30 06:25:47'),
(6, 1, 'Riqq', 'Riqq7', '2019-05-18 05:45:24', '2019-05-30 06:25:48'),
(7, 1, 'Riqq', 'Riqq7', '2019-05-18 05:45:33', '2019-05-30 06:25:48'),
(11, 1, 'RiqqAlf', 'Riqq7Alf', '2019-05-18 06:19:35', '2019-05-30 06:25:48'),
(12, 1, 'RiqqAlf', '', '2019-05-18 06:20:37', '2019-05-30 06:25:49'),
(13, 1, 'RiqqAlf', 'dsad', '2019-05-18 06:35:59', '2019-05-30 06:25:49'),
(14, 1, 'RiqqAlf', 'dsad', '2019-05-18 06:46:58', '2019-05-30 06:25:49'),
(15, 1, 'RiqqAlf', 'dsad', '2019-05-18 06:49:40', '2019-05-30 06:25:50'),
(16, 1, 'RiqqAlf', 'dsad', '2019-05-18 06:49:50', '2019-05-30 06:25:50'),
(17, 1, 'RiqqAlf', 'dsad', '2019-05-18 06:51:28', '2019-05-30 06:25:50'),
(18, 1, 'RiqqAlf', 'dsad', '2019-05-18 06:51:38', '2019-05-30 06:25:52');

-- --------------------------------------------------------

--
-- Table structure for table `member_detail`
--

CREATE TABLE `member_detail` (
  `id` int(11) UNSIGNED NOT NULL,
  `memberid` int(11) NOT NULL,
  `first_name` varchar(20) NOT NULL DEFAULT '',
  `middle_name` varchar(20) DEFAULT NULL,
  `last_name` varchar(20) NOT NULL DEFAULT '',
  `address` varchar(100) NOT NULL DEFAULT '',
  `job` varchar(50) NOT NULL DEFAULT '',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `member_detail`
--

INSERT INTO `member_detail` (`id`, `memberid`, `first_name`, `middle_name`, `last_name`, `address`, `job`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Thariq', 'Alfa', 'Benriska', '1939 Cambridge Court\nPhoenix, AZ 85034', 'Backend Engineer', '2019-06-01 02:53:55', '2019-06-01 02:56:03');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Lead', '2019-05-30 06:26:03', '2019-05-30 06:26:15'),
(2, 'Employee', '2019-06-18 06:45:33', '2019-06-18 06:45:33');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `member_detail`
--
ALTER TABLE `member_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `article`
--
ALTER TABLE `article`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `member_detail`
--
ALTER TABLE `member_detail`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
