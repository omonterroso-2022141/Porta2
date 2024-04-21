import {
  passConfirmationValidationMessage,
  validatePasswordConfirm
} from '../Shared/Validators/confirmPass.validator.js'
import {
  validateEmail,
  emailValidationMessage
} from '../Shared/Validators/input.validator.js'
import {
  passwordValidationMessage,
  validatePassword
} from '../Shared/Validators/password.validator.js'
import {
  usernameValidationMessage,
  validateUsername
} from '../Shared/Validators/username.validator.js'
import { Input } from './Input.jsx'
import { useState } from 'react'
import { userRegister } from '../Shared/hooks/userRegister.jsx'
//import axios from 'axios'

export const Register = ({ switchAuthHandler }) => {

  const { register, isLoading } = userRegister()

  //CÓDIFO ES MOMENTANEO
  //const baseURL = 'http://localhost:2656/twitch/v1/'
  //--------------------

  const [formData, setFormData] = useState(
    {
      email: {
        value: '',
        isValid: false,
        showError: false
      },
      username: {
        value: '',
        isValid: false,
        showError: false
      },
      password: {
        value: '',
        isValid: false,
        showError: false
      },
      passwordConfirm: {
        value: '',
        isValid: false,
        showError: false
      }
    }
  )

  const onValueChange = (value, field) => {
    setFormData((prevData) => (
      {
        ...prevData,
        [field]: {
          ...prevData[field],
          value
        }
      }
    ))
  }

  const handleValidationOnBlur = (value, field) => {
    let isValid = false
    switch (field) {
      case 'email':
        isValid = validateEmail(value)
        break;
      case 'username':
        isValid = validateUsername(value)
        break;
      case 'password':
        isValid = validatePassword(value)
        break;
      case 'passwordConfirm':
        isValid = validatePasswordConfirm(formData.password.value, value)
        break;
      default:
        break;
    }
    setFormData((prevData) => (
      {
        ...prevData,
        [field]: {
          ...prevData[field],
          isValid,
          showError: !isValid
        }
      }
    ))
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    register(
      formData.email.value,
      formData.username.value,
      formData.password.value
    )
  }

  //CÓDIGO MOMENTANEO
  /*e.preventDefault()
  const body = {
    email : formData.email.value,
    username : formData.username.value,
    password : formData.password.value
  }
  try{
    const {data} = await axios.post(`${baseURL}auth/register`, body)
    console.log(data)
  }catch(err){
    return {
      error: true,
      err
    }
  }*/
  //CÓDIGO MOMENTANEO


  const isSubmitButtonDisable = !formData.email.isValid ||
    !formData.username.isValid ||
    !formData.password.isValid ||
    !formData.passwordConfirm.isValid

  return (
    <div className="register-container">
      <form
        className='auth-form'
        onSubmit={handleRegister}
      >
        <Input
          field='email'
          label='Email'
          type='email'
          value={formData.email.value}
          onChangeHandle={onValueChange}
          onBlurHandler={handleValidationOnBlur}
          showErrorMessage={formData.email.showError}
          validationMessage={emailValidationMessage}
        />
        <Input
          field='username'
          label='Username'
          type='text'
          value={formData.username.value}
          onChangeHandle={onValueChange}
          onBlurHandler={handleValidationOnBlur}
          showErrorMessage={formData.username.showError}
          validationMessage={usernameValidationMessage}
        />
        <Input
          field='password'
          label='Password'
          type='password'
          value={formData.password.value}
          onChangeHandle={onValueChange}
          onBlurHandler={handleValidationOnBlur}
          showErrorMessage={formData.password.showError}
          validationMessage={passwordValidationMessage}
        />
        <Input
          field='passwordConfirm'
          label='Password Confirmation'
          type='password'
          value={formData.passwordConfirm.value}
          onChangeHandle={onValueChange}
          onBlurHandler={handleValidationOnBlur}
          showErrorMessage={formData.passwordConfirm.showError}
          validationMessage={passConfirmationValidationMessage}
        />
        <button
          disabled={isSubmitButtonDisable}
        >
          Register
        </button>
      </form>
      <span className='centrar' onClick={switchAuthHandler}>
        ¿Ya tienes una cuenta? <br />¡Inicia sesión aqui!
      </span>
    </div>
  )
}

