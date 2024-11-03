'use client';

import { useEffect, useState } from "react";

interface Contacto {
  id: number;
  nombre: string;
  correo: string;
  descripcion: string;
}

export default function FormularioContacto() {
  const [id, setId] = useState<number>(0);
  const [nombre, setNombre] = useState<string>('');
  const [correo, setCorreo] = useState<string>('');
  const [descripcion, setDescription] = useState<string>('');
  const [isSubmitted, setSubmitted] = useState<boolean>(false);
  const [dataContacto, setDataContacto] = useState<Contacto[]>([]);

  useEffect(() => {
    cargarContactos();
  }, []);

  async function cargarContactos() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contacto`);
      const data = await res.json();
      setDataContacto(data);
    } catch (error) {
      console.error("Ocurrió un error en la invocación del servicio", error);
    }
  }

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let res;

      if (id !== 0) {
        res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contacto/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, nombre, correo, descripcion })
        });
      } else {
        res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contacto`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombre, correo, descripcion })
        });
      }

      if (res.ok) {
        alert("Contacto creado exitosamente");
        setId(0);
        setNombre("");
        setCorreo("");
        setDescription("");
        cargarContactos();
      } else {
        const errorText = await res.text();
        alert(`Ocurrió un error al invocar el servicio: ${res.status} ${errorText}`);
      }
    } catch (error) {
      console.error("Error en el envío del formulario:", error);
    }
  };

  const handleEditar = (contacto: Contacto) => {
    setId(contacto.id);
    setNombre(contacto.nombre);
    setCorreo(contacto.correo);
    setDescription(contacto.descripcion);
  };

  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contacto/${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          cargarContactos();
        } else {
          alert('Error al eliminar usuario');
        }
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
      }
    }
  };

  return (
    <>
      <form className="max-w-sm mx-auto" onSubmit={submitForm}>
        <div className="mb-5">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input type="text" className="form-control" 
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="correo" className="form-label">Correo</label>
          <input type="text" className="form-control"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="descripcion" className="form-label">Descripción</label>
          <textarea 
            id="descripcion"
            className="form-control" 
            value={descripcion}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Enviar información</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {dataContacto.map((contacto: Contacto) => (
            <tr key={contacto.id}>
              <td>{contacto.id}</td>
              <td>{contacto.nombre}</td>
              <td>{contacto.correo}</td>
              <td>{contacto.descripcion}</td>
              <td>
                <button type="button" className="btn btn-warning" onClick={() => handleEditar(contacto)}>Editar</button>
                <button type="button" className="btn btn-danger" onClick={() => handleDelete(contacto.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
