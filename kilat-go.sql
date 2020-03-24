-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 24, 2020 at 05:51 AM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kilat-go`
--

-- --------------------------------------------------------

--
-- Table structure for table `agents`
--

CREATE TABLE `agents` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `agents`
--

INSERT INTO `agents` (`id`, `id_user`, `name`, `created_at`, `updated_at`) VALUES
(2, 2, 'Po. Efisiensi', '2020-03-23 05:06:14', '2020-03-23 05:44:18'),
(3, 2, 'PO. Rosmani', '2020-03-23 10:22:39', NULL),
(4, 2, 'PO. Rosmani', '2020-03-23 15:25:48', NULL),
(5, 3, 'PO. Rosmana', '2020-03-23 15:26:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `buses`
--

CREATE TABLE `buses` (
  `id` int(11) NOT NULL,
  `picture` text DEFAULT NULL,
  `bus_name` varchar(20) NOT NULL,
  `bus_seat` int(2) NOT NULL,
  `class` varchar(9) NOT NULL,
  `id_bus_route` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `buses`
--

INSERT INTO `buses` (`id`, `picture`, `bus_name`, `bus_seat`, `class`, `id_bus_route`, `created_at`, `updated_at`) VALUES
(3, '1584919341111-bus1.jpg', 'Efisiensi HD', 23, 'Business', 3, '2020-03-23 05:50:19', '2020-03-23 06:22:21'),
(4, '1584917477698-bus_efisiensi.jpg', 'Efisiensi Super HD', 11, 'Executive', 1, '2020-03-23 05:51:17', NULL),
(5, '1584919421988-bus_efisiensi.jpg', 'Efisiensi Super HD', 11, 'Executive', 2, '2020-03-23 05:51:22', '2020-03-23 06:23:41'),
(6, '1584917549671-bus_efisiensi.jpg', 'Efisiensi Eco', 33, 'Economy', 1, '2020-03-23 05:52:29', NULL),
(7, '1584919459466-bus_efisiensi.jpg', 'Efisiensi Eco', 33, 'Economy', 2, '2020-03-23 05:52:34', '2020-03-23 06:24:19'),
(8, '1584919473638-bus_efisiensi.jpg', 'Efisiensi Eco', 33, 'Economy', 3, '2020-03-23 05:52:38', '2020-03-23 06:24:33'),
(9, '1584917614951-bus_lorena.jpg', 'Rosalia Indah', 14, 'Executive', 1, '2020-03-23 05:53:34', NULL),
(10, '1584917640969-bus_lorena.jpg', 'Beauty Sampurna', 29, 'Business', 1, '2020-03-23 05:54:00', NULL),
(13, '1584965704324-Beautiful_Nature_1600-x-1200.jpg', 'Pahala', 29, 'Ekonomy', 3, '2020-03-23 19:15:04', NULL),
(14, '1584967370822-0083db657fc538021a271cb67c7c8463--craftsman-workbench-diy-workbench.jpg', 'Raimuna', 29, 'Business', 3, '2020-03-23 19:42:50', NULL),
(15, '1584969690211-0083db657fc538021a271cb67c7c8463--craftsman-workbench-diy-workbench.jpg', 'Raimuna', 29, 'Business', 3, '2020-03-23 20:21:30', NULL),
(16, '1584969707880-1000 Views.PNG', 'Raimuna', 29, 'Business', 3, '2020-03-23 20:21:47', NULL),
(17, '1584969711162-1000 Views.PNG', 'Raimuna', 29, 'Business', 3, '2020-03-23 20:21:51', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `id` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_bus` int(11) DEFAULT NULL,
  `id_route` int(11) DEFAULT NULL,
  `id_schedule` int(11) DEFAULT NULL,
  `id_price` int(11) DEFAULT NULL,
  `seat` int(1) NOT NULL,
  `date` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`id`, `id_user`, `id_bus`, `id_route`, `id_schedule`, `id_price`, `seat`, `date`, `created_at`, `updated_at`) VALUES
(1, 3, 3, 1, 1, 3, 6, '0000-00-00 00:00:00', '2020-03-23 09:46:55', '2020-03-23 15:20:36'),
(2, 1, 1, 1, 1, 5, 2, '0000-00-00 00:00:00', '2020-03-23 09:47:16', NULL),
(4, 1, 2, 1, 1, 3, 2, '0000-00-00 00:00:00', '2020-03-23 15:21:42', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `code` varchar(30) NOT NULL,
  `name` varchar(40) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `code`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'superadmin', 'Super Administrator', 'This is a Superuser can access all feature on the application', '2020-03-22 20:55:00', NULL),
(2, 'admin', 'Administrator', 'This is administrator with elevated access', '2020-03-22 20:55:00', NULL),
(3, 'user', 'General User', 'This is general user', '2020-03-22 20:55:00', NULL),
(4, 'superadmin', 'Super Administrator', 'This is a Superuser can access all feature on the application', '2020-03-23 04:26:35', NULL),
(5, 'admin', 'Administrator', 'This is administrator with elevated access', '2020-03-23 04:26:35', NULL),
(6, 'user', 'General User', 'This is general user', '2020-03-23 04:26:35', NULL),
(7, 'superadmin', 'Super Administrator', 'This is a Superuser can access all feature on the application', '2020-03-23 04:37:26', NULL),
(8, 'admin', 'Administrator', 'This is administrator with elevated access', '2020-03-23 04:37:26', NULL),
(9, 'user', 'General User', 'This is general user', '2020-03-23 04:37:26', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `routes`
--

CREATE TABLE `routes` (
  `id` int(11) NOT NULL,
  `departure` varchar(10) NOT NULL,
  `destination` varchar(10) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `routes`
--

INSERT INTO `routes` (`id`, `departure`, `destination`, `created_at`, `updated_at`) VALUES
(1, 'Depok', 'Bandung', '2020-03-23 05:47:15', NULL),
(2, 'Bandung', 'Bekasi', '2020-03-23 05:47:54', NULL),
(3, 'Jakarta', 'Bandung', '2020-03-23 05:48:05', '2020-03-23 15:34:57'),
(5, 'Lampung', 'Palembang', '2020-03-23 15:34:34', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

CREATE TABLE `schedules` (
  `id` int(11) NOT NULL,
  `departure_time` time DEFAULT NULL,
  `arrive_time` time DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `schedules`
--

INSERT INTO `schedules` (`id`, `departure_time`, `arrive_time`, `created_at`, `updated_at`) VALUES
(1, '02:00:00', '18:00:00', '2020-03-23 06:04:37', NULL),
(2, '18:00:00', '20:00:00', '2020-03-23 06:05:03', '2020-03-23 15:30:42'),
(3, '17:00:00', '20:00:00', '2020-03-23 06:05:26', NULL),
(4, '08:15:00', '10:20:00', '2020-03-23 06:05:51', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `id_route` int(11) DEFAULT NULL,
  `id_bus` int(11) DEFAULT NULL,
  `id_schedule` int(11) DEFAULT NULL,
  `price` int(6) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `id_route`, `id_bus`, `id_schedule`, `price`, `created_at`, `updated_at`) VALUES
(2, 1, 4, 2, 150000, '2020-03-23 06:40:34', NULL),
(3, 1, 6, 1, 70000, '2020-03-23 06:40:58', NULL),
(4, 1, 9, 1, 135000, '2020-03-23 06:41:26', NULL),
(5, 1, 10, 2, 75000, '2020-03-23 06:42:17', NULL),
(6, 2, 2, 3, 80000, '2020-03-23 06:42:39', NULL),
(7, 2, 5, 3, 120000, '2020-03-23 06:42:57', NULL),
(8, 3, 3, 2, 40000, '2020-03-23 06:43:30', '2020-03-23 15:22:38'),
(9, 3, 8, 3, 25000, '2020-03-23 06:43:46', NULL),
(10, 3, 11, 4, 35000, '2020-03-23 06:44:05', NULL),
(11, 2, 7, 3, 65000, '2020-03-23 06:55:44', NULL),
(12, 1, 3, 1, 70000, '2020-03-23 10:22:07', NULL),
(13, 1, 3, 1, 80000, '2020-03-23 15:22:19', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `verification_code` varchar(37) DEFAULT NULL,
  `is_active` tinyint(2) DEFAULT 0,
  `is_verified` tinyint(2) DEFAULT 0,
  `role_id` int(11) DEFAULT 3,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `verification_code`, `is_active`, `is_verified`, `role_id`, `created_at`, `updated_at`) VALUES
(4, 'User2', '$2a$10$b/BJhCpG4W3WJr3eljYzDOBCcLK2CIH/9.TjIdk9Ak3GR9ViI1yI.', NULL, 1, 1, 3, '2020-03-23 10:26:44', '2020-03-23 10:28:39'),
(5, 'Durian', 'lulus', NULL, 0, 0, 3, '2020-03-23 17:07:29', NULL),
(6, 'Admin', '$2a$10$WJcRT3obWFBVh7JED//LP.OVA84voh0L0m.Y/jjQL.SpyPprrVNGu', NULL, 1, 1, 1, '2020-03-23 18:43:56', '2020-03-23 18:55:14'),
(7, 'Amin', '$2a$10$u6d0yvhbwsYGHt1mWyo/5OyhD7zsdNQW2becenJM1Vay7D3qrRZVy', NULL, 0, 0, 3, '2020-03-23 19:03:08', NULL),
(8, 'Amana', '$2a$10$Quj3x/t4ajyRLi3jULtzsuH..MIioKxAjx3E/FCjSURLVoAy58/lq', NULL, 0, 0, 3, '2020-03-23 19:04:13', NULL),
(9, 'Imana', '$2a$10$xET5TquprZOuiANgildDNuvcV4iSvs9dgS7WCigQIZdQHZ/x2gz5e', '0470910d-c52c-4e17-8a3f-7c5980d46e9e', 0, 0, 3, '2020-03-23 19:05:48', '2020-03-23 19:05:48');

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `id` int(11) NOT NULL,
  `profile_picture` text DEFAULT NULL,
  `identity` int(16) NOT NULL,
  `firstname` varchar(15) NOT NULL,
  `lastname` varchar(15) NOT NULL,
  `gender` varchar(5) NOT NULL,
  `email` varchar(20) NOT NULL,
  `phone` varchar(14) NOT NULL,
  `address` varchar(60) NOT NULL,
  `balance` int(7) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_details`
--

INSERT INTO `user_details` (`id`, `profile_picture`, `identity`, `firstname`, `lastname`, `gender`, `email`, `phone`, `address`, `balance`, `created_at`, `updated_at`) VALUES
(0, NULL, 90090001, 'Super', 'Admin', 'Man', 'admin@maman.com', '889137107834', 'Jakarta', 0, '2020-03-23 04:38:02', '2020-03-23 16:42:11'),
(4, NULL, 0, 'your firstname', 'your lastname', 'men', 'Kamila@mail.com', '8976724235', 'your address', 80000, '2020-03-23 10:26:44', '2020-03-23 18:14:19'),
(5, NULL, 1230834, 'Tayana', 'Salsabila', 'Woman', 'tayana@mail.com', '98234789451', 'Semarang', 0, '2020-03-23 17:10:57', NULL),
(6, NULL, 1230834, 'Smiling', 'Engistan', 'Men', 'tayana@mail.com', '98234789451', 'Semarang', 0, '2020-03-23 17:11:17', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agents`
--
ALTER TABLE `agents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `buses`
--
ALTER TABLE `buses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_route` (`id_route`),
  ADD KEY `id_schedule` (`id_schedule`),
  ADD KEY `id_price` (`id_price`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `routes`
--
ALTER TABLE `routes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_route` (`id_route`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `user_details`
--
ALTER TABLE `user_details`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `agents`
--
ALTER TABLE `agents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `buses`
--
ALTER TABLE `buses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `routes`
--
ALTER TABLE `routes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `schedules`
--
ALTER TABLE `schedules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `user_details`
--
ALTER TABLE `user_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_3` FOREIGN KEY (`id_route`) REFERENCES `routes` (`id`),
  ADD CONSTRAINT `reservations_ibfk_4` FOREIGN KEY (`id_schedule`) REFERENCES `schedules` (`id`),
  ADD CONSTRAINT `reservations_ibfk_5` FOREIGN KEY (`id_price`) REFERENCES `transactions` (`id`);

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`id_route`) REFERENCES `routes` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
