import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import UserIcon from "../../assets/icons/account_icon.png";
import LocationIcon from "../../assets/icons/location_icon.png";
import PanelIcon from "../../assets/icons/blocks_icon.png";
import ArrowRight from "../../assets/icons/arrow-right_icon.png";
import ArrowLeft from "../../assets/icons/arrow-left_icon.png";
import LogoutIcon from "../../assets/icons/logout_icon.png";
import { useAppSelector } from "../../hooks/store.hooks";
import { selectRole } from "../../store/user.store";

const Sidebar = () => {
    const navigate = useNavigate();
    const userRole = useAppSelector(selectRole);
    const [ closeMenu, setCloseMenu ] = useState(true);
    const [ administrator, setAdministrator ] = useState(false);
    const handleChangeCloseOpen = () => {
        setCloseMenu(!closeMenu)
    };
    const handleChangeAdministrator = (boolean: boolean) => {
        setAdministrator(boolean)
    };
    const handleLogout = () => {
        window.localStorage.removeItem("token");
        navigate("/login");
    };

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        if (token && userRole == "administrator") {
            handleChangeAdministrator(true);
        };
    }, [
        window.location.reload
    ]);

  return (
    (closeMenu) ? 
    <div className="flex items-center flex-col w-[100px] h-full bg-[#004987] shadow-xl shadow-black pt-4">
        <div className="flex justify-center items-center w-[100px] h-[40px]">
            <button onClick={e => handleChangeCloseOpen()}>
                <img src={ArrowRight} alt="close/open" className="h-[40px]"/>
            </button>
        </div>
        <div className="flex justify-center items-center w-[100px] h-[85px] mt-[30px] border-y border-gray-800
        hover:bg-[#00DDFF]">
            <button onClick={e => navigate("prints")}>
                <img src={PanelIcon} alt="blocks" className="h-[80px]"/>
            </button>
        </div>
        {
            (administrator)?
            <div className="flex justify-center items-center w-[100px] h-[85px] border-y border-gray-800
            hover:bg-[#00DDFF]">
                <button onClick={e => navigate("users")}>
                    <img src={UserIcon} alt="blocks" className="h-[70px]"/>
                </button>
            </div>
            : null
        }
        {
            (administrator)?
            <div className="flex justify-center items-center w-[100px] h-[85px] border-y border-gray-800
            hover:bg-[#00DDFF]">
                <button onClick={e => navigate("locations")}>
                    <img src={LocationIcon} alt="blocks" className="h-[70px]"/>
                </button>
            </div>
            : null
        }
        <div className="flex justify-center items-center w-[100px] h-[85px] mt-[30px] absolute bottom-1
        hover:bg-[#FF1D58]">
            <button onClick={e => handleLogout()}>
                <img src={LogoutIcon} alt="blocks" className="h-[50px]"/>
            </button>
        </div>
    </div>

    :

    <div className="flex flex-col w-[350px] h-full bg-[#004987] shadow-xl shadow-black pt-4">
        <div className="flex justify-end items-center w-[350px] h-[40px]">
            <button onClick={e => handleChangeCloseOpen()}>
                <img src={ArrowLeft} alt="close/open" className="h-[40px]"/>
            </button>
        </div>
        <div className="flex justify-end items-center w-[350px] h-[85px] mt-[30px] border-y border-gray-800 pr-4
        hover:bg-[#00DDFF]">
            <button onClick={e => navigate("prints")} className="flex flex-row justify-center items-center gap-3">
                <p className="text-4xl">PEDIDOS</p>
                <img src={PanelIcon} alt="blocks" className="h-[70px]"/>
            </button>
        </div>
        {
            (administrator)?
            <div className="flex justify-end items-center w-[350px] h-[85px] border-y border-gray-800 pr-4
            hover:bg-[#00DDFF]">
                <button onClick={e => navigate("users")} className="flex flex-row justify-center items-center gap-3">
                    <p className="text-4xl">USUARIOS</p>
                    <img src={UserIcon} alt="blocks" className="h-[65px]"/>
                </button>
            </div>
            : null
        }
        {
            (administrator)?
            <div className="flex justify-end items-center w-[350px] h-[85px] border-y border-gray-800 pr-4
            hover:bg-[#00DDFF]">
                <button onClick={e => navigate("locations")} className="flex flex-row justify-center items-center gap-3">
                    <p className="text-4xl">LOCACIONES</p>
                    <img src={LocationIcon} alt="blocks" className="h-[65px]"/>
                </button>
            </div>
            : null
        }
        <div className="flex justify-center items-center w-[350px] h-[85px] mt-[30px] absolute bottom-1 pl-4
        hover:bg-[#FF1D58]">
            <button onClick={e => handleLogout()} className="flex flex-row justify-center items-center gap-2">
                <p className="text-2xl">SALIR</p>
                <img src={LogoutIcon} alt="blocks" className="h-[50px]"/>
            </button>
        </div>
    </div>    
  )
}

export default Sidebar