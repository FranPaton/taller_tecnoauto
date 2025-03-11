import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function Dashboard() {
  const [stats, setStats] = useState({
    clientes: 0,
    vehiculos: 0,
    reparacionesActivas: 0,
    presupuestosPendientes: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    // Obtener total de clientes
    const { count: clientesCount } = await supabase
      .from('clientes')
      .select('*', { count: 'exact', head: true });

    // Obtener total de vehículos
    const { count: vehiculosCount } = await supabase
      .from('vehiculos')
      .select('*', { count: 'exact', head: true });

    // Obtener reparaciones activas
    const { count: reparacionesCount } = await supabase
      .from('reparaciones')
      .select('*', { count: 'exact', head: true })
      .in('estado', ['pendiente', 'en_proceso']);

    // Obtener presupuestos pendientes
    const { count: presupuestosCount } = await supabase
      .from('presupuestos')
      .select('*', { count: 'exact', head: true })
      .eq('estado', 'pendiente');

    setStats({
      clientes: clientesCount || 0,
      vehiculos: vehiculosCount || 0,
      reparacionesActivas: reparacionesCount || 0,
      presupuestosPendientes: presupuestosCount || 0
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Panel de Control</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold">Clientes Totales</h2>
          <p className="text-3xl font-bold text-blue-600">{stats.clientes}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold">Vehículos Registrados</h2>
          <p className="text-3xl font-bold text-green-600">{stats.vehiculos}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold">Reparaciones Activas</h2>
          <p className="text-3xl font-bold text-yellow-600">{stats.reparacionesActivas}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold">Presupuestos Pendientes</h2>
          <p className="text-3xl font-bold text-red-600">{stats.presupuestosPendientes}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;