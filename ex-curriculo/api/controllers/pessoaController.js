import "dotenv/config";
import models from "../models/index.js";
const { Pessoa } = models;

export const createPessoa = async (req, res) => {
    try {
        if (!req.body.nome || !req.body.email || !req.body.phone) {
            return res.status(400).json({ error: "Dados faltando para criação do curriculo" });
        }
        const newPessoa = await Pessoa.create({
            nome: req.body.nome,
            email: req.body.email,
            phone: req.body.phone,
            linkedin: req.body.linkedin,
            github: req.body.github,
        });
        return res.status(201).json({ message: "created", data: newPessoa });
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

export const updatePessoa = async (req, res) => {
    try {
        const pessoaId = req.params.id;
        const pessoa = await Pessoa.findByPk(pessoaId);
        if (!pessoa) {
            return res.status(404).json({ error: "Pessoa não encontrada" });
        }
        await pessoa.update(req.body);
        return res.status(200).json({ message: "Atualizado", data: pessoa });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

export const deletePessoa = async (req, res) => {
    try {
        const deleted = await Pessoa.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ error: "Pessoa não encontrada" });
        }
        return res.status(204).send();
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

export const getPessoa = async (req, res) => {
    try {
        const pessoaId = req.params.id;
        const pessoa = await Pessoa.findByPk(pessoaId);
        if (!pessoa) {
            return res.status(404).json({ error: "Pessoa não encontrada" });
        }
        return res.status(200).json({ message: "Pessoa encontrada", data: pessoa });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

export const getAllPessoas = async (req, res) => {
    try {
        const pessoas = await Pessoa.findAll();
        return res.json(pessoas);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}