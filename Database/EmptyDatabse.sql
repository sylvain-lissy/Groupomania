/* Création de la base de données Groupomania */
DROP DATABASE IF EXISTS `groupomania`;
CREATE DATABASE IF NOT EXISTS `groupomania`;


/* Création de la table utilisateurs (Users) */
DROP TABLE IF EXISTS `groupomania`.`Users`;
CREATE TABLE IF NOT EXISTS `groupomania`.`Users` ( 
    `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT , 
    `user_name` VARCHAR(40) NOT NULL , 
    `user_email` VARCHAR(40) NOT NULL , 
    `user_password` VARCHAR(20) NOT NULL , 
    `user_role` INT NOT NULL DEFAULT '3' , 
    `user_dateInscription` DATE NOT NULL , 
    PRIMARY KEY (`user_id`), 
    UNIQUE `index_user_name` (`user_name`), 
    UNIQUE `index_user_email` (`user_email`),
    KEY `FK_user_role` (`user_role`)
) 
ENGINE = InnoDB;

/* Création de la table rôle (Roles) */
DROP TABLE IF EXISTS `groupomania`.`Roles`;
CREATE TABLE IF NOT EXISTS `groupomania`.`Roles` (
    `role_id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
    `role_name` VARCHAR(20) NOT NULL,
    PRIMARY KEY (`role_id`)
) 
ENGINE = InnoDB;

/* Ajout des rôles dans la table */
LOCK TABLES `groupomania`.`Roles` WRITE;
INSERT INTO `groupomania`.`Roles` (`role_id`, `role_name`) VALUES
    (1, 'Administrateur'),
    (2, 'Modérateur'),
    (3, 'Utilisateur');
UNLOCK TABLES;

/* Création de la table messages (Messages) */
DROP TABLE IF EXISTS `groupomania`.`Messages`;
CREATE TABLE IF NOT EXISTS `groupomania`.`Messages` ( 
    `message_id` INT UNSIGNED NOT NULL AUTO_INCREMENT , 
    `message_user` INT NOT NULL , 
    `message_date` DATE NOT NULL , 
    `message_content` TEXT NULL , 
    `message_image` VARCHAR(100) NULL , 
    `message_likes` INT NULL, 
    `message_dislikes` INT NULL, 
    `message_comments` JSON NULL,
    PRIMARY KEY (`message_id`),
    KEY `FK_message_user` (`message_user`) 
) 
ENGINE = InnoDB;

/* Création de la table commentaires (Comments) */
DROP TABLE IF EXISTS `groupomania`.`Comments`;
CREATE TABLE IF NOT EXISTS `groupomania`.`Comments` ( 
    `comment_id` INT UNSIGNED NOT NULL AUTO_INCREMENT , 
    `comment_user` INT NOT NULL , 
    `comment_message` INT NOT NULL , 
    `comment_content` TEXT NULL , 
    `comment_image` VARCHAR(100) NULL , 
    `comment_likes` INT NULL, 
    `comment_dislikes` INT NULL, 
    PRIMARY KEY (`comment_id`), 
    KEY `FK_comment_user` (`comment_user`),
    KEY `FK_comment_message` (`comment_message`)
) 
ENGINE = InnoDB;

/* Ajout des contraintes pour la table utilisateurs */
ALTER TABLE `groupomania`.`Users`
  ADD CONSTRAINT `FK_user_role` FOREIGN KEY (`user_role`) REFERENCES `groupomania`.`Roles` (`role_id`);

/* Ajout des contraintes pour la table messages */
ALTER TABLE `groupomania`.`Messages`
  ADD CONSTRAINT `FK_message_user` FOREIGN KEY (`message_user`) REFERENCES `groupomania`.`Users` (`user_id`);

/* Ajout des contraintes pour la table commentaires */
ALTER TABLE `groupomania`.`Comments`
  ADD CONSTRAINT `FK_comment_user` FOREIGN KEY (`comment_user`) REFERENCES `groupomania`.`Users` (`user_id`),
  ADD CONSTRAINT `FK_comment_message` FOREIGN KEY (`comment_message`) REFERENCES `groupomania`.`Messages` (`message_id`) ON DELETE CASCADE;

