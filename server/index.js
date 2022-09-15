import express from "express";
import cors from "cors";
import session from "express-session";
import {Saloons, Services, Workers, Orders, Users, Ratings} from "./controller/index.js";





const app = express();

app.use(express.urlencoded({ extended: true }))

app.use('/uploads', express.static('uploads'))


app.use(cors());

app.use(express.json());

app.set('trust proxy', 1) // trust first proxy

app.use(session({
  secret: 'nieko nesuprantu',
  resave: false,
  saveUninitialized: false,
  cookie: {
     secure: false, 
    maxAge: 600000}
}))


app.use('/api/saloons/', Saloons)
app.use('/api/services/', Services)
app.use('/api/workers/', Workers)
app.use('/api/orders/', Orders)
app.use('/api/users/', Users)
app.use('/api/ratings/', Ratings)






app.listen(3000);
