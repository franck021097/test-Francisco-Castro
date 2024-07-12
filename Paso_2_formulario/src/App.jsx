import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react'
import styled from 'styled-components';
import GlobalStyles from './Components/GlobalStyle';
import Header from './Components/Header';
import CampoTexto from './Components/CampoTexto';
import LabelComponent from './Components/LabelComponent';
import { Validacion } from './validacion/validacion';
import MensajeError from './Components/MensajeError';
import { CrearNuevoRegistro } from './api/api';

const ContainerEstilizado = styled.div`
  background: #dadbdd;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 50px 0 100px 0;
  margin-top: 70px;

  .logo{
    width: initial;
    max-width: 600px;
    margin: 0 auto;
    background-color: red;
    display: block;
  }

`

const ContainerFormulario = styled.form`
  
  box-sizing: border-box;
  margin: 20px auto;
  padding: 30px 20px;
  display: flex;
  max-width: 600px;
  justify-content: center;
  box-sizing: border-box;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 50px;

  .campo-texto, textarea{
    background-color: #8d8d8d;
    width: 100%;
    margin: 0 auto;
    padding: 15px;
    border: none;
    border-radius: 10px;
    font-family: sans-serif;
    color: #fff;
    margin-top: 9px;
    box-sizing: border-box;
  }

  .campo-texto::placeholder,  textarea::placeholder{
    color: #4f4f4f;
    font-family: sans-serif;
  }

  label{
    font-family: sans-serif;
    width: 100%;
    font-size: 20px;
    font-weight: 900;
    margin: 0 auto;
  }

  .container-campos{
    display: flex;
    flex-direction: column;
  }

  textarea{
    resize: vertical;
    height: 100px;
  }

  .mensaje-error{
    color: red;
    display: inline-block;
    margin: 0 auto;
    width: 100%;
    height: 10px;
    font-size: 16px;
    font-weight: 500;
    text-transform: capitalize;
  }

  button:active{
    opacity: 0.5;
  }

  button:hover{
    background: #d9a840;
    transition: 0.3s;
  }
`

const CampoSubmit = styled.button`
  background-color: #fff;
  color: #000;
  width: 50%;
  height: 70px;
  text-align: center;
  margin: 0 auto;
  font-size: 14px;
  border: 3px solid #d9a840;
  cursor: pointer;
  border-radius: 10px;
  font-weight: bolder;

  
  

  @media (max-width: 600px) {
    width: 50%;
  }
`

function App() {

  const [nombre, setNombre] = useState("")
  const [correo, setCorreo] = useState("")
  const [telefono, setTelefono] = useState("")
  const [comentarios, setComentarios] = useState("")
  
  const [mensajeErrorNombre, setmensajeErrorNombre] = useState("")
  const [mensajeErrorCorreo, setmensajeErrorCorreo] = useState("")
  const [mensajeErrorTelefono, setmensajeErrorTelefono] = useState("")
  const [mensajeErrorComentarios, setmensajeErrorComentarios] = useState("")

  const [nombreValido, setNombreValido] = useState(false)
  const [correoValido, setCorreoValido] = useState(false)
  const [telefonoValido, setTelefonoValido] = useState(false)
  const [comentariosValido, setComentariosValido] = useState(false)

  const confirmacion = [{campo: "nombre", valorValido: nombreValido}, {campo: "correo", valorValido: correoValido}, {campo: "telefono", valorValido: telefonoValido}, {campo: "comentario", valorValido: comentariosValido}]

  const irAValidar = () =>{
    const respuestaValidacion = Validacion(confirmacion)

    const mensajes = respuestaValidacion[0]

    mensajes.map( (mensaje) => {
      switch (mensaje.campo) {
        case "nombre":
            setmensajeErrorNombre(mensaje.mensaje)
            break;
        case "correo":
            setmensajeErrorCorreo(mensaje.mensaje)
            break;
        case "telefono":
            setmensajeErrorTelefono(mensaje.mensaje)
            break;
        case "comentario":
            setmensajeErrorComentarios(mensaje.mensaje)
            break;

        default:
            break;
    }
    })
    const id = uuidv4()

    if(respuestaValidacion[1]) {
      CrearNuevoRegistro(id, nombre, telefono, correo, comentarios)
      setNombre("")
      setCorreo("")
      setTelefono("")
      setComentarios("")

      setNombreValido(false)
      setCorreoValido(false)
      setTelefonoValido(false)
      setComentariosValido(false)
    }
    
  }


  return (
    <ContainerEstilizado>
      <GlobalStyles/>
      <Header/>
      <ContainerFormulario>
        <div className='container-campos'>
          <LabelComponent IdCampo={"nombre"} valor={"Nombre"}/>
          <CampoTexto type={"texto"} placeholder={"Usuario"} id={"nombre"} valido={setNombreValido}  manejarValor={setNombre} valorCampo={nombre}/>
          <MensajeError mensaje={mensajeErrorNombre} />
        </div>
        
        
        <div className='container-campos'>
          <LabelComponent IdCampo={"correo"} valor={"Correo"}/>
          <CampoTexto type={"email"} placeholder={"ejemplo@dominio.com"} id={"correo"} valido={setCorreoValido}  manejarValor={setCorreo} valorCampo={correo}/>
          <MensajeError mensaje={mensajeErrorCorreo}/>
        </div>
        
        <div className='container-campos'>
          <LabelComponent IdCampo={"telefono"} valor={"Teléfono"}/>
          <CampoTexto type={"tel"} placeholder={"xxxxxxxxxx"} id={"telefono"} pattern={"[0-9]{3}[0-9]{3}[0-9]{4}"} valido={setTelefonoValido}  manejarValor={setTelefono} valorCampo={telefono}/>
          <MensajeError mensaje={mensajeErrorTelefono}/>
        </div>

        <div className="container-campos">
          <LabelComponent IdCampo={"comentarios"} valor={"Comentarios"}/>
          <textarea name="comentarios" id="comentarios" placeholder='Por favor ingresa tus comentarios' minLength={5} required onChange={(e)=>{
            setComentariosValido(e.target.checkValidity())
            setComentarios(e.target.value)
          }} value={comentarios}></textarea>
          <MensajeError mensaje={mensajeErrorComentarios}/>
        </div>

        <CampoSubmit onClick={ (e) => { 
          e.preventDefault()
          irAValidar()
        }
          }>Enviar</CampoSubmit>
      </ContainerFormulario>

      <img src="2.jpg" alt="logo" className='logo' />
    </ContainerEstilizado>
  )
}

export default App
