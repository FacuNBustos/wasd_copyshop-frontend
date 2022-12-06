import Joi from "joi";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LockIcon from "../../assets/icons/padlock_icon.png";
import KeyIcon from "../../assets/icons/key_icon.png";
import UserService from "../../services/user.service";
import { useAppDispatch } from "../../hooks/store.hooks";
import { changeId, changeRole } from "../../store/user.store";

const Login = () => {
  const navigate = useNavigate();
  const userDispatch = useAppDispatch();
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ error, setError ] = useState(false);

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  };
  const handleChangeError = (boolean: boolean) => {
    setError(boolean)
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validObject = Joi.object({
      email: Joi.string().min(5).max(150).required(),
      password: Joi.string().min(3).max(150).required()
    });
    const { error, value } = validObject.validate({
      email: email,
      password: password
    });
    if (!error) {
      handleChangeError(false);
      try {
        const response = await UserService.login(value.email, value.password);

        window.localStorage.setItem("token", response.token);
        userDispatch(changeId(response.id));
        userDispatch(changeRole(response.role));
        navigate("/panel");
      } catch(error) {
        handleChangeError(true);
      };
      return
    };
    handleChangeError(true);
  };

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      navigate("/panel")
    };
  }, [
    window.location.reload
  ]);

  return (
    <main className="w-screen h-screen bg-login_bg bg-cover">
      <section className="flex justify-center items-center w-full h-full">
        <div className="flex flex-col w-[25vw] h-[50vh]">
          <form className="flex justify-center flex-col w-full gap-5" onSubmit={ (e) => handleSubmit(e) }>
            <div className="flex justify-center w-full mb-[30px]">
              <img src="./wasd_logo.png" alt="wasd_copyshop_logo" className="w-[80%]"/>
            </div>
            {
              (error)? <div className="flex justify-center w-full text-center">
                <p className="flex justify-center items-center w-[80%] h-[50px] bg-yellow-300/50 rounded-lg text-xl">
                  EMAIL O CONTRASEÑA EQUIVOCADOS
                </p>
              </div> :  null
            }
            <div className="flex items-center w-full h-[100px] bg-black/50 rounded-full">
              <img src={LockIcon} alt="padlock_icon" className="absolute ml-[30px]"/>
              <input type="email" value={ email } onChange={ (e) => handleChangeEmail(e) }
              className="w-full h-full rounded-full bg-transparent text-center text-white text-3xl"/>
            </div>
            <div className="flex items-center w-full h-[100px] bg-black/50 rounded-full">
              <img src={KeyIcon} alt="padlock_icon" className="absolute ml-[30px]"/>
              <input type="password" value={ password } onChange={ (e) => handleChangePassword(e) }
              className="w-full h-full rounded-full bg-transparent text-center text-white text-3xl"/>
            </div>
            <div className="w-full h-[100px] rounded-full bg-red-500">
              <button  type="submit" className="w-full h-full text-3xl rounded-full
              hover:bg-red-400
              active:bg-red-300">
                INGRESAR
              </button>
            </div>
          </form>
          <p className="w-full text-center text-2xl text-white mt-2">En caso de problemas comuniquese con el administrador</p>
        </div>
      </section>
    </main>
  )
}

export default Login;