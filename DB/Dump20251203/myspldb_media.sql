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
-- Table structure for table `media`
--

DROP TABLE IF EXISTS `media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `media` (
  `MEDIA_ID` int NOT NULL AUTO_INCREMENT,
  `IMG_NAME` varchar(255) NOT NULL,
  `IMG_PATH` varchar(255) NOT NULL,
  `FEED_NO` varchar(45) NOT NULL,
  `CDATETIME` datetime NOT NULL,
  `order_index` int DEFAULT NULL,
  PRIMARY KEY (`MEDIA_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media`
--

LOCK TABLES `media` WRITE;
/*!40000 ALTER TABLE `media` DISABLE KEYS */;
INSERT INTO `media` VALUES (1,'1764207367411-defaultImg04.jpg','http://localhost:3010/uploads/1764207367411-defaultImg04.jpg','16','2025-11-27 10:36:07',1),(2,'1764207367414-defaultImg05.jpg','http://localhost:3010/uploads/1764207367414-defaultImg05.jpg','16','2025-11-27 10:36:07',2),(3,'1764207367417-defaultImg06.jpg','http://localhost:3010/uploads/1764207367417-defaultImg06.jpg','16','2025-11-27 10:36:07',3),(4,'1764207389726-defaultImg04.jpg','http://localhost:3010/uploads/1764207389726-defaultImg04.jpg','17','2025-11-27 10:36:29',1),(5,'1764207389726-defaultImg05.jpg','http://localhost:3010/uploads/1764207389726-defaultImg05.jpg','17','2025-11-27 10:36:29',2),(6,'1764207389727-defaultImg06.jpg','http://localhost:3010/uploads/1764207389727-defaultImg06.jpg','17','2025-11-27 10:36:29',3),(7,'1764209083510-defaultImg01.jpg','http://localhost:3010/uploads/1764209083510-defaultImg01.jpg','18','2025-11-27 11:04:43',1),(8,'1764209083512-defaultImg02.jpg','http://localhost:3010/uploads/1764209083512-defaultImg02.jpg','18','2025-11-27 11:04:43',2),(9,'1764209083513-defaultImg03.jpg','http://localhost:3010/uploads/1764209083513-defaultImg03.jpg','18','2025-11-27 11:04:43',3),(10,'1764209083513-defaultImg04.jpg','http://localhost:3010/uploads/1764209083513-defaultImg04.jpg','18','2025-11-27 11:04:43',4),(11,'1764209083514-defaultImg05.jpg','http://localhost:3010/uploads/1764209083514-defaultImg05.jpg','18','2025-11-27 11:04:43',5),(12,'1764209083515-defaultImg06.jpg','http://localhost:3010/uploads/1764209083515-defaultImg06.jpg','18','2025-11-27 11:04:43',6);
/*!40000 ALTER TABLE `media` ENABLE KEYS */;
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
