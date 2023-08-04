-- Active: 1689640455352@@127.0.0.1@5432@dlujostore@public
CREATE or replace PROCEDURE pdw_crear_cliente(  p_correo varchar , p_nombre varchar, p_contrasenia varchar )
LANGUAGE plpgsql
as $$

declare

    v_error varchar(1000);

begin 


    v_error := 'Error en creacion de usuario '||p_correo;

    insert into tbl_usuario
    (correo_electronico, nombre, contrasenia, id_rol)
    values 
    (p_correo , p_nombre, p_contrasenia, 2 );


    v_error := 'Error en la insercion del log';

    insert into tbl_log_de_acciones
    (descripcion)
    values
    ('Se crea el usuario '||p_correo );


EXCEPTION when OTHERS then 

    insert into tbl_log_errores
    ( descripcion, proceso)
    values 
    (v_error ||' - '|| SQLERRM , 'pdw_crear_cliente'  );



end;
$$;