-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 08, 2024 at 06:02 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `correspondence`
--

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `department_id` int(11) NOT NULL COMMENT 'ID แผนก/หน่วยงาน',
  `department_name` varchar(255) NOT NULL COMMENT 'ชื่อแผนก/หน่วยงาน ภาษาอังกฤษ',
  `department_name_th` varchar(255) NOT NULL COMMENT 'ชื่อแผนก/หน่วยงาน ภาษาไทย',
  `department_description` text NOT NULL COMMENT 'รายละเอียดแผนก/หน่วยงาน'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`department_id`, `department_name`, `department_name_th`, `department_description`) VALUES
(1, 'Faculty of Business Administration ', 'คณะบริหารธุรกิจ', 'คณะบริหารธุรกิจ'),
(2, 'Faculty of Accountancy', 'คณะบัญชี', ''),
(3, 'Faculty of Communication Arts', 'คณะนิเทศศาสตร์', ''),
(4, 'Faculty of Public Health', 'คณะสาธารณสุขศาสตร์', ''),
(5, '\r\nFaculty of Digital Technology', 'คณะเทคโนโลยีดิจิทัล', '');

-- --------------------------------------------------------

--
-- Table structure for table `documents`
--

CREATE TABLE `documents` (
  `id` int(255) NOT NULL COMMENT 'ID เอกสาร',
  `document_name` varchar(255) NOT NULL COMMENT 'ชื่อไฟล์',
  `file` varchar(255) CHARACTER SET tis620 COLLATE tis620_thai_ci NOT NULL COMMENT 'ไฟล์เอกสาร',
  `document_type` varchar(255) NOT NULL COMMENT 'ประเภทเอกสาร',
  `document_category` varchar(255) NOT NULL COMMENT 'หมวดหมู่เอกสาร',
  `date` datetime NOT NULL COMMENT 'วันที่ลงเอกสาร',
  `uploader` varchar(255) NOT NULL COMMENT 'ผู้ลงเอกสาร',
  `receiver` varchar(255) NOT NULL COMMENT 'ผู้รับเอกสาร',
  `status` varchar(20) NOT NULL COMMENT 'สถานะ',
  `detail` text NOT NULL COMMENT 'รายละเอียด'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `documents_categories`
--

CREATE TABLE `documents_categories` (
  `category_id` int(11) NOT NULL COMMENT 'ID ประเภทของเอกสาร',
  `category_name` varchar(255) NOT NULL COMMENT 'ชื่อประเภทของเอกสารภาษาอังกฤษ',
  `category_name_th` varchar(255) NOT NULL COMMENT 'ชื่อประเภทของเอกสารภาษาไทย',
  `category_description` text NOT NULL COMMENT 'รายละเอียดประเภทของเอกสาร'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `documents_types`
--

CREATE TABLE `documents_types` (
  `type_id` int(11) NOT NULL COMMENT 'ID ประเภทเอกสาร',
  `type_name` varchar(255) NOT NULL COMMENT 'ชื่อประเภทเอกสารภาษาอังกฤษ',
  `type_name_th` varchar(255) NOT NULL COMMENT 'ชื่อประเภทเอกสารภาษาไทย',
  `type_description` text NOT NULL COMMENT 'รายละเอียดประเภทเอกสาร'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `log_login`
--

CREATE TABLE `log_login` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `token` varchar(50) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL COMMENT 'ID ตำแหน่งผู้ใช้งาน',
  `role_name` varchar(255) NOT NULL COMMENT 'ชื่อตำแหน่งภาษาอังกฤษ',
  `role_name_th` varchar(255) NOT NULL COMMENT 'ชื่อตำแหน่งภาษาไทย',
  `role_description` varchar(255) NOT NULL COMMENT 'รายละเอียดตำแหน่ง',
  `role_permission` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'สิทธิ์การใช้งานของตำแหน่ง'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`, `role_name_th`, `role_description`, `role_permission`) VALUES
(1, 'admin', 'ผู้ดูแลระบบ', 'ผู้ดูแลระบบ ', '{\"users\": {\"read\": true, \"write\": true, \"delete\": true}, \"articles\": {\"read\": true, \"write\": true, \"publish\": true}}'),
(2, 'user', 'ผู้ใช้งาน', 'ผู้ใช้งานระบบ', '{\"articles\": {\"read\": true, \"write\": true, \"publish\": true}}'),
(3, 'tester', 'ผู้ทดสอบระบบ', 'ผู้ทดสอบระบบ', '{\"users\": {\"read\": true, \"write\": true}, \"articles\": {\"read\": true, \"write\": true}}');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(50) NOT NULL COMMENT 'ID ผู้ใช้งาน',
  `username` varchar(255) NOT NULL COMMENT 'ชื่อผู้ใช้งาน',
  `password` varchar(2000) NOT NULL COMMENT 'รหัสผ่าน',
  `nm_password` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL COMMENT 'ชื่อ - สกุล',
  `email` varchar(255) NOT NULL COMMENT 'อีเมลล์',
  `department` varchar(255) NOT NULL COMMENT 'แผนก/หน่วยงานประจำการ',
  `position` varchar(255) NOT NULL COMMENT 'ตำแหน่งประจำการ',
  `phone` varchar(20) NOT NULL COMMENT 'หมายเลขโทรศัพท์',
  `role` varchar(10) NOT NULL COMMENT 'ตำแหน่งการใช้งาน',
  `permission` varchar(10) NOT NULL COMMENT 'สิทธิ์ในการเข้าถึง'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `nm_password`, `fullname`, `email`, `department`, `position`, `phone`, `role`, `permission`) VALUES
(1, 'Admin01', '$2a$10$MliFpr/sb6ib8GracrN3dOh4svn/sNfNSTx44q7mnZoRCc.Lq7jW6', 'Admin01', 'Admin01', '', '', '', '', 'admin', ''),
(2, 'User01', '$2a$10$MACpVnpHZA3Qkiw/j3xequFiI8XnmVI5IV6ANpzHDOXTyBhenXYe6', 'User01', 'User01', '', '', '', '', 'user', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`department_id`);

--
-- Indexes for table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `documents_categories`
--
ALTER TABLE `documents_categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `documents_types`
--
ALTER TABLE `documents_types`
  ADD PRIMARY KEY (`type_id`);

--
-- Indexes for table `log_login`
--
ALTER TABLE `log_login`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `department_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID แผนก/หน่วยงาน', AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `documents`
--
ALTER TABLE `documents`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT COMMENT 'ID เอกสาร';

--
-- AUTO_INCREMENT for table `documents_categories`
--
ALTER TABLE `documents_categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID ประเภทของเอกสาร';

--
-- AUTO_INCREMENT for table `documents_types`
--
ALTER TABLE `documents_types`
  MODIFY `type_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID ประเภทเอกสาร';

--
-- AUTO_INCREMENT for table `log_login`
--
ALTER TABLE `log_login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID ตำแหน่งผู้ใช้งาน', AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT COMMENT 'ID ผู้ใช้งาน', AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
