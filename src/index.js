import express from "express";
import cors from "cors";
import morgan from "morgan";
import { port } from "./config.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.json({ message: "API Oficial de Agrotrujillo"});
});

app.use((err, req, res, next) => {
    return res.status(500).json({
        status: "error",
        message: err.message,
    });
});

app.listen(port)
console.log(`Servidor corriendo en el puerto: ${port}`);