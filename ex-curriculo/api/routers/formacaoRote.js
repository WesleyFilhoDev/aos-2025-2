import { Router } from "express";
import { createFormacao, deleteFormacao, getAllFormacoes, getFormacao, updateFormacao } from "../controllers/formacaoController";

const router = Router();

router.post("/", createFormacao);
router.patch("/:id", updateFormacao);
router.delete("/:id", deleteFormacao);
router.get("/", getAllFormacoes);
router.get("/:id", getFormacao);

export default router;