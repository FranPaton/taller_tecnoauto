import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function Facturas() {
  const [facturas, setFacturas] = useState([]);
  const [formData, setFormData] = useState({
    reparacion_id: '',
    total: '',
    estado_pago: 'pendiente'
  });
  const [reparaciones, setReparaciones] = useState([]);

  useEffect(() => {
    fetchFacturas();
    fetchReparaciones();
  }, []);

  const fetchFacturas = async () => {
    const { data, error } = await supabase
      .from('facturas')
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
      console.error('Error al cargar facturas:', error);
    } else {
      setFacturas(data || []);
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
      .eq('estado', 'completada');
    
    if (error) {
      console.error('Error al cargar reparaciones:', error);
    } else {
      setReparaciones(data || []);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('facturas')
      .insert([formData]);

    if (error) {
      console.error('Error al guardar factura:', error);
    } else {
      setFormData({
        reparacion_id: '',
        total: '',
        estado_pago: 'pendiente'
      });
      fetchFacturas();
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Gestión de Facturas</h1>
      
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
            <label className="block mb-2">Estado de Pago</label>
            <select
              value={formData.estado_pago}
              onChange={(e) => setFormData({...formData, estado_pago: e.target.value})}
              className="w-full p-2 border rounded-sm"
            >
              <option value="pendiente">Pendiente</option>
              <option value="pagado">Pagado</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
        </div>
        <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-sm">
          Guardar Factura
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
              <th className="px-6 py-3 border-b">Estado Pago</th>
              <th className="px-6 py-3 border-b">Fecha Emisión</th>
              <th className="px-6 py-3 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {facturas.map((factura) => (
              <tr key={factura.id}>
                <td className="px-6 py-4">
                  {factura.reparaciones?.vehiculos?.clientes?.nombre} {factura.reparaciones?.vehiculos?.clientes?.apellidos}
                </td>
                <td className="px-6 py-4">
                  {factura.reparaciones?.vehiculos?.marca} {factura.reparaciones?.vehiculos?.modelo}
                </td>
                <td className="px-6 py-4">{factura.reparaciones?.descripcion}</td>
                <td className="px-6 py-4">{factura.total}€</td>
                <td className="px-6 py-4">{factura.estado_pago}</td>
                <td className="px-6 py-4">{new Date(factura.fecha_emision).toLocaleDateString()}</td>
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

export default Facturas;