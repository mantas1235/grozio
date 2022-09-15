import { Link } from "react-router-dom"
import '../style/header.css'


const Header = () => {
    return (
        <header className="header p-3 ">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        <h1>Grožio Salonas "DALIA"</h1>
                    </a>
                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 ms-5 justify-content-center mb-md-0">
                        <li><Link to='/' className="nav-link px-2 text-white">Titulinis</Link>
                        </li>

                        <li><Link to='/admin' className="nav-link px-2 text-white">Administratorius</Link>
                        </li>
                        <li><Link to='/admin/services' className="nav-link px-2 text-white">paslaugu sarasas</Link>
                        </li>
                        <li><Link to='/admin/workers/' className="nav-link px-2 text-white">darbuotoju sarasas</Link>
                        </li>
                    </ul>
                    <div className="text-end">
                        <button type="button" className="btn btn-outline-light me-2">Prisijungti</button>
                        <button type="button" className="btn btn-warning">Registruotis</button>
                    </div>
                </div>
            </div>
        </header>

    )
}

export default Header

