-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Oct 10, 2022 at 01:47 PM
-- Server version: 8.0.30
-- PHP Version: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `JceTemplate`
--

CREATE TABLE `JceTemplate` (
  `temp_id` int NOT NULL,
  `temp_header` varchar(255) DEFAULT NULL,
  `temp_text` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `JceTemplate`
--

INSERT INTO `JceTemplate` (`temp_id`, `temp_header`, `temp_text`) VALUES
(1, 'new tamp', '<p>fdsfds</p>'),
(5, 'new temp from react', '<p>This is the initial content of the editor. new template t</p>'),
(8, 'cat template', '<p><span style=\"color: rgb(241, 196, 15);\"><em><strong>this is new cat template&nbsp; this is updated</strong></em></span></p>\n<h2>What is Lorem Ipsum&nbsp; &nbsp;</h2>\n<h2>{{user.name}}&nbsp; &nbsp; {{user.lastName}}</h2>\n<ol>\n<li><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</li>\n</ol>');

-- --------------------------------------------------------

--
-- Table structure for table `JceTemplateFields`
--

CREATE TABLE `JceTemplateFields` (
  `field_id` int NOT NULL,
  `field_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `JceTemplateFields`
--

INSERT INTO `JceTemplateFields` (`field_id`, `field_name`) VALUES
(1, '{{user.name}}'),
(2, '{{user.lastName}}');

-- --------------------------------------------------------

--
-- Table structure for table `JceUser`
--

CREATE TABLE `JceUser` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `JceUser`
--

INSERT INTO `JceUser` (`id`, `name`, `lastName`) VALUES
(1, 'niraj', 'd'),
(2, 'beyounick', 'abc'),
(3, 'nick', 'xyz');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(18, 'abc', 'abc@abc.com', 'nick'),
(93, 'beyounick', 'beyounick@gmail.com', 'beyounick');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `JceTemplate`
--
ALTER TABLE `JceTemplate`
  ADD PRIMARY KEY (`temp_id`);

--
-- Indexes for table `JceTemplateFields`
--
ALTER TABLE `JceTemplateFields`
  ADD PRIMARY KEY (`field_id`);

--
-- Indexes for table `JceUser`
--
ALTER TABLE `JceUser`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `JceTemplate`
--
ALTER TABLE `JceTemplate`
  MODIFY `temp_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `JceTemplateFields`
--
ALTER TABLE `JceTemplateFields`
  MODIFY `field_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `JceUser`
--
ALTER TABLE `JceUser`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
