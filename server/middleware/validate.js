import Joi from 'joi'
const validate = (schema, req, res, next) => {
  const options = {
    abortEarly: true,
    stripUnknown: true
  }
  const { error, value } = schema.validate(req.body, options)

  let message = ''


  if (error) {
    console.log(error.details[0].path);
    switch (error.details[0].path[0]) {
      case 'first_name':
        message = 'neteisingai uzpildytas vardas'
        break
      case 'last_name':
        message = 'neteisingai uzpildyta pavarde'
        break
      case 'email':
        message = 'neteisingai uzpildytas el. pastas'
        break
      case 'password':
        message = 'Esant tokiem sunkiem laikam prasome taves nedaryti klaidu ir nurodyti teisingai fucking slaptazodi.... Aciu'
        break
      default:
        message = 'neteisingai uzpildyti laukialiai'
        break


    }
    return res.status(500).send(message)
  }


  req.body = value
  next()
}

export const registerValidator = (req, res, next) => {
  const schema = Joi.object({
    first_name: Joi.string().min(2).max(50).required(),
    last_name: Joi.string().min(2).max(55).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(12).required(),

  })

  validate(schema, req, res, next)
}


export const loginValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(12).required(),

  })

  validate(schema, req, res, next)
}


export const workersValidator = (req, res, next) => {
  const schema = Joi.object({
    first_name: Joi.string().min(2).required(),
    last_name: Joi.string().min(2).required(),
    saloonId: Joi.number().integer().required(),
    photo: Joi.string().allow('')

  })

  validate(schema, req, res, next)
}


export const servicesValidator = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    duration: Joi.string().min(2).required(),
    price: Joi.number().required(),
    saloonId: Joi.number().integer().required()

  })

  validate(schema, req, res, next)
}

export const saloonsValidator = (req, res, next) => {
  const schema = Joi.object({
    address: Joi.string().min(2).required(),
    name: Joi.string().min(2).required(),
    phone: Joi.string().required()
  })

  validate(schema, req, res, next)
}


export const ratingsValidator = (req, res, next) => {
  const schema = Joi.object({
    rating: Joi.number().required()
  })

  validate(schema, req, res, next)
}


export const ordersValidator = (req, res, next) => {
  const schema = Joi.object({
    order_date: Joi.date().required(),
    status: Joi.number().integer(),
    serviceId: Joi.number().integer().required(),




  })

  validate(schema, req, res, next)
}




export default validate