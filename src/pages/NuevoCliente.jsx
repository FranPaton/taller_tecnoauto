import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

function NuevoCliente() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    direccion: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('clientes')
      .insert([formData]);

    if (error) {
      console.error('Error al guardar cliente:', error);
    } else {
      navigate('/clientes');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-center items-center mb-8">
        <h1 className="text-3xl font-bold">Nuevo Cliente</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm max-w-2xl mx-auto p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Nombre completo</label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
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
            <div>
              <label className="block mb-2">Dirección</label>
              <input
                type="text"
                value={formData.direccion}
                onChange={(e) => setFormData({...formData, direccion: e.target.value})}
                className="w-full p-2 border rounded-sm"
                required
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/clientes')}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-sm hover:bg-blue-700"
            >
              Guardar Cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NuevoCliente;