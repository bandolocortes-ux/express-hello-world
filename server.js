const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

const pokemons = [
  "Caterpie",
  "Pidgeotto",
  "Bulbasaur",
  "Charmander",
  "Squirtle",
  "Krabby",
  "Muk",
  "Tauros",
  "Lapras",
  "Snorlax",
];

const series = ["Breaking Bad", "Game of Thrones", "The Office"];

app.get("/meunome", (req, res) => {
  res.send("Meu nome é Fábio Duarte de Oliveira");
});

app.get("/tico", (req, res) => {
  res.send("teco");
});

app.get("/pokemons", (req, res) => {
  res.json(pokemons);
});

app.post("/series", (req, res) => {
  res.json(series);
});

app.get("/bug", (req, res, next) => {
  const error = new Error("Erro simulado para teste de bugs em produção.");
  error.statusCode = 500;
  next(error);
});

app.get("/api/quote", async (req, res, next) => {
  try {
    const response = await fetch("https://dummyjson.com/quotes/random");

    if (!response.ok) {
      const error = new Error("A API pública retornou uma resposta inválida.");
      error.statusCode = 502;
      return next(error);
    }

    return res.json(await response.json());
  } catch (error) {
    error.statusCode = 502;
    return next(error);
  }
});

app.use((error, req, res, next) => {
  console.error(error);
  const statusCode = error.statusCode === 502 ? 502 : 500;
  const message =
    statusCode === 502
      ? "Não foi possível consultar a API pública."
      : "Erro interno do servidor.";

  res.status(statusCode).json({ erro: message });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Servidor disponível em http://localhost:${port}`);
  });
}

module.exports = app;
