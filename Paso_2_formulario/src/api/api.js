export const CrearNuevoRegistro = async (id, nombre, telefono, correo, comentarios) => {
    const conexion= await fetch("http://localhost:3000/registros",{
    method:"POST",
    headers:{
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        id: id,
        nombre: nombre,
        telefono: telefono, 
        correo: correo, 
        comentarios: comentarios
    }),
    });

}