/*
  # Hacer obligatorio el campo dni en clientes
  
  1. Cambio estructural:
    - Modificar columna dni para requerir valor
    
  2. Validación de datos:
    - Asegurar integridad de datos existentes
    - Aplicar restricción a nuevos registros
*/

ALTER TABLE clientes
ALTER COLUMN dni SET NOT NULL;