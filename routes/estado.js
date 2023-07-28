const express = require('express');
const app = express.Router();
const db = require('../db/conn');


app.post('', (req, res) => {

    const parametros = [

        req.body.nombre_estado

    ];

    let sql = `  insert into tbl_estado 
                 (nombre_estado)
                 values 
                 ($1) returning id
                `;

    let mensajes = new Array();

    let respuestaValidacion = {

        exito: true,
        mensaje: mensajes,
        excepcion: "",
        item_rol: ""

    };

    db.one(sql, parametros, event => event.id)
        .then(data => {

            const objetoCreado = {

                id: data,
                nombre_estado: req.body.nombre_estado

            }

            res.json(objetoCreado);

        })
        .catch((error) => {

            //status
            // 404 -- estatus no encontre datos  // gets
            // 500 error de compilacion  // dml  (insert, delete, update)
            res.status(500).json(error);

        }
        );

});


app.put('/:id', (req, res) => {


    const parametros = [

        req.body.nombre_estado,
        req.params.id

    ];

    let sql = `  
                    update tbl_estado 
                    set nombre_estado = $1
                    where id = $2

                `;

    db.result(sql, parametros, r => r.rowCount)
        .then(data => {

            const objetoMod = {

                id: data,
                nombre_estado: req.body.nombre_estado

            }

            res.json(objetoMod);

        })
        .catch((error) => {

            //status
            // 404 -- estatus no encontre datos  // gets
            // 500 error de compilacion  // dml  (insert, delete, update)
            res.status(500).json(error);

        }
        );

});

app.delete('/:id', (req, res) => {


    const parametros = [

        req.params.id

    ];

    let sql = `  
                    update tbl_estado 
                    set activo = false
                    where id = $1

                `;

    db.result(sql, parametros, r => r.rowCount)
        .then(data => {

            const objetoMod = {

                id: data,
                nombre_estado: req.body.nombre_estado,
                estado: false
            }

            res.json(objetoMod);

        })
        .catch((error) => {

            //status
            // 404 -- estatus no encontre datos  // gets
            // 500 error de compilacion  // dml  (insert, delete, update)
            res.status(500).json(error);

        }
        );

});


app.get('', (req, res) => {


    let sql = `  
                    select * from tbl_estado
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