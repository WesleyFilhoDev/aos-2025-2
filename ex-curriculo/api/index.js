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
  res.send('Opa, to rodando certinho!');
});

app.use("/api", routes);

const eraseDatabaseOnSync = true;

async function curriculumDefault() {
  const { Pessoa, Formacao, Skill } = models;

  const p1 = await Pessoa.create({
    nome: "Wesley Filho",
    email: "wesley@gmail.com",
    phone: "4575-5555",
    linkedin: "linkedin.com/in/wesley",
    github: "github.com/wesley",
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
    nome: "Antonia Silva",
    email: "antonia@example.com",
    phone: "88888-4444",
    linkedin: "linkedin.com/in/antonia",
    github: "github.com/antonia",
  });

  await Formacao.create({
    instituicao: "UFRPE",
    curso: "Engenharia do Petróleo",
    nivel: "Superior",
    inicio: "2021-01-01",
    fim: "2027-10-31",
    pessoaId: p2.id,
  });

  await Skill.create({ nome: "JavaScript", nivel: "avançado", pessoaId: p2.id });
  await Skill.create({ nome: "Java", nivel: "intermediário", pessoaId: p2.id });

  console.log("Seed concluído com 2 currículos!");
}

models.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Banco sincronizado");
  })
  .catch((err) => console.error("Erro ao sincronizar banco:", err));

export default app;
