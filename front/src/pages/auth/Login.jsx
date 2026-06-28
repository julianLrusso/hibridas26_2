import { Activity } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogin } from '../../contexts/Session.context'
import { useUsuariosService } from '../../services/usuarios.service'
import { useForm } from "react-hook-form"

const Login = () => {
  const navigate = useNavigate()

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
      .catch(err => console.error("No se pudo loguear"))
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
            <input type="text" placeholder='Ingrese su password' className={`form-control ${
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