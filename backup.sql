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
  `gendered` varchar(255) NOT NULL,
  `unisex` varchar(255) NOT NULL,
  `disabled_access` varchar(255) NOT NULL,
  `key` varchar(255) NOT NULL,
  `changing_tables` varchar(255) NOT NULL,
  `menstruation_products` varchar(255) NOT NULL,
  `user_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `bathroom_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bathroom`
--

LOCK TABLES `bathroom` WRITE;
/*!40000 ALTER TABLE `bathroom` DISABLE KEYS */;
INSERT INTO `bathroom` VALUES (1,'Bathroom 1',38.9090640278533900,-77.0069463149400500,'','gendered','unisex','disabled','key','changingTables','period',8,'2022-03-09 17:48:56','2022-03-09 17:48:56'),(2,'Bathroom 2',38.9029664011229400,-77.0630401580660300,'','gendered','false','disabled','false','false','false',6,'2022-03-09 17:48:56','2022-03-09 17:48:56'),(3,'Bathroom 3',38.9059799492847840,-77.0224376977407300,'','false','unisex','disabled','key','changingTables','false',5,'2022-03-09 17:48:56','2022-03-09 17:48:56'),(4,'Bathroom 4',38.9151180000000000,-77.0569490000000000,'','gendered','false','false','false','false','period',4,'2022-03-09 17:48:56','2022-03-09 17:48:56'),(5,'Bathroom 5',38.9085367989268600,-77.0327643350491000,'','gendered','unisex','disabled','key','false','false',2,'2022-03-09 17:48:56','2022-03-09 17:48:56'),(6,'Bathroom 6',38.9055690184308960,-77.0290678682852500,'','gendered','false','false','false','changingTables','false',3,'2022-03-09 17:48:56','2022-03-09 17:48:56'),(7,'Bathroom 7',38.9047471495880500,-77.0370475425690300,'','false','unisex','disabled','key','false','period',1,'2022-03-09 17:48:56','2022-03-09 17:48:56');
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
INSERT INTO `review` VALUES (1,'Nunc rhoncus dui vel sem.',3,1,1,'2022-03-09 17:48:56','2022-03-09 17:48:56'),(2,'Nunc rhoncus dui vel sem.',2,2,2,'2022-03-09 17:48:56','2022-03-09 17:48:56'),(3,'Nunc rhoncus dui vel sem.',4,3,3,'2022-03-09 17:48:56','2022-03-09 17:48:56'),(4,'Nunc rhoncus dui vel sem.',5,4,4,'2022-03-09 17:48:56','2022-03-09 17:48:56'),(5,'Nunc rhoncus dui vel sem.',4,5,5,'2022-03-09 17:48:56','2022-03-09 17:48:56'),(6,'Nunc rhoncus dui vel sem.',2,6,6,'2022-03-09 17:48:56','2022-03-09 17:48:56'),(7,'Nunc rhoncus dui vel sem.',3,7,7,'2022-03-09 17:48:56','2022-03-09 17:48:56');
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
INSERT INTO `Sessions` VALUES ('ceXnGmbgxm2dH0_ZxXq4pkzmUS7CiGU3','2022-03-10 17:49:06','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"user_id\":11,\"username\":\"rheam\",\"loggedIn\":true}','2022-03-09 17:40:09','2022-03-09 17:49:06');
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'dstanmer3','ihellier3@goo.ne.jp','$2b$10$BSTXamyPFrzaeTkSd5b33OsfxgxZkRrbciJAgCMX4a8fSKOdJeOc6'),(2,'jwilloughway1','rmebes1@sogou.com','$2b$10$x3CQXK2/DbyG7iarMKB7eugZTFINEgrUn1MDVfj/RNDebMuiv5Upy'),(3,'msprague5','larnout5@imdb.com','$2b$10$r7Edt4crjrAqJzu/V2j/v.X0pZDWbcocVa/.BSzUNw/MhdYVtuEim'),(4,'djiri4','gmidgley4@weather.com','$2b$10$R/Z7/SPDXSjcXv3mSrP2uOUTg4WDc7MySEaADQzL8/IIr1wAv6kpK'),(5,'tpenniell7','kperigo7@china.com.cn','$2b$10$A5BUjNh9afmd/pGwSdvNWulAFuwYAYrW3ycncYXVtFqoCaovnPbFe'),(6,'mpergens6','hnapleton6@feedburner.com','$2b$10$qYmk8afxdIAx.bEAzKgk.eDp/3iNRfW4BGKqUMps0oIfzO6h0hJxa'),(7,'msabbins8','lmongain8@google.ru','$2b$10$Eof7sivfCKhajjlNl7LeQukDAPk78L2RfX4hnVYI2MmCEi9e9cYuC'),(8,'jmacarthur9','bsteen9@epa.gov','$2b$10$pRwA3dF5a1GGMcOsgrWZUufP5OTlznsC47aId1Dt1FIWVMv/DBFu6'),(9,'iboddam2','cstoneman2@last.fm','$2b$10$9VYY5igLC0wHgr0RFVOfQORJxLolZQvjyNaIrUlflQS.dfrjafrO2'),(10,'alesmonde0','nwestnedge0@cbc.ca','$2b$10$jyfbDpFC1swPX7CL0c.NMuNBmeVWgyFtDRkoUnDJ77w.2T.Bx4ADS');
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

-- Dump completed on 2022-03-09 12:53:45
