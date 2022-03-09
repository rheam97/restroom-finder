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
  `lat` decimal(19,16) NOT NULL,
  `lon` decimal(19,16) NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bathroom`
--

LOCK TABLES `bathroom` WRITE;
/*!40000 ALTER TABLE `bathroom` DISABLE KEYS */;
INSERT INTO `bathroom` VALUES (1,'',38.9090640278533900,-77.0069463149400500,NULL,0,1,1,1,1,1,8,'2022-03-09 00:56:42','2022-03-09 00:56:42'),(2,'',38.9029664011229400,-77.0630401580660300,NULL,1,0,1,1,1,1,6,'2022-03-09 00:56:42','2022-03-09 00:56:42'),(3,'',38.9059799492847840,-77.0224376977407300,NULL,0,1,1,1,1,1,5,'2022-03-09 00:56:42','2022-03-09 00:56:42'),(4,'',38.9151180000000000,-77.0569490000000000,NULL,1,0,1,1,1,1,4,'2022-03-09 00:56:42','2022-03-09 00:56:42'),(5,'',38.9085367989268600,-77.0327643350491000,NULL,1,1,1,1,1,1,2,'2022-03-09 00:56:42','2022-03-09 00:56:42'),(6,'',38.9055690184308960,-77.0290678682852500,NULL,1,0,1,1,1,1,3,'2022-03-09 00:56:42','2022-03-09 00:56:42'),(7,'',38.9047471495880500,-77.0370475425690300,NULL,0,1,1,1,1,1,1,'2022-03-09 00:56:42','2022-03-09 00:56:42'),(8,'295',38.9266161231845440,-76.9630289306640100,NULL,1,1,0,1,0,1,11,'2022-03-09 01:22:55','2022-03-09 01:22:55');
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,'Nunc rhoncus dui vel sem.',3,1,1,'2022-03-09 00:56:42','2022-03-09 00:56:42'),(2,'Nunc rhoncus dui vel sem.',2,2,2,'2022-03-09 00:56:42','2022-03-09 00:56:42'),(3,'Nunc rhoncus dui vel sem.',4,3,3,'2022-03-09 00:56:42','2022-03-09 00:56:42'),(4,'Nunc rhoncus dui vel sem.',5,4,4,'2022-03-09 00:56:42','2022-03-09 00:56:42'),(5,'Nunc rhoncus dui vel sem.',4,5,5,'2022-03-09 00:56:42','2022-03-09 00:56:42'),(6,'Nunc rhoncus dui vel sem.',2,6,6,'2022-03-09 00:56:42','2022-03-09 00:56:42'),(7,'Nunc rhoncus dui vel sem.',3,7,7,'2022-03-09 00:56:42','2022-03-09 00:56:42');
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
INSERT INTO `Sessions` VALUES ('QFv-99vN_I-jGu6uks-TYUmH3lyYqwAT','2022-03-10 01:24:17','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"user_id\":11,\"username\":\"rheam\",\"loggedIn\":true}','2022-03-09 00:54:10','2022-03-09 01:24:17');
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
INSERT INTO `user` VALUES (1,'djiri4','gmidgley4@weather.com','$2b$10$2wdgi5e/6Apb6qaSU0pyXe1KI4h/uDFWaeZXlcUtMer615iYHZlqm'),(2,'jwilloughway1','rmebes1@sogou.com','$2b$10$.dndA7zkWvEkT/faRVVyOO.4OEu/LXuhjGxMpvzSIhuGUMU6ML7Cy'),(3,'alesmonde0','nwestnedge0@cbc.ca','$2b$10$e5h2LYKxayCSiSDO2daGjeBDozCba7zJGDra8GBrnsKZp.AdB4gkO'),(4,'dstanmer3','ihellier3@goo.ne.jp','$2b$10$i9IKHlHLs1p8rKnHh.zRfOZR/koeYkH5s0E.R962lMyUMWhjznz9e'),(5,'mpergens6','hnapleton6@feedburner.com','$2b$10$NexNOAQCit0vEjUXdfIXM.kZD5GMHwQeLaHt44sbGfQWS8Rp1vqXm'),(6,'iboddam2','cstoneman2@last.fm','$2b$10$O9Y0m9H3ZNpEOESvQSv/IeHXCRPiEKCH2bwbwidpvXhtuJoirr/9C'),(7,'tpenniell7','kperigo7@china.com.cn','$2b$10$9cPg/m.6SjFuMQso.3ohbOZAnZrg/1cbCFEOpoBvCb68bvq7xj8ua'),(8,'msprague5','larnout5@imdb.com','$2b$10$Lv/5R5JtUXQC2puRdC4mYeK1X/orb10X6W8JKzuy1zMO5MPmCLtYS'),(9,'msabbins8','lmongain8@google.ru','$2b$10$tdYpjzCRCmReNIl9NCl1rutJa27wgBusgygkckMXqQVYTr1u1Q/Ti'),(10,'jmacarthur9','bsteen9@epa.gov','$2b$10$B5Jet7KntVOYg6nmD.JB6.CKAROYu4/GlZ7O/CLzvthMikUaFZlke'),(11,'rheam','rheam97@gmail.com','$2b$10$tNGRhZt78VdcOVTiOpy4XuF5vsBCCvdBzsNMIrELAZxpT3EdSw6Vi');
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

-- Dump completed on 2022-03-08 20:38:23
