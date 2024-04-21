export const validateUsername = (username)=>{
    const regex = /^\S{3,8}$/
    return regex.test(username)
}

export const usernameValidationMessage = 'Nombre de usuario inválido, \nmínimo 3 máximo 8 caracteres. \nNose aceptan espacios'