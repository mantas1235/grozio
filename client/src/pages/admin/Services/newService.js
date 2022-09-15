import axios from "axios"
import { useState, useContext, useEffect } from "react"

import MainContext from "../../../context/MainContext.js"
import { useNavigate } from 'react-router-dom'


const NewService = () => {

    const navigate = useNavigate()

    const { setAlert } = useContext(MainContext)
    const [saloons, setSaloons] = useState([])
    const [form, setForm] = useState({
        name: '',
        duration: '',
        price: ''
    })

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(form)

        axios.post('/api/services/new', form)
            .then(resp => {
                setAlert(
                    {
                        message: resp.data,
                        status: 'success'
                    })
                navigate('/admin')

            })
            .catch(error => {
                console.log(error)
                setAlert({
                    message: error.response.data,
                    status: 'danger'
                })

                if (error.response.status === 401)
                    navigate('/login')

            })
    }


    useEffect(() => {
        axios.get('/api/saloons/')
            .then(resp => setSaloons(resp.data))
            .catch(error => {
                setAlert({
                    message: error.response.data,
                    status: 'danger'
                })
                console.log(error)
            })
    }, [navigate])





    return (
        <>
            <h1>Nauja Paslaugėlė</h1>

            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group mb-2">
                    <label className="mb-1">Paslaugos pavadinimas:</label>
                    <input type="text" name="name" className="form-control" onChange={handleForm} />
                </div>
                <div className="form-group mb-2">
                    <label className="mb-1">Trukmė:</label>
                    <input type="text" name="duration" className="form-control" onChange={handleForm} />
                </div>
                <div className="form-group mb-2">
                    <label className="mb-1"> Kaina:</label>
                    <input type="number" step='any' name="price" className="form-control" onChange={handleForm} />
                </div>

                <div className="form-group mb-2">
                    <label className="mb-1"> Grozio salonai:</label>

                    <select className="form-control" name="saloonId" required onChange={handleForm}>
                        <option value=''>Pasirinkite Salona</option>
                        {saloons.map(saloon => <option key={saloon.id} value={saloon.id}>{saloon.name}</option>)}


                    </select>
                </div>

                <button className="btn btn-primary">Patvirtinti</button>
            </form>
        </>

    )




}


export default NewService


