import { Router, Request, Response } from 'express';
import mysqlConn from '../classes/server';
const router = Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sa"
});


router.get('/', (req: Request, res: Response) => {
    connection.connect(function(err: any) {
        if (err) throw err;
            res.json({
                mensaje: "Conectado a la base de datos"
            });
        });
});

router.get('/mensajes', (req: Request, res: Response) => {
    res.json({
        HTTP: '200',
        mensaje: 'Respuesta de GET'
    });
});

router.get('/mensajes/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    res.json({
        HTTP: '200',
        mensaje: 'Respuesta de GET: ' + id
    });
});

router.post('/mensajes', (req: Request, res: Response) => {
    res.json({
        HTTP: '200',
        mensaje: 'Respuesta de POST'
    });
});

router.post('/mensajes/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    res.json({
        HTTP: '200',
        mensaje: 'Respuesta de POST: ' + id
    });
});

router.post('/mensajePost', (req: Request, res: Response) => {
    const id = req.body.id;
    const name = req.body.name;
    res.json({
        HTTP: '200',
        mensaje: 'Respuesta de POST: ' + id,
        clave: id,
        nombre: name
    });
});

router.get('/usuarios', (req: Request, res: Response) => {
        connection.query("SELECT * FROM tbl_employees", function (err: any, result: any, fields: any) {
        if (err) throw err;
            console.log(result);
            res.json({
                HTTP: '200',
                res: result
            })
        });
});

router.post('/insertUsuario', (req: Request, res: Response) => {
    const name = req.body.name;
    const lastName = req.body.last_name;
    const salary = req.body.salary;
    const department = req.body.department;

    const values = [[name, lastName, salary, department]];

    console.log(values);

    var sql = 'INSERT INTO tbl_employees (name, last_name, salary, department) VALUES ?';
    connection.query(sql, [values], function(err: any, result: any) {
        if (err) throw err;
        console.log(result);
        res.json({
            HTTP: '200',
            res: result,
        });
    });
});

router.put('/updateUsuario', (req: Request, res: Response) => {
    const id = req.body.id;
    const name = req.body.name;
    const lastName = req.body.last_name;
    const salary = req.body.salary;
    const department = req.body.department;

    var sql = `UPDATE tbl_employees SET name = "${name}", last_name = "${lastName}", salary = "${salary}", department = "${department}" WHERE id = "${id}"`;
    connection.query(sql, function(err: any, result: any) {
        if (err) throw err;
        console.log(result);
        res.json({
            HTTP: '200',
            res: result,
        });
    });
});

router.delete('/deleteUsuario', (req: Request, res: Response) => {
    const id = req.body.id; 

    var sql = `DELETE FROM tbl_employees WHERE id = "${id}"`;
    connection.query(sql, function(err: any, result: any) {
        if (err) throw err;
        console.log(result);
        res.json({
            HTTP: '200',
            res: result,
        });
    });
});

export default router;
