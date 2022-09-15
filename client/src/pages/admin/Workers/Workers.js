import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import MainContext from "../../../context/MainContext"
import '../../../components/style/list.css'

const Workers = () => {
    const [workers, setWorkers] = useState([])
    const { setAlert } = useContext(MainContext)
    const [refresh, setRefresh] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        axios.get('/api/workers/')
            .then(resp => setWorkers(resp.data))
            .catch(error => console.log(error))

    }, [refresh])



    const handleDelete = (id) => {
        axios.delete("/api/workers/delete/" + id, workers)
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
            <Link to='/admin/workers/new' className="edit">Prideti nauja darbuotoja</Link>
            {workers ?


                <table className="lentele">

                    <thead className="tbl-header" >
                        <tr>
                            <th>#</th>
                            <th>Nuotrauka</th>
                            <th>Vardas</th>
                            <th>Pavarde</th>
                            <th>Salonas</th>
                            <th>Ka norite Padaryti?</th>



                        </tr>
                    </thead>
                    <tbody className="tbl-content">
                        {workers.map(worker =>
                            <tr key={worker.id}>
                                <td>{worker.id}</td>
                                <td><img src={worker.photo}
                                    alt={worker.first_name + ' ' + worker.last_name}
                                /></td>
                                <td>{worker.first_name}</td>
                                <td>{worker.last_name}</td>
                                <td>{worker.saloon.name}</td>

                                <td> <Link to={"/admin/workers/edit/" + worker.id} className="edit">
                                    Redaguoti
                                </Link>
                                    <Link to='/admin/workers' className="delete"
                                        onClick={(e) => handleDelete(worker.id)}>Ištrinti</Link>
                                </td>

                            </tr>
                        )}
                    </tbody>
                </table>
                :
                <h3>Nėra Registruotu paslaugu
                    <Link to='./admin/workers/new' className="edit">Prideti nauja darbuotoja</Link>
                </h3>
            }



        </>


    )
}

export default Workers