import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MainContext from "../../../context/MainContext";
import "../../../components/style/edit.css"




const ServiceEdit = () => {
    const { setAlert } = useContext(MainContext)
    const [saloons, setSaloons] = useState([])
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState({
        name: '',
        duration: '',
        price: ''
    });

    useEffect(() => {
        axios.get("/api/services/edit/" + id)
            .then((resp) => {
                if (!resp.data) {
                    navigate("/admin/services");
                    return;
                }
                setPost(resp.data);
            })
            .catch((error) => {
                console.log(error);
                navigate("/");
            });
    }, []);

    const handleForm = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();


        axios.put("/api/services/edit/" + id, post)
            .then((resp) => {
                setPost(resp.data)
                navigate('/admin/services')
            });
    };


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
        <div className="container">
            <h1>Redaguojamas Straipsnis</h1>
            <div className="transparent">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="mb-2">
                        <label>Pavadinimas</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            onChange={(e) => handleForm(e)}
                            value={post.name}
                        />
                    </div>
                    <div className="form-control">
                        <label>Laikas</label>
                        <input
                            name="duration"
                            onChange={(e) => handleForm(e)}
                            value={post.duration}
                        ></input>
                    </div>
                    <div className="form-control">
                        <label>Kaina</label>
                        <input
                            type="text"
                            name="price"
                            onChange={(e) => handleForm(e)}
                            value={post.price}
                        />
                    </div>
                    <select className="form-control" name="saloonId" onChange={handleForm}>
                        <option value=''>Pasirinkite Salona</option>
                        {saloons.map(saloon => <option key={saloon.id} value={saloon.id}>{saloon.name}</option>)}
                    </select>
                    <button className="btn btn-primary">Prideti</button>
                </form>
            </div>
        </div>
    );
};

export default ServiceEdit;
