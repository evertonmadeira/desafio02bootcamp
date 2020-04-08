const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs, likes } = request.body;

  const repo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repo);
  return response.json(repo);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const repoIndex = repositories.findIndex((repo) => repo.id === id);

  if (repoIndex < 0)
    return response.status(400).json({ Error: "Repositório não encontrado" });

  const repo = {
    ...repositories[repoIndex],
    title,
    url,
    techs,
  };

  repositories[repoIndex] = repo;

  return response.json(repo);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const repoIndex = repositories.findIndex((repo) => repo.id === id);

  if (repoIndex < 0)
    return res.status(400).json({ Error: "Repositório não encontrado" });

  repositories.splice(repoIndex, 1);

  return res.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const { title, url, techs, likes } = request.body;

  const repoIndex = repositories.findIndex((repo) => repo.id === id);

  if (repoIndex < 0)
    return response.status(400).json({ Error: "Repositório não encontrado" });

  repositories[repoIndex].likes += 1;
  const repo = {
    ...repositories[repoIndex],
    title,
    url,
    techs,
  };

  return response.json(repo);
});

module.exports = app;
