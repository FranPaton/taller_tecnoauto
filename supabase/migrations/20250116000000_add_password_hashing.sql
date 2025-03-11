/*
  # Implementar hash de contraseñas

  1. Cambios
    - Crear función pgcrypto para hash de contraseñas
    - Actualizar contraseña existente con hash
    - Crear trigger para hashear nuevas contraseñas

  2. Seguridad
    - Utilizar extensión pgcrypto para hash seguro
    - Asegurar que las contraseñas nunca se almacenen en texto plano
*/

-- Habilitar extensión pgcrypto si no está habilitada
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Función para hashear contraseñas
CREATE OR REPLACE FUNCTION hash_password(password TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN crypt(password, gen_salt('bf', 8));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Actualizar contraseña existente con hash
UPDATE usuarios
SET password = hash_password(password)
WHERE password NOT LIKE '$2a$%';

-- Trigger para hashear nuevas contraseñas
CREATE OR REPLACE FUNCTION hash_password_trigger()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' OR NEW.password <> OLD.password THEN
    NEW.password = hash_password(NEW.password);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER hash_password_trigger
  BEFORE INSERT OR UPDATE ON usuarios
  FOR EACH ROW
  EXECUTE FUNCTION hash_password_trigger();