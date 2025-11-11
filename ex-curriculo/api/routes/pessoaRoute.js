import { Router } from "express";
import { createPessoa, deletePessoa, getAllPessoas, getPessoa, updatePessoa } from "../controllers/pessoaController";

const router = Router();

router.post("/", createPessoa);
router.patch("/:id", updatePessoa);
router.delete("/:id", deletePessoa);
router.get("/", getAllPessoas);
router.get("/:id", getPessoa);

export default router;