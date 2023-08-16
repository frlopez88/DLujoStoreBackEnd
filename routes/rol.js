const express = require('express');
const app = express.Router();
const db = require('../db/conn');

app.post('', (req, res) => {


    const parametros = [

        req.body.nombre_rol

    ];

    let sql = `  insert into tbl_rol 
                 (nombre_rol)
                 values 
                 ($1) returning id, nombre_rol
                `;

    let mensajes = new Array();

    let respuestaValidacion = {

        exito: true,
        mensaje: mensajes,
        excepcion: "",
        item_rol: ""

    };

    db.one(sql, parametros)
        .then(data => {

            const objetoCreado = {
                id: data.id,
                nombre_rol: data.nombre_rol
            }

            respuestaValidacion.mensaje.push("Operación Exitosa");
            respuestaValidacion.item_rol = objetoCreado;

            res.json(respuestaValidacion);

        })
        .catch((error) => {


            respuestaValidacion.exito = false;
            respuestaValidacion.mensaje.push("Operación Erronea");
            respuestaValidacion.excepcion = error.message;
            res.status(500).json(respuestaValidacion);

        }
        );

});


app.put('/:id', (req, res) => {


    const parametros = [

        req.body.nombre_rol,
        req.params.id

    ];

    let sql = `  
                    update tbl_rol 
                    set nombre_rol = $1
                    where id = $2

                `;

    let mensajes = new Array();

    let respuestaValidacion = {

        exito: true,
        mensaje: mensajes,
        excepcion: "",
        item_rol: ""

    };

    db.result(sql, parametros, r => r.rowCount)
        .then(data => {

            const objetoMod = {

                id: req.params.id,
                nombre_estado: req.body.nombre_rol

            }

            respuestaValidacion.mensaje = "Operación Exitosa";
            respuestaValidacion.item_rol = objetoMod;
            res.json(respuestaValidacion);

        })
        .catch((error) => {

            respuestaValidacion.exito = false;
            respuestaValidacion.mensaje.push("Operación Erronea");
            respuestaValidacion.excepcion = error.message;
            res.status(500).json(error);

        }
        );

});

app.delete('/:id', (req, res) => {


    const parametros = [

        req.params.id

    ];

    let sql = `  
                    update tbl_rol 
                    set activo = false
                    where id = $1

                `;

    let mensajes = new Array();

    let respuestaValidacion = {

        exito: true,
        mensaje: mensajes,
        excepcion: "",
        item_rol: ""

    };

    db.result(sql, parametros, r => r.rowCount)
        .then(data => {

            const objetoMod = {

                id: req.params.id,
                nombre_rol: req.body.nombre_rol,
                estado: false
            }

            respuestaValidacion.mensaje = "Operación Exitosa";
            respuestaValidacion.item_rol = objetoMod;
            res.json(respuestaValidacion);

        })
        .catch((error) => {

            respuestaValidacion.exito = false;
            respuestaValidacion.mensaje.push("Operación Erronea");
            respuestaValidacion.excepcion = error.message;
            res.status(500).json(error);

        }
        );

});


app.get('', (req, res) => {


    let sql = `  
                    select * from tbl_rol
                    where activo = true 

                `;
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