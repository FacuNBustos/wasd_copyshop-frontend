import Joi from "joi";
import React, { useEffect, useRef, useState } from "react"
import CardPrint from "./CardPrint";
import ArrowDrop from "../../assets/icons/arrow_drop_icon.png";
import DeleteIcon from "../../assets/icons/delete_icon.png";
import ArrowRight from "../../assets/icons/arrow-right_icon.png";
import ArrowLeft from "../../assets/icons/arrow-left_icon.png";
import locationService from "../../services/location.service";
import printService from "../../services/print.service";
import { useAppSelector } from "../../hooks/store.hooks";
import { selectId } from "../../store/user.store";

const PrintPage = () => {
  const userId = useAppSelector(selectId);
  const [ filterMenu, setFilterMenu ] = useState(false);
  const [ allDescriptions, setAllDescriptions ] = useState(false);
  const [ locations, setLocations ] = useState([]);
  const [ prints, setPrints ] = useState([]);

  const [ fullName, setFullName ] = useState("");
  const [ locationForm, setLocationForm ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ advanceMoney, setAdvanceMoney ] = useState("");
  const [ totalMoney, setTotalMoney ] = useState("") ;
  const [ cellNumber, setCellNumber ] = useState("");
  const [ errorValidate, setErrorValidate ] = useState(false);

  const page = useRef(1);
  const [ order, setOrder ] = useState("DESC");
  const [ locationSearch, setLocationSearch ] = useState("");
  const [ internalCode, setInternalCode ] = useState("");
  const [ fullNameSearch, setFullNameSearch ] = useState("");
  const [ cellNumberSearch, setCellNumberSearch ] = useState("");
  const [ createAt, setCreateAt ] = useState("");
  const [ status, setStatus ] = useState("");

  const handleChangeLocations = async (token: any) => {
    try {
      const response = await locationService.list(token);
      setLocations(response.locations);
    } catch(error) {}
  };
  const handleChangePrints = async (token: any) => {
    try {
      setPrints([]);
      const datetime = (createAt)? new Date(createAt).getTime() : "";
      const response = await printService.list({
        page: page.current,
        order: order,
        location: locationSearch,
        internalCode: internalCode,
        fullName: fullNameSearch,
        cellNumber: cellNumberSearch,
        datetime: datetime,
        status: status
      }, token)
      setPrints(response.prints);
    } catch(error) {}
  };

  const handleChangeFilterMenu = () => {
    setFilterMenu(!filterMenu)
  };
  const handleChangeAllDescriptions = () => {
    setAllDescriptions(!allDescriptions)
  };
  const handleChangeFullName = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value)
  };
  const handleChangeLocationForm = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setLocationForm(e.target.value)
  };
  const handleChangeDescription = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  };
  const handleChangeAdvanceMoney = (e:React.ChangeEvent<HTMLInputElement>) => {
    setAdvanceMoney(e.target.value)
  };
  const handleChangeTotalMoney = (e:React.ChangeEvent<HTMLInputElement>) => {
    setTotalMoney(e.target.value)
  };
  const handleChangeCellNumber = (e:React.ChangeEvent<HTMLInputElement>) => {
    setCellNumber(e.target.value)
  };
  const handleChangeErrorValidate = (boolean: boolean) => {
    setErrorValidate(boolean)
  };
  const handleChangeCreateAt = (e:React.ChangeEvent<HTMLInputElement>) => {
    setCreateAt(e.target.value)
  };
  const handleChangeStatus = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value)
  };
  const handleNextPage = () => {
    page.current = page.current + 1;
    const token = window.localStorage.getItem("token");
    handleChangePrints(token)
  };
  const handleBackPage = () => {
    page.current = page.current - 1
    const token = window.localStorage.getItem("token");
    handleChangePrints(token)
  };

  const handleCleanForm = () => {
    setFullName(""),
    setDescription(""),
    setAdvanceMoney("");
    setTotalMoney(""),
    setCellNumber("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    page.current = 1
    handleChangeErrorValidate(false);
    try {
      const token = window.localStorage.getItem("token");
      const validObject = Joi.object({
        location: Joi.string().required(),
        fullName: Joi.string().min(5).max(100).required(),
        description: Joi.string().min(3).max(150).required(),
        advanceMoney: Joi.number().min(0).max(Number.MAX_VALUE).allow(null),
        totalMoney: Joi.number().min(0).max(Number.MAX_VALUE).allow(null),
        cellNumber: Joi.string().allow(null)
      });
      const { error, value } = validObject.validate({
        location: locationForm,
        fullName: fullName,
        description: description,
        advanceMoney: (advanceMoney)? advanceMoney : null,
        totalMoney: (totalMoney) ? totalMoney : null,
        cellNumber: (cellNumber)? cellNumber : null
      });
      if (error) throw new Error("validation");

      await printService.post({
        user: userId,
        location: locationForm,
        fullName: value.fullName,
        description: value.description,
        advanceMoney: value.advanceMoney,
        totalMoney: value.totalMoney,
        cellNumber: value.cellNumber
      }, token);
      
      handleCleanForm();
      handleChangePrints(token);
    } catch(error:any) {
      switch(error.message) {
        case "validation":
          handleChangeErrorValidate(true);
          break;
        default:
          alert("Error al subir el pedido")
          break;
      }
    }
  };
  const handleSubmitSearch = (e:React.FormEvent<HTMLFormElement>) => {
    const token = window.localStorage.getItem("token");
    e.preventDefault();
    page.current = 1
    if (token) {
      handleChangePrints(token);
    }
  };
  const handleChangeLocationSearch = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocationSearch(e.target.value)
  };
  const handleChangeInternalCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalCode(e.target.value)
  };
  const handleChangeFullNameSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullNameSearch(e.target.value)
  };
  const handleChangeCellNumberSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCellNumberSearch(e.target.value)
  };
  const handleCleanSearchForm = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    setLocationSearch("");
    setInternalCode("");
    setFullNameSearch("");
    setCellNumberSearch("");
    setCreateAt("");
    setStatus("");
  };

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    handleChangeLocations(token);
    handleChangePrints(token);
    
  }, [
    window.location.reload
  ]);

  return (
    <div className="flex flex-col w-full h-full bg-[#EFEFEF] p-2">
      {
        (errorValidate)?
        <div className="flex justify-center items-center w-full bg-yellow-300/50">
          <p className="text-2xl p-1">ERROR EN ALGUN CAMPO INGRESADO</p>
        </div>
        : null
      }
      <div className="w-full h-[200px] bg-[#00AACC] relative">
        <form className="flex justify-between items-center w-full h-full text-2xl px-[20px]" onSubmit={e => handleSubmit(e)}>
          <select name="" id="" className="w-[400px] h-[50px] text-center" value={locationForm} onChange={(e) => handleChangeLocationForm(e)}>
            <option value="" >Selecciona una Locación</option>
            {
              (locations)? locations.map((location:any, key) => {
                return <option value={location.id} key={key}>{location.name}</option>
              })
              : null
            }
          </select>
          <input type="text" value={fullName} placeholder="Nombre Completo" className="w-[400px] h-[50px] text-center" onChange={(e) => handleChangeFullName(e)}/>
          <textarea name="description" value={description} cols={30} rows={10} className="w-[500px] h-[150px] resize-none p-2" placeholder="Descripcion" onChange={(e) => {handleChangeDescription(e)}}/>
          <input type="number" value={advanceMoney} placeholder="Adelanto de Dinero" className="w-[400px] h-[50px] text-center" onChange={(e) => handleChangeAdvanceMoney(e)}/>
          <input type="number" value={totalMoney} placeholder="Monto Total" className="w-[400px] h-[50px] text-center" onChange={(e) => handleChangeTotalMoney(e)}/>
          <input type="text" value={cellNumber} placeholder="Numero de Telefono" className="w-[400px] h-[50px] text-center" onChange={(e) => handleChangeCellNumber(e)}/>
          <button type="submit" className="h-[50px] p-3 rounded-lg shadow-lg bg-[#00DD55]
          hover:bg-[#FFF685]">
            AGREGAR
          </button>
        </form>
        <button onClick={(e) => handleChangeFilterMenu()} className="flex absolute right-1 bottom-1">
          <img src={ArrowDrop} alt="open_menu" />
        </button>
      </div>
      {
        (filterMenu)?
        <div className="flex w-full h-[80px] bg-white">
          <div className="flex justify-center items-center text-xl gap-3 pl-[20px]">
            <input type="checkbox" checked={allDescriptions} className="w-[30px] h-[30px]" onChange={(e) => handleChangeAllDescriptions()}/>
            <p>DESCRIPCIONES</p>
          </div>
          <div className="flex h-full w-full pl-[100px]">
            <form className="flex w-full h-full items-center gap-4" onSubmit={(e) => handleSubmitSearch(e)}>
              <select className="h-[40px] w-[300px] text-center border border-gray-400 bg-white text-2xl" value={status}
              onChange={(e) => handleChangeStatus(e)}>
                <option value="">Estado de Pedido</option>
                <option value="ACTIVE">PARA IMPRIMIR</option>
                <option value="PROGRESS">LISTO A ENTREGAR</option>
              </select>
              <select className="h-[40px] w-[500px] text-center border border-gray-400 bg-white text-2xl" value={locationSearch} 
              onChange={(e) => handleChangeLocationSearch(e)}>
                <option value="">Buscar por Locación</option>
                {
                  (locations)? locations.map((location:any, key) => {
                    return <option value={location.id} key={key}>{location.name}</option>
                  })
                  : null
                }
              </select>
              <input type="text" onChange={(e) => handleChangeInternalCode(e)} value={internalCode} className="h-[40px] w-[300px] text-2xl text-center border border-gray-400" placeholder="Codigo Interno"/>
              <input type="text" onChange={(e) => handleChangeFullNameSearch(e)} value={fullNameSearch} className="h-[40px] w-[500px] text-2xl text-center border border-gray-400" placeholder="Nombre Completo"/>
              <input type="text" onChange={(e) => handleChangeCellNumberSearch(e)} value={cellNumberSearch} className="h-[40px] w-[400px] text-2xl text-center border border-gray-400" placeholder="Celular"/>
              <input type="date" onChange={(e) => handleChangeCreateAt(e)} value={createAt} className="flex text-center w-[300px] h-[40px] text-centet text-2xl p-1 border border-gray-400"/>
              <img src={DeleteIcon} alt="clean_form" className="ml-[10px] w-[40px] hover:cursor-pointer" onClick={(e) => handleCleanSearchForm(e)}/>
              <button type="submit" className="absolute right-[50px] h-[50px] w-[200px] text-center p-3 rounded-lg shadow-lg bg-[#0049B7]
              hover:bg-[#00DDAA] hover:text-black text-xl font-bold text-white">
                FILTRAR
              </button>
            </form>
          </div>
        </div>
      : null
      }
      <div className="flex flex-col overflow-y-scroll overflow-auto w-full h-full gap-1 mt-1">
        {
          (prints)? prints.map((print, key)=> {
            return <CardPrint key={key} print={print} allDescriptions={allDescriptions} handleChangePrints={handleChangePrints}/>
          })
          : <div className="w-full text-2xl text-center mt-3 ">NO SE ENCUENTRARON RESULTADOS</div>
        }
      </div>
      {
        (!(prints.length != 30 && page.current == 1))?
        <div className="flex justify-center items-center w-full h-[60px] bg-[#EEEEEE]">
        {
          (page.current > 1)?
            <button onClick={(e) => handleBackPage()}>
              <img src={ArrowLeft} alt="atras" className="h-[30px]"/>
            </button>
          : null
        }
        <p className="flex items-center text-xl font-bold px-[20px]"> - - -</p>
        {
          (prints.length == 30)?
            <button onClick={(e) => handleNextPage()}>
              <img src={ArrowRight} alt="adelante" className="h-[30px]" />
            </button>
          : null
        }
        </div>
      : null
      }
    </div>
  )
}

export default PrintPage