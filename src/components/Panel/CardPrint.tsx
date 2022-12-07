import { useState } from "react";
import { useNavigate } from "react-router-dom";
import printService from "../../services/print.service";
import CardDelete from "./CardDelete";

const CardPrint = ({ print, allDescriptions, handleChangePrints }:any) => {
    const navigate = useNavigate();
    const [ viewCard, setViewCard ] = useState(false);
    const [ viewEditCard, setViewEditCard ] = useState(false);

    const handleChangeViewCard = () => {
        if (viewEditCard) {
            setViewEditCard(!viewEditCard)
        };
        setViewCard(!viewCard)
    };
    const handleChangeViewEditCard = () => {
        if (viewCard) {
            setViewCard(!viewCard)
        };
        setViewEditCard(!viewEditCard)
    };
    const handleSelectStatusMessage = () => {
        switch(print.status) {
            case "ACTIVE":
                return "PEDIDO EN PROGRESO"
            case "PROGRESS":
                return "ENTREGAR PEDIDO"
            default:
                return "-"
        }
    };
    const handleSelectStatusColor = () => {
        switch(print.status) {
            case "ACTIVE":
                return "bg-orange-600 hover:bg-orange-400 active:bg-orange-500"
            case "PROGRESS":
                return "bg-green-700 hover:bg-green-500 active:bg-green-600"
            default:
                return "-"
        }
    };
    const handleDelete = async () => {
        const token = window.localStorage.getItem("token");
        try {
            await printService.delete(print.id, token);
            handleChangePrints(token);
        } catch(error) {
            alert("Ah ocurrido un error al eliminar el pedido")
        }
    };
    const handleChangeStatus = async () => {
        const token = window.localStorage.getItem("token");
        if (!token) navigate("/login");
        try {
            let status = "";
            switch (print.status) {
                case "ACTIVE":
                    status = "PROGRESS";
                    break;
                case "PROGRESS":
                    status = "INACTIVE";
                    break;
            };
            await printService.putStatus(print.id, status, token);
            handleChangePrints(token);
        } catch (error) {
            alert("Error al cambiar el estado")
        }
    };
    const handleSelectDate = (date: string) => {
        const datetime = new Date(date);
        let day:string;
        let month: string;
        switch (datetime.getDay()) {
            case 0:
                day = "DOMINGO";
                break
            case 1:
                day = "LUNES";
                break
            case 2:
                day = "MARTES";
                break
            case 3:
                day = "MIERCOLES";
                break
            case 4:
                day = "JUEVES";
                break
            case 5:
                day = "VIERNES";
                break
            case 6:
                day = "SABADO";
                break
            default:
                day = "-"
                break
        };
        switch (datetime.getMonth()) {
            case 0:
                month = "ENERO";
                break
            case 1:
                month = "FEBRERO";
                break
            case 2:
                month = "MARZO";
                break
            case 3:
                month = "ABRIL";
                break
            case 4:
                month = "MAYO";
                break
            case 5:
                month = "JUNIO";
                break
            case 6:
                month = "JULIO";
                break
            case 7:
                month = "AGOSTO";
                break
            case 8:
                month = "SEPTIEMBRE";
                break
            case 9:
                month = "OCTUBRE";
                break
            case 10:
                month = "NOVIEMBRE";
                break
            case 11:
                month = "DICIEMBRE";
                break
            default:
                month = "-"
                break
        };
        return `${day} ${datetime.getDate()} de ${month}`
    }

  return (
    <>
        <div className="flex w-full min-h-[120px]">
            <div className={`flex w-[75%] h-full hover:cursor-pointer
            ${(print.status == "ACTIVE")? "bg-[#FFF685]/50 hover:bg-[#FFF685]" : "bg-green-300/50 hover:bg-green-300"}`}
            onClick={(e) => handleChangeViewCard()}>
                <div className="flex flex-col items-center w-[13%] h-full ">
                    <div className="pt-1"><p className="text-2xl text-gray-800 font-bold select-none">CODIGO</p></div>
                    <div className="flex justify-center items-center p-3 bg-[#EEEEEE] border border-black">
                        <p className="text-5xl">{print.internalCode}</p>
                    </div>
                </div>
                <div className="flex flex-col w-[20%] h-full p-1 ">
                    <div><p className="text-xl text-gray-800 font-bold select-none">FECHA ALTA</p></div>
                    <div className="flex jutify-center items-center w-full h-full">
                        <p className="text-3xl">{ handleSelectDate(print.createAt) }</p>
                    </div>
                </div>
                <div className="flex flex-col w-[20%] h-full p-1 ">
                    <div><p className="text-xl text-gray-800 font-bold select-none">NOMBRE COMPLETO</p></div>
                    <div className="flex jutify-center items-center w-full h-full">
                        <p className="text-3xl">{print.fullName}</p>
                    </div>
                </div>
                <div className="flex flex-col w-[13%] h-full p-1 ">
                    <div><p className="text-xl text-gray-800 font-bold select-none">CELULAR</p></div>
                    <div className="flex jutify-center items-center w-full h-full">
                        <p className="text-3xl">{(print.cellNumber)? print.cellNumber : "-" }</p>
                    </div>
                </div>
                <div className="flex flex-col w-[20%] h-full p-1 ">
                    <div><p className="text-xl text-gray-800 font-bold select-none">LUGAR</p></div>
                    <div className="flex jutify-center items-center w-full h-full">
                        <p className="text-2xl">{print.location.name}</p>
                    </div>
                </div>
                <div className="flex flex-col w-[8%] h-full p-1 ">
                    <div><p className="text-xl tex t-gray-800 font-bold select-none">MONTO TOTAL</p></div>
                    <div className="flex jutify-center items-center w-full h-full">
                        <p className="text-3xl">{(print.totalMoney)? `$ ${print.totalMoney}` : "-" }</p>
                    </div>
                </div>
                <div className="flex flex-col w-[8%] h-full p-1 ">
                    <div><p className="text-xl text-gray-800 font-bold select-none">SEÑA</p></div>
                    <div className="flex jutify-center items-center w-full h-full">
                        <p className="text-3xl">{(print.advanceMoney)? `$ ${print.advanceMoney}` : "-" }</p>
                    </div>
                </div>
                <div className="flex flex-col w-[8%] h-full p-1 ">
                    <div><p className="text-xl text-gray-800 font-bold select-none">SALDO</p></div>
                    <div className="flex jutify-center items-center w-full h-full">
                        <p className="text-3xl">{(print.totalMoney && print.advanceMoney)? `$ ${print.totalMoney - print.advanceMoney}` : "-" }</p>
                    </div>
                </div>
            </div>
            <div className={`flex h-full w-[25%]
            ${(print.status == "ACTIVE")? "bg-[#FFF685]/50" : "bg-green-300/50"}`}>
                <div className="flex justify-center items-center w-full gap-3 ">
                    <button onClick={(e) => handleChangeStatus()} className={"py-3 px-5 text-xl text-white font-bold rounded-full shadow shadow-gray-600 " + handleSelectStatusColor()}>
                        { handleSelectStatusMessage() }
                    </button>
                    <button className="bg-violet-700 py-3 px-5 text-xl text-white font-bold rounded-full shadow shadow-gray-600
                    hover:bg-violet-500 active:bg-violet-600"
                    onClick={(e) => handleChangeViewEditCard()}>
                        EDITAR
                    </button>
                    <button onClick={(e) => handleDelete()} className="bg-[#FF1D58] py-3 px-5 text-xl text-white font-bold rounded-full shadow shadow-gray-600
                    hover:bg-rose-700 active:bg-rose-600">
                        ELIMINAR / CANCELAR
                    </button>
                </div>
            </div>
        </div>
        {
            (viewCard || allDescriptions)?
                <div className="flex flex-col w-full min-h-[150px] bg-[#ECECEC] border-x border-b border-gray-300 rounded">
                    <div className="flex w-full h-[100px]">
                    <div className="flex justify-center items-center h-full w-[10%]">
                        <p className="text-3xl font-bold select-none">DESCRIPCION:</p>
                    </div>
                    <div className="flex p-2 h-full w-full">
                        <p className="text-3xl">
                            { print.description.replace(/\n/g, ", ")}
                        </p>
                    </div>
                    </div>
                    <div className="flex justify-center items-center w-full h-[50px] border-t border-gray-300">
                        <p className="flex text-2xl w-[10%] justify-center items-center font-bold select-none">REMITENTE:</p>
                        <p className="flex text-2xl w-full h-full items-center pl-[20px]">{print.user.email}</p>

                    </div>
                </div>
            : null
        }
        {
            (viewEditCard)?
                <div className="flex flex-col w-full min-h-[150px] bg-[#ECECEC] border-x border-b border-gray-300 rounded">

                </div>
            : null
        }
    </>
  )
}

export default CardPrint