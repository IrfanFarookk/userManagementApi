import request from "supertest";
import express, { Application } from "express";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import Authentication from "../services/authentication";

jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("Authentication Controller", () => {
    let app: Application;
    let authController: Authentication;

    beforeAll(() => {
        app = express();
        app.use(express.json());

        authController = new Authentication();
        app.post("/login", authController.login);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("should return 200 and a token when login is successful", async () => {
        (bcrypt.compare as jest.Mock).mockResolvedValue(true);
        (Jwt.sign as jest.Mock).mockReturnValue("mocked_token");

        const response = await request(app)
            .post("/login")
            .send({ username: "irfan", password: "12345678" });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ Status: 200, AccessToken: "mocked_token" });
    });

    test("should return 401 when username is invalid", async () => {
        const response = await request(app)
            .post("/login")
            .send({ username: "wrongUser", password: "12345678" });
        expect(response.body.status).toBe(401);
        expect(response.body).toEqual({ status: 401, Message: "Invalid Username" });
    });

    test("should return 401 when password is incorrect", async () => {
        (bcrypt.compare as jest.Mock).mockResolvedValue(false);

        const response = await request(app)
            .post("/login")
            .send({ username: "irfan", password: "wrongpassword" });

        expect(response.body.status).toBe(401);
        expect(response.body).toEqual({ status: 401, Message: "Invalid Password" });
    });
});
