/*
  # Agregar función de verificación de contraseñas

  1. Cambios
    - Crear función para verificar contraseñas hasheadas

  2. Seguridad
    - Utilizar pgcrypto para comparación segura de hashes
    - Implementar verificación del lado del servidor
*/

-- Función para verificar contraseñas
CREATE OR REPLACE FUNCTION verify_password(input_password TEXT, hashed_password TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN hashed_password = crypt(input_password, hashed_password);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;