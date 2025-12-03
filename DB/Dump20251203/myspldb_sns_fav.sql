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
-- Table structure for table `sns_fav`
--

DROP TABLE IF EXISTS `sns_fav`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sns_fav` (
  `FAVNO` int NOT NULL AUTO_INCREMENT,
  `FEED_NO` int NOT NULL,
  `userId` varchar(45) NOT NULL,
  PRIMARY KEY (`FAVNO`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sns_fav`
--

LOCK TABLES `sns_fav` WRITE;
/*!40000 ALTER TABLE `sns_fav` DISABLE KEYS */;
INSERT INTO `sns_fav` VALUES (4,3,'qwer'),(5,4,'qwer'),(8,2,'qwer'),(11,1,'qwer'),(12,5,'qwer'),(19,9,'qwer'),(22,20,'qwe123'),(23,19,'qwe123'),(24,18,'qwe123'),(25,17,'qwer'),(26,16,'qwer'),(27,21,'test'),(28,20,'test'),(29,19,'test'),(30,18,'test'),(31,17,'test'),(32,16,'test'),(34,17,'qwe123'),(35,16,'qwe123'),(36,14,'qwe123'),(37,15,'qwe123'),(38,15,'test1234'),(39,21,'qwe123'),(40,21,'123123'),(41,20,'123123'),(43,23,'qwe123');
/*!40000 ALTER TABLE `sns_fav` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-03 12:32:34
