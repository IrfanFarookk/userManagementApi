import { Application } from "express";
import { Request, Response } from "express";
import bodyParser from "body-parser";
import authentication from './services/authentication';
import users from './services/users';

export default class Routes {
    auth: authentication;
    useroperation: users;
    constructor (app: Application) {
        this.auth= new authentication();
        this.useroperation = new users();
        this.navigateRoute(app)
    }

    async navigateRoute (app: Application) {
        const bodyParse = bodyParser.json();
        app.post('/login', bodyParse, async (req, res) => {
        await this.auth.login(req, res);
        });

        app.post('/users', bodyParse, async (req, res) => {
         await this.useroperation.createUser(req.body);
         res.send({
            status: 201,
            Message: 'User created successfully'
         });
        })
    }
}