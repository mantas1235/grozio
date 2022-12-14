import axios from "axios"
import { useState, useContext } from "react"

import MainContext from "../../../context/MainContext.js"
import { useNavigate } from 'react-router-dom'


const NewSaloon = () => {

    const navigate = useNavigate()

    const { setAlert } = useContext(MainContext)

    const [form, setForm] = useState({
        name: '',
        address: '',
        phone: ''
    })

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('/api/saloons/new', form)
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

    return (
        <>
            <h1>Naujas grožio salonas</h1>

            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group mb-2">
                    <label className="mb-1">Pavadinimas:</label>
                    <input type="text" name="name" className="form-control" onChange={handleForm} />
                </div>
                <div className="form-group mb-2">
                    <label className="mb-1">Adresas:</label>
                    <input type="text" name="address" className="form-control" onChange={handleForm} />
                </div>
                <div className="form-group mb-2">
                    <label className="mb-1">Telefono nr.:</label>
                    <input type="text" name="phone" className="form-control" onChange={handleForm} />
                </div>
                <button className="btn btn-primary">Siųsti</button>
            </form>
        </>

    )




}


export default NewSaloon


