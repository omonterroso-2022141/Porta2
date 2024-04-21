import { useState } from 'react'
import { loginRequest } from '../../services/api.js'
import toast from 'react-hot-toast'

export const userLogin = () => {
    const [isLoading, setIsLoading] = useState(false)
    
    const login = async(email, password)=>{
        setIsLoading(true)
        const user = {
            email,
            password
        }
        const response = await loginRequest(user)
        setIsLoading(false)
        if(response.error){
            if(response?.err?.response?.data?.errors){
                let arr = response?.err?.response?.data?.errors
                for (const error of arr) {
                    return toast.error(
                        error.msg
                    )
                }
            }
            return toast.error(
                response?.err?.response?.data?.msg ||
                response?.err?.data?.msg ||
                'Error al cargar el usuario, intenta de nuevo.'
            )
        }
        console.log(response)
    }
    return {
        login,
        isLoading
    }
}

