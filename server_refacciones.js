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
    database: 'DB_REFACCIONES',
    options: {
        encrypt: true,
        enableArithAbort: true,
    }
};

// Ruta para mostrar todos los registros de bandas
app.get('/bandas', async (req, res) => {
    try {
        await mssql.connect(config);
        const result = await mssql.query`SELECT * FROM bandas`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        mssql.close();
    }
});
// Ruta para buscar inventario por ID o Descripción
app.get('/bandas/buscar', async (req, res) => {
    const searchText = `%${req.query.text}%`; // Texto de búsqueda
    try {
        await mssql.connect(config);
        const result = await mssql.query`SELECT * FROM bandas WHERE id LIKE ${searchText} OR descripción LIKE ${searchText}`;
        if (result.recordset.length === 0) {
            res.status(404).send('Producto no encontrado');
        } else {
            res.json(result.recordset);
        }
    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        mssql.close();
    }
});
// Ruta para crear una nueva banda
app.post('/bandas/crear', async (req, res) => {
    const { id, descripción, cantidad, condición, ubicación } = req.body; // Con tildes
    try {
        await mssql.connect(config);
        // Inserción en la base de datos usando los nombres correctos con tildes
        const result = await mssql.query`
            INSERT INTO bandas (id, descripción, cantidad, condición, ubicación)
            VALUES (${id}, ${descripción}, ${cantidad}, ${condición}, ${ubicación})
        `;
        res.status(201).send('Banda creada exitosamente');
    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        mssql.close();
    }
});
// Ruta para eliminar una banda
app.delete('/bandas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await mssql.connect(config);
        const result = await mssql.query`DELETE FROM bandas WHERE id = ${id}`;
        if (result.rowsAffected[0] > 0) {
            res.send('Registro eliminado correctamente');
        } else {
            res.status(404).send('No se encontró el registro con ese ID');
        }
    } catch (err) {
        res.status(500).send('Error al eliminar el registro: ' + err.message);
    } finally {
        mssql.close();
    }
});



// Ruta para mostrar todos los registros de bobinas
app.get('/bobinas', async (req, res) => {
    try {
        await mssql.connect(config);
        const result = await mssql.query`SELECT * FROM bobinas`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        mssql.close();
    }
});
// Ruta para buscar inventario por ID o Descripción
app.get('/bobinas/buscar', async (req, res) => {
    const searchText = `%${req.query.text}%`; // Obtener el parámetro de búsqueda
    try {
        await mssql.connect(config);
        const result = await mssql.query`SELECT * FROM bobinas WHERE id LIKE ${searchText} OR descripción LIKE ${searchText}`;
        if (result.recordset.length === 0) {
            res.status(404).send('Producto no encontrado');
        } else {
            res.json(result.recordset);
        }
    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        mssql.close();
    }
});
// Ruta para crear una nueva bobina
app.post('/bobinas', async (req, res) => {
    const { id, descripción, cantidad, condición, ubicación } = req.body; // Con tildes
    try {
        await mssql.connect(config);
        await mssql.query`INSERT INTO bobinas (id, [descripción], cantidad, [condición], ubicación) 
                          VALUES (${id}, ${descripción}, ${cantidad}, ${condición}, ${ubicación})`;
        res.status(201).send('Registro creado correctamente');
    } catch (err) {
        res.status(500).send('Error al crear el registro: ' + err.message);
    } finally {
        mssql.close();
    }
});

// Ruta para eliminar una bobina
app.delete('/bobinas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await mssql.connect(config);
        const result = await mssql.query`DELETE FROM bobinas WHERE id = ${id}`;
        if (result.rowsAffected[0] > 0) {
            res.send('Registro eliminado correctamente');
        } else {
            res.status(404).send('No se encontró el registro con ese ID');
        }
    } catch (err) {
        res.status(500).send('Error al eliminar el registro: ' + err.message);
    } finally {
        mssql.close();
    }
});



// Ruta para mostrar todos los registros de cables_bujia
app.get('/cables_bujia', async (req, res) => {
    try {
        await mssql.connect(config);
        const result = await mssql.query`SELECT * FROM cables_bujia`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        mssql.close();
    }
});
// Ruta para buscar inventario por ID o Descripción
app.get('/cables_bujia/buscar', async (req, res) => {
    const searchText = `%${req.query.text}%`; // Obtener el parámetro de búsqueda
    try {
        await mssql.connect(config);
        const result = await mssql.query`SELECT * FROM cables_bujia WHERE id LIKE ${searchText} OR descripción LIKE ${searchText}`;
        if (result.recordset.length === 0) {
            res.status(404).send('Producto no encontrado');
        } else {
            res.json(result.recordset);
        }
    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        mssql.close();
    }
});
// Ruta para crear un nuevo cables_bujia
app.post('/cables_bujia', async (req, res) => {
    const { id, descripcion, cantidad, condicion, ubicacion } = req.body;
    try {
        await mssql.connect(config);
        await mssql.query`INSERT INTO cables_bujia (id, [descripción], cantidad, [condición], ubicación) 
                          VALUES (${id}, ${descripcion}, ${cantidad}, ${condicion}, ${ubicacion})`;
        res.status(201).send('Registro creado correctamente');
    } catch (err) {
        res.status(500).send('Error al crear el registro: ' + err.message);
    } finally {
        mssql.close();
    }
});

// Ruta para eliminar un cables_bujia
app.delete('/cables_bujia/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await mssql.connect(config);
        const result = await mssql.query`DELETE FROM cables_bujia WHERE id = ${id}`;
        if (result.rowsAffected[0] > 0) {
            res.send('Registro eliminado correctamente');
        } else {
            res.status(404).send('No se encontró el registro con ese ID');
        }
    } catch (err) {
        res.status(500).send('Error al eliminar el registro: ' + err.message);
    } finally {
        mssql.close();
    }
});



// Ruta para mostrar todos los registros de cuerpo_valvulas
app.get('/cuerpo_valvulas', async (req, res) => {
    try {
        await mssql.connect(config);
        const result = await mssql.query`SELECT * FROM cuerpo_valvulas`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        mssql.close();
    }
});
// Ruta para buscar inventario por ID o Descripción
app.get('/cuerpo_valvulas/buscar', async (req, res) => {
    const searchText = `%${req.query.text}%`; // Obtener el parámetro de búsqueda
    try {
        await mssql.connect(config);
        const result = await mssql.query`SELECT * FROM cuerpo_valvulas WHERE id LIKE ${searchText} OR descripción LIKE ${searchText}`;
        if (result.recordset.length === 0) {
            res.status(404).send('Producto no encontrado');
        } else {
            res.json(result.recordset);
        }
    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        mssql.close();
    }
});
// Ruta para crear un nuevo cuerpo_valvulas
app.post('/cuerpo_valvulas', async (req, res) => {
    const { id, descripcion, cantidad, condicion, ubicacion } = req.body;
    try {
        await mssql.connect(config);
        await mssql.query`INSERT INTO cuerpo_valvulas (id, [descripción], cantidad, [condición], ubicación) 
                          VALUES (${id}, ${descripcion}, ${cantidad}, ${condicion}, ${ubicacion})`;
        res.status(201).send('Registro creado correctamente');
    } catch (err) {
        res.status(500).send('Error al crear el registro: ' + err.message);
    } finally {
        mssql.close();
    }
});

// Ruta para eliminar un cuerpo_valvulas
app.delete('/cuerpo_valvulas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await mssql.connect(config);
        const result = await mssql.query`DELETE FROM cuerpo_valvulas WHERE id = ${id}`;
        if (result.rowsAffected[0] > 0) {
            res.send('Registro eliminado correctamente');
        } else {
            res.status(404).send('No se encontró el registro con ese ID');
        }
    } catch (err) {
        res.status(500).send('Error al eliminar el registro: ' + err.message);
    } finally {
        mssql.close();
    }
});




// Ruta para mostrar todos los registros de deposito_anticongelante
app.get('/deposito_anticongelante', async (req, res) => {
    try {
        await mssql.connect(config);
        const result = await mssql.query`SELECT * FROM deposito_anticongelante`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        mssql.close();
    }
});
// Ruta para buscar inventario por ID o Descripción
app.get('/deposito_anticongelante/buscar', async (req, res) => {
    const searchText = `%${req.query.text}%`; // Obtener el parámetro de búsqueda
    try {
        await mssql.connect(config);
        const result = await mssql.query`SELECT * FROM deposito_anticongelante WHERE id LIKE ${searchText} OR descripción LIKE ${searchText}`;
        if (result.recordset.length === 0) {
            res.status(404).send('Producto no encontrado');
        } else {
            res.json(result.recordset);
        }
    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        mssql.close();
    }
});
// Ruta para crear un nuevo deposito_anticongelante
app.post('/deposito_anticongelante', async (req, res) => {
    const { id, descripcion, cantidad, condicion, ubicacion } = req.body;
    try {
        await mssql.connect(config);
        await mssql.query`INSERT INTO deposito_anticongelante (id, [descripción], cantidad, [condición], ubicación) 
                          VALUES (${id}, ${descripcion}, ${cantidad}, ${condicion}, ${ubicacion})`;
        res.status(201).send('Registro creado correctamente');
    } catch (err) {
        res.status(500).send('Error al crear el registro: ' + err.message);
    } finally {
        mssql.close();
    }
});

// Ruta para eliminar un deposito_anticongelante
app.delete('/deposito_anticongelante/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await mssql.connect(config);
        const result = await mssql.query`DELETE FROM deposito_anticongelante WHERE id = ${id}`;
        if (result.rowsAffected[0] > 0) {
            res.send('Registro eliminado correctamente');
        } else {
            res.status(404).send('No se encontró el registro con ese ID');
        }
    } catch (err) {
        res.status(500).send('Error al eliminar el registro: ' + err.message);
    } finally {
        mssql.close();
    }
});




// Ruta para mostrar todos los registros de embrague
app.get('/embrague', async (req, res) => {
    try {
        await mssql.connect(config);
        const result = await mssql.query`SELECT * FROM embrague`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        mssql.close();
    }
});
// Ruta para buscar inventario por ID o Descripción
app.get('/embrague/buscar', async (req, res) => {
    const searchText = `%${req.query.text}%`; // Obtener el parámetro de búsqueda
    try {
        await mssql.connect(config);
        const result = await mssql.query`SELECT * FROM embrague WHERE id LIKE ${searchText} OR descripción LIKE ${searchText}`;
        if (result.recordset.length === 0) {
            res.status(404).send('Producto no encontrado');
        } else {
            res.json(result.recordset);
        }
    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        mssql.close();
    }
});
// Ruta para crear un nuevo embrague
app.post('/embrague', async (req, res) => {
    const { id, descripcion, cantidad, condicion, ubicacion } = req.body;
    try {
        await mssql.connect(config);
        await mssql.query`INSERT INTO embrague (id, [descripción], cantidad, [condición], ubicación) 
                          VALUES (${id}, ${descripcion}, ${cantidad}, ${condicion}, ${ubicacion})`;
        res.status(201).send('Registro creado correctamente');
    } catch (err) {
        res.status(500).send('Error al crear el registro: ' + err.message);
    } finally {
        mssql.close();
    }
});

// Ruta para eliminar un embrague
app.delete('/embrague/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await mssql.connect(config);
        const result = await mssql.query`DELETE FROM embrague WHERE id = ${id}`;
        if (result.rowsAffected[0] > 0) {
            res.send('Registro eliminado correctamente');
        } else {
            res.status(404).send('No se encontró el registro con ese ID');
        }
    } catch (err) {
        res.status(500).send('Error al eliminar el registro: ' + err.message);
    } finally {
        mssql.close();
    }
});



// Ruta para mostrar todos los registros de filtro_aceite
app.get('/filtro_aceite', async (req, res) => {
    try {
        await mssql.connect(config);
        const result = await mssql.query`SELECT * FROM filtro_aceite`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        mssql.close();
    }
});
// Ruta para buscar inventario por ID o Descripción
app.get('/filtro_aceite/buscar', async (req, res) => {
    const searchText = `%${req.query.text}%`; // Obtener el parámetro de búsqueda
    try {
        await mssql.connect(config);
        const result = await mssql.query`SELECT * FROM filtro_aceite WHERE id LIKE ${searchText} OR descripción LIKE ${searchText}`;
        if (result.recordset.length === 0) {
            res.status(404).send('Producto no encontrado');
        } else {
            res.json(result.recordset);
        }
    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        mssql.close();
    }
});
// Ruta para crear un nuevo filtro_aceite
app.post('/filtro_aceite', async (req, res) => {
    const { id, descripcion, cantidad, condicion, ubicacion } = req.body;
    try {
        await mssql.connect(config);
        await mssql.query`INSERT INTO filtro_aceite (id, [descripción], cantidad, [condición], ubicación) 
                          VALUES (${id}, ${descripcion}, ${cantidad}, ${condicion}, ${ubicacion})`;
        res.status(201).send('Registro creado correctamente');
    } catch (err) {
        res.status(500).send('Error al crear el registro: ' + err.message);
    } finally {
        mssql.close();
    }
});

// Ruta para eliminar un filtro_aceite
app.delete('/filtro_aceite/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await mssql.connect(config);
        const result = await mssql.query`DELETE FROM filtro_aceite WHERE id = ${id}`;
        if (result.rowsAffected[0] > 0) {
            res.send('Registro eliminado correctamente');
        } else {
            res.status(404).send('No se encontró el registro con ese ID');
        }
    } catch (err) {
        res.status(500).send('Error al eliminar el registro: ' + err.message);
    } finally {
        mssql.close();
    }
});



// Ruta para mostrar todos los registros de filtro_aire
app.get('/filtro_aire', async (req, res) => {
    try {
        await mssql.connect(config);
        const result = await mssql.query`SELECT * FROM filtro_aire`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        mssql.close();
    }
});
// Ruta para buscar inventario por ID o Descripción
app.get('/filtro_aire/buscar', async (req, res) => {
    const searchText = `%${req.query.text}%`; // Obtener el parámetro de búsqueda
    try {
        await mssql.connect(config);
        const result = await mssql.query`SELECT * FROM filtro_aire WHERE id LIKE ${searchText} OR descripción LIKE ${searchText}`;
        if (result.recordset.length === 0) {
            res.status(404).send('Producto no encontrado');
        } else {
            res.json(result.recordset);
        }
    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        mssql.close();
    }
});
// Ruta para crear un nuevo filtro_aire
app.post('/filtro_aire', async (req, res) => {
    const { id, descripcion, cantidad, condicion, ubicacion } = req.body;
    try {
        await mssql.connect(config);
        await mssql.query`INSERT INTO filtro_aire (id, [descripción], cantidad, [condición], ubicación) 
                          VALUES (${id}, ${descripcion}, ${cantidad}, ${condicion}, ${ubicacion})`;
        res.status(201).send('Registro creado correctamente');
    } catch (err) {
        res.status(500).send('Error al crear el registro: ' + err.message);
    } finally {
        mssql.close();
    }
});

// Ruta para eliminar un filtro_aire
app.delete('/filtro_aire/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await mssql.connect(config);
        const result = await mssql.query`DELETE FROM filtro_aire WHERE id = ${id}`;
        if (result.rowsAffected[0] > 0) {
            res.send('Registro eliminado correctamente');
        } else {
            res.status(404).send('No se encontró el registro con ese ID');
        }
    } catch (err) {
        res.status(500).send('Error al eliminar el registro: ' + err.message);
    } finally {
        mssql.close();
    }
});



// Ruta para mostrar todos los registros de horquillas
app.get('/horquillas', async (req, res) => {
    try {
        await mssql.connect(config);
        const result = await mssql.query`SELECT * FROM horquillas`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        mssql.close();
    }
});
// Ruta para buscar inventario por ID o Descripción
app.get('/horquillas/buscar', async (req, res) => {
    const searchText = `%${req.query.text}%`; // Obtener el parámetro de búsqueda
    try {
        await mssql.connect(config);
        const result = await mssql.query`SELECT * FROM horquillas WHERE id LIKE ${searchText} OR descripción LIKE ${searchText}`;
        if (result.recordset.length === 0) {
            res.status(404).send('Producto no encontrado');
        } else {
            res.json(result.recordset);
        }
    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        mssql.close();
    }
});
// Ruta para crear unas nuevas horquillas
app.post('/horquillas', async (req, res) => {
    const { id, descripcion, cantidad, condicion, ubicacion } = req.body;
    try {
        await mssql.connect(config);
        await mssql.query`INSERT INTO horquillas (id, [descripción], cantidad, [condición], ubicación) 
                          VALUES (${id}, ${descripcion}, ${cantidad}, ${condicion}, ${ubicacion})`;
        res.status(201).send('Registro creado correctamente');
    } catch (err) {
        res.status(500).send('Error al crear el registro: ' + err.message);
    } finally {
        mssql.close();
    }
});

// Ruta para eliminar unas horquillas
app.delete('/horquillas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await mssql.connect(config);
        const result = await mssql.query`DELETE FROM horquillas WHERE id = ${id}`;
        if (result.rowsAffected[0] > 0) {
            res.send('Registro eliminado correctamente');
        } else {
            res.status(404).send('No se encontró el registro con ese ID');
        }
    } catch (err) {
        res.status(500).send('Error al eliminar el registro: ' + err.message);
    } finally {
        mssql.close();
    }
});



// Ruta para mostrar todos los registros de kit_arranque
app.get('/kit_arranque', async (req, res) => {
    try {
        await mssql.connect(config);
        const result = await mssql.query`SELECT * FROM kit_arranque`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        mssql.close();
    }
});
// Ruta para buscar inventario por ID o Descripción
app.get('/kit_arranque/buscar', async (req, res) => {
    const searchText = `%${req.query.text}%`; // Obtener el parámetro de búsqueda
    try {
        await mssql.connect(config);
        const result = await mssql.query`SELECT * FROM kit_arranque WHERE id LIKE ${searchText} OR descripción LIKE ${searchText}`;
        if (result.recordset.length === 0) {
            res.status(404).send('Producto no encontrado');
        } else {
            res.json(result.recordset);
        }
    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        mssql.close();
    }
});
// Ruta para crear un nuevo kit_arranque
app.post('/kit_arranque', async (req, res) => {
    const { id, descripcion, cantidad, condicion, ubicacion } = req.body;
    try {
        await mssql.connect(config);
        await mssql.query`INSERT INTO kit_arranque (id, [descripción], cantidad, [condición], ubicación) 
                          VALUES (${id}, ${descripcion}, ${cantidad}, ${condicion}, ${ubicacion})`;
        res.status(201).send('Registro creado correctamente');
    } catch (err) {
        res.status(500).send('Error al crear el registro: ' + err.message);
    } finally {
        mssql.close();
    }
});

// Ruta para eliminar un kit_arranque
app.delete('/kit_arranque/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await mssql.connect(config);
        const result = await mssql.query`DELETE FROM kit_arranque WHERE id = ${id}`;
        if (result.rowsAffected[0] > 0) {
            res.send('Registro eliminado correctamente');
        } else {
            res.status(404).send('No se encontró el registro con ese ID');
        }
    } catch (err) {
        res.status(500).send('Error al eliminar el registro: ' + err.message);
    } finally {
        mssql.close();
    }
});



// Ruta para mostrar todos los registros de mecatronica
app.get('/mecatronica', async (req, res) => {
    try {
        await mssql.connect(config);
        const result = await mssql.query`SELECT * FROM mecatronica`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        mssql.close();
    }
});
// Ruta para buscar inventario por ID o Descripción
app.get('/mecatronica/buscar', async (req, res) => {
    const searchText = `%${req.query.text}%`; // Obtener el parámetro de búsqueda
    try {
        await mssql.connect(config);
        const result = await mssql.query`SELECT * FROM mecatronica WHERE id LIKE ${searchText} OR descripción LIKE ${searchText}`;
        if (result.recordset.length === 0) {
            res.status(404).send('Producto no encontrado');
        } else {
            res.json(result.recordset);
        }
    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        mssql.close();
    }
});
// Ruta para crear una nueva mecatronica
app.post('/mecatronica', async (req, res) => {
    const { id, descripcion, cantidad, condicion, ubicacion } = req.body;
    try {
        await mssql.connect(config);
        await mssql.query`INSERT INTO mecatronica (id, [descripción], cantidad, [condición], ubicación) 
                          VALUES (${id}, ${descripcion}, ${cantidad}, ${condicion}, ${ubicacion})`;
        res.status(201).send('Registro creado correctamente');
    } catch (err) {
        res.status(500).send('Error al crear el registro: ' + err.message);
    } finally {
        mssql.close();
    }
});

// Ruta para eliminar una mecatronica
app.delete('/mecatronica/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await mssql.connect(config);
        const result = await mssql.query`DELETE FROM mecatronica WHERE id = ${id}`;
        if (result.rowsAffected[0] > 0) {
            res.send('Registro eliminado correctamente');
        } else {
            res.status(404).send('No se encontró el registro con ese ID');
        }
    } catch (err) {
        res.status(500).send('Error al eliminar el registro: ' + err.message);
    } finally {
        mssql.close();
    }
});



// Ruta para mostrar todos los registros de otras_refacciones
app.get('/otras_refacciones', async (req, res) => {
    try {
        await mssql.connect(config);
        const result = await mssql.query`SELECT * FROM otras_refacciones`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        mssql.close();
    }
});
// Ruta para buscar inventario por ID o Descripción
app.get('/otras_refacciones/buscar', async (req, res) => {
    const searchText = `%${req.query.text}%`; // Obtener el parámetro de búsqueda
    try {
        await mssql.connect(config);
        const result = await mssql.query`SELECT * FROM otras_refacciones WHERE id LIKE ${searchText} OR descripción LIKE ${searchText}`;
        if (result.recordset.length === 0) {
            res.status(404).send('Producto no encontrado');
        } else {
            res.json(result.recordset);
        }
    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        mssql.close();
    }
});
// Ruta para crear nuevas otras_refacciones
app.post('/otras_refacciones', async (req, res) => {
    const { id, descripcion, cantidad, condicion, ubicacion } = req.body;
    try {
        await mssql.connect(config);
        await mssql.query`INSERT INTO otras_refacciones (id, [descripción], cantidad, [condición], ubicación) 
                          VALUES (${id}, ${descripcion}, ${cantidad}, ${condicion}, ${ubicacion})`;
        res.status(201).send('Registro creado correctamente');
    } catch (err) {
        res.status(500).send('Error al crear el registro: ' + err.message);
    } finally {
        mssql.close();
    }
});

// Ruta para eliminar una otras_refacciones
app.delete('/otras_refacciones/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await mssql.connect(config);
        const result = await mssql.query`DELETE FROM otras_refacciones WHERE id = ${id}`;
        if (result.rowsAffected[0] > 0) {
            res.send('Registro eliminado correctamente');
        } else {
            res.status(404).send('No se encontró el registro con ese ID');
        }
    } catch (err) {
        res.status(500).send('Error al eliminar el registro: ' + err.message);
    } finally {
        mssql.close();
    }
});



// Ruta para mostrar todos los registros de palanca_velocidades
app.get('/palanca_velocidades', async (req, res) => {
    try {
        await mssql.connect(config);
        const result = await mssql.query`SELECT * FROM palanca_velocidades`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        mssql.close();
    }
});
// Ruta para buscar inventario por ID o Descripción
app.get('/palanca_velocidades/buscar', async (req, res) => {
    const searchText = `%${req.query.text}%`; // Obtener el parámetro de búsqueda
    try {
        await mssql.connect(config);
        const result = await mssql.query`SELECT * FROM palanca_velocidades WHERE id LIKE ${searchText} OR descripción LIKE ${searchText}`;
        if (result.recordset.length === 0) {
            res.status(404).send('Producto no encontrado');
        } else {
            res.json(result.recordset);
        }
    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        mssql.close();
    }
});
// Ruta para crear una nueva palanca_velocidades
app.post('/palanca_velocidades', async (req, res) => {
    const { id, descripcion, cantidad, condicion, ubicacion } = req.body;
    try {
        await mssql.connect(config);
        await mssql.query`INSERT INTO palanca_velocidades (id, [descripción], cantidad, [condición], ubicación) 
                          VALUES (${id}, ${descripcion}, ${cantidad}, ${condicion}, ${ubicacion})`;
        res.status(201).send('Registro creado correctamente');
    } catch (err) {
        res.status(500).send('Error al crear el registro: ' + err.message);
    } finally {
        mssql.close();
    }
});

// Ruta para eliminar una palanca_velocidades
app.delete('/palanca_velocidades/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await mssql.connect(config);
        const result = await mssql.query`DELETE FROM palanca_velocidades WHERE id = ${id}`;
        if (result.rowsAffected[0] > 0) {
            res.send('Registro eliminado correctamente');
        } else {
            res.status(404).send('No se encontró el registro con ese ID');
        }
    } catch (err) {
        res.status(500).send('Error al eliminar el registro: ' + err.message);
    } finally {
        mssql.close();
    }
});



// Ruta para mostrar todos los registros de prod_gasolina
app.get('/prod_gasolina', async (req, res) => {
    try {
        await mssql.connect(config);
        const result = await mssql.query`SELECT * FROM prod_gasolina`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        mssql.close();
    }
});
// Ruta para buscar inventario por ID o Descripción
app.get('/prod_gasolina/buscar', async (req, res) => {
    const searchText = `%${req.query.text}%`; // Obtener el parámetro de búsqueda
    try {
        await mssql.connect(config);
        const result = await mssql.query`SELECT * FROM prod_gasolina WHERE id LIKE ${searchText} OR descripción LIKE ${searchText}`;
        if (result.recordset.length === 0) {
            res.status(404).send('Producto no encontrado');
        } else {
            res.json(result.recordset);
        }
    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        mssql.close();
    }
});
// Ruta para crear un nuevo prod_gasolina
app.post('/prod_gasolina', async (req, res) => {
    const { id, descripcion, cantidad, condicion, ubicacion } = req.body;
    try {
        await mssql.connect(config);
        await mssql.query`INSERT INTO prod_gasolina (id, [descripción], cantidad, [condición], ubicación) 
                          VALUES (${id}, ${descripcion}, ${cantidad}, ${condicion}, ${ubicacion})`;
        res.status(201).send('Registro creado correctamente');
    } catch (err) {
        res.status(500).send('Error al crear el registro: ' + err.message);
    } finally {
        mssql.close();
    }
});

// Ruta para eliminar un prod_gasolina
app.delete('/prod_gasolina/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await mssql.connect(config);
        const result = await mssql.query`DELETE FROM prod_gasolina WHERE id = ${id}`;
        if (result.rowsAffected[0] > 0) {
            res.send('Registro eliminado correctamente');
        } else {
            res.status(404).send('No se encontró el registro con ese ID');
        }
    } catch (err) {
        res.status(500).send('Error al eliminar el registro: ' + err.message);
    } finally {
        mssql.close();
    }
});



// Ruta para mostrar todos los registros de retenes_arneses
app.get('/retenes_arneses', async (req, res) => {
    try {
        await mssql.connect(config);
        const result = await mssql.query`SELECT * FROM retenes_arneses`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        mssql.close();
    }
});
// Ruta para buscar inventario por ID o Descripción
app.get('/retenes_arneses/buscar', async (req, res) => {
    const searchText = `%${req.query.text}%`; // Obtener el parámetro de búsqueda
    try {
        await mssql.connect(config);
        const result = await mssql.query`SELECT * FROM retenes_arneses WHERE id LIKE ${searchText} OR descripción LIKE ${searchText}`;
        if (result.recordset.length === 0) {
            res.status(404).send('Producto no encontrado');
        } else {
            res.json(result.recordset);
        }
    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        mssql.close();
    }
});
// Ruta para crear un nuevo retenes_arneses
app.post('/retenes_arneses', async (req, res) => {
    const { id, descripcion, cantidad, condicion, ubicacion } = req.body;
    try {
        await mssql.connect(config);
        await mssql.query`INSERT INTO retenes_arneses (id, [descripción], cantidad, [condición], ubicación) 
                          VALUES (${id}, ${descripcion}, ${cantidad}, ${condicion}, ${ubicacion})`;
        res.status(201).send('Registro creado correctamente');
    } catch (err) {
        res.status(500).send('Error al crear el registro: ' + err.message);
    } finally {
        mssql.close();
    }
});

// Ruta para eliminar un retenes_arneses
app.delete('/retenes_arneses/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await mssql.connect(config);
        const result = await mssql.query`DELETE FROM retenes_arneses WHERE id = ${id}`;
        if (result.rowsAffected[0] > 0) {
            res.send('Registro eliminado correctamente');
        } else {
            res.status(404).send('No se encontró el registro con ese ID');
        }
    } catch (err) {
        res.status(500).send('Error al eliminar el registro: ' + err.message);
    } finally {
        mssql.close();
    }
});



// Ruta para mostrar todos los registros de tcm
app.get('/tcm', async (req, res) => {
    try {
        await mssql.connect(config);
        const result = await mssql.query`SELECT * FROM tcm`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        mssql.close();
    }
});
// Ruta para buscar inventario por ID o Descripción
app.get('/tcm/buscar', async (req, res) => {
    const searchText = `%${req.query.text}%`; // Obtener el parámetro de búsqueda
    try {
        await mssql.connect(config);
        const result = await mssql.query`SELECT * FROM tcm WHERE id LIKE ${searchText} OR descripción LIKE ${searchText}`;
        if (result.recordset.length === 0) {
            res.status(404).send('Producto no encontrado');
        } else {
            res.json(result.recordset);
        }
    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        mssql.close();
    }
});
// Ruta para crear un nuevo tcm
app.post('/tcm', async (req, res) => {
    const { id, descripcion, cantidad, condicion, ubicacion } = req.body;
    try {
        await mssql.connect(config);
        await mssql.query`INSERT INTO tcm (id, [descripción], cantidad, [condición], ubicación) 
                          VALUES (${id}, ${descripcion}, ${cantidad}, ${condicion}, ${ubicacion})`;
        res.status(201).send('Registro creado correctamente');
    } catch (err) {
        res.status(500).send('Error al crear el registro: ' + err.message);
    } finally {
        mssql.close();
    }
});

// Ruta para eliminar un tcm
app.delete('/tcm/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await mssql.connect(config);
        const result = await mssql.query`DELETE FROM tcm WHERE id = ${id}`;
        if (result.rowsAffected[0] > 0) {
            res.send('Registro eliminado correctamente');
        } else {
            res.status(404).send('No se encontró el registro con ese ID');
        }
    } catch (err) {
        res.status(500).send('Error al eliminar el registro: ' + err.message);
    } finally {
        mssql.close();
    }
});



// Ruta para mostrar todos los registros de ventilador
app.get('/ventilador', async (req, res) => {
    try {
        await mssql.connect(config);
        const result = await mssql.query`SELECT * FROM ventilador`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        mssql.close();
    }
});
// Ruta para buscar inventario por ID o Descripción
app.get('/ventilador/buscar', async (req, res) => {
    const searchText = `%${req.query.text}%`; // Obtener el parámetro de búsqueda
    try {
        await mssql.connect(config);
        const result = await mssql.query`SELECT * FROM ventilador WHERE id LIKE ${searchText} OR descripción LIKE ${searchText}`;
        if (result.recordset.length === 0) {
            res.status(404).send('Producto no encontrado');
        } else {
            res.json(result.recordset);
        }
    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        mssql.close();
    }
});
// Ruta para crear un nuevo ventilador
app.post('/ventilador', async (req, res) => {
    const { id, descripcion, cantidad, condicion, ubicacion } = req.body;
    try {
        await mssql.connect(config);
        await mssql.query`INSERT INTO ventilador (id, [descripción], cantidad, [condición], ubicación) 
                          VALUES (${id}, ${descripcion}, ${cantidad}, ${condicion}, ${ubicacion})`;
        res.status(201).send('Registro creado correctamente');
    } catch (err) {
        res.status(500).send('Error al crear el registro: ' + err.message);
    } finally {
        mssql.close();
    }
});

// Ruta para eliminar un ventilador
app.delete('/ventilador/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await mssql.connect(config);
        const result = await mssql.query`DELETE FROM ventilador WHERE id = ${id}`;
        if (result.rowsAffected[0] > 0) {
            res.send('Registro eliminado correctamente');
        } else {
            res.status(404).send('No se encontró el registro con ese ID');
        }
    } catch (err) {
        res.status(500).send('Error al eliminar el registro: ' + err.message);
    } finally {
        mssql.close();
    }
});



// Ruta para mostrar todos los registros de volante_bimasa
app.get('/volante_bimasa', async (req, res) => {
    try {
        await mssql.connect(config);
        const result = await mssql.query`SELECT * FROM volante_bimasa`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        mssql.close();
    }
});
// Ruta para buscar inventario por ID o Descripción
app.get('/volante_bimasa/buscar', async (req, res) => {
    const searchText = `%${req.query.text}%`; // Obtener el parámetro de búsqueda
    try {
        await mssql.connect(config);
        const result = await mssql.query`SELECT * FROM volante_bimasa WHERE id LIKE ${searchText} OR descripción LIKE ${searchText}`;
        if (result.recordset.length === 0) {
            res.status(404).send('Producto no encontrado');
        } else {
            res.json(result.recordset);
        }
    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        mssql.close();
    }
});
// Ruta para crear un nuevo volante_bimasa
app.post('/volante_bimasa', async (req, res) => {
    const { id, descripcion, cantidad, condicion, ubicacion } = req.body;
    try {
        await mssql.connect(config);
        await mssql.query`INSERT INTO volante_bimasa (id, [descripción], cantidad, [condición], ubicación) 
                          VALUES (${id}, ${descripcion}, ${cantidad}, ${condicion}, ${ubicacion})`;
        res.status(201).send('Registro creado correctamente');
    } catch (err) {
        res.status(500).send('Error al crear el registro: ' + err.message);
    } finally {
        mssql.close();
    }
});

// Ruta para eliminar un volante_bimasa
app.delete('/volante_bimasa/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await mssql.connect(config);
        const result = await mssql.query`DELETE FROM volante_bimasa WHERE id = ${id}`;
        if (result.rowsAffected[0] > 0) {
            res.send('Registro eliminado correctamente');
        } else {
            res.status(404).send('No se encontró el registro con ese ID');
        }
    } catch (err) {
        res.status(500).send('Error al eliminar el registro: ' + err.message);
    } finally {
        mssql.close();
    } 
});


// Puerto en el que el servidor escuchará
const port = 3001;
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
