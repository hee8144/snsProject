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
-- Table structure for table `sns_notification`
--

DROP TABLE IF EXISTS `sns_notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sns_notification` (
  `NOTIF_ID` int NOT NULL AUTO_INCREMENT,
  `USER_ID` varchar(50) NOT NULL,
  `TYPE` varchar(50) NOT NULL,
  `FROM_USER` varchar(50) DEFAULT NULL,
  `FEED_NO` int DEFAULT NULL,
  `CONTENT` varchar(255) DEFAULT NULL,
  `IS_READ` tinyint(1) DEFAULT '0',
  `CREATED_AT` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`NOTIF_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sns_notification`
--

LOCK TABLES `sns_notification` WRITE;
/*!40000 ALTER TABLE `sns_notification` DISABLE KEYS */;
INSERT INTO `sns_notification` VALUES (1,'qwe123','follow','test',NULL,NULL,1,'2025-11-28 07:02:01'),(2,'qwe123','like','test',21,NULL,1,'2025-11-28 07:03:59'),(3,'qwe123','like','test',20,NULL,1,'2025-11-28 07:04:00'),(4,'qwer1234','like','test',19,NULL,1,'2025-11-28 07:04:01'),(5,'qwer','like','test',17,NULL,1,'2025-11-28 07:04:05'),(6,'qwer','like','test',16,NULL,1,'2025-11-28 07:04:06'),(7,'qwe123','follow','test',NULL,NULL,1,'2025-11-28 07:11:12'),(8,'qwer','like','qwe123',17,NULL,1,'2025-11-28 07:26:22'),(9,'qwer','like','qwe123',16,NULL,1,'2025-11-28 07:26:23'),(10,'qwer','like','qwe123',14,NULL,1,'2025-11-28 07:26:24'),(11,'qwer','like','qwe123',15,NULL,1,'2025-11-28 07:26:24'),(12,'qwe123','follow','test1234',NULL,NULL,1,'2025-11-28 07:27:32'),(13,'qwer1234','follow','test1234',NULL,NULL,1,'2025-11-28 07:27:33'),(14,'qwer','like','test1234',15,NULL,1,'2025-11-28 07:30:34'),(15,'qwe123','follow','test1234',NULL,NULL,1,'2025-11-28 07:35:17'),(16,'qwe123','comment','test',21,'test',1,'2025-11-28 07:53:25'),(17,'qwe123','comment','test',21,'111',1,'2025-11-28 07:53:41'),(18,'qwe123','follow','qwer1234',NULL,NULL,1,'2025-11-28 07:53:57'),(19,'qwe123','comment','test',21,'5',1,'2025-11-28 07:54:52'),(20,'qwe123','comment','test',21,'7',1,'2025-11-28 07:55:23'),(21,'qwe123','comment','test',21,'5',1,'2025-11-28 07:55:32'),(22,'qwe123','follow','123123',NULL,NULL,1,'2025-11-28 08:03:43'),(23,'qwe123','like','123123',21,NULL,1,'2025-11-28 08:03:44'),(24,'qwe123','comment','123123',21,'tes',1,'2025-11-28 08:03:47'),(25,'qwe123','like','123123',20,NULL,1,'2025-11-28 08:03:52'),(26,'qwer1234','follow','123123',NULL,NULL,1,'2025-11-28 08:03:52'),(27,'qwe123','comment','qwer',23,'1',1,'2025-11-28 09:03:52'),(28,'qwer1234','private_msg','qwer',NULL,'새로운 1:1 메시지가 도착하였습니다',1,'2025-12-01 03:08:45'),(29,'qwer1234','message','qwer',NULL,'새로운 1:1 메시지가 도착하였습니다',1,'2025-12-01 03:10:42'),(30,'qwer1234','message','qwer',NULL,'새로운 1:1 메시지가 도착하였습니다',1,'2025-12-01 03:12:29'),(31,'qwer1234','message','qwer',NULL,'새로운 1:1 메시지가 도착하였습니다',1,'2025-12-01 03:12:46'),(32,'qwer1234','message','qwer',NULL,'새로운 1:1 메시지가 도착하였습니다',1,'2025-12-01 03:14:18'),(33,'qwer1234','message','qwer',NULL,'새로운 1:1 메시지가 도착하였습니다',1,'2025-12-01 03:15:33'),(34,'qwer1234','message','qwer',NULL,'새로운 1:1 메시지가 도착하였습니다',1,'2025-12-01 03:15:50'),(35,'qwer1234','message','qwer',NULL,'새로운 1:1 메시지가 도착하였습니다',1,'2025-12-01 03:15:52'),(36,'qwer1234','message','qwer',NULL,'새로운 1:1 메시지가 도착하였습니다',1,'2025-12-01 03:16:22'),(37,'qwer1234','message','qwer',NULL,'새로운 1:1 메시지가 도착하였습니다',1,'2025-12-01 03:16:23'),(38,'qwer1234','message','qwer',NULL,'새로운 1:1 메시지가 도착하였습니다',1,'2025-12-01 03:16:24'),(39,'qwe123','message','qwer',NULL,'새로운 1:1 메시지가 도착하였습니다',1,'2025-12-01 04:05:56'),(40,'qwe123','message','qwer',NULL,'새로운 1:1 메시지가 도착하였습니다',1,'2025-12-01 04:05:58'),(41,'qwe123','message','qwer',NULL,'새로운 1:1 메시지가 도착하였습니다',1,'2025-12-01 04:08:00'),(42,'qwe123','message','qwer',NULL,'새로운 1:1 메시지가 도착하였습니다',1,'2025-12-01 04:08:03'),(43,'qwer','comment','test',24,'q',1,'2025-12-01 06:36:33'),(44,'qwer','comment','test',24,'ㅂㅈㄷ',1,'2025-12-01 06:49:27'),(45,'qwer','comment','test',24,'ㅂㄱ',1,'2025-12-01 06:51:38'),(46,'qwer','like','test',24,NULL,1,'2025-12-01 08:00:18'),(47,'qwe123','follow','qwer',NULL,NULL,0,'2025-12-01 09:13:52'),(48,'qwe123','follow','qwer',NULL,NULL,0,'2025-12-01 09:16:20'),(49,'qwe123','follow','qwer',NULL,NULL,0,'2025-12-01 09:19:56'),(50,'qwe123','follow','qwer',NULL,NULL,0,'2025-12-01 09:20:17'),(51,'qwe123','follow','qwer',NULL,NULL,0,'2025-12-01 09:20:19'),(52,'qwe123','follow','qwer',NULL,NULL,0,'2025-12-01 09:20:33');
/*!40000 ALTER TABLE `sns_notification` ENABLE KEYS */;
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
