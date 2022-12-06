import axios from "axios";
import { useEffect, useState } from "react"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import PrintPage from "../../components/Panel/PrintPage";
import Sidebar from "../../components/Panel/Sidebar";
import UsersList from "../../components/Panel/UsersList";
import { useAppDispatch } from "../../hooks/store.hooks";
import userService from "../../services/user.service";
import { changeId, changeRole } from "../../store/user.store";

const Home = () => {
  const navigate = useNavigate();
  const userDispatch = useAppDispatch();
  const [ access, setAccess ] = useState(false);
  const handlerAccess = (boolean: boolean) => {
    setAccess(boolean)
  };

  const handleValidateToken = async () => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await userService.validate(token);
      userDispatch(changeRole(response.payload.role));
      userDispatch(changeId(response.payload.id));

      handlerAccess(true);
    } catch(error) {
      handlerAccess(false);
      window.localStorage.removeItem("token");
      navigate("/login");
    }
  };

  useEffect(() => {
    handleValidateToken();
  }, [
    window.location.reload
  ]);

  return (
    (access) ? <>
      <div className="flex flex-row w-screen h-screen">
        <Sidebar />
        
        <Routes>
          <Route path="" element={homePanel()} />
          <Route path="users" element={<UsersList />} />
          <Route path="prints" element={<PrintPage />} />
          <Route path="*" element={<Navigate to={""} />}/>
        </Routes>

      </div>
    </> 
    : <div>ACCESO DENEGADO</div>
  )
}

export default Home

const homePanel = () => {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center gap-2">
      <p className="text-6xl">BETA APPLICATION HERE</p>
      <img src="./construccion.jpg" alt="meme construccion" className="w-[1500px] rounded-xl"/>
    </div>
  )
}