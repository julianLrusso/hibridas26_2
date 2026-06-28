import { Activity } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUsuariosService } from '../../services/usuarios.service'
import { useForm } from "react-hook-form"

const Register = () => {
  const navigate = useNavigate()

  const {
    register,         //Se conecta con los values de los inputs
    handleSubmit,     //Valida antes de enviar
    watch,
    formState: { errors, isValid }
  } = useForm()

  const { registro: registroService } = useUsuariosService()

  const email = watch("email", "")
  const pass = watch("pass", "")
  const passConfirm = watch("passConfirm", "")

  const validaciones = {
    longitudMin: pass.length >= 8,
    mayuscula: /[A-Z]/.test(pass),
    minuscula: /[a-z]/.test(pass),
    numero: /[0-9]/.test(pass),
    simbolo: /[@$!%*?&._-]/.test(pass)
  }

  const validacionConfirm = {
    igual: (pass == passConfirm) && pass.length > 0 && passConfirm.length > 0,
    longitudMin: passConfirm.length >= 8,
    mayuscula: /[A-Z]/.test(passConfirm),
    minuscula: /[a-z]/.test(passConfirm),
    numero: /[0-9]/.test(passConfirm),
    simbolo: /[@$!%*?&._-]/.test(passConfirm)
  }

  const isValidPass = Object.values(validaciones).every(value => value == true)
  const isValidPassConfirm = Object.values(validacionConfirm).every(value => value == true)

  const onSubmit = async (formData) => {
    console.log(formData)

    registroService(formData.email, formData.pass, formData.passConfirm)
      .then(data => {
        navigate("/login")
      })
      .catch(err => console.error("No se pudo loguear"))
  }

  return (
    <div className='container d-flex justify-content-center align-items-center vh-100' >
      <div className='card p-4 shadow' style={{ width: '350px' }} >
        <h2 className='text-center mb-4' > Registrar Cuenta </h2>
        <form onSubmit={handleSubmit(onSubmit)} >
          <div className='mb-3'>
            <label className='form-label' >Email: </label>
            <input type="email" placeholder='Ingrese su mail' className={`form-control ${email.length > 0
              ? errors?.email
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
              })} />
            <Activity mode={errors?.email ? "visible" : "hidden"}>
              <div className='invalid-feedback'>
                {errors?.email?.message}
              </div>
            </Activity>
          </div>
          <div className='mb-3'>
            <label className='form-label' >Contraseña: </label>
            <input type="text" placeholder='Ingrese su password' className={`form-control ${pass.length > 0
              ? !isValidPass
                ? "is-invalid"
                : "is-valid"
              : ""
              }`} name='pass'
              {...register("pass", {
                required: "El campo password es obligatorio",
                validate: value => {
                  if (value.length < 8) return "Debe tener al menos 8 Caracteres"
                  if (!/[A-Z]/.test(pass)) return "Debe tener una mayuscula"
                  if (!/[a-z]/.test(pass)) return "Debe tener una minuscula"
                  if (!/[0-9]/.test(pass)) return "Debe tener al menos un numero"
                  if (!/[@$!%*?&._-]/.test(pass)) return "Debe tener al menos un simbolo"

                  return true
                }
              })} />
            <Activity mode={!isValidPass ? "visible" : "hidden"}>
              <ul className='list-unstyled mt-2' >
                <li className={validaciones.longitudMin ? "text-success" : "text-danger"} >
                  {validaciones.longitudMin ? "✔" : "X"} Minimo 8 caracteres
                </li>
                <li className={validaciones.mayuscula ? "text-success" : "text-danger"} >
                  {validaciones.mayuscula ? "✔" : "X"} Debe tener una mayuscula
                </li>
                <li className={validaciones.minuscula ? "text-success" : "text-danger"} >
                  {validaciones.minuscula ? "✔" : "X"} Debe tener una minuscula
                </li>
                <li className={validaciones.numero ? "text-success" : "text-danger"} >
                  {validaciones.numero ? "✔" : "X"} Debe tener al menos un numero
                </li>
                <li className={validaciones.simbolo ? "text-success" : "text-danger"} >
                  {validaciones.simbolo ? "✔" : "X"} Debe tener al menos un simbolo
                </li>
              </ul>
            </Activity>
          </div>
          <div className='mb-3'>
            <label className='form-label' >Confirmar Contraseña: </label>
            <input type="text" placeholder='Ingrese su password nuevamente' className={`form-control ${pass.length > 0
              ? !isValidPassConfirm
                ? "is-invalid"
                : "is-valid"
              : ""
              }`} name='passConfirm'
              {...register("passConfirm", {
                required: "El campo password confirm es obligatorio",
                validate: value => {
                  if (value == pass) return
                  if (value.length < 8) return "Debe tener al menos 8 Caracteres"
                  if (!/[A-Z]/.test(pass)) return "Debe tener una mayuscula"
                  if (!/[a-z]/.test(pass)) return "Debe tener una minuscula"
                  if (!/[0-9]/.test(pass)) return "Debe tener al menos un numero"
                  if (!/[@$!%*?&._-]/.test(pass)) return "Debe tener al menos un simbolo"
                }
              })} />
            <Activity mode={!isValidPassConfirm ? "visible" : "hidden"}>
              <ul className='list-unstyled mt-2' >
                <li className={validacionConfirm.igual ? "text-success" : "text-danger"} >
                  {validacionConfirm.igual ? "✔" : "X"} Las contraseñas deben ser iguales
                </li>
                <li className={validacionConfirm.longitudMin ? "text-success" : "text-danger"} >
                  {validacionConfirm.longitudMin ? "✔" : "X"} Minimo 8 caracteres
                </li>
                <li className={validacionConfirm.mayuscula ? "text-success" : "text-danger"} >
                  {validacionConfirm.mayuscula ? "✔" : "X"} Debe tener una mayuscula
                </li>
                <li className={validacionConfirm.minuscula ? "text-success" : "text-danger"} >
                  {validacionConfirm.minuscula ? "✔" : "X"} Debe tener una minuscula
                </li>
                <li className={validacionConfirm.numero ? "text-success" : "text-danger"} >
                  {validacionConfirm.numero ? "✔" : "X"} Debe tener al menos un numero
                </li>
                <li className={validacionConfirm.simbolo ? "text-success" : "text-danger"} >
                  {validacionConfirm.simbolo ? "✔" : "X"} Debe tener al menos un simbolo
                </li>
              </ul>
            </Activity>
          </div>
          <button type='submit' className={`btn btn-primary w-100 ${ isValid ? "" : "disabled" }`} >Ingresar</button>
        </form>
      </div>
    </div>
  )
}

export default Register