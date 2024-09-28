import { Application } from "express";
import { body, validationResult } from 'express-validator';
import { Response, Request } from "express";
import bcrypt from "bcryptjs"
import bodyParser from "body-parser";
import authentication from './services/authentication';
import Users from "./models/Users";

export default class Routes {
    auth: authentication;
    constructor(app: Application) {
        this.auth = new authentication();
        this.navigateRoute(app)
    }

    async navigateRoute(app: Application) {
        const bodyParse = bodyParser.json();
        app.post('/login', bodyParse, async (req, res) => {
            await this.auth.login(req, res);
        });

        app.post('/users', bodyParse, [
            body('username').isLength({ min: 2 }).withMessage('Username must be at least 2 characters long'),
            body('email').isEmail().withMessage('Please enter a valid email'),
            body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        ], async (req: Request, res: Response) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.render('register', { errors: errors.array() });
            }
            const { username, email, password } = req.body;

            try {
                const existingUser = await Users.findOne({ $or: [{ username }, { email }] });
                if (existingUser) {
                    return res.render('register', { errors: [{ msg: 'Username or email already exists' }] });
                }

                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = new Users({ username, email, password: hashedPassword });
                await newUser.save();

                res.send('New User Created');
            } catch (err) {
                console.error(err);
                res.status(500).send('Server error');
            }
            res.send({
                status: 201,
                Message: 'User created successfully'
            });
        })
    }
}