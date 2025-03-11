import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function Vehiculos() {
  const [vehiculos, setVehiculos] = useState([]);
  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    ano: '',
    matricula: '',
    kilometraje: '',
    cliente_id: ''
  });
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetchVehiculos();
    fetchClientes();
  }, []);

  const fetchVehiculos = async () => {
    const { data, error } = await supabase
      .from('vehiculos')
      .select(`
        *,
        clientes (
          nombre
        )
      `);
    
    if (error) {
      console.error('Error al cargar vehículos:', error);
    } else {
      setVehiculos(data || []);
    }
  };

  const fetchClientes = async () => {
    const { data, error } = await supabase
      .from('clientes')
      .select('id, nombre');
    
    if (error) {
      console.error('Error al cargar clientes:', error);
    } else {
      setClientes(data || []);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('vehiculos')
      .insert([formData]);

    if (error) {
      console.error('Error al guardar vehículo:', error);
    } else {
      setFormData({
        marca: '',
        modelo: '',
        ano: '',
        matricula: '',
        kilometraje: '',
        cliente_id: ''
      });
      fetchVehiculos();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8">Gestión de Vehículos</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2">Cliente</label>
            <select
              value={formData.cliente_id}
              onChange={(e) => setFormData({...formData, cliente_id: e.target.value})}
              className="w-full p-2 border rounded-sm"
            >
              <option value="">Seleccione un cliente</option>
              {clientes.map(cliente => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2">Marca</label>
            <input
              type="text"
              value={formData.marca}
              onChange={(e) => setFormData({...formData, marca: e.target.value})}
              className="w-full p-2 border rounded-sm"
            />
          </div>
          <div>
            <label className="block mb-2">Modelo</label>
            <input
              type="text"
              value={formData.modelo}
              onChange={(e) => setFormData({...formData, modelo: e.target.value})}
              className="w-full p-2 border rounded-sm"
            />
          </div>
          <div>
            <label className="block mb-2">Año</label>
            <input
              type="number"
              value={formData.ano}
              onChange={(e) => setFormData({...formData, ano: e.target.value})}
              className="w-full p-2 border rounded-sm"
            />
          </div>
          <div>
            <label className="block mb-2">Matrícula</label>
            <input
              type="text"
              value={formData.matricula}
              onChange={(e) => setFormData({...formData, matricula: e.target.value})}
              className="w-full p-2 border rounded-sm"
            />
          </div>
          <div>
            <label className="block mb-2">Kilometraje</label>
            <input
              type="number"
              value={formData.kilometraje}
              onChange={(e) => setFormData({...formData, kilometraje: e.target.value})}
              className="w-full p-2 border rounded-sm"
            />
          </div>
        </div>
        <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-sm">
          Guardar Vehículo
        </button>
      </form>

      <div className="bg-white rounded-lg shadow-sm">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b">Cliente</th>
              <th className="px-6 py-3 border-b">Marca</th>
              <th className="px-6 py-3 border-b">Modelo</th>
              <th className="px-6 py-3 border-b">Año</th>
              <th className="px-6 py-3 border-b">Matrícula</th>
              <th className="px-6 py-3 border-b">Kilometraje</th>
              <th className="px-6 py-3 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vehiculos.map((vehiculo) => (
              <tr key={vehiculo.id}>
                <td className="px-6 py-4">{vehiculo.clientes?.nombre}</td>
                <td className="px-6 py-4">{vehiculo.marca}</td>
                <td className="px-6 py-4">{vehiculo.modelo}</td>
                <td className="px-6 py-4">{vehiculo.ano}</td>
                <td className="px-6 py-4">{vehiculo.matricula}</td>
                <td className="px-6 py-4">{vehiculo.kilometraje}</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-800 mr-2">Editar</button>
                  <button className="text-red-600 hover:text-red-800">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Vehiculos;