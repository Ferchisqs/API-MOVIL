const DiscoMusica = require('../models/DiscoMusica');

const obtenerDiscos = async (req, res) => {
  try {
    const discos = await DiscoMusica.findAll();
    res.json(discos);
  } catch (error) {
    console.error("Error al obtener discos:", error);
    res.status(500).json({ message: "Error al obtener discos" });
  }
};

const agregarDisco = async (req, res) => {
  try {
    const { nombre, artista, anio_lanzamiento } = req.body;

    if (!nombre || !artista || !anio_lanzamiento) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const nuevoDisco = await DiscoMusica.create({ nombre, artista, anio_lanzamiento });

    res.status(201).json(nuevoDisco);
  } catch (error) {
    console.error("Error al agregar disco:", error);
    res.status(500).json({ message: "Error al agregar disco" });
  }
};

module.exports = { obtenerDiscos, agregarDisco };
