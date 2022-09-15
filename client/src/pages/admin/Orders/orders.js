import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import MainContext from "../../../context/MainContext"
import '../../../components/style/list.css'

const Orders = () => {
    const [orders, setOrders] = useState([])
    const { setAlert } = useContext(MainContext)
    const [refresh, setRefresh] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        axios.get('/api/orders/')
            .then(resp => setOrders(resp.data))
            .catch(error => console.log(error))

    }, [refresh])



    const handleDelete = (id) => {
        axios.delete("/api/orders/delete/" + id, orders)
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
            <Link to='/admin/orders/new' className="edit">Prideti nauja darbuotoja</Link>
            {orders ?


                <table className="lentele">

                    <thead className="tbl-header" >
                        <tr>
                            <th>#</th>
                            <th>Uzsakymo Data</th>
                            <th>Statusas</th>




                        </tr>
                    </thead>
                    <tbody className="tbl-content">
                        {orders.map(order =>
                            <tr key={order.id}>
                                <td>{order.id}</td>

                                <td>{new Date(order.order_date).toLocaleString('lt-LT')}</td>
                                <td>{order.staus ? 'Patvirtintas' : 'Nepatvirtintas'}</td>

                                <td> <Link to={"/admin/orders/edit/" + order.id} className="edit">
                                    Redaguoti
                                </Link>
                                    <Link to='/admin/orders' className="delete"
                                        onClick={(e) => handleDelete(order.id)}>Ištrinti</Link>
                                </td>

                            </tr>
                        )}
                    </tbody>
                </table>
                :
                <h3>Nėra Registruotu uzsakymu
                    <Link to='./admin/orders/new' className="edit">Prideti nauja darbuotoja</Link>
                </h3>
            }



        </>


    )
}

export default Orders