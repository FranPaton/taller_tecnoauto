import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, useLocation } from 'react-router-dom';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    fetchClientes();
  }, [location.key]);

  const fetchClientes = async () => {
    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      .order('updated_at', { ascending: false });
    
    if (error) {
      console.error('Error al cargar clientes:', error);
    } else {
      setClientes(data || []);
    }
  };

  const filteredClientes = clientes.filter(cliente =>
    cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    cliente.telefono.toLowerCase().includes(busqueda.toLowerCase()) ||
    cliente.dni.toLowerCase().includes(busqueda.toLowerCase())
    
  );

  return (
    <div className="p-2 max-w-[1920px] mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestión de Clientes</h1>
        <button
          onClick={() => navigate('/nuevo-cliente')}
          className="bg-green-600 text-white px-4 py-2 rounded-sm hover:bg-green-500 transition cursor-pointer"
        >
          Nuevo Cliente
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar clientes..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full p-2 border rounded-sm bg-blue-50 border-blue-300"
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="min-w-full table-fixed text-left">
          <thead className='bg-gray-200'>
            <tr>
              <th className="px-6 py-3 w-1/4">Nombre completo</th>
              <th className="px-6 py-3  w-1/4 ">DNI</th>
              <th className="px-6 py-3  w-1/4 ">Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {(busqueda === '' ? filteredClientes.slice(0, 5) : filteredClientes).map((cliente) => (
              <tr 
                key={cliente.id}
                onClick={() => navigate(`/cliente/${cliente.id}`)}
                className="cursor-pointer hover:bg-gray-50"
              >
                <td className="px-6 py-4 truncate">{cliente.nombre}</td>
                <td className="px-6 py-4 truncate">{cliente.dni}</td>
                <td className="px-6 py-4 truncate">{cliente.telefono}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Clientes;