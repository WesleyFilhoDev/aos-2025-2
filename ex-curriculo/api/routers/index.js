import { Router } from "express";
import pessoaRoute from "./pessoaRoute";
import formacaoRoute from "./formacaoRoute";
import skillRoute from "./skillRoute";

const router = Router();

router.use("/pessoa", pessoaRoute);
router.use("/formacao", formacaoRoute);
router.use("/skill", skillRoute);

export default router;