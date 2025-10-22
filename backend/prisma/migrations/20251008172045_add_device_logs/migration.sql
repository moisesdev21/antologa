-- CreateTable
CREATE TABLE `customers` (
    `customer_id` INTEGER NOT NULL AUTO_INCREMENT,
    `last_name` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `nametag` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `customers_nametag_key`(`nametag`),
    UNIQUE INDEX `customers_email_key`(`email`),
    PRIMARY KEY (`customer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `businessusers` (
    `business_user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `last_name` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `nametag` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `businessusers_nametag_key`(`nametag`),
    UNIQUE INDEX `businessusers_email_key`(`email`),
    PRIMARY KEY (`business_user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admins` (
    `admin_id` INTEGER NOT NULL AUTO_INCREMENT,
    `last_name` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `nametag` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `admins_nametag_key`(`nametag`),
    UNIQUE INDEX `admins_email_key`(`email`),
    PRIMARY KEY (`admin_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `businesses` (
    `business_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `business_name` VARCHAR(191) NOT NULL,
    `business_address` VARCHAR(191) NULL,
    `business_website` VARCHAR(191) NULL,
    `business_description` VARCHAR(191) NULL,
    `status` ENUM('pending', 'active', 'suspended') NOT NULL DEFAULT 'pending',
    `subscription_status` ENUM('trial', 'active', 'expired') NOT NULL DEFAULT 'trial',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`business_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `category_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `location` (
    `location_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `country` VARCHAR(191) NULL,
    `latitude` DOUBLE NULL,
    `longitude` DOUBLE NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`location_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `destinations` (
    `destination_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NULL,
    `location_id` INTEGER NULL,
    `description` VARCHAR(191) NULL,
    `image_url` VARCHAR(191) NULL,
    `category_id` INTEGER NULL,
    `business_id` INTEGER NULL,
    `type` ENUM('Hospedaje', 'Atraccion') NOT NULL DEFAULT 'Atraccion',
    `price` DOUBLE NULL,
    `commission` DOUBLE NOT NULL DEFAULT 0.00,
    `verified` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`destination_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `experiences` (
    `experience_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `price` DOUBLE NOT NULL,
    `location` VARCHAR(191) NULL,
    `location_id` INTEGER NULL,
    `date` DATETIME(3) NOT NULL,
    `category_id` INTEGER NULL,
    `business_id` INTEGER NULL,
    `image_url` VARCHAR(191) NULL,
    `moderation_status` ENUM('Pendiente', 'Aprobado', 'Rechazado', 'Reportado') NOT NULL DEFAULT 'Pendiente',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`experience_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payments` (
    `payment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `business_id` INTEGER NULL,
    `amount` DOUBLE NOT NULL,
    `payment_date` DATETIME(3) NOT NULL,
    `status` ENUM('Pending', 'Completed', 'Failed', 'Confirmed') NOT NULL DEFAULT 'Pending',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`payment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `itinerary` (
    `itinerary_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `destination_id` INTEGER NULL,
    `experience_id` INTEGER NULL,
    `business_id` INTEGER NULL,
    `booking_date` DATETIME(3) NOT NULL,
    `status` ENUM('Pending', 'Confirmed', 'Cancelled') NOT NULL DEFAULT 'Pending',
    `payment_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`itinerary_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reviews` (
    `review_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `destination_id` INTEGER NULL,
    `experience_id` INTEGER NULL,
    `business_id` INTEGER NULL,
    `rating` INTEGER NOT NULL,
    `comment` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`review_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `articles` (
    `article_id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `author_id` INTEGER NOT NULL,
    `category` VARCHAR(191) NULL,
    `tags` VARCHAR(191) NULL,
    `publish_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`article_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `images` (
    `image_id` INTEGER NOT NULL AUTO_INCREMENT,
    `location_id` INTEGER NULL,
    `destination_id` INTEGER NULL,
    `experience_id` INTEGER NULL,
    `url` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`image_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `role_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userroles` (
    `user_role_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `role_id` INTEGER NOT NULL,
    `assigned_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`user_role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permissions` (
    `permission_id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_id` INTEGER NOT NULL,
    `module` VARCHAR(191) NOT NULL,
    `can_view` BOOLEAN NOT NULL DEFAULT true,
    `can_edit` BOOLEAN NOT NULL DEFAULT false,
    `can_delete` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`permission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `adminlogs` (
    `log_id` INTEGER NOT NULL AUTO_INCREMENT,
    `admin_id` INTEGER NOT NULL,
    `action` VARCHAR(191) NOT NULL,
    `target_type` VARCHAR(191) NULL,
    `target_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`log_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscriptionplans` (
    `plan_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `duration_days` INTEGER NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`plan_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `businesssubscriptions` (
    `subscription_id` INTEGER NOT NULL AUTO_INCREMENT,
    `business_id` INTEGER NOT NULL,
    `plan_id` INTEGER NOT NULL,
    `status` ENUM('Activa', 'Vencida', 'Cancelada', 'Prueba') NOT NULL DEFAULT 'Prueba',
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,
    `next_billing_date` DATETIME(3) NULL,

    PRIMARY KEY (`subscription_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoices` (
    `invoice_id` INTEGER NOT NULL AUTO_INCREMENT,
    `subscription_id` INTEGER NOT NULL,
    `amount` DOUBLE NOT NULL,
    `status` ENUM('Pagada', 'Pendiente', 'Fallida') NOT NULL DEFAULT 'Pendiente',
    `issued_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `due_date` DATETIME(3) NULL,

    PRIMARY KEY (`invoice_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `businessaudits` (
    `audit_id` INTEGER NOT NULL AUTO_INCREMENT,
    `business_id` INTEGER NOT NULL,
    `reason` VARCHAR(191) NULL,
    `status` ENUM('Pendiente', 'Aprobado', 'Rechazado') NOT NULL DEFAULT 'Pendiente',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`audit_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `experiencereports` (
    `report_id` INTEGER NOT NULL AUTO_INCREMENT,
    `experience_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `reason` VARCHAR(191) NULL,
    `status` ENUM('Pendiente', 'Revisado') NOT NULL DEFAULT 'Pendiente',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`report_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `paymentreconciliations` (
    `reconciliation_id` INTEGER NOT NULL AUTO_INCREMENT,
    `payment_id` INTEGER NOT NULL,
    `business_id` INTEGER NOT NULL,
    `status` ENUM('Pendiente', 'Pagado', 'Error') NOT NULL DEFAULT 'Pendiente',
    `reconciled_at` DATETIME(3) NULL,

    PRIMARY KEY (`reconciliation_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `taxreports` (
    `report_id` INTEGER NOT NULL AUTO_INCREMENT,
    `period` VARCHAR(191) NULL,
    `total_gmv` DOUBLE NULL,
    `total_commission` DOUBLE NULL,
    `total_taxes` DOUBLE NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`report_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `useranalytics` (
    `analytics_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `country` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `age` INTEGER NULL,
    `interests` VARCHAR(191) NULL,
    `activity_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`analytics_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `searchlogs` (
    `search_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `search_term` VARCHAR(191) NULL,
    `results_found` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`search_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `errorlogs` (
    `error_id` INTEGER NOT NULL AUTO_INCREMENT,
    `module` VARCHAR(191) NULL,
    `message` VARCHAR(191) NULL,
    `severity` ENUM('Info', 'Warning', 'Critical') NOT NULL DEFAULT 'Info',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`error_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `devicelogs` (
    `device_log_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `ip_address` VARCHAR(191) NOT NULL,
    `user_agent` VARCHAR(500) NOT NULL,
    `device_type` VARCHAR(191) NOT NULL,
    `browser` VARCHAR(191) NOT NULL,
    `os` VARCHAR(191) NOT NULL,
    `is_bot` BOOLEAN NOT NULL DEFAULT false,
    `country` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `language` VARCHAR(191) NULL,
    `environment` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `devicelogs_created_at_idx`(`created_at`),
    INDEX `devicelogs_device_type_idx`(`device_type`),
    INDEX `devicelogs_environment_idx`(`environment`),
    PRIMARY KEY (`device_log_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `businesses` ADD CONSTRAINT `businesses_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `businessusers`(`business_user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `destinations` ADD CONSTRAINT `destinations_location_id_fkey` FOREIGN KEY (`location_id`) REFERENCES `location`(`location_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `destinations` ADD CONSTRAINT `destinations_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`category_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `destinations` ADD CONSTRAINT `destinations_business_id_fkey` FOREIGN KEY (`business_id`) REFERENCES `businesses`(`business_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `experiences` ADD CONSTRAINT `experiences_location_id_fkey` FOREIGN KEY (`location_id`) REFERENCES `location`(`location_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `experiences` ADD CONSTRAINT `experiences_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`category_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `experiences` ADD CONSTRAINT `experiences_business_id_fkey` FOREIGN KEY (`business_id`) REFERENCES `businesses`(`business_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `customers`(`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_business_id_fkey` FOREIGN KEY (`business_id`) REFERENCES `businesses`(`business_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `itinerary` ADD CONSTRAINT `itinerary_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `customers`(`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `itinerary` ADD CONSTRAINT `itinerary_destination_id_fkey` FOREIGN KEY (`destination_id`) REFERENCES `destinations`(`destination_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `itinerary` ADD CONSTRAINT `itinerary_experience_id_fkey` FOREIGN KEY (`experience_id`) REFERENCES `experiences`(`experience_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `itinerary` ADD CONSTRAINT `itinerary_business_id_fkey` FOREIGN KEY (`business_id`) REFERENCES `businesses`(`business_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `itinerary` ADD CONSTRAINT `itinerary_payment_id_fkey` FOREIGN KEY (`payment_id`) REFERENCES `payments`(`payment_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `customers`(`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_destination_id_fkey` FOREIGN KEY (`destination_id`) REFERENCES `destinations`(`destination_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_experience_id_fkey` FOREIGN KEY (`experience_id`) REFERENCES `experiences`(`experience_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_business_id_fkey` FOREIGN KEY (`business_id`) REFERENCES `businesses`(`business_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `articles` ADD CONSTRAINT `articles_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `admins`(`admin_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `images` ADD CONSTRAINT `images_location_id_fkey` FOREIGN KEY (`location_id`) REFERENCES `location`(`location_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `images` ADD CONSTRAINT `images_destination_id_fkey` FOREIGN KEY (`destination_id`) REFERENCES `destinations`(`destination_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `images` ADD CONSTRAINT `images_experience_id_fkey` FOREIGN KEY (`experience_id`) REFERENCES `experiences`(`experience_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userroles` ADD CONSTRAINT `userroles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `admins`(`admin_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userroles` ADD CONSTRAINT `userroles_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles`(`role_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `permissions` ADD CONSTRAINT `permissions_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles`(`role_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `adminlogs` ADD CONSTRAINT `adminlogs_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `admins`(`admin_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `businesssubscriptions` ADD CONSTRAINT `businesssubscriptions_business_id_fkey` FOREIGN KEY (`business_id`) REFERENCES `businesses`(`business_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `businesssubscriptions` ADD CONSTRAINT `businesssubscriptions_plan_id_fkey` FOREIGN KEY (`plan_id`) REFERENCES `subscriptionplans`(`plan_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_subscription_id_fkey` FOREIGN KEY (`subscription_id`) REFERENCES `businesssubscriptions`(`subscription_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `businessaudits` ADD CONSTRAINT `businessaudits_business_id_fkey` FOREIGN KEY (`business_id`) REFERENCES `businesses`(`business_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `experiencereports` ADD CONSTRAINT `experiencereports_experience_id_fkey` FOREIGN KEY (`experience_id`) REFERENCES `experiences`(`experience_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `experiencereports` ADD CONSTRAINT `experiencereports_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `customers`(`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `paymentreconciliations` ADD CONSTRAINT `paymentreconciliations_payment_id_fkey` FOREIGN KEY (`payment_id`) REFERENCES `payments`(`payment_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `paymentreconciliations` ADD CONSTRAINT `paymentreconciliations_business_id_fkey` FOREIGN KEY (`business_id`) REFERENCES `businesses`(`business_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `useranalytics` ADD CONSTRAINT `useranalytics_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `customers`(`customer_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `searchlogs` ADD CONSTRAINT `searchlogs_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `customers`(`customer_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `devicelogs` ADD CONSTRAINT `devicelogs_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `customers`(`customer_id`) ON DELETE SET NULL ON UPDATE CASCADE;
