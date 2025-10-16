import { useState } from 'react'
import './App.css'

function App() {

  const [tarea, setTarea] = useState("");
  const [responsable, setResponsable] = useState("");
  const [fecha, setFecha] = useState("");
  const [datos, setDatos] = useState([]);
  const [indiceEditando, setIndiceEditando] = useState(null);

  let agregarDatos = () => {
    fetch(`http://127.0.0.1:8000/api/tareas`)
    .then(res=>res.json())
    .then(resultado=>{
      setDatos(resultado)
    });
    // if (indiceEditando !== null) {
    //   const nuevosDatos = [...datos];
    //   nuevosDatos[indiceEditando] = { tarea, responsable, fecha, Estado: "Pendiente" };
    //   setDatos(nuevosDatos);
    //   setIndiceEditando(null);
    // } else {
    //   let dat = { tarea, responsable, fecha, Estado: "Pendiente" };
    //   setDatos([...datos, dat]);
    // }
    setTarea("");
    setResponsable("");
    setFecha("");


  };

  let borrarDato = (id) => {
    fetch(`http://127.0.0.1:8000/api/borrarT/${id}`)
    .then(res=>res.json())
    .then(r=>
      {
        if(r.estado=="ok"){
          agregarDatos()
        }else{
          alert(r.resp)
        }
      }
    )

    // let nuevoDatos = datos.filter((v, index) => index !== i);
    // setDatos(nuevoDatos);
  }

  let modificarDato = (i) => {
    const tareaSeleccionada = datos[i];
    setTarea(tareaSeleccionada.tarea);
    setResponsable(tareaSeleccionada.responsable);
    setFecha(tareaSeleccionada.fecha);
    setIndiceEditando(i);
  };

  let cambiarEstado = (i) => {
    const nuevosDatos = [...datos];
    nuevosDatos[i].Estado = nuevosDatos[i].Estado === "Pendiente" ? "Realizada" : "Pendiente";
    setDatos(nuevosDatos);
  };

  return (
    <>
      <div className='container mt-4'>
        <div className='row'>
          <div className='col-md-3 mb-3'>
            <label>Nombre Tarea</label>
            <input
              type="text"
              className='form-control'
              value={tarea}
              onChange={(e) => setTarea(e.target.value)}
              placeholder='Tarea a Realizar'
            />
          </div>
          <div className='col-md-3 mb-3'>
            <label>Responsable</label>
            <input
              type="text"
              className='form-control'
              value={responsable}
              onChange={(e) => setResponsable(e.target.value)}
              placeholder='Quien Realiza'
            />
          </div>
          <div className='col-md-3 mb-3'>
            <label>Fecha</label>
            <input
              type="date"
              className='form-control'
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>
          <div className='col-md-3 d-flex align-items-end mb-3'>
            <button
              onClick={agregarDatos}
              className='btn btn-success w-100'
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
      <div className='container'>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th>id</th>
              <th>Tarea</th>
              <th>Responsable</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              datos.map((v,i)=>{
                return  <tr key={i}>
                  <td>{v.id}</td>
                  <td>{v.NombreTarea}</td>
                  <td>{v.Responsable}</td>
                  {/* <td>{v.fecha}</td> */}
                  <td>{v.estado}</td>
                  <td><input type="button" value="Eliminar" onClick={()=>{borrarDato(v.id)}} className='btn btn-danger w-100'/></td>
                  {/* <td>
                    <button 
                      className='btn btn-success btn-sm me-2' 
                      onClick={() => cambiarEstado(i)}
                    >
                      {v.Estado === "Pendiente" ? "Marcar como Realizado" : "Marcar como Pendiente"}
                    </button>
                    <button 
                      className='btn btn-warning btn-sm me-2' 
                      onClick={() => modificarDato(i)}
                    >
                      Modificar
                    </button>
                    <button 
                      className='btn btn-danger btn-sm' 
                      onClick={() => borrarDato(i)}
                    >
                      Borrar
                    </button>
                  </td> */}
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App