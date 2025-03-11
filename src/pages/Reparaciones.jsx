import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function Reparaciones() {
  const [reparaciones, setReparaciones] = useState([]);
  const [formData, setFormData] = useState({
    vehiculo_id: '',
    descripcion: '',
    estado: 'pendiente'
  });
  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    fetchReparaciones();
    fetchVehiculos();
  }, []);

  const fetchReparaciones = async () => {
    const { data, error } = await supabase
      .from('reparaciones')
      .select(`
        *,
        vehiculos (
          marca,
          modelo,
          matricula,
          clientes (
            nombre,
            apellidos
          )
        )
      `);
    
    if (error) {
      console.error('Error al cargar reparaciones:', error);
    } else {
      setReparaciones(data || []);
    }
  };

  const fetchVehiculos = async () => {
    const { data, error } = await supabase
      .from('vehiculos')
      .select(`
        id,
        marca,
        modelo,
        matricula,
        clientes (
          nombre,
          apellidos
        )
      `);
    
    if (error) {
      console.error('Error al cargar vehículos:', error);
    } else {
      setVehiculos(data || []);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('reparaciones')
      .insert([formData]);

    if (error) {
      console.error('Error al guardar reparación:', error);
    } else {
      setFormData({
        vehiculo_id: '',
        descripcion: '',
        estado: 'pendiente'
      });
      fetchReparaciones();
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Gestión de Reparaciones</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2">Vehículo</label>
            <select
              value={formData.vehiculo_id}
              onChange={(e) => setFormData({...formData, vehiculo_id: e.target.value})}
              className="w-full p-2 border rounded-sm"
            >
              <option value="">Seleccione un vehículo</option>
              {vehiculos.map(vehiculo => (
                <option key={vehiculo.id} value={vehiculo.id}>
                  {vehiculo.marca} {vehiculo.modelo} - {vehiculo.matricula} ({vehiculo.clientes?.nombre} {vehiculo.clientes?.apellidos})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2">Estado</label>
            <select
              value={formData.estado}
              onChange={(e) => setFormData({...formData, estado: e.target.value})}
              className="w-full p-2 border rounded-sm"
            >
              <option value="pendiente">Pendiente</option>
              <option value="en_proceso">En Proceso</option>
              <option value="completada">Completada</option>
              <option value="cancelada">Cancelada</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block mb-2">Descripción</label>
            <textarea
              value={formData.descripcion}
              onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
              className="w-full p-2 border rounded-sm"
              rows="4"
            ></textarea>
          </div>
        </div>
        <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-sm">
          Guardar Reparación
        </button>
      </form>

      <div className="bg-white rounded-lg shadow-sm">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b">Vehículo</th>
              <th className="px-6 py-3 border-b">Cliente</th>
              <th className="px-6 py-3 border-b">Estado</th>
              <th className="px-6 py-3 border-b">Fecha Entrada</th>
              <th className="px-6 py-3 border-b">Descripción</th>
              <th className="px-6 py-3 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reparaciones.map((reparacion) => (
              <tr key={reparacion.id}>
                <td className="px-6 py-4">
                  {reparacion.vehiculos?.marca} {reparacion.vehiculos?.modelo} - {reparacion.vehiculos?.matricula}
                </td>
                <td className="px-6 py-4">
                  {reparacion.vehiculos?.clientes?.nombre} {reparacion.vehiculos?.clientes?.apellidos}
                </td>
                <td className="px-6 py-4">{reparacion.estado}</td>
                <td className="px-6 py-4">{new Date(reparacion.fecha_entrada).toLocaleDateString()}</td>
                <td className="px-6 py-4">{reparacion.descripcion}</td>
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

export default Reparaciones;