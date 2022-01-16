import {NavLink} from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router";

function Login() {
const {login} = useAuth();
const [errorMsg, setErrorMsg] = useState("")
const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col items-center bg-gradient-to-r  from-pink-500 to-orange-400 min-h-screen">
      <div className="w-full max-w-md">
        <div className="flex justify-center pb-2">
          <h2 className="text-white font-semibold text-4xl mt-32 text-center">Inicia sesión</h2>
        </div>
        <Formik
        initialValues={{
            username:"",
            password:"",
        }}
        validationSchema={Yup.object().shape({
            username: Yup.string()
              .required("El usuario es obligatorio"),
            password: Yup.string().required("La contraseña es obligatoria"),
          })}
        
          onSubmit={(values, {setSubmitting}) => {
          const result = login(values);
          console.log(result);
          if(result){
            console.log("Usuario conectado!")
            navigate("/");
          }
          else{
            setErrorMsg("Los datos son incorrectos");
          }
        }}

        
        >
            {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
                <label
                className="mb-2 mt-2 font-medium ds-font-body-medium text-white"
                htmlFor="username"
              >
                Nombre de usuario
              </label>
              <input
                type="username"
                id="username"
                name="username"
                className={ `${errors.username && touched.username && "ring-red-700 ring-2"} transition-colors w-full h-10 border border-gray2 rounded-lg px-3 py-2 mt-2 hover:border-gray6 outline-none focus:border-viridian border-alertRed`}
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              { errors.email && touched.email && <div className="p-2 text-sm text-red-700"> {errors.email} </div> }

              <div className="flex justify-between items-center">
                <label
                  className="mb-2 mt-2 font-medium ds-font-body-medium text-white"
                  htmlFor="password"
                >
                  Contraseña
                </label>
                </div>
                <input
                aria-required="true"
                data-testid="password"
                type="password"
                id="password"
                name="password"
                className={ `${errors.password && touched.password && "ring-red-700 ring-2"}  transition-colors w-full h-10 border border-gray2 rounded-lg px-3 py-2 hover:border-gray6 outline-none focus:border-viridian border-alertRed`}
                value={values.password}
                onChange={handleChange}
                aria-describedby="name-error"
              />
              { errors.password && touched.password && <div className="p-2 text-sm text-red-700"> {errors.password} </div> }
              {errorMsg && <div className="p-2 text-sm text-red-700"> {errorMsg} </div>}
              <button
                type="submit"
                className="w-full mt-5 border border-white transition ease-in-out text-white font-semibold h-12 rounded-lg hover:-translate-y-1 hover:scale-99"
              >
                Entrar
              </button>
            </form>
          )}

        </Formik>
      </div>
    </div>
  );
}

export default Login;
