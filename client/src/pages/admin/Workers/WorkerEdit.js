import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../components/style/edit.css"
import MainContext from "../../../context/MainContext";



const WorkerEdit = () => {
    const { setAlert } = useContext(MainContext)
    const [saloons, setSaloons] = useState([])
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState({
        first_name: "",
        last_name: "",
        photo: "",
    });

    useEffect(() => {
        axios.get("/api/workers/edit/" + id)
            .then(resp => {
                console.log(resp);
                if (!resp.data) {

                    //navigate("/admin/workers/");
                    return
                }
                setPost(resp.data);
            })
            .catch((error) => {
                console.log(error);
                navigate("/admin");
            });
    }, []);

    const handleForm = (e) => {
        setPost({ ...post, [e.target.name]: e.target.name === 'photo' ? e.target.files[0] : e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData()


        for (const key in post) {
            formData.append(key, post[key])
        }

        axios.put("/api/workers/edit/" + id, formData)
            .then((resp) => {
                setPost(resp.data)
                navigate('/admin/workers')
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
            <h1>Redaguoti darbuotojo duomenis</h1>
            <div className="transparent">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="mb-2">
                        <label>Vardas</label>
                        <input
                            type="text"
                            name="first_name"
                            className="form-control"
                            onChange={(e) => handleForm(e)}
                            value={post.first_name}
                        />
                    </div>
                    <div className="form-control">
                        <label>Pavarde</label>
                        <input
                            type='text'
                            name="last_name"
                            onChange={(e) => handleForm(e)}
                            value={post.last_name}
                        ></input>
                    </div>
                    <div className="form-control">
                        <label>Nuotrauka</label>
                        <input
                            type="file"
                            name="photo"
                            onChange={(e) => handleForm(e)}
                        />
                    </div>
                    {post.photo && typeof post.photo === 'string' &&
                        <div className="mb-2">

                            <img src={post.photo} alt="" style={{ maxEidth: 200 }} />
                            <button className="delete mt-2" onClick={(e) => {
                                setPost({ ...post, photo: '' })
                            }}
                            >Istrinti nuotrauka</button>
                        </div>

                    }
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

export default WorkerEdit;
