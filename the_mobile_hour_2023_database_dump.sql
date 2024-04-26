-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: mobile-hour-2023
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `changelog`
--

DROP TABLE IF EXISTS `changelog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `changelog` (
  `changeLog_id` int NOT NULL AUTO_INCREMENT,
  `changeLog_date` datetime NOT NULL,
  `changeLog_product_id` int NOT NULL,
  `changeLog_staff_id` int NOT NULL,
  `changeLog_message` varchar(100) NOT NULL,
  PRIMARY KEY (`changeLog_id`),
  UNIQUE KEY `changeLog_id_UNIQUE` (`changeLog_id`),
  KEY `fk-changelog-product_idx` (`changeLog_product_id`),
  KEY `fk-changelog-staff_idx` (`changeLog_staff_id`),
  CONSTRAINT `fk-changelog-product-table` FOREIGN KEY (`changeLog_product_id`) REFERENCES `products` (`product_id`),
  CONSTRAINT `fk-changelog-staff-table` FOREIGN KEY (`changeLog_staff_id`) REFERENCES `staff` (`staff_id`)
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `changelog`
--

LOCK TABLES `changelog` WRITE;
/*!40000 ALTER TABLE `changelog` DISABLE KEYS */;
INSERT INTO `changelog` VALUES (107,'2023-11-09 11:06:20',40,1,'User created product with id 40'),(108,'2023-11-09 11:06:34',40,1,'User updated product with id 40'),(109,'2023-11-10 11:09:17',5,1,'User updated product with id 5'),(110,'2023-11-10 11:09:19',6,1,'User updated product with id 6'),(111,'2023-11-10 11:09:21',7,1,'User updated product with id 7'),(112,'2023-11-10 11:09:23',8,1,'User updated product with id 8'),(113,'2023-11-10 11:09:25',9,1,'User updated product with id 9'),(114,'2023-11-10 11:09:27',10,1,'User updated product with id 10'),(115,'2023-11-10 11:09:29',12,1,'User updated product with id 12'),(116,'2023-11-10 11:09:31',40,1,'User updated product with id 40'),(117,'2023-11-10 11:09:47',5,1,'User updated product with id 5'),(118,'2023-11-10 11:10:32',41,1,'User created product with id 41'),(119,'2023-11-10 11:11:09',41,1,'User deleted product with id 41'),(120,'2023-11-10 12:15:33',40,1,'User updated product with id 40'),(121,'2023-11-10 18:19:45',5,1,'User updated product with id 5'),(122,'2023-11-10 22:32:17',40,1,'User updated product with id 40'),(123,'2023-11-10 22:32:46',40,1,'User deleted product with id 40'),(124,'2023-11-10 22:33:34',42,1,'User created product with id 42'),(125,'2023-11-10 22:33:49',42,3,'User updated product with id 42');
/*!40000 ALTER TABLE `changelog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feature`
--

DROP TABLE IF EXISTS `feature`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feature` (
  `feature_id` int NOT NULL AUTO_INCREMENT,
  `weight` varchar(45) NOT NULL,
  `dimensions` varchar(45) NOT NULL,
  `OS` varchar(45) NOT NULL,
  `screensize` varchar(45) NOT NULL,
  `resolution` varchar(45) NOT NULL,
  `CPU` varchar(45) NOT NULL,
  `RAM` varchar(45) NOT NULL,
  `storage` varchar(45) NOT NULL,
  `battery` varchar(45) NOT NULL,
  `rear_camera` varchar(45) NOT NULL,
  `front_camera` varchar(45) NOT NULL,
  PRIMARY KEY (`feature_id`),
  UNIQUE KEY `feature_id_UNIQUE` (`feature_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feature`
--

LOCK TABLES `feature` WRITE;
/*!40000 ALTER TABLE `feature` DISABLE KEYS */;
INSERT INTO `feature` VALUES (1,'128g','151.7 x 71.2 x 7.9 mm','Android 11','7.5 inches ','2400 × 1080','Octa-core processor','8GB','256GB','4000 mAh Li-Ion','12MP','8MP'),(2,'112g','123.8 x 58.6 x 7.6 mm','iOS 9','7 inches','1136 x 640','A7 64 bit','2GB','64GB','2000 mAh Li-Ion','8MP','12MP'),(3,'189g','157.8 x 72.3 x 8.6 mm','Android 9','6.39 inches','1440 x 3120','Octa-core processor','6GB','128GB','4200 mAh Li-Po','40MP','8MP'),(4,'197g','163.2 x 73.6 x 8.7 mm','Android 11','6.7 inches','1440 x 3216','Octa-core processor','8GB','128GB','4500 mAh Li-Po','48MP','16MP'),(21,'126g','163.2 x 73.6 x 8.7 mm','Android 12','6 inches','2400 × 1080','Dual Core 1.5ghz','5GB','120GB','4500 mAh Li-Po','16MP','3MP'),(22,'100g','3 x 3 x 3mm','Android 11','7.1 inches','1256 x 1002','dual core 1.1ghz','1GB','100GB','li-ion','19MP','3MP'),(31,'111','157.8 x 72.3 x 8.6 mm','wiNDOWS','1400 inches','1440 x 3120','25GB','25GB','450GB','123MPH','123MP','123MP'),(32,'123','151.7 x 71.2 x 7.9 mm','wiNDOWS','14001 inches','1440 x 3120','CPU','25GB','225GB','123MPH','123MP','123MP'),(33,'123g','151.7 x 71.2 x 7.9 mm','Android 11','7 inches','2400 × 1080',' Octa-core processor','8GB','256GB','4000 mAh Li-Ion','8MP','8MP');
/*!40000 ALTER TABLE `feature` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_number` int NOT NULL AUTO_INCREMENT,
  `order_status` enum('pending','complete','cancelled') NOT NULL,
  `product_id` int NOT NULL,
  `customer_firstName` varchar(45) NOT NULL,
  `customer_lastName` varchar(45) NOT NULL,
  `customer_phone` varchar(45) NOT NULL,
  `customer_email` varchar(45) NOT NULL,
  `order_datetime` datetime NOT NULL,
  PRIMARY KEY (`order_number`),
  UNIQUE KEY `order_number_UNIQUE` (`order_number`),
  KEY `fk_orders_customer_id_idx` (`product_id`),
  CONSTRAINT `fk_order_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (6,'cancelled',5,'Jasper','Bhandari','040581245','sanjay@gmail.com','2023-09-20 03:30:54'),(7,'cancelled',6,'Sanjay','Bhandari','0405812451','jasper@gmail.com','2023-09-20 03:32:56'),(8,'cancelled',6,'','','','','2023-09-20 06:00:39'),(9,'cancelled',6,'','','','','2023-09-20 07:35:57'),(10,'cancelled',5,'','','','','2023-09-20 11:01:07'),(11,'pending',5,'Sanjay','Bhandari','014123213','bhandarisanjay123@afasd','2023-09-21 04:00:48'),(12,'complete',5,'Sanjay','Bhandari','1012931239','bhandarisanjay79@gmail.com','2023-09-22 04:59:14'),(13,'complete',7,'Sanjay','Bhandari','0405812555','bhandarisa@gail.cpm','2023-09-23 09:48:51'),(16,'complete',5,'Sanjay','bhandari','045124123','bhdanri@','2023-09-21 12:00:00'),(18,'complete',5,'sanjasdas','badsasfdas','+61405812509','bhadnarisanjay@gamil.com','2023-09-24 23:23:36'),(19,'cancelled',5,'asdas','asdasd','+61405812509','asdasd@gmail.com','2023-09-24 23:26:04'),(20,'complete',5,'sa','as','+61405812509','bahsd@gmail.com','2023-09-25 06:26:31'),(21,'cancelled',6,'sadas','adsad','+61405812509','bhadnari@gmail.com','2023-09-25 06:39:40'),(22,'complete',7,'san','asnn','+61405812509','bhandari@gmail.com','2023-09-25 06:41:18'),(23,'complete',5,'Aman','rawat','+61405912509','bhandri@gmail.com','2023-09-27 01:25:19'),(24,'complete',5,'Sanjay','Bhandariiii','+61405812509','bhandri@gmail.com','2023-09-27 01:31:30'),(25,'complete',7,'sa','fzx','+61405812509','bhch@gmail.com','2023-09-27 03:48:50'),(26,'complete',5,'Sam','sam','+61400000000','sam@gmail.com','2023-09-27 08:34:33'),(27,'complete',5,'Jasper','R','+61405678129','jasper@gmail.com','2023-09-29 05:19:52'),(28,'complete',5,'Jasper','R','+61405812509','Bhnadri@gmail.com','2023-09-29 07:39:45'),(29,'complete',10,'ANs','Ba','+61405812509','bhansd@gmail.com','2023-10-02 06:08:31'),(30,'complete',5,'Sushma','Rawat','+61400000000','susma@gmail.com','2023-10-02 11:57:54'),(31,'complete',5,'sanjay','bahndari','+61405812509','b@gmail.com','2023-10-04 05:33:01'),(32,'complete',5,'Sanjay','Bhandari','+61405812509','bhandari@gmail.com','2023-10-08 09:20:32'),(33,'complete',7,'Sanjay','Bhandari','0405812509','Bhandari@gmail.com','2023-10-14 22:01:18'),(34,'complete',6,'Aaman','Bahndari','+61405812500','bhandar@gamil.com','2023-10-20 01:02:17'),(35,'complete',5,'Sanjay','Bhandarii','+61405812500','bhandari@gmail.com','2023-10-20 01:04:04'),(36,'complete',10,'Sanjay','Bhandari','+61405812509','bhandari@gmail.com','2023-10-31 02:02:34'),(37,'complete',10,'Sanjay','Bhand','+61405812509','bhandari@gmail.com','2023-10-31 02:03:20'),(38,'complete',6,'1','Bhandari','+61405812509','bhandari@gmail.com','2023-10-31 03:10:10'),(39,'complete',8,'1','Sanjay','0405912509','bhandari@gmail.com','2023-11-05 23:38:20'),(40,'complete',6,'bhandari','1','0405912509','bhandari@gmail.com','2023-11-05 23:38:55'),(41,'complete',8,'Sanjay','sa','0405912509','bhandari@gmail.com','2023-11-05 23:55:58'),(42,'complete',6,'Sanjay','saa','0405912509','bhandari@gmail.com','2023-11-05 23:56:32'),(43,'complete',6,'Sanjay','Bh','0405912509','bhandari@gmail.com','2023-11-06 02:51:51'),(44,'complete',37,'Sanjay','bh','0405912509','bhandari@gmail.com','2023-11-06 03:41:17'),(45,'complete',41,'Sanjay','Bha','0405912509','bhandari@gmail.com','2023-11-10 01:10:58'),(46,'pending',5,'Sanjay','Bh','0405912509','bhandari@gmail.com','2023-11-10 01:14:12'),(47,'pending',6,'Sanjay','Bha','0405912509','bhandari@gmail.com','2023-11-10 07:54:16'),(48,'pending',5,'Aman','Bhandari','0405812509','bhandari@gmail.com','2023-11-10 08:10:16'),(49,'pending',5,'Sanjay','Bhandari','0405812609','bhandari@gmail.com','2023-11-10 08:18:30');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(70) NOT NULL,
  `product_model` varchar(45) NOT NULL,
  `product_manufacturer` varchar(45) NOT NULL,
  `product_price` decimal(10,2) NOT NULL,
  `product_feature_id` int NOT NULL,
  `product_stock` int NOT NULL,
  `product_description` varchar(500) NOT NULL,
  `product_last_updated_by_staff_id` int NOT NULL,
  `deleted_product` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`product_id`),
  UNIQUE KEY `product_id_UNIQUE` (`product_id`),
  KEY `fk_products_staff_idx` (`product_last_updated_by_staff_id`),
  KEY `fk_products_Feature_idx` (`product_feature_id`),
  CONSTRAINT `fk_products_Feature` FOREIGN KEY (`product_feature_id`) REFERENCES `feature` (`feature_id`),
  CONSTRAINT `fk_products_staff` FOREIGN KEY (`product_last_updated_by_staff_id`) REFERENCES `staff` (`staff_id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (5,'Samsung Galaxy S21','S20','Samsung',780.00,1,12,'The Samsung Galaxy S21 is a flagship smartphone with a stunning display, powerful camera, and top-notch performance.',1,0),(6,'Apple iPhone 5s','5s','Apple',2500.00,1,51,'The Apple iPhone 5s is a classic smartphone known for its elegant design and advanced features. It&amp;amp;amp;#x27;s a timeless choice for Apple enthusiasts.',1,0),(7,'Huawei Mate 20 Pro','Mate 20 Pro','Huawei',700.00,1,2,' The Huawei Mate 20 Pro offers exceptional camera capabilities and cutting-edge technology. It&#x27;s designed for those who crave innovation.',1,0),(8,'OnePlus 9 Pro','9 Pro','OnePlus',699.00,1,3,'The OnePlus 9 Pro combines speed, style, and performance to deliver a flagship smartphone experience. It&#x27;s perfect for tech enthusiasts.',1,0),(9,'Huawei Mate 30','Mate 30','Huawei',510.00,1,4,'The Huawei Mate 30 is a reliable and stylish smartphone with a focus on great value and functionality.',1,0),(10,'Phone 6','6a','Apple',100.00,1,4,'The Phone 6 is an affordable and user-friendly option, ideal for those seeking a budget-friendly smartphone.',1,0),(12,'Iphone 15','15','Apple',1200.00,1,23,'The iPhone 15 is Apple&amp;amp;amp;amp;amp;amp;amp;amp;#x27;s latest innovation, offering cutting-edge technology and a host of exciting features. It&amp;amp;amp;amp;amp;amp;amp;amp;#x27;s a must-have for Apple enthusiasts.',1,0),(37,'SANAJY','SANJAY','ssss',123.00,1,122,'ADAGSDVMVSDJ',1,1),(38,'Samasung11','Samsung1','sanjay',123.00,22,1221,'asas',1,1),(39,'Sanjay1-1','Samsung','sanjay',12333.00,32,1231,'SAAAA',1,1),(40,'Sanjay','Samsung','samsung',123.00,1,122,'this is a test ',1,1),(41,'Sanjay','Samsung','sanjay',123.00,33,123,'asdasdasd',1,1),(42,'Sanjay','Samsung','Samsung',123.00,1,12,'Thi is just a test',3,0);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff` (
  `staff_id` int NOT NULL AUTO_INCREMENT,
  `staff_firstName` varchar(70) NOT NULL,
  `staff_lastName` varchar(70) NOT NULL,
  `staff_role` enum('sales','stock','manager') NOT NULL,
  `staff_username` varchar(45) NOT NULL,
  `staff_password` varchar(100) NOT NULL,
  PRIMARY KEY (`staff_id`),
  UNIQUE KEY `staff_id_UNIQUE` (`staff_id`),
  UNIQUE KEY `staff_username_UNIQUE` (`staff_username`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (1,'Sanjay','Bhandari','manager','sanju25','$2a$10$uOcBHAH4LtkuI0qBFIbOU.pj1FdJLC8RKR5oJkgH39/d0Q7SKrxVq'),(3,'Jess','Soz','sales','jess','$2a$10$uOcBHAH4LtkuI0qBFIbOU.pj1FdJLC8RKR5oJkgH39/d0Q7SKrxVq'),(7,'jan','hena','stock','jenajenaa','$2a$10$uOcBHAH4LtkuI0qBFIbOU.pj1FdJLC8RKR5oJkgH39/d0Q7SKrxVq'),(9,'Jasper','Ra','sales','jasper','$2a$10$.ODQGLpFW.fEUcrfnUiW2eHmgWY7kE5YBF6oXCW3uojyYmEu6GgTi');
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-10 22:35:23
