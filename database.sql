/*
-- Please import this file before testing the application.

-- Date: 2019-09-19 06:47
*/




CREATE TABLE `chat_groups` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `chat_group_to_users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `group_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `joining_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `chat_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source_user_id` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `destination_user_id` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message_body` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_group_chat` enum('y','n') COLLATE utf8mb4_unicode_ci DEFAULT 'n',
  `destination_group_id` bigint(20) DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `chat_users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=457 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


/*
-- Query: SELECT * FROM chat_users
LIMIT 0, 1000

-- Date: 2019-09-19 06:47
*/
INSERT INTO `chat_users` (`id`,`username`,`password`) VALUES (123,'Joydeep','123');
INSERT INTO `chat_users` (`id`,`username`,`password`) VALUES (235,'Deepjoy','123');
INSERT INTO `chat_users` (`id`,`username`,`password`) VALUES (356,'Joy','123');
INSERT INTO `chat_users` (`id`,`username`,`password`) VALUES (456,'Deep','123');


/*
-- Query: SELECT * FROM chat_groups
LIMIT 0, 1000

-- Date: 2019-09-19 06:48
*/
INSERT INTO `chat_groups` (`id`,`name`,`created`) VALUES (1,'Group One','2019-09-19 00:00:00');
INSERT INTO `chat_groups` (`id`,`name`,`created`) VALUES (2,'Group Two','2019-09-19 00:00:00');


/*
-- Query: SELECT * FROM chat_group_to_users
LIMIT 0, 1000

-- Date: 2019-09-19 06:50
*/
INSERT INTO `chat_group_to_users` (`id`,`group_id`,`user_id`,`joining_date`) VALUES (1,1,123,'2019-09-19 00:00:00');
INSERT INTO `chat_group_to_users` (`id`,`group_id`,`user_id`,`joining_date`) VALUES (2,1,356,'2019-09-19 00:00:00');
INSERT INTO `chat_group_to_users` (`id`,`group_id`,`user_id`,`joining_date`) VALUES (3,1,235,'2019-09-19 00:00:00');
INSERT INTO `chat_group_to_users` (`id`,`group_id`,`user_id`,`joining_date`) VALUES (4,2,123,'2019-09-19 00:00:00');
INSERT INTO `chat_group_to_users` (`id`,`group_id`,`user_id`,`joining_date`) VALUES (5,2,456,'2019-09-19 00:00:00');


/*
-- Query: SELECT * FROM chat_messages
LIMIT 0, 1000

-- Date: 2019-09-19 06:51
*/
INSERT INTO `chat_messages` (`id`,`source_user_id`,`destination_user_id`,`message_body`,`is_group_chat`,`destination_group_id`,`timestamp`) VALUES (15,'123','356','test','n',NULL,'2019-09-18 03:05:32');
INSERT INTO `chat_messages` (`id`,`source_user_id`,`destination_user_id`,`message_body`,`is_group_chat`,`destination_group_id`,`timestamp`) VALUES (16,'123','356','test','n',NULL,'2019-09-18 03:05:39');
INSERT INTO `chat_messages` (`id`,`source_user_id`,`destination_user_id`,`message_body`,`is_group_chat`,`destination_group_id`,`timestamp`) VALUES (17,'235','356','hello','n',NULL,'2019-09-18 03:15:32');
INSERT INTO `chat_messages` (`id`,`source_user_id`,`destination_user_id`,`message_body`,`is_group_chat`,`destination_group_id`,`timestamp`) VALUES (18,'235','456','hi','n',NULL,'2019-09-18 03:15:39');
INSERT INTO `chat_messages` (`id`,`source_user_id`,`destination_user_id`,`message_body`,`is_group_chat`,`destination_group_id`,`timestamp`) VALUES (19,'235','123','testing\n','n',NULL,'2019-09-18 03:15:54');
INSERT INTO `chat_messages` (`id`,`source_user_id`,`destination_user_id`,`message_body`,`is_group_chat`,`destination_group_id`,`timestamp`) VALUES (20,'123',NULL,'llllll','y',1,'2019-09-18 03:15:54');
INSERT INTO `chat_messages` (`id`,`source_user_id`,`destination_user_id`,`message_body`,`is_group_chat`,`destination_group_id`,`timestamp`) VALUES (21,'123',NULL,'krkrkr','y',1,'2019-09-18 05:08:05');
INSERT INTO `chat_messages` (`id`,`source_user_id`,`destination_user_id`,`message_body`,`is_group_chat`,`destination_group_id`,`timestamp`) VALUES (22,'123',NULL,'lalala','y',1,'2019-09-18 05:09:50');
INSERT INTO `chat_messages` (`id`,`source_user_id`,`destination_user_id`,`message_body`,`is_group_chat`,`destination_group_id`,`timestamp`) VALUES (23,'123',NULL,'baat \n','y',1,'2019-09-18 05:10:53');
INSERT INTO `chat_messages` (`id`,`source_user_id`,`destination_user_id`,`message_body`,`is_group_chat`,`destination_group_id`,`timestamp`) VALUES (24,'356',NULL,'gogogogo','y',1,'2019-09-18 05:21:37');
INSERT INTO `chat_messages` (`id`,`source_user_id`,`destination_user_id`,`message_body`,`is_group_chat`,`destination_group_id`,`timestamp`) VALUES (25,'123','235','hthth','n',NULL,'2019-09-18 05:26:04');
INSERT INTO `chat_messages` (`id`,`source_user_id`,`destination_user_id`,`message_body`,`is_group_chat`,`destination_group_id`,`timestamp`) VALUES (26,'123',NULL,'bobobo','y',1,'2019-09-18 05:26:13');
INSERT INTO `chat_messages` (`id`,`source_user_id`,`destination_user_id`,`message_body`,`is_group_chat`,`destination_group_id`,`timestamp`) VALUES (27,'123',NULL,'','y',1,'2019-09-18 05:26:13');
INSERT INTO `chat_messages` (`id`,`source_user_id`,`destination_user_id`,`message_body`,`is_group_chat`,`destination_group_id`,`timestamp`) VALUES (28,'123',NULL,'','y',1,'2019-09-18 05:26:17');
INSERT INTO `chat_messages` (`id`,`source_user_id`,`destination_user_id`,`message_body`,`is_group_chat`,`destination_group_id`,`timestamp`) VALUES (29,'123',NULL,'jtjtjtjt','y',1,'2019-09-18 05:27:27');
INSERT INTO `chat_messages` (`id`,`source_user_id`,`destination_user_id`,`message_body`,`is_group_chat`,`destination_group_id`,`timestamp`) VALUES (30,'123','235','hello deep JOY','n',NULL,'2019-09-18 05:27:44');
INSERT INTO `chat_messages` (`id`,`source_user_id`,`destination_user_id`,`message_body`,`is_group_chat`,`destination_group_id`,`timestamp`) VALUES (31,'123',NULL,'joy','y',2,'2019-09-19 05:55:21');
INSERT INTO `chat_messages` (`id`,`source_user_id`,`destination_user_id`,`message_body`,`is_group_chat`,`destination_group_id`,`timestamp`) VALUES (32,'356',NULL,'Bzhxhdhxb','y',1,'2019-09-19 05:57:17');
INSERT INTO `chat_messages` (`id`,`source_user_id`,`destination_user_id`,`message_body`,`is_group_chat`,`destination_group_id`,`timestamp`) VALUES (33,'356','123','hello','n',NULL,'2019-09-19 06:16:40');
INSERT INTO `chat_messages` (`id`,`source_user_id`,`destination_user_id`,`message_body`,`is_group_chat`,`destination_group_id`,`timestamp`) VALUES (34,'356','123','how are you\n','n',NULL,'2019-09-19 06:16:57');
INSERT INTO `chat_messages` (`id`,`source_user_id`,`destination_user_id`,`message_body`,`is_group_chat`,`destination_group_id`,`timestamp`) VALUES (35,'123','356','i am fine','n',NULL,'2019-09-19 06:17:10');
INSERT INTO `chat_messages` (`id`,`source_user_id`,`destination_user_id`,`message_body`,`is_group_chat`,`destination_group_id`,`timestamp`) VALUES (36,'undefined','356','hello','n',NULL,'2019-09-19 06:23:12');
INSERT INTO `chat_messages` (`id`,`source_user_id`,`destination_user_id`,`message_body`,`is_group_chat`,`destination_group_id`,`timestamp`) VALUES (37,'123','235','hohoho','n',NULL,'2019-09-19 06:23:26');