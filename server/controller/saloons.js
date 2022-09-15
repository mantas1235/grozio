import express from "express";
import db from "../database/connect.js";
import { saloonsValidator } from "../middleware/validate.js";


const Router = express.Router()

Router.get('/', async (req, res) => {
    try {
        const saloons = await db.Saloons.findAll()
        res.json(saloons)
    } catch (error) {
        console.log(error);
        res.status(500).send('ivyko klaida')

    }
})


Router.get('/edit/:id', async (req, res) => {
    try {
        const saloon = await db.Saloons.findByPk(req.params.id)
        res.json(saloon)
    } catch (error) {
        console.log(error);
        res.status(500).send('ivyko klaida')

    }
})







Router.post('/new', saloonsValidator, async (req, res) => {
    try {
        await db.Saloons.create(req.body)
        res.send('Salonas Sekmingai issaugotas')
    } catch (error) {
        console.log(error);
        res.status(500).send('ivyko klaida')

    }
})



Router.delete('/delete/:id', async (req, res) => {
    try {
        const saloons = await db.Saloons.findByPk(req.params.id)
        await saloons.destroy()
        res.send('salonas sekmingai pasalintas is rinkos')
    } catch (error) {
        console.log(error);
        res.status(500).send('ivyko klaida')

    }
})


Router.put('/edit/:id', saloonsValidator, async (req, res) => {
    try {
        const saloon = await db.Saloons.findByPk(req.params.id)
        await saloon.update(req.body)
        res.send('Salonas Sekmingai atnaujintas')
    } catch (error) {
        console.log(error);
        res.status(500).send('ivyko klaida')

    }
})






export default Router