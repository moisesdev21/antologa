CREATE DATABASE IF NOT EXISTS antologa;
USE antologa;

-- Tabla Users
CREATE TABLE Users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone_number VARCHAR(15),
  user_type ENUM('admin','customer','business') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Businesses
CREATE TABLE Businesses (
  business_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  business_name VARCHAR(255) NOT NULL,
  business_address VARCHAR(255),
  business_website VARCHAR(255),
  business_description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Tabla Categories
CREATE TABLE Categories (
  category_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Location
CREATE TABLE Location (
  location_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255),
  city VARCHAR(100),
  country VARCHAR(100),
  latitude DECIMAL(9,6),
  longitude DECIMAL(9,6),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Destinations
CREATE TABLE Destinations (
  destination_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  location_id INT,
  description TEXT,
  image_url VARCHAR(255),
  category_id INT,
  business_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES Categories(category_id),
  FOREIGN KEY (business_id) REFERENCES Businesses(business_id),
  FOREIGN KEY (location_id) REFERENCES Location(location_id)
);

-- Tabla Experiences
CREATE TABLE Experiences (
  experience_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  location VARCHAR(255),
  location_id INT,
  date DATE NOT NULL,
  category_id INT,
  business_id INT,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES Categories(category_id),
  FOREIGN KEY (business_id) REFERENCES Businesses(business_id),
  FOREIGN KEY (location_id) REFERENCES Location(location_id)
);

-- Tabla Payments
CREATE TABLE Payments (
  payment_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  amount DECIMAL(10,2) NOT NULL,
  payment_date DATE NOT NULL,
  status ENUM('Pending','Completed','Failed') DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Tabla Itinerary
CREATE TABLE Itinerary (
  itinerary_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  destination_id INT COMMENT 'NULL if booking an experience',
  experience_id INT COMMENT 'NULL if booking a destination',
  business_id INT,
  booking_date DATE NOT NULL,
  status ENUM('Pending','Confirmed','Cancelled') DEFAULT 'Pending',
  payment_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (destination_id) REFERENCES Destinations(destination_id),
  FOREIGN KEY (experience_id) REFERENCES Experiences(experience_id),
  FOREIGN KEY (business_id) REFERENCES Businesses(business_id),
  FOREIGN KEY (payment_id) REFERENCES Payments(payment_id)
);

-- Tabla Reviews
CREATE TABLE Reviews (
  review_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  destination_id INT COMMENT 'NULL if reviewing an experience',
  experience_id INT COMMENT 'NULL if reviewing a destination',
  business_id INT,
  rating INT COMMENT 'Rating should be between 1 and 5',
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (destination_id) REFERENCES Destinations(destination_id),
  FOREIGN KEY (experience_id) REFERENCES Experiences(experience_id),
  FOREIGN KEY (business_id) REFERENCES Businesses(business_id)
);

-- Tabla Articles
CREATE TABLE Articles (
  article_id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_id INT,
  publish_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('draft','published') DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'ON UPDATE CURRENT_TIMESTAMP',
  FOREIGN KEY (author_id) REFERENCES Users(user_id)
);

-- Tabla Images
CREATE TABLE Images (
  image_id INT PRIMARY KEY AUTO_INCREMENT,
  location_id INT NULL,
  destination_id INT NULL,
  experience_id INT NULL,
  url VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (location_id) REFERENCES Location(location_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (destination_id) REFERENCES Destinations(destination_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (experience_id) REFERENCES Experiences(experience_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Roles (
  role_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL, -- Ej: SuperAdmin, Editor, Moderador
  description TEXT
);

-- Relación Usuarios - Roles (permite múltiples roles por admin)
CREATE TABLE UserRoles (
  user_role_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  role_id INT NOT NULL,
  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (role_id) REFERENCES Roles(role_id)
);

-- Tabla de permisos por rol
CREATE TABLE Permissions (
  permission_id INT PRIMARY KEY AUTO_INCREMENT,
  role_id INT NOT NULL,
  module VARCHAR(100) NOT NULL, -- Ej: negocios, pagos, usuarios
  can_view BOOLEAN DEFAULT TRUE,
  can_edit BOOLEAN DEFAULT FALSE,
  can_delete BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (role_id) REFERENCES Roles(role_id)
);

-- Historial de actividad de admins
CREATE TABLE AdminLogs (
  log_id INT PRIMARY KEY AUTO_INCREMENT,
  admin_id INT NOT NULL,
  action VARCHAR(255) NOT NULL,
  target_type VARCHAR(100), -- Ej: "Negocio", "Usuario"
  target_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (admin_id) REFERENCES Users(user_id)
);

#BUSINESS DB (Negocios con planes de suscripción)
-- Tabla de Planes de Suscripción
CREATE TABLE SubscriptionPlans (
  plan_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL, -- Básico, Premium, etc.
  price DECIMAL(10,2) NOT NULL,
  duration_days INT NOT NULL,
  description TEXT
);

-- Tabla de Suscripciones activas de negocios
CREATE TABLE BusinessSubscriptions (
  subscription_id INT PRIMARY KEY AUTO_INCREMENT,
  business_id INT NOT NULL,
  plan_id INT NOT NULL,
  status ENUM('Activa','Vencida','Cancelada','Prueba') DEFAULT 'Prueba',
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  next_billing_date DATE,
  FOREIGN KEY (business_id) REFERENCES Businesses(business_id),
  FOREIGN KEY (plan_id) REFERENCES SubscriptionPlans(plan_id)
);

-- Historial de facturación
CREATE TABLE Invoices (
  invoice_id INT PRIMARY KEY AUTO_INCREMENT,
  subscription_id INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  status ENUM('Pagada','Pendiente','Fallida') DEFAULT 'Pendiente',
  issued_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  due_date DATE,
  FOREIGN KEY (subscription_id) REFERENCES BusinessSubscriptions(subscription_id)
);

-- Auditoría de negocios
CREATE TABLE BusinessAudits (
  audit_id INT PRIMARY KEY AUTO_INCREMENT,
  business_id INT NOT NULL,
  reason TEXT,
  status ENUM('Pendiente','Aprobado','Rechazado') DEFAULT 'Pendiente',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (business_id) REFERENCES Businesses(business_id)
);
#DESTINATIONS DB (Hospedajes)
ALTER TABLE Destinations 
ADD COLUMN type ENUM('Hospedaje','Atraccion') DEFAULT 'Atraccion',
ADD COLUMN price DECIMAL(10,2) NULL,
ADD COLUMN commission DECIMAL(5,2) DEFAULT 0.00,
ADD COLUMN verified BOOLEAN DEFAULT FALSE;

#EXPERIENCES DB (Moderación y Blog)
ALTER TABLE Experiences 
ADD COLUMN moderation_status ENUM('Pendiente','Aprobado','Rechazado','Reportado') DEFAULT 'Pendiente';


ALTER TABLE Businesses
ADD COLUMN status ENUM('pending','active','suspended') DEFAULT 'pending',
ADD COLUMN subscription_status ENUM('trial','active','expired') DEFAULT 'trial';


-- Tabla para reportes de experiencias
CREATE TABLE ExperienceReports (
  report_id INT PRIMARY KEY AUTO_INCREMENT,
  experience_id INT NOT NULL,
  user_id INT NOT NULL,
  reason TEXT,
  status ENUM('Pendiente','Revisado') DEFAULT 'Pendiente',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (experience_id) REFERENCES Experiences(experience_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Mejorar Articles (ya tienes)
ALTER TABLE Articles 
ADD COLUMN category VARCHAR(100),
ADD COLUMN tags VARCHAR(255);

#SALES & REVENUE
-- Conciliación de pagos
CREATE TABLE PaymentReconciliations (
  reconciliation_id INT PRIMARY KEY AUTO_INCREMENT,
  payment_id INT NOT NULL,
  business_id INT NOT NULL,
  status ENUM('Pendiente','Pagado','Error') DEFAULT 'Pendiente',
  reconciled_at TIMESTAMP NULL,
  FOREIGN KEY (payment_id) REFERENCES Payments(payment_id),
  FOREIGN KEY (business_id) REFERENCES Businesses(business_id)
);

-- Reportes fiscales
CREATE TABLE TaxReports (
  report_id INT PRIMARY KEY AUTO_INCREMENT,
  period VARCHAR(50), -- Ej: "2025-Q1"
  total_gmv DECIMAL(10,2),
  total_commission DECIMAL(10,2),
  total_taxes DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

#TRAFFIC & INSIGHTS
-- Geolocalización y actividad de usuarios
CREATE TABLE UserAnalytics (
  analytics_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  country VARCHAR(100),
  city VARCHAR(100),
  age INT,
  interests TEXT,
  activity_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Búsquedas fallidas
CREATE TABLE SearchLogs (
  search_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  search_term VARCHAR(255),
  results_found INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Registro de errores técnicos
CREATE TABLE ErrorLogs (
  error_id INT PRIMARY KEY AUTO_INCREMENT,
  module VARCHAR(100),
  message TEXT,
  severity ENUM('Info','Warning','Critical') DEFAULT 'Info',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================
-- 1. USERS & ROLES
-- ========================
INSERT INTO Users (name, email, password, phone_number, user_type) VALUES
('Kevin Serrano', 'kevin@correo.com', '123456', '60000000', 'admin'),
('Laura Gómez', 'laura@correo.com', '123456', '60000001', 'admin'),
('Carlos Pérez', 'carlos@correo.com', '123456', '60000002', 'customer'),
('María López', 'maria@correo.com', '123456', '60000003', 'customer'),
('Jorge Díaz', 'jorge@correo.com', '123456', '60000004', 'business');

INSERT INTO Roles (name, description) VALUES
('SuperAdmin', 'Acceso total al sistema'),
('Admin', 'Gestión de negocios y usuarios'),
('Editor', 'Gestión de contenido'),
('Moderador', 'Revisión de experiencias');

-- Relación usuarios-roles
INSERT INTO UserRoles (user_id, role_id) VALUES
(1, 1), -- Kevin → SuperAdmin
(2, 2); -- Laura → Admin

-- ========================
-- 2. CATEGORIES
-- ========================
INSERT INTO Categories (name, description) VALUES
('Playa', 'Destinos y experiencias en la playa'),
('Montaña', 'Destinos y experiencias en la montaña'),
('Cultura', 'Experiencias culturales y patrimoniales');

-- ========================
-- 3. LOCATIONS
-- ========================
INSERT INTO Location (name, address, city, country, latitude, longitude) VALUES
('Bocas del Toro', 'Isla Colón', 'Bocas del Toro', 'Panamá', 9.3400, -82.2400),
('Boquete', 'Calle Principal', 'Boquete', 'Panamá', 8.7800, -82.4300),
('San Blas', 'Isla Perro', 'Guna Yala', 'Panamá', 9.5700, -78.8300);

-- ========================
-- 4. BUSINESSES
-- ========================
INSERT INTO Businesses (user_id, business_name, business_address, business_website, business_description) VALUES
(5, 'Hotel Paraíso', 'Av. Costera 123', 'http://hotelparaiso.com', 'Hotel frente al mar con todo incluido'),
(5, 'Restaurante El Sabor', 'Calle Central 45', 'http://elsabor.com', 'Comida típica panameña'),
(5, 'Tours Panamá Aventura', 'Calle Viaje 89', 'http://panamaaventura.com', 'Agencia de tours y excursiones');

-- ========================
-- 5. DESTINATIONS
-- ========================
INSERT INTO Destinations (name, location, location_id, description, image_url, category_id, business_id, type, price, commission, verified) VALUES
('Bocas del Toro', 'Isla Colón', 1, 'Playas paradisíacas con agua cristalina', 'http://imagenes.com/bocas.jpg', 1, 1, 'Hospedaje', 150.00, 10.00, TRUE),
('Boquete', 'Calle Principal', 2, 'Montaña y plantaciones de café', 'http://imagenes.com/boquete.jpg', 2, 3, 'Atraccion', 50.00, 5.00, TRUE),
('San Blas', 'Isla Perro', 3, 'Archipiélago cultural Guna Yala', 'http://imagenes.com/sanblas.jpg', 3, 3, 'Atraccion', 100.00, 8.00, FALSE);

-- ========================
-- 6. EXPERIENCES
-- ========================
INSERT INTO Experiences (name, description, price, location, location_id, date, category_id, business_id, image_url, moderation_status) VALUES
('Snorkel en Bocas', 'Explora arrecifes y vida marina', 120.00, 'Isla Colón', 1, '2025-10-10', 1, 3, 'http://imagenes.com/snorkel.jpg', 'Aprobado'),
('Tour de café en Boquete', 'Aprende sobre el café desde la finca hasta la taza', 75.00, 'Calle Principal', 2, '2025-10-15', 2, 3, 'http://imagenes.com/cafe.jpg', 'Pendiente'),
('Visita cultural en San Blas', 'Conoce la cultura Guna Yala', 95.00, 'Isla Perro', 3, '2025-11-05', 3, 3, 'http://imagenes.com/cultural.jpg', 'Aprobado');

-- ========================
-- 7. PAYMENTS
-- ========================
INSERT INTO Payments (user_id, amount, payment_date, status) VALUES
(3, 120.50, '2025-09-01', 'Completed'),
(4, 85.00, '2025-09-05', 'Pending'),
(3, 200.00, '2025-09-10', 'Completed');

-- ========================
-- 8. ITINERARY
-- ========================
INSERT INTO Itinerary (user_id, destination_id, experience_id, business_id, booking_date, status, payment_id) VALUES
(3, 1, NULL, 1, '2025-09-01', 'Confirmed', 1),
(4, NULL, 2, 3, '2025-09-05', 'Pending', 2),
(3, 2, 1, 3, '2025-09-10', 'Confirmed', 3);

-- ========================
-- 9. REVIEWS
-- ========================
INSERT INTO Reviews (user_id, destination_id, experience_id, business_id, rating, comment) VALUES
(3, 1, NULL, 1, 5, 'Excelente lugar para vacacionar'),
(4, NULL, 2, 3, 4, 'Muy interesante el tour de café'),
(3, NULL, 1, 3, 5, 'Snorkel impresionante');

-- ========================
-- 10. ARTICLES
-- ========================
INSERT INTO Articles (title, content, author_id, status, category, tags) VALUES
('Guía de viaje a Bocas del Toro', 'Contenido sobre qué hacer en Bocas', 1, 'published', 'Playa', 'bocas, playa, snorkel'),
('El café de Boquete', 'Historia y experiencias de café', 2, 'draft', 'Montaña', 'boquete, café'),
('Cultura Guna Yala', 'Tradiciones y costumbres de San Blas', 2, 'published', 'Cultura', 'san blas, guna, cultura');

-- ========================
-- 11. IMAGES
-- ========================
INSERT INTO Images (location_id, destination_id, experience_id, url, description) VALUES
(1, 1, NULL, 'http://imagenes.com/bocas1.jpg', 'Vista aérea de Bocas'),
(2, 2, NULL, 'http://imagenes.com/boquete1.jpg', 'Paisaje montañoso'),
(3, 3, 3, 'http://imagenes.com/sanblas1.jpg', 'Isla Guna Yala'),
(NULL, NULL, 1, 'http://imagenes.com/snorkel2.jpg', 'Turistas haciendo snorkel');

-- ========================
-- 12. SUBSCRIPTION PLANS
-- ========================
INSERT INTO SubscriptionPlans (name, price, duration_days, description) VALUES
('Básico', 49.99, 30, 'Acceso básico al marketplace'),
('Premium', 99.99, 90, 'Mayor visibilidad y más reservas'),
('Elite', 199.99, 180, 'Beneficios exclusivos y promoción destacada');

-- ========================
-- 13. BUSINESS SUBSCRIPTIONS
-- ========================
INSERT INTO BusinessSubscriptions (business_id, plan_id, status, start_date, end_date, next_billing_date) VALUES
(1, 2, 'Activa', '2025-09-01', '2025-12-01', '2025-12-01'),
(2, 1, 'Prueba', '2025-09-15', '2025-10-15', '2025-10-15');

-- ========================
-- 14. INVOICES
-- ========================
INSERT INTO Invoices (subscription_id, amount, status, due_date) VALUES
(1, 99.99, 'Pagada', '2025-12-01'),
(2, 49.99, 'Pendiente', '2025-10-15');

-- ========================
-- 15. BUSINESS AUDITS
-- ========================
INSERT INTO BusinessAudits (business_id, reason, status) VALUES
(1, 'Verificación de documentos', 'Aprobado'),
(2, 'Revisión de reputación', 'Pendiente');

-- ========================
-- 16. EXPERIENCE REPORTS
-- ========================
INSERT INTO ExperienceReports (experience_id, user_id, reason, status) VALUES
(2, 3, 'El tour estaba mal organizado', 'Pendiente');

-- ========================
-- 17. PAYMENT RECONCILIATIONS
-- ========================
INSERT INTO PaymentReconciliations (payment_id, business_id, status) VALUES
(1, 1, 'Pagado'),
(2, 3, 'Pendiente');

-- ========================
-- 18. TAX REPORTS
-- ========================
INSERT INTO TaxReports (period, total_gmv, total_commission, total_taxes) VALUES
('2025-Q3', 5000.00, 500.00, 300.00);

-- ========================
-- 19. USER ANALYTICS
-- ========================
INSERT INTO UserAnalytics (user_id, country, city, age, interests) VALUES
(3, 'Panamá', 'Ciudad de Panamá', 28, 'playa, snorkel, cultura'),
(4, 'Panamá', 'Boquete', 35, 'montaña, café');

-- ========================
-- 20. SEARCH LOGS
-- ========================
INSERT INTO SearchLogs (user_id, search_term, results_found) VALUES
(3, 'Bocas del Toro', 5),
(4, 'Boquete café', 3),
(4, 'Disneyland', 0);

-- ========================
-- 21. ERROR LOGS
-- ========================
INSERT INTO ErrorLogs (module, message, severity) VALUES
('Auth', 'Error de inicio de sesión', 'Warning'),
('Pagos', 'Error al procesar pago #2', 'Critical');



use antologa;
-- adicionales prueba
INSERT INTO Users (name, email, password, phone_number, user_type) 
VALUES ('Ana Torres', 'ana@negocio.com', '123456', '60000005', 'business');

INSERT INTO Businesses (user_id, business_name, business_address, business_website, business_description) 
VALUES (6, 'EcoTours Panamá', 'Av. Verde 101', 'http://ecotourspanama.com', 'Agencia de turismo ecológico y sostenible');

INSERT INTO BusinessSubscriptions (business_id, plan_id, status, start_date, end_date, next_billing_date) 
VALUES (4, 1, 'Activa', '2025-10-02', '2025-11-02', '2025-11-02');