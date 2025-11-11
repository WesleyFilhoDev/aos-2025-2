import { Router } from "express";
import pessoaRoute from "./pessoaRoute.js";
import formacaoRoute from "./formacaoRoute.js";
import skillRoute from "./skillRoute.js";

const router = Router();

router.use("/pessoa", pessoaRoute);
router.use("/formacao", formacaoRoute);
router.use("/skill", skillRoute);

export default router;
