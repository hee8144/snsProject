-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: myspldb
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `sns_feed`
--

DROP TABLE IF EXISTS `sns_feed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sns_feed` (
  `feed_no` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(45) NOT NULL,
  `NICKNAME` varchar(45) NOT NULL,
  `CONTENTS` longtext NOT NULL,
  `FAV` int DEFAULT '0',
  `CNT` int DEFAULT '0',
  `CDATETIME` datetime NOT NULL,
  `UDATETIME` datetime NOT NULL,
  `codepenUrl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`feed_no`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sns_feed`
--

LOCK TABLES `sns_feed` WRITE;
/*!40000 ALTER TABLE `sns_feed` DISABLE KEYS */;
INSERT INTO `sns_feed` VALUES (6,'test','익명의사용자','tes',0,0,'2025-11-26 18:35:40','2025-11-26 18:35:40',''),(9,'qwer','익명의사용자','456',0,0,'2025-11-27 10:00:23','2025-11-27 10:00:23',''),(12,'qwer','익명의사용자','test123',0,0,'2025-11-27 10:32:55','2025-11-27 10:32:55',''),(13,'qwer','익명의사용자','test',0,0,'2025-11-27 10:34:20','2025-11-27 10:34:20',''),(14,'qwer','익명의사용자','test',0,0,'2025-11-27 10:34:31','2025-11-27 10:34:31',''),(15,'qwer','익명의사용자','test',0,0,'2025-11-27 10:35:37','2025-11-27 10:35:37',''),(16,'qwer','익명의사용자','test',0,0,'2025-11-27 10:36:06','2025-11-27 10:36:06',''),(17,'qwer','익명의사용자','test',0,0,'2025-11-27 10:36:28','2025-11-27 10:36:28',''),(18,'test','익명의사용자','test 수정 제발1',0,0,'2025-11-27 11:04:42','2025-11-27 11:04:42','https://codepen.io/achoqhfw-the-lessful/pen/pvyLYeG'),(19,'qwer1234','qwer1234','test',0,0,'2025-11-27 15:38:07','2025-11-27 15:38:07','estest'),(20,'qwe123','익명의사용자','프로필테스트',0,0,'2025-11-27 17:49:57','2025-11-27 17:49:57',''),(21,'qwe123','qwe123','ㄴ',0,0,'2025-11-27 18:08:51','2025-11-27 18:08:51',''),(22,'qwe123','qwe123','tes',0,0,'2025-11-28 17:09:45','2025-11-28 17:09:45',''),(23,'qwe123','qwe123','test ',0,0,'2025-11-28 17:32:42','2025-11-28 17:32:42','https://codepen.io/achoqhfw-the-lessful/pen/pvyLYeG'),(26,'qwer','qwer','ㅈㄱㄷㄱㅁㅈ',0,0,'2025-12-01 17:10:13','2025-12-01 17:10:13','');
/*!40000 ALTER TABLE `sns_feed` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-03 12:32:35
