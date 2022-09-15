import { useParams } from "react-router-dom";
import { useEffect, useState, } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../components/style/edit.css"
const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState({
        name: "",
        address: "",
        phone: "",
    });

    useEffect(() => {
        axios.get("/api/saloons/edit/" + id)
            .then((resp) => {
                if (!resp.data) {
                    navigate("/admin");
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


        axios.put("/api/saloons/edit/" + id, post)
            .then((resp) => {
                setPost(resp.data)
                navigate('/admin')
            });
    };
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
                        <label>Adresas</label>
                        <input
                            name="address"
                            onChange={(e) => handleForm(e)}
                            value={post.address}
                        ></input>
                    </div>
                    <div className="form-control">
                        <label>Telefono numeris</label>
                        <input
                            type="tel"
                            name="phone"
                            onChange={(e) => handleForm(e)}
                            value={post.phone}
                        />
                    </div>
                    <button className="btn btn-primary">Prideti</button>
                </form>
            </div>
        </div>
    );
};

export default EditPost;
