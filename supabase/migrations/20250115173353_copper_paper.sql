/*
  # Actualizar políticas de usuarios

  1. Cambios
    - Eliminar política anterior que solo permitía SELECT
    - Crear nueva política que permite acceso público para login
  
  2. Seguridad
    - Permitir acceso público a la tabla usuarios para verificación de credenciales
*/

-- Eliminar política anterior
DROP POLICY IF EXISTS "Acceso a usuarios autenticados" ON usuarios;

-- Crear nueva política que permite acceso público
CREATE POLICY "Acceso público a usuarios"
  ON usuarios
  FOR SELECT
  USING (true);