-- MySQL dump 10.13  Distrib 8.0.28, for macos12.0 (x86_64)
--
-- Host: localhost    Database: restroom_finder_db
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bathroom`
--

DROP TABLE IF EXISTS `bathroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bathroom` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `lat` float NOT NULL,
  `lon` float NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `gendered` tinyint(1) DEFAULT '0',
  `unisex` tinyint(1) DEFAULT '0',
  `disabled_access` tinyint(1) DEFAULT '0',
  `key` tinyint(1) DEFAULT '0',
  `changing_tables` tinyint(1) DEFAULT '0',
  `menstruation_products` tinyint(1) DEFAULT '0',
  `user_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `bathroom_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bathroom`
--

LOCK TABLES `bathroom` WRITE;
/*!40000 ALTER TABLE `bathroom` DISABLE KEYS */;
INSERT INTO `bathroom` VALUES (1,'',38.9091,-77.0069,NULL,0,1,1,1,1,1,8,'2022-03-06 02:25:41','2022-03-06 02:25:41'),(2,'',38.903,-77.063,NULL,1,0,1,1,1,1,6,'2022-03-06 02:25:41','2022-03-06 02:25:41'),(3,'',38.906,-77.0224,NULL,0,1,1,1,1,1,5,'2022-03-06 02:25:41','2022-03-06 02:25:41'),(4,'',38.9151,-77.0569,NULL,1,0,1,1,1,1,4,'2022-03-06 02:25:41','2022-03-06 02:25:41'),(5,'',38.9085,-77.0328,NULL,1,1,1,1,1,1,2,'2022-03-06 02:25:41','2022-03-06 02:25:41'),(6,'',38.9056,-77.0291,NULL,1,0,1,1,1,1,3,'2022-03-06 02:25:41','2022-03-06 02:25:41'),(7,'',38.9047,-77.037,NULL,0,1,1,1,1,1,1,'2022-03-06 02:25:41','2022-03-06 02:25:41'),(8,'',38.9392,-76.9929,NULL,1,1,1,1,1,1,11,'2022-03-08 01:59:04','2022-03-08 01:59:04'),(9,'rhea\'s bathroom',38.9355,-76.9812,NULL,1,1,1,1,1,1,11,'2022-03-08 02:02:28','2022-03-08 02:02:28'),(10,'rhea\'s best bathroom',38.9328,-76.9802,NULL,1,1,1,1,1,1,11,'2022-03-08 02:04:38','2022-03-08 02:04:38'),(11,'the bestest',38.9217,-76.9761,NULL,1,1,1,1,1,1,11,'2022-03-08 02:06:03','2022-03-08 02:06:03'),(12,'the bestest 5',38.9312,-77.008,NULL,0,1,0,1,1,0,11,'2022-03-08 03:38:16','2022-03-08 03:38:16');
/*!40000 ALTER TABLE `bathroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` int NOT NULL AUTO_INCREMENT,
  `review_text` varchar(200) DEFAULT NULL,
  `review_rating` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `bathroom_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `review_user_id_bathroom_id_unique` (`user_id`,`bathroom_id`),
  KEY `bathroom_id` (`bathroom_id`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `review_ibfk_2` FOREIGN KEY (`bathroom_id`) REFERENCES `bathroom` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,'Nunc rhoncus dui vel sem.',3,1,1,'2022-03-06 02:25:41','2022-03-06 02:25:41'),(2,'Nunc rhoncus dui vel sem.',2,2,2,'2022-03-06 02:25:41','2022-03-06 02:25:41'),(3,'Nunc rhoncus dui vel sem.',4,3,3,'2022-03-06 02:25:41','2022-03-06 02:25:41'),(4,'Nunc rhoncus dui vel sem.',5,4,4,'2022-03-06 02:25:41','2022-03-06 02:25:41'),(5,'Nunc rhoncus dui vel sem.',4,5,5,'2022-03-06 02:25:41','2022-03-06 02:25:41'),(6,'Nunc rhoncus dui vel sem.',2,6,6,'2022-03-06 02:25:41','2022-03-06 02:25:41'),(7,'Nunc rhoncus dui vel sem.',3,7,7,'2022-03-06 02:25:41','2022-03-06 02:25:41'),(8,'',0,11,1,'2022-03-07 22:22:37','2022-03-07 22:22:37'),(10,'this sucks',1,11,2,'2022-03-08 00:55:02','2022-03-08 00:55:02'),(11,'happy',1,11,7,'2022-03-08 00:57:34','2022-03-08 00:57:34'),(14,'im here',1,11,4,'2022-03-08 01:05:00','2022-03-08 01:05:00'),(15,'hello',1,11,6,'2022-03-08 01:08:09','2022-03-08 01:08:09');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Sessions`
--

DROP TABLE IF EXISTS `Sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sessions`
--

LOCK TABLES `Sessions` WRITE;
/*!40000 ALTER TABLE `Sessions` DISABLE KEYS */;
INSERT INTO `Sessions` VALUES ('2FnCCgWKRJGirkJgB_i45GjA5LH-37w8','2022-03-08 01:36:53','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}','2022-03-07 01:36:53','2022-03-07 01:36:53'),('dX0XSg8lCAYX0pKWxzItYmuVAXQ3IdFJ','2022-03-09 03:49:09','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"user_id\":11,\"username\":\"rheam\",\"loggedIn\":true}','2022-03-08 03:48:40','2022-03-08 03:49:09'),('hgkqNWxcdCmfp8hjD6CNqP7S3Nb_z66d','2022-03-08 01:36:54','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}','2022-03-07 01:36:53','2022-03-07 01:36:54');
/*!40000 ALTER TABLE `Sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'jwilloughway1','rmebes1@sogou.com','$2b$10$/muwQgaDUoSPy9u/2G2z8.Oj0MEa9TjxmzabrtUShN.3uPTui74g.'),(2,'djiri4','gmidgley4@weather.com','$2b$10$iAspCvMbkRweQ2i9ETULkuZM673cefa9WPUv/eYiKvUJfgJ7KZIF2'),(3,'msprague5','larnout5@imdb.com','$2b$10$95NogCDn8zFmnzJgdiRmB.TScMvyTxYbTwqvqzjs2kxtssn7BWw1O'),(4,'alesmonde0','nwestnedge0@cbc.ca','$2b$10$PUQSVe9v20u2vt/MkBAvAOXVIFbjCn/jeEhpMbBzX5ordHG83TEaG'),(5,'msabbins8','lmongain8@google.ru','$2b$10$39S3LnLu5dLlhrVdI.c6xOCBD.Rxisj0RCn44P7bX8eeOXf1vq/Si'),(6,'mpergens6','hnapleton6@feedburner.com','$2b$10$byn2ATTBpUxdBNLEFHK.L.DH.msD4m1gq2ryO8SOv6JapKvX8k5u2'),(7,'jmacarthur9','bsteen9@epa.gov','$2b$10$8TFAmQowUw.OlNg.bMgJ8.OFubqL8buStRiU7dBvXPJ5AcjQ8qM9G'),(8,'iboddam2','cstoneman2@last.fm','$2b$10$LsUKCWu.fHxeU4SyPIVu3Od/UConzXmIL9AC8Og5CXvecSlc9d5IW'),(9,'dstanmer3','ihellier3@goo.ne.jp','$2b$10$qmHql.uPxHs8k0MWAxBnb.x7fnsFNnns4KcuKctkA5crDry0gsYSa'),(10,'tpenniell7','kperigo7@china.com.cn','$2b$10$.YKWp9iZmU3MoAZ6QtxGyORFWORs6FzDrIS4u4b8iRCEvnXUFlUe.'),(11,'rheam','rheam97@gmail.com','$2b$10$vUGxfxVANO2dvqwNwjSXq.Ry9w0gSJ.P8Z.FDkJAwJF9HyNKjrCLa');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-08 17:05:47
