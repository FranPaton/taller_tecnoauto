import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate, useParams } from "react-router-dom";

function MostrarCliente() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    nombre: "",
    dni: "",
    telefono: "",
    email: "",
    direccion: "",
    observaciones: "",
  });

  useEffect(() => {
    fetchCliente();
  }, );

  const fetchCliente = async () => {
    const { data, error } = await supabase
      .from("clientes")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error al cargar cliente:", error);
      navigate("/clientes");
    } else if (data) {
      setFormData(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("clientes")
      .update(updatedData)
      .eq("id", id);

    if (error) {
      console.error("Error al actualizar cliente:", error);
    } else {
      navigate("/clientes");
    }
  };

  return (
    <div className="p-2">
      <div className="flex justify-center items-center mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Detalles del Cliente</h1>
      </div>
      <div className="flex justify-center gap-4 mb-4">
        <button
          type="button"
          onClick={() => navigate("/clientes")}
          className="px-4 py-2 bg-teal-400 hover:bg-teal-200 transition rounded cursor-pointer"
        >
          Facturas
        </button>
        <button
          type="button"
          onClick={() => navigate("/clientes")}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-200 transition rounded cursor-pointer"
        >
          Reparaciones
        </button>
        <button
          type="button"
          onClick={() => navigate("/clientes")}
          className="px-4 py-2 bg-violet-300 hover:bg-violet-200 transition rounded cursor-pointer"
        >
          Presupuestos
        </button>
        <button
          type="button"
          onClick={() => navigate("/clientes")}
          className="px-4 py-2 bg-rose-200 hover:bg-rose-100 transition rounded cursor-pointer"
        >
          Vehículos
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm max-w-2xl mx-auto p-4">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label className="block mb-2">Nombre completo</label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                className="w-full p-1 border rounded-sm bg-blue-50"
                required
              />
            </div>
            <div>
              <label className="block mb-2">DNI</label>
              <input
                type="text"
                value={formData.dni}
                onChange={(e) =>
                  setFormData({ ...formData, dni: e.target.value })
                }
                className="w-full p-1 border rounded-sm bg-blue-50"
                pattern="[0-9]{8}[A-Za-z]"
                title="Formato de DNI válido: 8 números y una letra"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Teléfono</label>
              <input
                type="tel"
                value={formData.telefono}
                onChange={(e) =>
                  setFormData({ ...formData, telefono: e.target.value })
                }
                className="w-full p-1 border rounded-sm bg-blue-50"
              />
            </div>
            <div>
              <label className="block mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full p-1 border rounded-sm bg-blue-50"
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-2">Dirección</label>
              <input
                type="text"
                value={formData.direccion}
                onChange={(e) =>
                  setFormData({ ...formData, direccion: e.target.value })
                }
                className="w-full p-1 border rounded-sm bg-blue-50"
                required
              />
            </div>
          </div>
          <div className="col-span-2 mt-2">
            <label className="block mb-2">Observaciones</label>
            <textarea
              value={formData.observaciones}
              onChange={(e) =>
                setFormData({ ...formData, observaciones: e.target.value })
              }
              className="w-full p-1 border rounded-sm resize-none bg-blue-50"
              rows="3"
              maxLength={255}
            ></textarea>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
            <button
              type="button"
              onClick={() => {
                if (
                  window.confirm(
                    "¿Estás seguro de que quieres eliminar este cliente?"
                  )
                ) {
                  const deleteCliente = async () => {
                    const { error } = await supabase
                      .from("clientes")
                      .delete()
                      .eq("id", id);

                    if (error) {
                      console.error("Error al eliminar cliente:", error);
                    } else {
                      navigate("/clientes");
                    }
                  };
                  deleteCliente();
                }
              }}
              className="px-4 py-2 text-white bg-red-500 hover:bg-red-100 transition rounded cursor-pointer"
            >
              Eliminar
            </button>
            <button
              type="button"
              onClick={() => navigate("/clientes")}
              className="px-4 py-2 text-white bg-gray-500 hover:bg-gray-100 transition rounded cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-sm hover:bg-blue-700"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MostrarCliente;
