# express-hello-world

Aplicação de exemplo com endpoints Express.

## Executar

Requer Node.js 18 ou superior.

```bash
npm install
npm start
```

O servidor fica disponível em `http://localhost:3000` (ou na porta definida
pela variável de ambiente `PORT`).

## Endpoints

| Método | Caminho | Resposta |
| --- | --- | --- |
| GET | `/meunome` | `Meu nome é Fábio Duarte de Oliveira` |
| GET | `/tico` | `teco` |
| GET | `/pokemons` | Lista JSON dos dez primeiros Pokémon capturados por Ash |
| POST | `/series` | Lista JSON com três séries |
| GET | `/bug` | Simula um erro e retorna HTTP 500 sem encerrar o servidor |
| GET | `/api/quote` | Retorna uma citação obtida da API pública DummyJSON |

Para testar o endpoint POST:

```bash
curl -X POST http://localhost:3000/series
```

Execute os testes automatizados com:

```bash
npm test
```