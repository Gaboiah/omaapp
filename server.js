const express = require('express');
const mssql = require('mssql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de la base de datos usando variables de entorno
const config = {
    user: process.env.DB_USER,        // Usuario de la base de datos desde las variables de entorno
    password: process.env.DB_PASSWORD, // Contraseña de la base de datos desde las variables de entorno
    server: process.env.DB_SERVER,     // Servidor de la base de datos desde las variables de entorno
    database: process.env.DB_NAME,     // Nombre de la base de datos desde las variables de entorno
    options: {
        encrypt: true,
        enableArithAbort: true,
    }
};

app.post('/login', async (req, res) => {
    const { usuario, contraseña } = req.body;

    try {
        await mssql.connect(config);
        const result = await mssql.query`SELECT * FROM Usuario WHERE Usuario = ${usuario} AND Contraseña = ${contraseña}`;

        if (result.recordset.length > 0) {
            res.status(200).json({ success: true, message: 'Acceso Exitoso' });
        } else {
            res.status(401).json({ success: false, message: 'Error en el usuario o contraseña' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error al conectar con la base de datos' });
    } finally {
        await mssql.close();
    }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
