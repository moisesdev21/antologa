CREATE TABLE `Users` (
  `user_id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `phone_number` VARCHAR(15),
  `user_type` role ENUM(admin,customer,business) NOT NULL,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `Businesses` (
  `business_id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT,
  `business_name` VARCHAR(255) NOT NULL,
  `business_address` VARCHAR(255),
  `business_website` VARCHAR(255),
  `business_description` TEXT,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `Destinations` (
  `destination_id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `location` VARCHAR(255),
  `description` TEXT,
  `image_url` VARCHAR(255),
  `category_id` INT,
  `business_id` INT,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `Experiences` (
  `experience_id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `price` DECIMAL(10,2) NOT NULL,
  `location` VARCHAR(255),
  `date` DATE NOT NULL,
  `category_id` INT,
  `business_id` INT,
  `image_url` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `Categories` (
  `category_id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `Payments` (
  `payment_id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT,
  `amount` DECIMAL(10,2) NOT NULL,
  `payment_date` DATE NOT NULL,
  `status` ENUM(Pending,Completed,Failed) DEFAULT 'Pending',
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `Itinerary` (
  `itinerary_id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT,
  `destination_id` INT COMMENT 'NULL if booking an experience',
  `experience_id` INT COMMENT 'NULL if booking a destination',
  `business_id` INT,
  `booking_date` DATE NOT NULL,
  `status` ENUM(Pending,Confirmed,Cancelled) DEFAULT 'Pending',
  `payment_id` INT,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `Reviews` (
  `review_id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT,
  `destination_id` INT COMMENT 'NULL if reviewing an experience',
  `experience_id` INT COMMENT 'NULL if reviewing a destination',
  `business_id` INT,
  `rating` INT COMMENT 'Rating should be between 1 and 5',
  `comment` TEXT,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `Articles` (
  `article_id` INT PRIMARY KEY AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `content` TEXT NOT NULL,
  `author_id` INT,
  `publish_date` DATE DEFAULT (CURRENT_DATE),
  `status` ENUM(draft,published) DEFAULT 'draft',
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP) COMMENT 'ON UPDATE CURRENT_TIMESTAMP'
);

ALTER TABLE `Businesses` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`);

ALTER TABLE `Destinations` ADD FOREIGN KEY (`category_id`) REFERENCES `Categories` (`category_id`);

ALTER TABLE `Destinations` ADD FOREIGN KEY (`business_id`) REFERENCES `Businesses` (`business_id`);

ALTER TABLE `Experiences` ADD FOREIGN KEY (`category_id`) REFERENCES `Categories` (`category_id`);

ALTER TABLE `Experiences` ADD FOREIGN KEY (`business_id`) REFERENCES `Businesses` (`business_id`);

ALTER TABLE `Payments` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`);

ALTER TABLE `Itinerary` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`);

ALTER TABLE `Itinerary` ADD FOREIGN KEY (`destination_id`) REFERENCES `Destinations` (`destination_id`);

ALTER TABLE `Itinerary` ADD FOREIGN KEY (`experience_id`) REFERENCES `Experiences` (`experience_id`);

ALTER TABLE `Itinerary` ADD FOREIGN KEY (`business_id`) REFERENCES `Businesses` (`business_id`);

ALTER TABLE `Itinerary` ADD FOREIGN KEY (`payment_id`) REFERENCES `Payments` (`payment_id`);

ALTER TABLE `Reviews` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`);

ALTER TABLE `Reviews` ADD FOREIGN KEY (`destination_id`) REFERENCES `Destinations` (`destination_id`);

ALTER TABLE `Reviews` ADD FOREIGN KEY (`experience_id`) REFERENCES `Experiences` (`experience_id`);

ALTER TABLE `Reviews` ADD FOREIGN KEY (`business_id`) REFERENCES `Businesses` (`business_id`);

ALTER TABLE `Articles` ADD FOREIGN KEY (`author_id`) REFERENCES `Users` (`user_id`);
