CREATE TABLE `settings` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `logo` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `zalo` varchar(255) NOT NULL,
  `facebook` varchar(255),
  `youtube` varchar(255),
  `map` varchar(255),
  `email_signup` varchar(255) NOT NULL,
  `email_password_app` varchar(255) NOT NULL
);

CREATE TABLE `subscribers` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `created_at` timestamp
);

CREATE TABLE `users` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `username` varchar(255) UNIQUE,
  `email` varchar(255) UNIQUE,
  `password` varchar(255),
  `role` varchar(255),
  `created_at` timestamp
);

CREATE TABLE `topic` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `created_at` timestamp
);

CREATE TABLE `posts` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `body` varchar(255) COMMENT 'Content of the post',
  `topic_id` int,
  `thumbnail` varchar(255),
  `user_id` integer,
  `status` varchar(255),
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `department` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `recruitment` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `body` varchar(255) COMMENT 'Content of the post',
  `department_id` int,
  `thumbnail` varchar(255),
  `user_id` integer,
  `time` varchar(255) DEFAULT 'fulltime',
  `status` varchar(255),
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `contact` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `business` varchar(255),
  `location` varchar(255) NOT NULL,
  `body` varchar(255) NOT NULL,
  `created_at` timestamp,
  `updated_at` timestamp,
  `status` varchar(255)
);

ALTER TABLE `posts` ADD FOREIGN KEY (`topic_id`) REFERENCES `topic` (`id`);

ALTER TABLE `posts` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `recruitment` ADD FOREIGN KEY (`department_id`) REFERENCES `department` (`id`);

ALTER TABLE `recruitment` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
