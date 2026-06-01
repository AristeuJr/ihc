const http = require("http");
const { ensureDatabase } = require("./models/database");
const { handleRequest } = require("./routes/router");

const PORT = Number(process.env.PORT) || 3000;

ensureDatabase();

http.createServer(handleRequest).listen(PORT, () => {
  console.log(`Just Do Eat rodando em http://localhost:${PORT}`);
});
