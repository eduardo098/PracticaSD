import express from "express";
import { SERVER_PORT } from "../global/environment";
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../Sockets/socket';
var mysql = require('mysql');

export default class Server {
    public app: express.Application;
    public port: number;

    public connection: any;

    public io: socketIO.Server;
    private httpServer: http.Server;

    private static _instance: Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);
        this.escucharSocket();
        
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    private escucharSocket() {
        console.log("Escuchando conexiones");
        this.io.on('connect', cliente => {
            const address = cliente.handshake.address;
            console.log("Nuevo cliente conectado");
            console.log(address);
            socket.mensaje(cliente, this.io);
            socket.desconectar(cliente); 
        });
    }
    start(callback: Function) {
        //this.app.listen(this.port, callback());
        this.httpServer.listen(this.port, callback());
    }
    
}