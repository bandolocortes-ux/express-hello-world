const assert = require("node:assert/strict");
const { after, before, test } = require("node:test");
const app = require("./server");

let server;
let baseUrl;

before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

test("GET /meunome retorna o nome solicitado", async () => {
  const response = await fetch(`${baseUrl}/meunome`);
  assert.equal(response.status, 200);
  assert.equal(await response.text(), "Meu nome é Fábio Duarte de Oliveira");
});

test("GET /tico retorna teco", async () => {
  const response = await fetch(`${baseUrl}/tico`);
  assert.equal(response.status, 200);
  assert.equal(await response.text(), "teco");
});

test("GET /pokemons retorna os dez primeiros capturados por Ash", async () => {
  const response = await fetch(`${baseUrl}/pokemons`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), [
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
  ]);
});

test("POST /series retorna três séries em JSON", async () => {
  const response = await fetch(`${baseUrl}/series`, { method: "POST" });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), [
    "Breaking Bad",
    "Game of Thrones",
    "The Office",
  ]);
});

test("GET /bug simula um erro sem derrubar o servidor", async () => {
  const response = await fetch(`${baseUrl}/bug`);
  assert.equal(response.status, 500);
  assert.deepEqual(await response.json(), {
    erro: "Erro interno do servidor.",
  });
});

test("GET /api/quote retorna dados da API pública", async (context) => {
  const originalFetch = global.fetch;
  global.fetch = async (url) => {
    if (url === "https://dummyjson.com/quotes/random") {
      return new Response(
        JSON.stringify({ quote: "Test quote", author: "Test" }),
      );
    }

    return originalFetch(url);
  };
  context.after(() => {
    global.fetch = originalFetch;
  });

  const response = await fetch(`${baseUrl}/api/quote`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    quote: "Test quote",
    author: "Test",
  });
});
