import "dotenv/config";
import models from "../models/index.js";
const { Skill } = models;

export const createSkill = async (req, res) => {
    try {
        if (!req.body.nome || !req.body.nivel) {
            return res.status(400).json({ error: "Dados faltando para criação do curriculo" });
        }
        const newSkill = await Skill.create({
            nome: req.body.nome,
            nivel: req.body.nivel,
            pessoaId: req.body.pessoaId,
        });
        return res.status(201).json({ message: "created", data: newSkill });
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

export const updateSkill = async (req, res) => {
    try {
        const skillId = req.params.id;
        const skill = await Skill.findByPk(skillId);
        if (!skill) {
            return res.status(404).json({ error: "Skill não encontrada" });
        }
        await skill.update(req.body);
        return res.status(200).json({ message: "Atualizado", data: skill });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

export const deleteSkill = async (req, res) => {
    try {
        const deleted = await Skill.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ error: "Skill não encontrada" });
        }
        return res.status(204).send();
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

export const getSkill = async (req, res) => {
    try {
        const skillId = req.params.id;
        const skill = await Skill.findByPk(skillId);
        if (!skill) {
            return res.status(404).json({ error: "Skill não encontrada" });
        }
        return res.status(200).json({ message: "Skill encontrada", data: skill });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

export const getAllSkills = async (req, res) => {
    try {
        const skills = await Skill.findAll();
        return res.json(skills);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}