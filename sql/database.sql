CREATE TABLE clients (
	id INT(11) NOT NULL AUTO_INCREMENT,
	name VARCHAR(60) NOT NULL,
	lastname VARCHAR(60) NOT NULL,
	phone VARCHAR(10) NOT NULL,
	email VARCHAR(30) NOT NULL UNIQUE,
	PRIMARY KEY (id)
);

CREATE TABLE services (
	id INT(11) NOT NULL AUTO_INCREMENT,
	name VARCHAR(60) NOT NULL,
	price DECIMAL(5, 2) NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE appointments (
	id INT(11) NOT NULL AUTO_INCREMENT,
	fecha DATE NOT NULL,
	hour TIME NOT NULL,
	idClient INT(11) NOT NULL,
	PRIMARY KEY (id),
	KEY idClient (idClient),
	CONSTRAINT FK_client FOREIGN KEY (idClient) REFERENCES clients (id)
);

CREATE TABLE appointmentsServices (
	id INT(11) AUTO_INCREMENT,
	appointmentId INT(11) NOT NULL,
	servicesId INT(11) NOT NULL,
	PRIMARY KEY (id),
	KEY appointmentId (appointmentId),
	CONSTRAINT FK_appointment FOREIGN KEY (appointmentId) REFERENCES appointments (id),
	KEY servicesId (servicesId),
	CONSTRAINT FK_services FOREIGN KEY (servicesId) REFERENCES services (id)
);

INSERT INTO services ( name, price ) VALUES
        ('Corte de Cabello Niño', 60),
        ('Corte de Cabello Hombre', 80),
        ('Corte de Barba', 60),
        ('Peinado Mujer', 80),
        ('Peinado Hombre', 60),
        ('Tinte',300),
        ('Uñas', 400),
        ('Lavado de Cabello', 50),
        ('Tratamiento Capilar', 150);

INSERT INTO clients (name, lastname, phone, email) VALUES
("Camilo","Quintero Guarin", "3013129898","camiloquintero@gmail.com");

INSERT INTO appointments (fecha, hour, idClient) VALUES
('2021-06-28','10:30:00',1);

INSERT INTO appointmentsServices (appointmentId, servicesId) VALUES 
(1, 2);

SELECT * FROM appointmentsServices
LEFT JOIN appointments ON appointments.id = appointmentsServices.appointmentId
LEFT JOIN services ON services.id = appointmentsServices.servicesId;

INSERT INTO appointmentsServices (appointmentId, servicesId) VALUES 
(1, 3);

INSERT INTO appointmentsServices (appointmentId, servicesId) VALUES 
(1, 4);

SELECT * FROM appointmentsServices
LEFT JOIN appointments ON appointments.id = appointmentsServices.appointmentId
LEFT JOIN clients ON appointments.idClient = clients.id
LEFT JOIN services ON services.id = appointmentsServices.servicesId;