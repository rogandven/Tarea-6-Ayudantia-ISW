import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { AppDataSource, connectDB } from "./config/configDb.js";
import { routerApi } from "./routes/index.routes.js";

const app = express();

// Habilita el CORS para permitir solicitudes desde otros dominios (frontend)
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));
// Ruta principal de bienvenida
app.get("/", (req, res) => {
  res.send("¡Bienvenido a mi API REST con TypeORM!");
});

// Inicializa la conexión a la base de datos
connectDB()
  .then(() => {
    // Carga todas las rutas de la aplicación
    routerApi(app);

    // Levanta el servidor Express
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor iniciado en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error al conectar con la base de datos:", error);
    process.exit(1);
  });
