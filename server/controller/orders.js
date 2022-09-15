import express  from "express";
import db from "../database/connect.js";
import { ordersValidator } from "../middleware/validate.js";


const Router = express.Router()

//admin uzsakymas

Router.get('/', async (req, res)=> {
    try {
        const orders =  await db.Orders.findAll()
        res.json(orders)
    } catch (error) {
        console.log(error);
        res.status(500).send('ivyko klaida')
        
    }
    })

//vartotojo uzsakymas

    Router.get('/user/', async (req, res)=> {
//laikinas sprendimas
const user_id = 1

        try {
            const orders =  await db.Orders.findAll({
                where: { userId: user_id}
            })
            res.json(orders)
        } catch (error) {
            console.log(error);
            res.status(500).send('ivyko klaida')
            
        }
        })







Router.post('/new', ordersValidator,  async (req, res)=> {
try {
    await db.Orders.create(req.body)
    res.send('Uzsakymas sekmingai pridetas')
} catch (error) {
    console.log(error);
    res.status(500).send('ivyko klaida')
    
}
})



Router.delete('/delete/:id', async (req, res)=> {
    try {
      const order=  await db.Orders.findByPk(req.params.id)
      await order.destroy()
        res.send('uzsakymas sekmingai pasalintas is puslapio')
    } catch (error) {
        console.log(error);
        res.status(500).send('ivyko klaida')
        
    }
    })


    Router.put('/edit/:id', ordersValidator, async (req, res)=> {
        try {
           const order = await db.Orders.findByPk(req.params.id)
           await order.update(req.body)
            res.send('uzsakymas Sekmingai atnaujintas')
        } catch (error) {
            console.log(error);
            res.status(500).send('ivyko klaida')
            
        }
        })

export default Router