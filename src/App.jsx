import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Clientes from './pages/Clientes';
import Vehiculos from './pages/Vehiculos';
import Reparaciones from './pages/Reparaciones';
import Presupuestos from './pages/Presupuestos';
import Facturas from './pages/Facturas';
import Login from './pages/Login';
import NuevoCliente from './pages/NuevoCliente';
import ProtectedRoute from './components/ProtectedRoute';
import MostrarCliente from './pages/MostrarCliente';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-100">
                <Navbar />
                <main className="container mx-auto px-4 py-8">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/facturas" element={<Facturas />} />
                    <Route path="/clientes" element={<Clientes />} />
                    <Route path="/nuevo-cliente" element={<NuevoCliente />} />
                    <Route path="/vehiculos" element={<Vehiculos />} />
                    <Route path="/reparaciones" element={<Reparaciones />} />
                    <Route path="/presupuestos" element={<Presupuestos />} />
                    <Route path="/cliente/:id" element={<MostrarCliente />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;