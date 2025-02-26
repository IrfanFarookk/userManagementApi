import { Request, Response } from "express";
import bcrypt from "bcryptjs"
import Jwt from "jsonwebtoken";
import { Users } from "../models/Users";

export default class Authentication {
    defaultUser: Users[] = [{
        userId: 1, username: 'irfan', password: '12345678', email: 'test@test.com'
    }];

    secretKey = 'qwertyuiop1234';

    public login = async (req: Request, res: Response) => {
        const { username, password } = req.body;
            const isUsernamePresent = this.defaultUser.find((user) => user.username === username);
            if(!isUsernamePresent) {
                res.send({
                    status: 401,
                    Message: 'Invalid Username'
                });
                return;
            }

            const isPasswordMatch = await bcrypt.compare(password, this.defaultUser[0].password);
            if (!isPasswordMatch) {
                res.send({
                    status: 401,
                    Message: 'Invalid Password'
                });
                return;
            }

            const token = Jwt.sign({id: this.defaultUser[0].userId, username: this.defaultUser[0].username}, this.secretKey)
            res.send({
                Status: 200,
                AccessToken: token
            }); 
    }
}