import { DatePipe } from "@angular/common";

export const Usuarios = [ 
    {
    _id: String,
    username: String,
    nombre: String,
    apellido: String,
    email: String,
    password: String,
    createdAt: Date,
    updateAt: Date
    }
]

export class Usuarios1 {

    _id?: string;
    username: string;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    createdAt: Date;

    constructor(username: string, nombre: string, apellido: string, email: string, password: string, createAt: Date ) {

        this.username = username;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
        this.createdAt = createAt;
    }

}
