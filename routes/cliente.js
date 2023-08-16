const express = require('express');
const app = express.Router();
const db = require('../db/conn');

// No vamos a hacer un CRUD 
// Requerimientos de la ruta de usuarios
//Crear Usuario 
// Validaciones 
// Contaseña y Confirmación 
// Contraseña tenga una longitud de 10 Caracteres 
//Validar su Autenticación 
//Actualizar su foto de perfil 

app.post('', (req, res) => {

    const parametros = [

        req.body.correo_electronico,
        req.body.nombre,
        req.body.apellido,
        req.body.contrasenia

    ];

    let mensajes = new Array();
    let bandera = true;

    if (req.body.confirmacion != req.body.contrasenia) {

        bandera = false;
        mensajes.push("Las contraseñas no coinciden");
    }

    let pass = req.body.contrasenia;

    if (pass.length < 10) {

        bandera = false;
        mensajes.push("La contraseña debe ser mayor a 10 caracteres");
    }


    let respuestaValidacion = {

        exito: bandera,
        mensaje: mensajes,
        excepcion: "",
        item_usuario: ""

    };


    if (respuestaValidacion.exito === false) {

        res.status(500).json(respuestaValidacion);

    } else {


        let sql = ` select * from  fn_crear_clientev2($1,$2, $3, $4)  `;

        db.any(sql, parametros, e => e.id)
            .then(data => {

                const objetoCreado = {

                    correo_electronico: req.body.correo_electronico,
                    nombre: req.body.nombre,
                    apellido: req.body.apellido


                };
                respuestaValidacion.mensaje.push("Operación Exitosa");
                respuestaValidacion.item_usuario = objetoCreado;

                res.json(respuestaValidacion);

            })
            .catch((error) => {

                respuestaValidacion.mensaje.push("Operación Erronea");
                respuestaValidacion.excepcion = error.message;
                respuestaValidacion.exito = false;
                res.status(500).json(respuestaValidacion);


            }
            );



    }

});


app.put('', (req, res) => {


    const parametros = [

        req.body.correo_electronico,
        req.body.nombre,
        req.body.apellido,
        req.body.contrasenia

    ];

    let mensajes = new Array();
    let bandera = true;

    let respuestaValidacion = {

        exito: bandera,
        mensaje: mensajes,
        excepcion: "",
        item_usuario: ""

    };

    let sql = ` select * from  fn_actualizar_clientev2($1,$2, $3, $4)  `;

    db.any(sql, parametros, e => e.id)
        .then(data => {

            const objetoModificado = {

                correo_electronico: req.body.correo_electronico,
                nombre: req.body.nombre,
                apellido: req.body.apellido


            };
            respuestaValidacion.mensaje.push("Operación Exitosa");
            respuestaValidacion.item_usuario = objetoModificado;

            res.json(respuestaValidacion);

        })
        .catch((error) => {

            respuestaValidacion.mensaje.push("Operación Erronea");
            respuestaValidacion.excepcion = error.message;
            respuestaValidacion.exito = false;
            res.status(500).json(respuestaValidacion);


        }
        );


});


app.get('', (req,res)=>{


    let sql = 'select correo_electronico, nombre, apellido from tbl_usuarios where id_rol = 2 and id_estado = 1';

    db.any(sql, e => e.id)
        .then(row => {

            if (row.length === 0) {

                res.status(404).json({ mensaje: "Sin Datos" });
            } else {

                res.json(row);

            }



        })
        .catch((error) => {

            res.status(500).json(error);

        });

});

module.exports = app;