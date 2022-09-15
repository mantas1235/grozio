import express from "express";
import db from "../database/connect.js";
import upload from "../middleware/multer.js";
import { workersValidator } from "../middleware/validate.js";



const Router = express.Router()

Router.get('/', async (req, res) => {
    try {
        const workers = await db.Workers.findAll({
            include: {
                model: db.Saloons,
                atributes: ['name']
            }
        })
        res.json(workers)
    } catch (error) {
        console.log(error);
        res.status(500).send('ivyko klaida')

    }
})

Router.post('/new', upload.single('photo'), workersValidator, async (req, res) => {
    try {
        if (req.file)
            req.body.photo = '/uploads/' + req.file.filename
        await db.Workers.create(req.body)
        res.send('Darbuotojas pridetas')
    } catch (error) {
        console.log(error);
        res.status(500).send('ivyko klaida')

    }
})


Router.get('/edit/:id', async (req, res) => {
    try {
        const worker = await db.Workers.findByPk(req.params.id)
        res.json(worker)
    } catch (error) {
        console.log(error);
        res.status(500).send('ivyko klaida')

    }
})


Router.put('/edit/:id', upload.single('photo'), workersValidator, async (req, res) => {
    try {
        if (req.file)
            req.body.photo = '/uploads/' + req.file.filename
        const worker = await db.Workers.findByPk(req.params.id)
        await worker.update(req.body)
        res.send('Atnaujintas darbuotojo profilis')
    } catch (error) {
        console.log(error);
        res.status(500).send('ivyko klaida')

    }
})

Router.delete('/delete/:id', async (req, res) => {
    try {
        const worker = await db.Workers.findByPk(req.params.id)
        await worker.destroy()
        res.send('Darbuotojas pasalintas is sistemos atia atia')
    } catch (error) {
        console.log(error);
        res.status(500).send('ivyko klaida')

    }
})




export default Router