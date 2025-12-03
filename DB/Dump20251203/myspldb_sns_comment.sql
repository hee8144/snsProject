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
-- Table structure for table `sns_comment`
--

DROP TABLE IF EXISTS `sns_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sns_comment` (
  `sns_commentNo` int NOT NULL AUTO_INCREMENT,
  `feed_no` int NOT NULL,
  `userId` varchar(45) NOT NULL,
  `CONTENTS` varchar(255) NOT NULL,
  `NICKNAME` varchar(20) NOT NULL,
  `CDATETIME` varchar(45) NOT NULL,
  `UDATETIME` varchar(45) NOT NULL,
  `ORG_CMTNO` int DEFAULT NULL,
  PRIMARY KEY (`sns_commentNo`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sns_comment`
--

LOCK TABLES `sns_comment` WRITE;
/*!40000 ALTER TABLE `sns_comment` DISABLE KEYS */;
INSERT INTO `sns_comment` VALUES (4,1,'qwer','1234','qwer','2025-11-26 12:04:56','2025-11-26 12:04:56',NULL),(18,1,'qwer','ㅅㄷㄴㅅ','qwer','2025-11-26 12:43:31','2025-11-26 12:43:31',NULL),(19,1,'qwer','test','qwer','2025-11-26 12:43:34','2025-11-26 12:43:34',NULL),(20,1,'qwer','test','qwer','2025-11-26 12:43:36','2025-11-26 12:43:36',NULL),(21,1,'qwer','test','qwer','2025-11-26 12:43:38','2025-11-26 12:43:38',NULL),(26,1,'test','ttt','test','2025-11-26 18:07:15','2025-11-26 18:07:15',NULL),(27,6,'qwer','1','qwer','2025-11-27 09:55:00','2025-11-27 09:55:00',NULL),(28,5,'qwer','1','qwer','2025-11-27 09:55:04','2025-11-27 09:55:04',NULL),(29,5,'qwer','123','qwer','2025-11-27 09:55:10','2025-11-27 09:55:10',NULL),(30,6,'qwer','123','qwer','2025-11-27 09:55:16','2025-11-27 09:55:16',NULL),(31,9,'qwer','5345','qwer','2025-11-27 10:02:00','2025-11-27 10:02:00',NULL),(32,21,'qwe123','ㅅ','qwe123','2025-11-27 18:10:05','2025-11-27 18:10:05',NULL),(33,21,'qwe123','3','qwe123','2025-11-27 18:11:56','2025-11-27 18:11:56',NULL),(34,20,'qwe123','1','qwe123','2025-11-27 18:12:59','2025-11-27 18:12:59',NULL),(35,6,'test','test','test','2025-11-28 16:11:02','2025-11-28 16:11:02',NULL),(37,21,'test','111','test','2025-11-28 16:53:41','2025-11-28 16:53:41',NULL),(38,20,'qwe123','r','qwe123','2025-11-28 16:54:29','2025-11-28 16:54:29',NULL),(39,21,'qwe123','4','qwe123','2025-11-28 16:54:38','2025-11-28 16:54:38',NULL),(40,21,'test','5','test','2025-11-28 16:54:52','2025-11-28 16:54:52',NULL),(41,21,'test','7','test','2025-11-28 16:55:23','2025-11-28 16:55:23',NULL),(42,21,'test','5','test','2025-11-28 16:55:32','2025-11-28 16:55:32',NULL),(43,21,'123123','tes','123123','2025-11-28 17:03:47','2025-11-28 17:03:47',NULL),(44,23,'qwer','1','qwer','2025-11-28 18:03:52','2025-11-28 18:03:52',NULL),(45,24,'qwer','댓ㄱ들','qwer','2025-12-01 12:41:19','2025-12-01 12:41:19',NULL),(46,22,'qwe123','2','qwe123','2025-12-01 13:17:22','2025-12-01 13:17:22',NULL),(47,24,'test','q','test','2025-12-01 15:36:33','2025-12-01 15:36:33',NULL),(48,24,'test','ㅂㅈㄷ','test','2025-12-01 15:49:27','2025-12-01 15:49:27',NULL),(49,24,'test','ㅂㄱ','test','2025-12-01 15:51:38','2025-12-01 15:51:38',NULL),(50,24,'qwer','ㅅ','qwer','2025-12-01 17:09:40','2025-12-01 17:09:40',NULL);
/*!40000 ALTER TABLE `sns_comment` ENABLE KEYS */;
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
