import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function Presupuestos() {
  const [presupuestos, setPresupuestos] = useState([]);
  const [formData, setFormData] = useState({
    reparacion_id: '',
    total: '',
    validez_dias: 30,
    estado: 'pendiente'
  });
  const [reparaciones, setReparaciones] = useState([]);

  useEffect(() => {
    fetchPresupuestos();
    fetchReparaciones();
  }, []);

  const fetchPresupuestos = async () => {
    const { data, error } = await supabase
      .from('presupuestos')
      .select(`
        *,
        reparaciones (
          descripcion,
          vehiculos (
            marca,
            modelo,
            matricula,
            clientes (
              nombre,
              apellidos
            )
          )
        )
      `);
    
    if (error) {
      console.error('Error al cargar presupuestos:', error);
    } else {
      setPresupuestos(data || []);
    }
  };

  const fetchReparaciones = async () => {
    const { data, error } = await supabase
      .from('reparaciones')
      .select(`
        id,
        descripcion,
        vehiculos (
          marca,
          modelo,
          matricula,
          clientes (
            nombre,
            apellidos
          )
        )
      `)
      .eq('estado', 'pendiente');
    
    if (error) {
      console.error('Error al cargar reparaciones:', error);
    } else {
      setReparaciones(data || []);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('presupuestos')
      .insert([formData]);

    if (error) {
      console.error('Error al guardar presupuesto:', error);
    } else {
      setFormData({
        reparacion_id: '',
        total: '',
        validez_dias: 30,
        estado: 'pendiente'
      });
      fetchPresupuestos();
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Gestión de Presupuestos</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2">Reparación</label>
            <select
              value={formData.reparacion_id}
              onChange={(e) => setFormData({...formData, reparacion_id: e.target.value})}
              className="w-full p-2 border rounded-sm"
            >
              <option value="">Seleccione una reparación</option>
              {reparaciones.map(reparacion => (
                <option key={reparacion.id} value={reparacion.id}>
                  {reparacion.vehiculos?.marca} {reparacion.vehiculos?.modelo} - {reparacion.descripcion}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2">Total</label>
            <input
              type="number"
              step="0.01"
              value={formData.total}
              onChange={(e) => setFormData({...formData, total: e.target.value})}
              className="w-full p-2 border rounded-sm"
            />
          </div>
          <div>
            <label className="block mb-2">Días de Validez</label>
            <input
              type="number"
              value={formData.validez_dias}
              onChange={(e) => setFormData({...formData, validez_dias: e.target.value})}
              className="w-full p-2 border rounded-sm"
            />
          </div>
          <div>
            <label className="block mb-2">Estado</label>
            <select
              value={formData.estado}
              onChange={(e) => setFormData({...formData, estado: e.target.value})}
              className="w-full p-2 border rounded-sm"
            >
              <option value="pendiente">Pendiente</option>
              <option value="aceptado">Aceptado</option>
              <option value="rechazado">Rechazado</option>
            </select>
          </div>
        </div>
        <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-sm">
          Guardar Presupuesto
        </button>
      </form>

      <div className="bg-white rounded-lg shadow-sm">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b">Cliente</th>
              <th className="px-6 py-3 border-b">Vehículo</th>
              <th className="px-6 py-3 border-b">Descripción</th>
              <th className="px-6 py-3 border-b">Total</th>
              <th className="px-6 py-3 border-b">Estado</th>
              <th className="px-6 py-3 border-b">Fecha Emisión</th>
              <th className="px-6 py-3 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {presupuestos.map((presupuesto) => (
              <tr key={presupuesto.id}>
                <td className="px-6 py-4">
                  {presupuesto.reparaciones?.vehiculos?.clientes?.nombre} {presupuesto.reparaciones?.vehiculos?.clientes?.apellidos}
                </td>
                <td className="px-6 py-4">
                  {presupuesto.reparaciones?.vehiculos?.marca} {presupuesto.reparaciones?.vehiculos?.modelo}
                </td>
                <td className="px-6 py-4">{presupuesto.reparaciones?.descripcion}</td>
                <td className="px-6 py-4">{presupuesto.total}€</td>
                <td className="px-6 py-4">{presupuesto.estado}</td>
                <td className="px-6 py-4">{new Date(presupuesto.fecha_emision).toLocaleDateString()}</td>
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

export default Presupuestos;