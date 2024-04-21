
export const Input = (
  {
    field,
    label,
    value,
    onChangeHandle,
    type,
    showErrorMessage,
    validationMessage,
    onBlurHandler,
    textarea
  }
) => {

  const handleValueChange = (e)=>{
    onChangeHandle(e.target.value, field)
  }

  const handleInputBlur = (e)=>{
    onBlurHandler(e.target.value, field)
  }

  return (
    <>
      <div className="auth-form-label">
        <span>{label}</span>
      </div>
      {
        textarea ? (
          <textarea 
            type={type}
            value={value}
            rows="5"
            style={{maxWidth: '400px'}}
            onChange={handleValueChange}
            onBlur={handleInputBlur}
          />
        ) : (
          <input 
            type={type}
            value={value}
            onChange={handleValueChange}
            onBlur={handleInputBlur}
          />
        )
      }
      <span className="auth-form-validation-message">
        {showErrorMessage && validationMessage}
      </span>
    </>
  )
}
