-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 06, 2019 at 10:35 AM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 7.2.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hard_gaft`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `cat_id` int(11) NOT NULL,
  `cat_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`cat_id`, `cat_name`) VALUES
(1, 'Bags'),
(2, 'Knitwear'),
(3, 'Footwear'),
(4, 'Accessories');


-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `cat_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `price` int(20) UNSIGNED NOT NULL,
  `status` int(1) NOT NULL,
  `type` int(1) NOT NULL,
  `details` text COLLATE utf8_unicode_ci NOT NULL,
  `time_upload` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `cat_id`, `name`, `image`, `price`, `status`, `type`, `details`, `time_upload`) VALUES
(1, 2, 'Knit Blazer Navy', 'KnitBlazer_Navy_860x.jpg,openblazer-midgrey_860x.jpg', 500000, 1, 1, 'Mô tả ở đây', '04/06/2019'),
(2, 2, 'Open Blazer Midgrey', 'openblazer-midgrey_860x.jpg', 500000, 1, 1, 'Mô tả ở đây', '04/06/2019'),
(3, 2, 'Open Knitblazer Dark', 'openknitblazer-dark_a4f6983b-d1c8-4c70-a855-3861a12f3dd2_860x.jpg', 500000, 1, 1, 'Mô tả ở đây', '04/06/2019'),
(4, 2, 'Open Knitblazer Lightgrey', 'openknitblazer-lightgrey_459a48fa-d48f-41d9-a86c-c1f0d2585e45_860x.jpg', 500000, 1, 1, 'Mô tả ở đây', '04/06/2019'),
(5, 2, 'Seamless Dark', 'seamless-dark_860x.jpg', 500000, 1, 1, 'Mô tả ở đây', '04/06/2019'),
(6, 2, 'Seamless Light', 'seamless-light_860x.jpg', 500000, 1, 1, 'Mô tả ở đây', '04/06/2019'),
(7, 2, 'Seamless Mid', 'seamless-mid_860x.jpg', 500000, 1, 1, 'Mô tả ở đây', '04/06/2019'),

(8, 3, 'Black Desert', 'black_desert_860x.jpg', 250000, 1, 1, 'Mô tả ở đây', '04/06/2019'),
(9, 3, 'Black Derby', 'black-derby_860x.jpg', 250000, 1, 1, 'Mô tả ở đây', '04/06/2019'),
(10, 3, 'Brown Derby', 'brown-derby_860x.jpg', 250000, 1, 1, 'Mô tả ở đây', '04/06/2019'),
(11, 3, 'Oldschool High Black', 'oldschool-high-black_860x.jpg', 250000, 1, 1, 'Mô tả ở đây', '04/06/2019'),
(12, 3, 'Oldschool High Brown', 'oldschool-high-brown_860x.jpg', 250000, 1, 1, 'Mô tả ở đây', '04/06/2019'),
(13, 3, 'Oldschool High Chalk', 'oldschool-high-chalk_860x.jpg', 250000, 1, 1, 'Mô tả ở đây', '04/06/2019'),
(14, 3, 'Oldschool Low Black', 'oldschool-low-black_860x.jpg', 250000, 1, 1, 'Mô tả ở đây', '04/06/2019'),
(15, 3, 'Oldschool Low Brown', 'oldschool-low-brown_860x.jpg', 250000, 1, 1, 'Mô tả ở đây', '04/06/2019'),
(16, 3, 'Oldschool Low Chalk', 'oldschool-low-chalk_860x.jpg', 250000, 1, 1, 'Mô tả ở đây', '04/06/2019'),
(17, 3, 'Pure Sneakers Classic', 'Pure-sneakers-classic_860x.jpg', 250000, 1, 1, 'Mô tả ở đây', '04/06/2019'),
(18, 3, 'Pure Sneakers Grey', 'Pure-sneakers-grey_860x.jpg', 250000, 1, 1, 'Mô tả ở đây', '04/06/2019'),
(19, 3, 'S3-1 Black', 'S3-1-black_860x.jpg', 250000, 1, 1, 'Mô tả ở đây', '04/06/2019'),
(20, 3, 'S3-1 Plaster', 'S3-1-plaster_fefc4017-96a0-497e-a792-978552fb0927_860x.jpg', 250000, 1, 1, 'Mô tả ở đây', '04/06/2019'),
(21, 3, 'Suede Desert', 'suede_desert_860x.jpg', 250000, 1, 1, 'Mô tả ở đây', '04/06/2019'),
(22, 3, 'Wool Slipons', 'wool-slipons_e1dd097e-f4d6-48e6-a899-1324c7b204fa_860x.jpg', 250000, 1, 1, 'Mô tả ở đây', '04/06/2019');



-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `mail` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `avatar` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `pass` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `phone` int(12) NOT NULL,
  `facebook` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `level` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`id`, `name`, `mail`, `avatar` , `pass`, `phone`, `facebook`, `address` , `level`) VALUES
(1, 'Phoenix', 'phoenix@gmail.com', '100_1.jpg' ,'$2b$10$Bqpi.FKYuMykMeyc7VXmWeppZHqLJazKlJI0i8faVP2a/F29NLBgS', 0123456789, 'fb.com', '286 Nguyễn Xiển', 1),
(2, 'Administrator', 'admin@gmail.com', '100_2.jpg' ,'$2b$10$Bqpi.FKYuMykMeyc7VXmWeppZHqLJazKlJI0i8faVP2a/F29NLBgS', 0123456789, 'fb.com', '286 Nguyễn Xiển', 1),
(3, 'Đoàn Thanh Hà', 'hadoan@gmail.com', '100_3.jpg' ,'$2b$10$Bqpi.FKYuMykMeyc7VXmWeppZHqLJazKlJI0i8faVP2a/F29NLBgS', 0123456789, 'fb.com', '286 Nguyễn Xiển', 2),
(4, 'Phạm Hải Yến', 'yenpham@gmail.com', '100_4.jpg' ,'$2b$10$Bqpi.FKYuMykMeyc7VXmWeppZHqLJazKlJI0i8faVP2a/F29NLBgS', 0123456789, 'fb.com', '286 Nguyễn Xiển', 2),
(5, 'Đinh Quỳnh Trang', 'trangdinh@gmail.com', '100_5.jpg' ,'$2b$10$Bqpi.FKYuMykMeyc7VXmWeppZHqLJazKlJI0i8faVP2a/F29NLBgS', 0123456789, 'fb.com', '286 Nguyễn Xiển', 3),
(6, 'Trần Nhật Anh', 'nhatanh@gmail.com', '100_6.jpg' ,'$2b$10$Bqpi.FKYuMykMeyc7VXmWeppZHqLJazKlJI0i8faVP2a/F29NLBgS', 0123456789, 'fb.com', '286 Nguyễn Xiển', 3);



-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `mail` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `avatar` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `pass` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `phone` int(12) NOT NULL,
  `facebook` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `ship_address1` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `ship_address2` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `level` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `name`, `mail`, `avatar` , `pass`, `phone`, `facebook`, `ship_address1` , `ship_address2` , `level`) VALUES
(1, 'Phoenix', 'phoenix@gmail.com', '100_1.jpg' , '$2b$10$Bqpi.FKYuMykMeyc7VXmWeppZHqLJazKlJI0i8faVP2a/F29NLBgS', 0123456789, 'fb.com', '286 Nguyễn Xiển', 'Hà Nội', 1),
(2, 'Administrator', 'admin@gmail.com', '100_2.jpg' , '$2b$10$Bqpi.FKYuMykMeyc7VXmWeppZHqLJazKlJI0i8faVP2a/F29NLBgS', 0123456789, 'fb.com', '286 Nguyễn Xiển', 'Hà Nội', 1),
(3, 'Đoàn Thanh Hà', 'hadoan@gmail.com', '100_3.jpg' , '$2b$10$Bqpi.FKYuMykMeyc7VXmWeppZHqLJazKlJI0i8faVP2a/F29NLBgS', 0123456789, 'fb.com', '286 Nguyễn Xiển', 'Hà Nội', 2),
(4, 'Phạm Hải Yến', 'yenpham@gmail.com', '100_4.jpg' , '$2b$10$Bqpi.FKYuMykMeyc7VXmWeppZHqLJazKlJI0i8faVP2a/F29NLBgS', 0123456789, 'fb.com', '286 Nguyễn Xiển', 'Hà Nội', 2),
(5, 'Đinh Quỳnh Trang', 'trangdinh@gmail.com', '100_5.jpg' , '$2b$10$Bqpi.FKYuMykMeyc7VXmWeppZHqLJazKlJI0i8faVP2a/F29NLBgS', 0123456789, 'fb.com', '286 Nguyễn Xiển', 'Hà Nội', 3),
(6, 'Trần Nhật Anh', 'nhatanh@gmail.com', '100_6.jpg' , '$2b$10$Bqpi.FKYuMykMeyc7VXmWeppZHqLJazKlJI0i8faVP2a/F29NLBgS', 0123456789, 'fb.com', '286 Nguyễn Xiển', 'Hà Nội', 3),
(7, 'Phoenix', 'phoenix1@gmail.com', '100_7.jpg' , '$2b$10$Bqpi.FKYuMykMeyc7VXmWeppZHqLJazKlJI0i8faVP2a/F29NLBgS', 0123456789, 'fb.com', '286 Nguyễn Xiển', 'Hà Nội', 1),
(8, 'Administrator', 'admin1@gmail.com', '100_8.jpg' , '$2b$10$Bqpi.FKYuMykMeyc7VXmWeppZHqLJazKlJI0i8faVP2a/F29NLBgS', 0123456789, 'fb.com', '286 Nguyễn Xiển', 'Hà Nội', 1),
(9, 'Đoàn Thanh Hà', 'hadoan1@gmail.com', '100_9.jpg' , '$2b$10$Bqpi.FKYuMykMeyc7VXmWeppZHqLJazKlJI0i8faVP2a/F29NLBgS', 0123456789, 'fb.com', '286 Nguyễn Xiển', 'Hà Nội', 2),
(10, 'Phạm Hải Yến', 'yenpham1@gmail.com', '100_10.jpg' , '$2b$10$Bqpi.FKYuMykMeyc7VXmWeppZHqLJazKlJI0i8faVP2a/F29NLBgS', 0123456789, 'fb.com', '286 Nguyễn Xiển', 'Hà Nội', 2),
(11, 'Đinh Quỳnh Trang', 'trangdinh1@gmail.com', '100_11.jpg' , '$2b$10$Bqpi.FKYuMykMeyc7VXmWeppZHqLJazKlJI0i8faVP2a/F29NLBgS', 0123456789, 'fb.com', '286 Nguyễn Xiển', 'Hà Nội', 3),
(12, 'Trần Nhật Anh', 'nhatanh1@gmail.com', '100_12.jpg' , '$2b$10$Bqpi.FKYuMykMeyc7VXmWeppZHqLJazKlJI0i8faVP2a/F29NLBgS', 0123456789, 'fb.com', '286 Nguyễn Xiển', 'Hà Nội', 3),
(13, 'Phoenix', 'phoenix2@gmail.com', '' , '$2b$10$Bqpi.FKYuMykMeyc7VXmWeppZHqLJazKlJI0i8faVP2a/F29NLBgS', 0123456789, 'fb.com', '286 Nguyễn Xiển', 'Hà Nội', 1),
(14, 'Administrator', 'admin2@gmail.com', '' , '$2b$10$Bqpi.FKYuMykMeyc7VXmWeppZHqLJazKlJI0i8faVP2a/F29NLBgS', 0123456789, 'fb.com', '286 Nguyễn Xiển', 'Hà Nội', 1),
(15, 'Đoàn Thanh Hà', 'hadoan2@gmail.com', '' , '$2b$10$Bqpi.FKYuMykMeyc7VXmWeppZHqLJazKlJI0i8faVP2a/F29NLBgS', 0123456789, 'fb.com', '286 Nguyễn Xiển', 'Hà Nội', 2),
(16, 'Phạm Hải Yến', 'yenpham2@gmail.com', '' , '$2b$10$Bqpi.FKYuMykMeyc7VXmWeppZHqLJazKlJI0i8faVP2a/F29NLBgS', 0123456789, 'fb.com', '286 Nguyễn Xiển', 'Hà Nội', 2),
(17, 'Đinh Quỳnh Trang', 'trangdinh2@gmail.com', '' , '$2b$10$Bqpi.FKYuMykMeyc7VXmWeppZHqLJazKlJI0i8faVP2a/F29NLBgS', 0123456789, 'fb.com', '286 Nguyễn Xiển', 'Hà Nội', 3),
(18, 'Trần Nhật Anh', 'nhatanh2@gmail.com', '' , '$2b$10$Bqpi.FKYuMykMeyc7VXmWeppZHqLJazKlJI0i8faVP2a/F29NLBgS', 0123456789, 'fb.com', '286 Nguyễn Xiển', 'Hà Nội', 3);


-- --------------------------------------------------------


--
-- Table structure for table `list_order`
--

CREATE TABLE `list_order` (
  `id` int(11) NOT NULL,
  `customer_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `product_id` int(11) NOT NULL,
  `deposit` int(20) NOT NULL,
  `debt` int(20) NOT NULL,
  `link` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` int(1) NOT NULL,
  `buy_status` int(1) NOT NULL,
  `ship` int(1) NOT NULL,
  `date` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `createdby` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `list_order`
--

INSERT INTO `list_order` (`id`, `customer_id`, `product_id` , `deposit`, `debt`, `link`, `status` , `buy_status` , `ship` , `date`, `createdby`) VALUES
(1, 1, 1, 100000, 50000, 'fb.com', 1, 1, 1, '08/07/2019', 1),
(2, 5, 2, 0, 20000, 'fb.com', 2, 1, 3, '08/07/2019', 2),
(3, 7, 3, 50000, 250000, 'fb.com', 3, 2, 3, '08/07/2019', 3),
(4, 9, 4, 500000, 0, 'fb.com', 3, 2, 2, '08/07/2019', 4),
(5, 11, 5, 120000, 579999, 'fb.com', 3, 3, 1, '08/07/2019', 5),
(6, 17, 6, 15000000, -1380000, 'fb.com', 2, 3, 3, '08/07/2019', 2),
(7, 6, 7, 120000, 50000, 'fb.com', 2, 1, 3, '08/07/2019', 4),
(8, 8, 8, 70000, 929999, 'fb.com', 1, 1, 2, '08/07/2019', 6);

-- --------------------------------------------------------

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`cat_id`),
  ADD UNIQUE KEY `cat_name` (`cat_name`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mail` (`mail`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mail` (`mail`);

--
-- Indexes for table `customer`
--
ALTER TABLE `list_order`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `cat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
  
--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

--
-- AUTO_INCREMENT for table `list_order`
--
ALTER TABLE `list_order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
