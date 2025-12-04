const express = require('express');
const mssql = require('mssql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const config = {
    user: 'dbadmin',
    password: 'Gabriel12:3',
    server: 'omaapp.database.windows.net', // IP o nombre del servidor
    database: 'Usuarios',
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
