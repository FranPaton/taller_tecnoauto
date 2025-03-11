import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    telefono: '',
    email: '',
    direccion: ''
  });

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    const { data, error } = await supabase
      .from('clientes')
      .select('*');
    
    if (error) {
      console.error('Error al cargar clientes:', error);
    } else {
      setClientes(data || []);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('clientes')
      .insert([formData]);

    if (error) {
      console.error('Error al guardar cliente:', error);
    } else {
      setFormData({
        nombre: '',
        apellidos: '',
        telefono: '',
        email: '',
        direccion: ''
      });
      fetchClientes();
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('clientes')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error al eliminar cliente:', error);
    } else {
      fetchClientes();
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Gestión de Clientes</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2">Nombre</label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              className="w-full p-2 border rounded-sm"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Apellidos</label>
            <input
              type="text"
              value={formData.apellidos}
              onChange={(e) => setFormData({...formData, apellidos: e.target.value})}
              className="w-full p-2 border rounded-sm"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Teléfono</label>
            <input
              type="tel"
              value={formData.telefono}
              onChange={(e) => setFormData({...formData, telefono: e.target.value})}
              className="w-full p-2 border rounded-sm"
            />
          </div>
          <div>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-2 border rounded-sm"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-2">Dirección</label>
            <textarea
              value={formData.direccion}
              onChange={(e) => setFormData({...formData, direccion: e.target.value})}
              className="w-full p-2 border rounded-sm"
              rows="3"
            ></textarea>
          </div>
        </div>
        <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-sm">
          Guardar Cliente
        </button>
      </form>

      <div className="bg-white rounded-lg shadow-sm">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b">Nombre</th>
              <th className="px-6 py-3 border-b">Apellidos</th>
              <th className="px-6 py-3 border-b">Teléfono</th>
              <th className="px-6 py-3 border-b">Email</th>
              <th className="px-6 py-3 border-b">Dirección</th>
              <th className="px-6 py-3 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td className="px-6 py-4">{cliente.nombre}</td>
                <td className="px-6 py-4">{cliente.apellidos}</td>
                <td className="px-6 py-4">{cliente.telefono}</td>
                <td className="px-6 py-4">{cliente.email}</td>
                <td className="px-6 py-4">{cliente.direccion}</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-800 mr-2">Editar</button>
                  <button 
                    onClick={() => handleDelete(cliente.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Clientes;