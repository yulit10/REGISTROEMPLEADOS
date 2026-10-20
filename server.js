const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

// Página principal
app.get('/', (req, res) => {
    res.send('Servicio de registro de usuarios funcionando');
});

// Lista temporal de usuarios
const usuarios = [];

// Registrar usuario
app.post('/registro', (req, res) => {
    const { usuario, contrasena } = req.body;

    if (!usuario || !contrasena) {
        return res.status(400).json({
            mensaje: 'Debes ingresar usuario y contraseña'
        });
    }

    const existe = usuarios.find(u => u.usuario === usuario);

    if (existe) {
        return res.status(409).json({
            mensaje: 'El usuario ya existe'
        });
    }

    usuarios.push({ usuario, contrasena });

    res.status(201).json({
        mensaje: 'Usuario registrado correctamente'
    });
});

// Consultar usuarios registrados
app.get('/usuarios', (req, res) => {
    res.json(
        usuarios.map(u => ({ usuario: u.usuario }))
    );
});
app.listen(PORT, () => {
console.log('Servidor funcionando en http://localhost:3000');
});