import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import MainContext from "../../../context/MainContext"
import '../../../components/style/list.css'

const Services = () => {
    const [services, setServices] = useState([])
    const { setAlert } = useContext(MainContext)
    const [refresh, setRefresh] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        axios.get('/api/services/')
            .then(resp => setServices(resp.data))
            .catch(error => console.log(error))

    }, [refresh])



    const handleDelete = (id) => {
        axios.delete("/api/services/delete/" + id, services)
            .then((resp) => {
                setAlert({
                    message: resp.data,
                    status: "success"
                })
                setRefresh(!refresh);
                // navigate('/admin')
            })
            .catch((error) => {
                setAlert({
                    message: error.response.data,
                    status: "danger",
                })
                window.scrollTo(0, 0)

                if (error.response.status === 401)
                    setTimeout(() => navigate('/'), 2000)
            })

    }


    return (
        <>
            <Link to='/admin/services/new' className="nav-link px-2 text-white">Prideti nauja paslauga</Link>

            {services ?

                <table className="lentele">
                    <thead className="tbl-header" >
                        <tr>
                            <th>#</th>
                            <th>Pavadinimas</th>
                            <th>Trukme</th>
                            <th>Kaina</th>
                            <th>Salonas</th>

                        </tr>
                    </thead>
                    <tbody className="tbl-content">
                        {services.map(service =>
                            <tr key={service.id}>
                                <td>{service.id}</td>
                                <td>{service.name}</td>
                                <td>{service.duration}</td>
                                <td>{service.price}</td>
                                <td>{service.saloon.name}</td>

                                <td> <Link to={"/admin/services/edit/" + service.id} className="edit">
                                    Redaguoti
                                </Link>
                                    <Link to='/admin' className="delete"
                                        onClick={(e) => handleDelete(service.id)}>Ištrinti</Link>
                                </td>

                            </tr>
                        )}
                    </tbody>
                </table>
                :
                <h3>Nėra Registruotu paslaugu

                </h3>
            }



        </>


    )
}

export default Services