import express from "express";
import db from "../database/connect.js";
import { servicesValidator } from "../middleware/validate.js";



const Router = express.Router()

Router.get('/', async (req, res) => {
    try {
        const services = await db.Services.findAll({
            include: {
                model: db.Saloons,
                atributes: ['name']
            }
        })
        res.json(services)
    } catch (error) {
        console.log(error);
        res.status(500).send('ivyko klaida')

    }
})








Router.post('/new', servicesValidator, async (req, res) => {
    try {
        await db.Services.create(req.body)
        res.send('Paslauga Sekmingai prideta')
    } catch (error) {
        console.log(error);
        res.status(500).send('ivyko klaida')

    }
})



Router.delete('/delete/:id', async (req, res) => {
    try {
        const service = await db.Services.findByPk(req.params.id)
        await service.destroy()
        res.send('paslauga sekmingai pasalintas is puslapio')
    } catch (error) {
        console.log(error);
        res.status(500).send('ivyko klaida')

    }
})


Router.get('/edit/:id', async (req, res) => {
    try {
        const service = await db.Services.findByPk(req.params.id)
        res.json(service)
    } catch (error) {
        console.log(error);
        res.status(500).send('ivyko klaida')

    }
})


Router.put('/edit/:id', servicesValidator, async (req, res) => {
    try {
        const service = await db.Services.findByPk(req.params.id)
        await service.update(req.body)
        res.send('paslauga Sekmingai atnaujintas')
    } catch (error) {
        console.log(error);
        res.status(500).send('ivyko klaida')

    }
})






export default Router