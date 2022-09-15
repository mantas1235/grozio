import  express  from "express";
import db from '../database/connect.js'
import { ratingsValidator } from "../middleware/validate.js";



const router = express.Router()



router.post('/worker/:id', ratingsValidator, async (req,res)=>{

    const worker_id= req.params.id

   try {
	 await db.Ratings.create(req.body)
     res.send('ivertinimas issaugotas')
} catch (error) {
  
	console.log(error);
    res.status(500).send('ivyko serverio klaida')
}

})

export default router