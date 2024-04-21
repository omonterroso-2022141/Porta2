import { Input } from "./Input"
import { useState } from 'react'
import { validateEmail, emailValidationMessage } from '../Shared/Validators/input.validator.js'
import { validatePassword, passwordValidationMessage } from '../Shared/Validators/password.validator.js'
import { userLogin } from "../Shared/hooks/userLogin.jsx"

export const Login = ({ switchAuthHandler }) => {

  const { login, isLoading } = userLogin()

  const [formData, setFormData] = useState(
    {
      email: {
        value: '',
        isValid: false,
        showError: false
      },
      password: {
        value: '',
        isValid: false,
        showError: false
      }
    }
  )

  const handleValidationOnBlur = (value, field) => {
    let isValid = false
    switch (field) {
      case 'email':
        isValid = validateEmail(value)
        break;
      case 'password':
        isValid = validatePassword(value)
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

  const handleLogin = async (e) => {
    e.preventDefault()
    login(
      formData.email.value,
      formData.password.value
    )
  }

  const isSubmitButtonDisable = !formData.email.isValid ||
                                !formData.password.isValid

  return (
    <div className="login-container">
      <form 
        className="auth-form"
        onSubmit={handleLogin}  
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
          field='password'
          label='Password'
          type='password'
          value={formData.password.value}
          onChangeHandle={onValueChange}
          onBlurHandler={handleValidationOnBlur}
          showErrorMessage={formData.password.showError}
          validationMessage={passwordValidationMessage}
        />
        <button
          disabled={isSubmitButtonDisable}
        >
          Login
        </button>
        <span className='centrar' onClick={switchAuthHandler}>
          ¿No tienes una cuenta? <br />¡Registrate dando click aqui!
        </span>
      </form>
    </div>
  )
}

