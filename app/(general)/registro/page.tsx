'use client';
import { useState, useEffect } from 'react';

interface Usuario {
  nombre: string;
  apellido: string;
  telefono: string;
  correo: string;
  fechaNacimiento: string;
  edad: number;
}

export default function Registro() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [nuevoUsuario, setNuevoUsuario] = useState<Omit<Usuario, "edad">>({
    nombre: '',
    apellido: '',
    telefono: '',
    correo: '',
    fechaNacimiento: ''
  });
  const [edad, setEdad] = useState<number | null>(null);

  useEffect(() => {
    if (nuevoUsuario.fechaNacimiento) {
      const fechaNacimiento = new Date(nuevoUsuario.fechaNacimiento);
      const hoy = new Date();
      const edadCalculada = hoy.getFullYear() - fechaNacimiento.getFullYear();
      setEdad(edadCalculada);
    }
  }, [nuevoUsuario.fechaNacimiento]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNuevoUsuario({ ...nuevoUsuario, [e.target.name]: e.target.value });
  };

  const agregarUsuario = () => {
    if (edad !== null) {
      const usuarioConEdad: Usuario = { ...nuevoUsuario, edad };
      setUsuarios([...usuarios, usuarioConEdad]);
      setNuevoUsuario({ nombre: '', apellido: '', telefono: '', correo: '', fechaNacimiento: '' });
      setEdad(null);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl mb-4">Registro de Usuarios</h2>
      <div className="flex flex-col gap-4 mb-4">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={nuevoUsuario.nombre}
          onChange={handleChange}
          
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={nuevoUsuario.apellido}
          onChange={handleChange}
          
        />
        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          value={nuevoUsuario.telefono}
          onChange={handleChange}
       
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={nuevoUsuario.correo}
          onChange={handleChange}
        
        />
        <input
          type="date"
          name="fechaNacimiento"
          value={nuevoUsuario.fechaNacimiento}
          onChange={handleChange}
          />
      </div>

      <div>
        {edad !== null && <p>Edad calculada: {edad} años</p>}
      </div>

      <button
        onClick={agregarUsuario}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Agregar Usuario
      </button>

      <div className="mt-8">
        <h3 className="text-xl mb-4">Tabla de Usuarios Registrados</h3>
        <table className="min-w-full bg-white border">
          <thead>
           <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Fecha de Nacimiento</th>
            <th>Edad</th>
         </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario, index) => (
              <tr key={index}>
                <td>{usuario.nombre}</td>
                <td>{usuario.apellido}</td>
                <td>{usuario.telefono}</td>
                <td>{usuario.correo}</td>
                <td>{usuario.fechaNacimiento}</td>
                <td>{usuario.edad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
