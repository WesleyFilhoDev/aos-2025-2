import express from 'express';
import "dotenv/config";
import cors from "cors";
import models from './models';
import routes from "./routes";

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: "*", 
  methods: "*",
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello from Express with Babel!');
});

app.use("/api", routes);

const eraseDatabaseOnSync = true;

async function curriculumDefault() {
  const { Pessoa, Formacao, Skill } = models;

  const p1 = await Pessoa.create({
    nome: "Pedro",
    email: "pedrodelmiroexemplo@gmail.com",
    phone: "5555-5555",
    linkedin: "linkedin.com/in/delmiro",
    github: "github.com/delmiro",
  });

  await Formacao.create({
    instituicao: "UNICAP",
    curso: "Sistemas para Internet",
    nivel: "Superior",
    inicio: "2024-03-07",
    fim: "2026-06-07",
    pessoaId: p1.id, 
  });

  await Skill.create({ nome: "Java", nivel: "avançado", pessoaId: p1.id });
  await Skill.create({ nome: "Spring Boot", nivel: "intermediário", pessoaId: p1.id });

  const p2 = await Pessoa.create({
    nome: "Maria Silva",
    email: "maria@example.com",
    phone: "88888-8888",
    linkedin: "linkedin.com/in/maria",
    github: "github.com/maria",
  });

  await Formacao.create({
    instituicao: "UFRPE",
    curso: "Engenharia da computação",
    nivel: "Superior",
    inicio: "2021-01-01",
    fim: "2024-12-31",
    pessoaId: p2.id,
  });

  await Skill.create({ nome: "JavaScript", nivel: "avançado", pessoaId: p2.id });
  await Skill.create({ nome: "Node.js", nivel: "intermediário", pessoaId: p2.id });

  console.log("Seed concluído com 2 currículos!");
}

models.sequelize
  .sync({ force: eraseDatabaseOnSync })
  .then(async () => {
    console.log("Banco sincronizado e tabelas criadas");
    await curriculumDefault();
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => console.error("Erro ao sincronizar banco:", err));

export default app;