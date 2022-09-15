import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const NewWorker = () => {
    const navigate = useNavigate()

    const [saloons, setSaloons] = useState([])
    const [postForm, setPostForm] = useState({
        first_name: "",
        last_name: "",
        photo: "",
        saloonId: ""
    });

    const [alert, setAlert] = useState({
        message: '',
        status: ''
    })



    const handleForm = (e) => {
        setPostForm({ ...postForm, [e.target.name]: e.target.name === 'photo' ? e.target.files[0] : e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = new FormData

        for (const key in postForm) {
            form.append(key, postForm[key])
        }

        axios.post("/api/workers/new", form)
            .then(resp => {
                setAlert(
                    {
                        message: resp.data,
                        status: 'success'
                    })
                navigate('/admin/workers')

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
        <div className=''>
            <h1>NaUJAS DARBUOTOJAS</h1>
            <form onSubmit={(e) => handleSubmit(e)} className=''>
                <div className=''>
                    <label>Vardas</label>
                    <input type="text" name="first_name" onChange={(e) => handleForm(e)} />
                </div>
                <div className=''>
                    <label>Pavarde</label>
                    <input name="last_name" onChange={(e) => handleForm(e)}></input>
                </div>
                <div className=''>
                    <label>Nuotrauka</label>
                    <input type="file" name="photo" onChange={(e) => handleForm(e)} />
                </div>
                <select className="form-control" name="saloonId" required onChange={handleForm}>
                    <option value=''>Pasirinkite Salona</option>
                    {saloons.map(saloon => <option key={saloon.id} value={saloon.id}>{saloon.name}</option>)}
                </select>

                <button className=''>Prideti</button>
            </form>
        </div>
    );
};

export default NewWorker


