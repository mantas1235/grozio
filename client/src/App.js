import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import Saloons from "./pages/admin/Saloons/list";
import NewSaloon from "./pages/admin/Saloons/New";
import MainContext from "./context/MainContext";
import { useState } from "react";
import Header from "./components/header/header";
import Alert from "./components/Alert/Alert";
import EditPost from "./pages/admin/Saloons/edit";
import NewService from "./pages/admin/Services/newService";
import Services from "./pages/admin/Services/Services";
import Workers from "./pages/admin/Workers/Workers";
import NewWorker from "./pages/admin/Workers/newWorker";
import WorkerEdit from "./pages/admin/Workers/WorkerEdit";
import ServiceEdit from "./pages/admin/Services/serviceEdit";
import Orders from "./pages/admin/Orders/orders";

const App = () => {
  const [alert, setAlert] = useState({
    message: '',
    status: '',
  })

  const contextValues = { alert, setAlert }

  return (
    <BrowserRouter>
      <MainContext.Provider value={contextValues}>
        <Header />
        <div className="container">
          <Alert />
          <Routes>
            <Route path='/admin'>
              <Route index element={<Saloons />} />
              <Route path='saloons/new' element={<NewSaloon />} />
              <Route path='services/new' element={<NewService />} />
              <Route path='services' element={<Services />} />
              <Route path='workers' element={<Workers />} />
              <Route path='workers/new' element={<NewWorker />} />
              <Route path='workers/edit/:id' element={<WorkerEdit />} />
              <Route path='services/edit/:id' element={<ServiceEdit />} />
              <Route path='orders' element={<Orders />} />

              <Route path='saloons/edit/:id' element={<EditPost />} />
            </Route>
          </Routes>
        </div>
      </MainContext.Provider>
    </BrowserRouter>
  )
}

export default App;
