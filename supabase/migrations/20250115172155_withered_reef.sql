/*
  # Crear tabla de usuarios y usuario por defecto

  1. Nueva Tabla
    - `usuarios`
      - `id` (uuid, primary key)
      - `username` (text, unique)
      - `password` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Datos Iniciales
    - Usuario por defecto: diego/lima9440

  3. Seguridad
    - Habilitar RLS en la tabla `usuarios`
    - Añadir política para acceso autenticado
*/

-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  password text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Insertar usuario por defecto
INSERT INTO usuarios (username, password)
VALUES ('diego', 'lima9440')
ON CONFLICT (username) DO NOTHING;

-- Habilitar RLS
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;

-- Política de seguridad para usuarios autenticados
CREATE POLICY "Acceso a usuarios autenticados"
  ON usuarios
  FOR SELECT
  TO authenticated
  USING (true);