import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [tarea, setTarea] = useState("");
  const [responsable, setResponsable] = useState("");
  const [fecha, setFecha] = useState("");
  const [datos, setDatos] = useState([]);
  const [indiceEditando, setIndiceEditando] = useState(null);

  {/* Cargar los datos de Laravel */}
  let cargarTareas = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/tareas`)
      .then(res => res.json())
      .then(resultado => {
        setDatos(resultado);
      });
  };

  let agregarDatos = () => {
    if (!tarea || !responsable || !fecha) {
      alert("Llena todos los campos");
      return;
    }

    const url = `${import.meta.env.VITE_API_URL}/api/creart/${encodeURIComponent(responsable)}/${encodeURIComponent(tarea)}/${encodeURIComponent(fecha)}`;

    fetch(url)
      .then(res => res.json())
      .then(r => {
        if (r.estado === "ok") {
          cargarTareas();
          setTarea("");
          setResponsable("");
          setFecha("");
          if (indiceEditando !== null) {
            setIndiceEditando(null);
          }
        } else {
          alert(r.resp);
        }
      })
      .catch(err => {
        console.error(err);
        alert("Error de red al crear la tarea");
      });
  };

  let borrarDato = (id) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/borrarT/${id}`)
      .then(res => res.json())
      .then(r => {
        if (r.estado === "ok") {
          cargarTareas();
        } else {
          alert(r.resp);
        }
      })
      .catch(err => {
        console.error(err);
        alert("Error al eliminar el dato");
      });
  };

  let modificarDato = (i) => {
    const tareaSeleccionada = datos[i];
    setTarea(tareaSeleccionada.NombreTarea);
    setResponsable(tareaSeleccionada.Responsable);
    setFecha(tareaSeleccionada.Fecha);
    setIndiceEditando(i);
  };

  let cambiarEstado = (id, nuevoEstado) => {
    const nuevosDatos = datos.map(tarea =>
      tarea.id === id ? { ...tarea, estado: nuevoEstado } : tarea
    );
    setDatos(nuevosDatos);
  };

  {/* useEffect para mostrar los datos cargados de Laravel */}
  useEffect(() => {
    cargarTareas();
  }, []);

  return (
    <>
      <div className="container mt-4">
        <div className="row g-3">
          <div className="col-12 col-md-3">
            <label className="form-label">Nombre Tarea</label>
            <input
              type="text"
              className="form-control"
              value={tarea}
              onChange={(e) => setTarea(e.target.value)}
              placeholder="Tarea a Realizar"
            />
          </div>
          <div className="col-12 col-md-3">
            <label className="form-label">Responsable</label>
            <input
              type="text"
              className="form-control"
              value={responsable}
              onChange={(e) => setResponsable(e.target.value)}
              placeholder="Quien Realiza"
            />
          </div>
          <div className="col-12 col-md-3">
            <label className="form-label">Fecha</label>
            <input
              type="date"
              className="form-control"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>
          <div className="col-12 col-md-3 d-grid">
            <button
              onClick={agregarDatos}
              className="btn btn-success"
            >
              Agregar
            </button>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tarea</th>
                <th>Responsable</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((v, i) => (
                <tr key={v.id || i}>
                  <td>{v.id || 'Sin ID'}</td>
                  <td>{v.NombreTarea}</td>
                  <td>{v.Responsable}</td>
                  <td>{v.Fecha}</td>
                  <td>
                    <span className={`badge ${
                      v.estado === "Pendiente" ? "bg-warning text-dark" :
                      v.estado === "Realizado" ? "bg-success" :
                      v.estado === "Cancelado" ? "bg-danger" :
                      "bg-info"
                    }`}>
                      {v.estado}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex flex-column gap-1">
                      {/* Botones De: estados */}
                      <div className="d-flex gap-1">
                        <button
                          className="btn btn-warning btn-sm flex-fill"
                          onClick={() => cambiarEstado(v.id, "Pendiente")}
                          disabled={v.estado === "Pendiente"}
                        >
                          Pendiente
                        </button>
                        <button
                          className="btn btn-success btn-sm flex-fill"
                          onClick={() => cambiarEstado(v.id, "Realizado")}
                          disabled={v.estado === "Realizado"}
                        >
                          Realizado
                        </button>
                        <button
                          className="btn btn-danger btn-sm flex-fill"
                          onClick={() => cambiarEstado(v.id, "Cancelado")}
                          disabled={v.estado === "Cancelado"}
                        >
                          Cancelado
                        </button>
                      </div>
                      {/* Botones De: Modificar y Borrar */}
                      <div className="d-flex gap-1">
                        <button
                          className="btn btn-warning btn-sm flex-fill"
                          onClick={() => modificarDato(i)}
                        >
                          Modificar
                        </button>
                        <button
                          className="btn btn-danger btn-sm flex-fill"
                          onClick={() => borrarDato(v.id)}
                        >
                          Borrar
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;