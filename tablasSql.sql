create DATABASE dlujostore;


-- Active: 1689640455352@@127.0.0.1@5432@dlujostore@public
create table tbl_estado (

    id SERIAL PRIMARY key, 
    nombre_estado varchar(500), 
    activo boolean DEFAULT true

);

create table tbl_rol (

    id serial PRIMARY key,
    nombre_rol VARCHAR(200), 
    activo boolean DEFAULT true
);

create table tbl_usuario (

    correo_electronico varchar(80) primary key, 
    nombre varchar(200), 
    apellido varchar(200), 
    foto bytea, 
    id_estado int, 
    id_rol int,
    contrasenia varchar(30), 
    constraint fk_id_rol_1 foreign key (id_rol) references tbl_rol(id), 
    constraint fk_id_estado_1 foreign key (id_estado) references tbl_estado(id)

);

create table tbl_direcciones (

    id serial primary key, 
    direccion varchar(1000), 
    lat numeric, 
    lon numeric,
    descripcion varchar(50), 
    activo BOOLEAN DEFAULT true,
    correo_electronico varchar(80), 
    constraint fk_correo_electronico_1 Foreign Key (correo_electronico) REFERENCES tbl_usuario(correo_electronico)
);


select * from tbl_estado;