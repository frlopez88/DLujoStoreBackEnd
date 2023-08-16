CREATE TABLE tbl_rol(
    id SERIAL NOT NULL,
    nombre_rol character varying(200),
    activo boolean DEFAULT true,
    PRIMARY KEY(id)
);

CREATE TABLE tbl_estado(
    id SERIAL NOT NULL,
    nombre_estado character varying(500),
    activo boolean DEFAULT true,
    PRIMARY KEY(id)
);

CREATE TABLE tbl_usuario(
    correo_electronico character varying(80) NOT NULL,
    nombre character varying(200),
    apellido character varying(200),
    foto bytea,
    id_estado integer,
    id_rol integer,
    contrasenia character varying(30),
    PRIMARY KEY(correo_electronico),
    CONSTRAINT fk_id_estado_1 FOREIGN key(id_estado) REFERENCES tbl_estado(id),CONSTRAINT fk_id_rol_1 FOREIGN key(id_rol) REFERENCES tbl_rol(id)
);

CREATE TABLE tbl_direcciones(
    id SERIAL NOT NULL,
    direccion character varying(1000),
    lat numeric,
    lon numeric,
    descripcion character varying(50),
    activo boolean DEFAULT true,
    correo_electronico character varying(80),
    PRIMARY KEY(id),
    CONSTRAINT fk_correo_electronico_1 FOREIGN key(correo_electronico) REFERENCES tbl_usuario(correo_electronico)
);

CREATE TABLE tbl_log_de_acciones(
    id SERIAL NOT NULL,
    descripcion character varying(1000),
    fecha timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE tbl_log_errores(
    id SERIAL NOT NULL,
    descripcion character varying(1000),
    proceso character varying(100),
    fecha timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

/*Ejemplos para llamar funciones y procedimientos almacenados*/

/*Procedimiento almacenado*/
call pdw_crear_cliente('fr@gmail.com', 'fernando lopez', 'Jesus');
/*Funcion*/
select * from fn_crear_cliente('fr@gmail.com', 'Fernando' ,'Lopez', 'Jesus');