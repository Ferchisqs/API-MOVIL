const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    
    console.log("Datos recibidos para registro:", req.body); 

    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ message: "Todos los campos son requeridos" });
    }


    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Las contraseñas no coinciden" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hashedPassword });

    res.status(201).json({ id: user.id, email: user.email });

  } catch (error) {
    console.error("Error en register:", error);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: "El correo y la contraseña son requeridos" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Correo o contraseña incorrectos" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); 

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Correo o contraseña incorrectos" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });

  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = { register, login };
