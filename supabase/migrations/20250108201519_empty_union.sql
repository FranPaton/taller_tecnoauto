/*
  # Schema inicial para taller mecánico

  1. Nuevas Tablas
    - `clientes`: Información de los clientes
    - `vehiculos`: Registro de vehículos de los clientes
    - `reparaciones`: Registro de reparaciones
    - `presupuestos`: Presupuestos para reparaciones
    - `facturas`: Facturas emitidas
    - `servicios`: Catálogo de servicios disponibles
    
  2. Seguridad
    - RLS habilitado en todas las tablas
    - Políticas para lectura/escritura de datos
*/

-- Tabla de clientes
CREATE TABLE IF NOT EXISTS clientes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  apellidos text NOT NULL,
  telefono text,
  email text,
  direccion text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabla de vehículos
CREATE TABLE IF NOT EXISTS vehiculos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id uuid REFERENCES clientes(id),
  marca text NOT NULL,
  modelo text NOT NULL,
  ano integer NOT NULL,
  matricula text NOT NULL,
  kilometraje integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabla de servicios
CREATE TABLE IF NOT EXISTS servicios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  descripcion text,
  precio_base decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabla de reparaciones
CREATE TABLE IF NOT EXISTS reparaciones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vehiculo_id uuid REFERENCES vehiculos(id),
  fecha_entrada timestamptz DEFAULT now(),
  fecha_salida timestamptz,
  estado text NOT NULL DEFAULT 'pendiente',
  descripcion text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabla de presupuestos
CREATE TABLE IF NOT EXISTS presupuestos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reparacion_id uuid REFERENCES reparaciones(id),
  fecha_emision timestamptz DEFAULT now(),
  validez_dias integer DEFAULT 30,
  estado text NOT NULL DEFAULT 'pendiente',
  total decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabla de facturas
CREATE TABLE IF NOT EXISTS facturas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reparacion_id uuid REFERENCES reparaciones(id),
  fecha_emision timestamptz DEFAULT now(),
  total decimal(10,2) NOT NULL,
  estado_pago text NOT NULL DEFAULT 'pendiente',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehiculos ENABLE ROW LEVEL SECURITY;
ALTER TABLE servicios ENABLE ROW LEVEL SECURITY;
ALTER TABLE reparaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE presupuestos ENABLE ROW LEVEL SECURITY;
ALTER TABLE facturas ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad
CREATE POLICY "Acceso público a clientes"
  ON clientes
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Acceso público a vehículos"
  ON vehiculos
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Acceso público a servicios"
  ON servicios
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Acceso público a reparaciones"
  ON reparaciones
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Acceso público a presupuestos"
  ON presupuestos
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Acceso público a facturas"
  ON facturas
  FOR ALL
  TO authenticated
  USING (true);