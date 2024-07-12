
const CampoTexto = ({placeholder, type, id, pattern, valido, valorCampo, manejarValor}) =>{
    return <input type={type} className="campo-texto" placeholder={placeholder} value={valorCampo} id={id} pattern={pattern} minLength={3} required onChange={(e)=>{
        valido( () => {const valor = e.target.checkValidity()
            return valor
        })
        manejarValor(e.target.value)

        

    }}/>
}


export default CampoTexto