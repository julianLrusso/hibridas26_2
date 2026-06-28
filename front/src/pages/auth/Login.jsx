import { useState, Activity } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useLogin } from '../../contexts/Session.context'
import { useUsuariosService } from '../../services/usuarios.service'
import { useForm } from "react-hook-form"

const Login = () => {
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)

  const login = useLogin()
  const { login: loginService } = useUsuariosService()

  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, errors }
  } = useForm( {mode: "onChange"} )

  const email = watch("email", "")
  const pass = watch("pass", "")

  const onSubmit = (formData) => {
    loginService({
      email: formData.email,
      password: formData.pass
    })
      .then(data => {
        login(data.token, email)
        navigate("/")
      })
      .catch(err => toast.error(err?.response?.data?.message || "No se pudo loguear"))
  }

  return (
    <div className='container d-flex justify-content-center align-items-center vh-100' >
      <div className='card p-4 shadow' style={{ width: '350px' }} >
        <h2 className='text-center mb-4' > Iniciar Session </h2>
        <form onSubmit={handleSubmit(onSubmit)} >
          <div className='mb-3'>
            <label className='form-label' >Email: </label>
            <input type="email" placeholder='Ingrese su mail' className={`form-control ${
              email.length>0 
              ? errors.email 
                ? "is-invalid" 
                : "is-valid"
              : ""
              }`} name='email'
              {...register("email", {
                required: "El campo email es obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "No es un mail valido"
                }
              })}
            />
            <Activity mode={errors?.email ? "visible" : "hidden"}>
              <div className='invalid-feedback'>
                {errors?.email?.message}
              </div>
            </Activity>
          </div>
          <div className='mb-3'>
            <label className='form-label' >Contraseña: </label>
            <div className="input-group">
              <input type={showPass ? "text" : "password"} placeholder='Ingrese su password' className={`form-control ${
                pass.length > 0 
                ? errors.pass ? "is-invalid" : "is-valid"
                : ""
              }`} name='pass'
                {...register("pass", {
                  required: "El campo pass es obligatorio",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-]).{8,}$/,
                    message: "No es un pass valido"
                  }
                })} />
              <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPass(!showPass)}>
                {showPass ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486z"/>
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829z"/>
                    <path d="M8.982 9.857a2.5 2.5 0 0 1-2.84-2.84l-.854-.853a3.5 3.5 0 0 0 4.547 4.547z"/>
                    <path d="M.143 2.31a.5.5 0 0 1 .707-.707l14.14 14.14a.5.5 0 0 1-.707.708L.143 2.309z"/>
                  </svg>
                )}
              </button>
            </div>
            <Activity mode={errors?.pass ? "visible" : "hidden"}>
              <div className='invalid-feedback'>
                {errors?.pass?.message}
              </div>
            </Activity>
          </div>
          <button type='submit' className='btn btn-primary w-100' >Ingresar</button>
        </form>
      </div>
    </div>
  )
}

export default Login