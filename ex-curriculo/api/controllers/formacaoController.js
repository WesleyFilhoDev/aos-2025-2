import "dotenv/config";
import models from "../models/index.js";
const { Formacao } = models;

export const createFormacao = async (req, res) => {
    try {
        if (!req.body.instituicao || !req.body.curso || !req.body.nivel || !req.body.inicio || !req.body.fim) {
            return res.status(400).json({ error: "Dados faltando" });
        }
        const newFormacao = await Formacao.create({
            instituicao: req.body.instituicao,
            curso: req.body.curso,
            nivel: req.body.nivel,
            inicio: req.body.inicio,
            fim: req.body.fim,
            pessoaId: req.body.pessoaId,
        });
        return res.status(201).json({ message: "Formação criada", data: newFormacao });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

export const updateFormacao = async (req, res) => {
    try {
        const formacaoId = req.params.id;
        const formacao = await Formacao.findByPk(formacaoId);
        if (!formacao) {
            return res.status(404).json({ error: "Formação não encontrada" });
        }
        await formacao.update(req.body);
        return res.status(200).json({ message: "atualizado", data: formacao });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

export const deleteFormacao = async (req, res) => {
    try {
        const deleted = await Formacao.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ error: "Formação não encontrada" });
        }
        return res.status(204).send();
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

export const getFormacao = async (req, res) => {
    try {
        const formacaoId = req.params.id;
        const formacao = await Formacao.findByPk(formacaoId);
        if (!formacao) {
            return res.status(404).json({ error: "Formação não encontrada" });
        }
        return res.status(200).json({ message: "Formação encontrada", data: formacao });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

export const getAllFormacoes = async (req, res) => {
    try {
        const formacoes = await Formacao.findAll();
        return res.json(formacoes);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}