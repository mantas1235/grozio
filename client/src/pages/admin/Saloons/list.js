import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import MainContext from "../../../context/MainContext"
import '../../../components/style/list.css'

const Saloons = () => {
    const [saloons, setSaloons] = useState([])
    const { setAlert } = useContext(MainContext)
    const [refresh, setRefresh] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        axios.get('/api/saloons/')
            .then(resp => setSaloons(resp.data))
            .catch(error => console.log(error))

    }, [refresh])
    const handleDelete = (id) => {
        axios.delete("/api/saloons/delete/" + id, saloons)
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
            <Link to='/admin/saloons/new' className="edit">Prideti nauja salona</Link>
            {saloons ?
                <table className="lentele">
                    <thead className="tbl-header" >
                        <tr>
                            <th>#</th>
                            <th>Pavadinimas</th>
                            <th>Adresas</th>
                            <th>Telefono nr.</th>
                        </tr>
                    </thead>
                    <tbody className="tbl-content">
                        {saloons.map(saloon =>
                            <tr key={saloon.id}>
                                <td>{saloon.id}</td>
                                <td>{saloon.name}</td>
                                <td>{saloon.address}</td>
                                <td>{saloon.phone}</td>
                                <td> <Link to={"/admin/saloons/edit/" + saloon.id} className="edit">
                                    Redaguoti
                                </Link>
                                    <Link to='/admin' className="delete"
                                        onClick={(e) => handleDelete(saloon.id)}>Ištrinti</Link>
                                </td>

                            </tr>
                        )}
                    </tbody>
                </table>
                :
                <h3>Nėra sukurtų grožio salonų</h3>
            }



        </>


    )
}

export default Saloons