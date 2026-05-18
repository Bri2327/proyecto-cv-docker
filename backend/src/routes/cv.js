const express = require("express");
const { pool } = require("../db");

const router = express.Router();

router.get("/cv", async (req, res) => {
  try {
    const [people] = await pool.query(
      "SELECT id, nombre, apellido, ciudad, foto, email, github FROM persona ORDER BY id LIMIT 1"
    );

    if (!people.length) {
      return res.status(404).json({ message: "No CV data found." });
    }

    const persona = people[0];
    const [education] = await pool.query(
      "SELECT titulo, institucion, anio FROM formacion WHERE persona_id = ? ORDER BY id",
      [persona.id]
    );

    return res.json({
      persona: {
        nombre: persona.nombre,
        apellido: persona.apellido,
        ciudad: persona.ciudad,
        foto: persona.foto,
        email: persona.email,
        github: persona.github
      },
      formacion: education
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve CV information.",
      error: error.message
    });
  }
});

module.exports = router;
