CREATE TABLE IF NOT EXISTS persona (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(150) NOT NULL,
  ciudad VARCHAR(100) NOT NULL,
  foto VARCHAR(500) NOT NULL,
  email VARCHAR(255) NOT NULL,
  github VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS formacion (
  id INT PRIMARY KEY AUTO_INCREMENT,
  titulo VARCHAR(200) NOT NULL,
  institucion VARCHAR(200) NOT NULL,
  anio VARCHAR(100) NOT NULL,
  persona_id INT NOT NULL,
  CONSTRAINT fk_formacion_persona
    FOREIGN KEY (persona_id) REFERENCES persona(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

INSERT INTO persona (id, nombre, apellido, ciudad, foto, email, github)
VALUES (
  1,
  'Brigith Kasandra',
  'Espinoza Padilla',
  'La Paz',
  '/bri-profile-photo.jpeg',
  'brigith.espinozap@gmail.com',
  'https://github.com/Bri2327/'
)
ON DUPLICATE KEY UPDATE
  nombre = VALUES(nombre),
  apellido = VALUES(apellido),
  ciudad = VALUES(ciudad),
  foto = VALUES(foto),
  email = VALUES(email),
  github = VALUES(github);

DELETE FROM formacion WHERE persona_id = 1;

INSERT INTO formacion (titulo, institucion, anio, persona_id)
VALUES
  ('Ingenieria de Sistemas', 'Escuela Militar de Ingenieria', 'Titulada', 1),
  ('Diplomado en Machine Learning y Ciencia de Datos', 'Universidad Privada Boliviana', '2025 - Actualidad', 1),
  ('Diplomado en FullStack Developer Backend y Frontend', 'Universidad Simon I. Patino', '2025 - Actualidad', 1),
  ('Colegio Secundario', 'Colegio San Luis', 'Bachiller en Humanidades', 1),
  ('Responsabilidad por la Función Publica', 'CENCAP', '2025', 1),
  ('Ley N° 1178', 'CENCAP', '2024', 1),
  ('Politicas Publicas', 'CENCAP', '2024', 1),
  ('Ciberseguridad basado en la norma ISO/IEC 27032', 'IBNORCA', '2024', 1),
  ('Power BI V 18.0 Basico y Experto', 'JR Soft Technology', '2024', 1),
  ('Inteligencia de Negocios con Power BI', 'Universidad Mayor de San Andres', '2021', 1),
  ('Ensamblaje y Configuracion de PCs y Laptops', 'INFOCAL', '2022', 1),
  ('Servidores Cisco UCS', 'LEARNCISC', '2018', 1);
