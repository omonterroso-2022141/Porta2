import { Register } from '../../Components/Register.jsx'
import { Login } from '../../Components/Login.jsx'
import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import './authPage.css'

export const Auth = () => {
  const [isLogin, setIsLogin ] = useState(false)
  const handleAuthPage = ()=>{
    setIsLogin(prev=> !prev)
  }

    return (
    <>
    <div className='auth-container'>
      {
          isLogin ? (
              <Login switchAuthHandler={handleAuthPage}></Login>
          ) : (
              <Register switchAuthHandler={handleAuthPage}></Register>
          )
      }
      <Toaster position='bottom-right' reverseOrder={false}/>
    </div>
    </>
  )
}
