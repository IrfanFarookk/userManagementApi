import express from "express";
import Routes from "./routes";

const app = express();
const port = 3000;

new Routes(app);

app.listen(port, () => console.log(`service running in port: ${port}`));