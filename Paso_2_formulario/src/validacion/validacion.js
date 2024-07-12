export const Validacion = (confirmacion) =>{

    let registrar = true
    
    confirmacion.map(
        (elemento) => {
            if(!elemento.valorValido){
                registrar = false

                switch (elemento.campo) {
                    case "nombre":
                        elemento.mensaje = "Ingresa al menos un nombre"
                        elemento.estadoValido = "invalido"
                        break;
                    case "correo":
                        elemento.mensaje = "Correo inválido"
                        elemento.estadoValido = "invalido"
                        break;
                    case "telefono":
                        elemento.mensaje = "Teléfono inválido"
                        elemento.estadoValido = "invalido"
                        break;
                    case "comentario":
                        elemento.mensaje = "Danos más detalles"
                        elemento.estadoValido = "invalido"
                        break;

                    default:
                        break;
                }

                return elemento
            }

            elemento.mensaje = ""
            elemento.estadoValido = "valido"
        }
    )

    return [confirmacion, registrar]
    


}