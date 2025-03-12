import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-bold text-xl">
            TECNOAUTO DIEGO LIMA
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/clientes" className="hover:text-blue-200">Clientes</Link>
            <Link to="/facturas" className="hover:text-blue-200">Facturas</Link>
            <Link to="/reparaciones" className="hover:text-blue-200">Reparaciones</Link>
            <Link to="/presupuestos" className="hover:text-blue-200">Presupuestos</Link>
            <Link to="/vehiculos" className="hover:text-blue-200">Vehículos</Link>
            <button
              onClick={handleLogout}
              className="ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-sm"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;