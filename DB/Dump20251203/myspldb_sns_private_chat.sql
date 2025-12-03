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
-- Table structure for table `sns_private_chat`
--

DROP TABLE IF EXISTS `sns_private_chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sns_private_chat` (
  `msg_id` int NOT NULL AUTO_INCREMENT,
  `sender_id` varchar(45) DEFAULT NULL,
  `receiver_id` varchar(45) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `read_status` tinyint DEFAULT NULL,
  PRIMARY KEY (`msg_id`)
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sns_private_chat`
--

LOCK TABLES `sns_private_chat` WRITE;
/*!40000 ALTER TABLE `sns_private_chat` DISABLE KEYS */;
INSERT INTO `sns_private_chat` VALUES (1,'qwer','qwe123','test','2025-12-01',NULL),(2,'qwer','qwer1234','test','2025-12-01',NULL),(3,'qwer1234','qwer','1234','2025-12-01',1),(4,'qwer1234','qwer','1234','2025-12-01',1),(5,'qwer1234','qwer','1234','2025-12-01',1),(6,'qwer1234','qwer','1234','2025-12-01',1),(7,'qwer1234','qwer','1234','2025-12-01',1),(8,'qwer1234','qwer','1234','2025-12-01',1),(9,'qwer1234','qwer','1234','2025-12-01',1),(10,'qwer','qwer1234','1234','2025-12-01',1),(11,'qwer','qwer1234','1234','2025-12-01',1),(12,'qwer','qwer1234','1234','2025-12-01',1),(13,'qwer','qwer1234','1234','2025-12-01',1),(14,'qwer','qwer1234','1234','2025-12-01',1),(15,'qwer','qwer1234','1234','2025-12-01',1),(16,'qwer','qwer1234','test','2025-12-01',1),(17,'qwer','qwer1234','123','2025-12-01',1),(18,'qwer','qwer1234','1323213123','2025-12-01',1),(19,'qwer','qwer1234','test','2025-12-01',1),(20,'qwer','qwer1234','test','2025-12-01',1),(21,'qwer','qwer1234','123213','2025-12-01',1),(22,'qwer','qwer1234','123213','2025-12-01',1),(23,'qwer','qwer1234','123213','2025-12-01',1),(24,'qwer','qwer1234','123213','2025-12-01',1),(25,'qwer','qwer1234','123213','2025-12-01',1),(26,'qwer','qwer1234','123213','2025-12-01',1),(27,'qwer','qwer1234','123213','2025-12-01',1),(28,'qwer','qwer1234','123213','2025-12-01',1),(29,'qwer','qwer1234','123213','2025-12-01',1),(30,'qwer','qwer1234','123213','2025-12-01',1),(31,'qwer','qwer1234','123213','2025-12-01',1),(32,'qwer','qwer1234','123213','2025-12-01',1),(33,'qwer','qwer1234','123213','2025-12-01',1),(34,'qwer','qwer1234','123213','2025-12-01',1),(35,'qwer','qwer1234','123213','2025-12-01',1),(36,'qwer','qwer1234','123213','2025-12-01',1),(37,'qwer','qwer1234','123213','2025-12-01',1),(38,'qwer','qwer1234','123213','2025-12-01',1),(39,'qwer','qwer1234','123213','2025-12-01',1),(40,'qwer','qwer1234','123213','2025-12-01',1),(41,'qwer','qwer1234','123213','2025-12-01',1),(42,'qwer','qwer1234','123213','2025-12-01',1),(43,'qwer','qwer1234','123213','2025-12-01',1),(44,'qwer','qwer1234','123213','2025-12-01',1),(45,'qwer','qwer1234','123213','2025-12-01',1),(46,'qwer','qwer1234','123213','2025-12-01',1),(47,'qwer','qwer1234','123213','2025-12-01',1),(48,'qwer','qwer1234','123213','2025-12-01',1),(49,'qwer','qwer1234','123213','2025-12-01',1),(50,'qwer','qwer1234','123213','2025-12-01',1),(51,'qwer','qwer1234','12','2025-12-01',1),(52,'qwer','qwer1234','12','2025-12-01',1),(53,'qwer','qwer1234','12','2025-12-01',1),(54,'qwer','qwer1234','12','2025-12-01',1),(55,'qwer','qwer1234','12','2025-12-01',1),(56,'qwer','qwer1234','12','2025-12-01',1),(57,'qwer','qwer1234','12','2025-12-01',1),(58,'qwer','qwer1234','12','2025-12-01',1),(59,'qwer','qwer1234','12','2025-12-01',1),(60,'qwer','qwer1234','12','2025-12-01',1),(61,'qwer','qwer1234','12','2025-12-01',1),(62,'qwer','qwer1234','12','2025-12-01',1),(63,'qwer','qwer1234','12','2025-12-01',1),(64,'qwer','qwer1234','12','2025-12-01',1),(65,'qwer','qwer1234','12','2025-12-01',1),(66,'qwer','qwer1234','12','2025-12-01',1),(67,'qwer','qwer1234','12','2025-12-01',1),(68,'qwer','qwer1234','12','2025-12-01',1),(69,'qwer','qwer1234','12','2025-12-01',1),(70,'qwer','qwer1234','12','2025-12-01',1),(71,'qwer','qwer1234','12','2025-12-01',1),(72,'qwer','qwer1234','12','2025-12-01',1),(73,'qwer','qwer1234','12','2025-12-01',1),(74,'qwer','qwer1234','12','2025-12-01',1),(75,'qwer','qwer1234','12','2025-12-01',1),(76,'qwer','qwer1234','12','2025-12-01',1),(77,'qwer','qwer1234','12','2025-12-01',1),(78,'qwer','qwer1234','12','2025-12-01',1),(79,'qwer','qwer1234','12','2025-12-01',1),(80,'qwer','qwer1234','12','2025-12-01',1),(81,'qwer','qwer1234','12','2025-12-01',1),(82,'qwer','qwer1234','12','2025-12-01',1),(83,'qwer','qwer1234','12','2025-12-01',1),(84,'qwer','qwer1234','12','2025-12-01',1),(85,'qwer','qwer1234','12','2025-12-01',1),(86,'qwer','qwer1234','2','2025-12-01',1),(87,'qwer','qwer1234','2','2025-12-01',1),(88,'qwer','qwer1234','2','2025-12-01',1),(89,'qwer','qwer1234','2','2025-12-01',1),(90,'qwer','qwer1234','3','2025-12-01',1),(91,'qwer','qwer1234','3','2025-12-01',1),(92,'qwer','qwer1234','3','2025-12-01',1),(93,'qwer','qwer1234','3','2025-12-01',1),(94,'qwer','qwer1234','6','2025-12-01',1),(95,'qwer','qwer1234','5','2025-12-01',1),(96,'qwer','qwer1234','4','2025-12-01',1),(97,'qwer','qwer1234','1','2025-12-01',1),(98,'qwer','qwer1234','2','2025-12-01',1),(99,'qwer','qwer1234','5','2025-12-01',1),(100,'qwer','qwer1234','제발','2025-12-01',1),(101,'qwer','qwer1234','좀','2025-12-01',1),(102,'qwer','qwer1234','되라','2025-12-01',1),(103,'qwer','qwer1234','됬나','2025-12-01',1),(104,'qwer','qwer1234','흠','2025-12-01',1),(105,'qwer','qwer1234','1','2025-12-01',1),(106,'qwer','qwer1234','1','2025-12-01',1),(107,'qwer','qwer1234','6','2025-12-01',1),(108,'qwer','qwer1234','5','2025-12-01',1),(109,'qwer','qwer1234','7','2025-12-01',1),(110,'qwer','qwer1234','6','2025-12-01',1),(111,'qwer','qwer1234','7','2025-12-01',1),(112,'qwer','qwer1234','3','2025-12-01',1),(113,'qwer','qwer1234','4','2025-12-01',1),(114,'qwer','qwer1234','5','2025-12-01',1),(115,'qwer','qwe123','123','2025-12-01',1),(116,'qwer','qwe123','12313','2025-12-01',1),(117,'qwer','qwe123','dd','2025-12-01',1),(118,'qwer','qwe123','dd','2025-12-01',1);
/*!40000 ALTER TABLE `sns_private_chat` ENABLE KEYS */;
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
