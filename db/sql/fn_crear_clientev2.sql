CREATE or replace FUNCTION fn_crear_clientev2( p_correo varchar , p_nombre varchar, p_apellido varchar, p_contrasenia varchar) 
RETURNS  table 
                (   
                    exito bool, 
                    mensaje varchar(1000), 
                    id_registo varchar(100)
                )
   AS $$


DECLARE

    v_exito bool := true;
    v_mensaje varchar(1000);

BEGIN

    v_mensaje := 'Error en creacion de usuario '||p_correo;

    insert into tbl_usuario
    (correo_electronico, nombre, apellido, contrasenia, id_rol, id_estado)
    values 
    (p_correo , p_nombre, p_apellido , p_contrasenia, 2, 2 ) ;


    v_mensaje := 'Error en la insercion del log';

    insert into tbl_log_de_acciones
    (descripcion)
    values
    ('Se crea el usuario '||p_correo );


    v_mensaje := 'Operación Exitosa';
    return query select v_exito, p_correo, v_mensaje;


EXCEPTION when OTHERS then 

    insert into tbl_log_errores
    ( descripcion, proceso)
    values 
    (v_mensaje ||' - '|| SQLERRM , 'fn_crear_clientev2'  );

    v_exito := false; 
    v_mensaje := 'Operación Erronea - '||SQLERRM;

    return query select v_exito,  v_mensaje, p_correo;

    
END;
$$ LANGUAGE plpgsql;