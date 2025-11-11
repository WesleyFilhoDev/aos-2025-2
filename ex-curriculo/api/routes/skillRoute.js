import { Router } from "express";
import { createSkill, deleteSkill, getAllSkills, getSkill, updateSkill } from "../controllers/skillController";

const router = Router();

router.post("/", createSkill);
router.patch("/:id", updateSkill);
router.delete("/:id", deleteSkill);
router.get("/", getAllSkills);
router.get("/:id", getSkill);

export default router;