CREATE or replace FUNCTION fn_actualizar_clientev2( p_correo varchar , p_nombre varchar, p_apellido varchar, p_contrasenia varchar) 
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

    v_mensaje := 'Error en actualizar de usuario '||p_correo;

    update tbl_usuario 
    set nombre = p_nombre, 
        apellido = p_apellido,
        contrasenia = p_contrasenia 
    where correo_electronico = p_correo;


    v_mensaje := 'Error en la insercion del log';

    insert into tbl_log_de_acciones
    (descripcion)
    values
    ('Se actualizar el usuario '||p_correo );


    v_mensaje := 'Operación Exitosa';
    return query select v_exito, p_correo, v_mensaje;


EXCEPTION when OTHERS then 

    insert into tbl_log_errores
    ( descripcion, proceso)
    values 
    (v_mensaje ||' - '|| SQLERRM , 'fn_actualizar_clientev2'  );

    v_exito := false; 
    v_mensaje := 'Operación Erronea - '||SQLERRM;

    return query select v_exito,  v_mensaje, p_correo;

    
END;
$$ LANGUAGE plpgsql;