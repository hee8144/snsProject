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
-- Table structure for table `sns_public_chat`
--

DROP TABLE IF EXISTS `sns_public_chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sns_public_chat` (
  `msg_id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(45) NOT NULL,
  `content` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `room_id` varchar(45) NOT NULL,
  PRIMARY KEY (`msg_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='	';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sns_public_chat`
--

LOCK TABLES `sns_public_chat` WRITE;
/*!40000 ALTER TABLE `sns_public_chat` DISABLE KEYS */;
INSERT INTO `sns_public_chat` VALUES (1,'public','qwer','2025-12-01 09:46:49','public'),(2,'public','qwer','2025-12-01 09:58:06','public'),(3,'public','qwer','2025-12-01 09:58:18','public'),(4,'public','qwer','2025-12-01 10:00:28','public'),(5,'public','qwer','2025-12-01 10:00:33','public'),(6,'public','qwer','2025-12-01 10:02:29','public'),(7,'qwer','123','2025-12-01 10:05:17','public'),(8,'qwer','test','2025-12-01 10:05:23','public'),(9,'','123','2025-12-01 10:05:48','public'),(10,'','test','2025-12-01 10:06:17','public'),(11,'qwer','test','2025-12-01 10:06:30','public'),(12,'test','test','2025-12-01 10:06:52','public'),(13,'qwer','t','2025-12-01 10:07:22','public'),(14,'test','t','2025-12-01 10:07:30','public'),(15,'qwer','tedst','2025-12-01 10:09:37','public'),(16,'qwer1234','ㅅㄷㄴㅅ','2025-12-01 10:09:49','public'),(17,'qwer','qwe','2025-12-01 10:32:37','public'),(18,'qwer','123','2025-12-01 10:34:05','public'),(19,'qwer','3','2025-12-01 11:56:47','public');
/*!40000 ALTER TABLE `sns_public_chat` ENABLE KEYS */;
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
