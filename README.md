# 🐄 GanaderoPro - Sistema de Gestión Ganadera
## Documentación de Base de Datos

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-12%2B-316192)
![Status](https://img.shields.io/badge/status-production--ready-green)

---

## 📖 Descripción General

**GanaderoPro** es un sistema completo de gestión ganadera diseñado para ganaderos medianos y grandes que necesitan llevar un control exhaustivo de sus animales. Esta documentación contiene el esquema completo de base de datos PostgreSQL con todas las tablas, relaciones, índices y consultas necesarias para el funcionamiento de la aplicación móvil.

### 🎯 Objetivo

Proporcionar una base de datos robusta, escalable y completa que permita:
- ✅ Trazabilidad completa de cada animal desde el nacimiento hasta la venta
- ✅ Registro detallado de eventos sanitarios, reproductivos y productivos
- ✅ Sistema de alertas y recordatorios automatizados
- ✅ Generación de reportes y estadísticas
- ✅ Soporte para identificación RFID
- ✅ Gestión de genealogía (árboles familiares)

---

## 📁 Estructura de Archivos

Este proyecto contiene 4 archivos principales:

| Archivo | Descripción | Uso |
|---------|-------------|-----|
| **ganadero_pro_schema.sql** | Esquema completo de la base de datos | Ejecutar en PostgreSQL para crear toda la estructura |
| **DATABASE_SETUP.md** | Guía de instalación y configuración | Consultar para instalar en local o producción |
| **DATABASE_ERD.md** | Diagrama entidad-relación visual | Entender la arquitectura y relaciones |
| **API_EXAMPLES.md** | Ejemplos de API y modelos de datos | Referencia para desarrollo del backend/frontend |
| **README.md** | Este archivo - Documentación general | Punto de entrada y visión general |

---

## 🗄️ Arquitectura de la Base de Datos

### Estadísticas Generales

- **Total de tablas**: 18 tablas principales
- **Tablas de registros**: 11 (eventos y actividades)
- **Tablas de catálogos**: 3 (razas, vacunas, configuración)
- **Tablas de configuración**: 2 (lotes, potreros)
- **Vistas predefinidas**: 4
- **Triggers automáticos**: 16
- **Índices optimizados**: 25+

### 📊 Módulos Principales

La base de datos está organizada en 7 módulos funcionales:

#### 1. 👤 **Módulo de Usuarios**
```
📦 usuarios
└── Información de ganaderos/propietarios
```
Almacena datos de los usuarios del sistema, información de fincas y contacto.

**Campos clave**: nombre, email, nombre_finca, ubicacion_finca

---

#### 2. 🐮 **Módulo de Ganado (Entidad Principal)**
```
📦 ganado
├── Identificación (ID, RFID, nombre)
├── Información física (raza, sexo, edad, peso)
├── Genealogía (madre_id, padre_id)
├── Ubicación (lote, potrero)
└── Estado (Activo, Vendido, Muerto, etc.)
```

**Relaciones importantes**:
- Auto-referencia para genealogía (madre/padre)
- 1:N con todos los módulos de registros
- N:1 con usuarios

**Campos únicos**: 
- `numero_identificacion` - Identificador único del animal
- `rfid_tag` - Tag RFID para lectura automática

---

#### 3. 💉 **Módulo Sanitario**
Control completo de salud del ganado.

```
📦 Módulo Sanitario
├── 📋 catalogo_vacunas (catálogo de vacunas disponibles)
├── 💉 registros_vacunacion (vacunas aplicadas)
├── 💊 registros_tratamientos (desparasitaciones, antibióticos)
└── 🔬 registros_examenes (brucelosis, tuberculosis, análisis)
```

**Funcionalidades**:
- Registro de vacunaciones con fechas de refuerzo
- Control de tratamientos con días de retiro
- Resultados de exámenes de laboratorio
- Trazabilidad de productos aplicados (lote, veterinario)

**Ejemplo de uso**: Registrar vacuna de Aftosa el 5 de febrero, con refuerzo programado para agosto.

---

#### 4. 🐄 **Módulo Reproductivo**
Gestión completa del ciclo reproductivo.

```
📦 Módulo Reproductivo
├── 📅 registros_celo (detección de calores)
├── 🔬 registros_inseminacion (IA o monta natural)
├── 🔍 registros_diagnostico_gestacion (diagnósticos de preñez)
├── 👶 registros_parto (nacimientos)
└── 🍼 registros_destete (destetes)
```

**Flujo completo**:
```
Detección de Celo
    ↓
Inseminación Artificial / Monta Natural
    ↓
Diagnóstico de Gestación (30-60 días)
    ↓
Seguimiento de Gestación
    ↓
Parto (280 días aprox.)
    ↓
Destete (6-8 meses)
```

**Trazabilidad genealógica**:
- El parto crea un nuevo registro en `ganado` (la cría)
- Se vincula automáticamente madre → cría
- Se registra información del padre (toro o pajilla)

---

#### 5. 📈 **Módulo de Producción**
Seguimiento de producción y rendimiento.

```
📦 Módulo de Producción
├── 🥛 registros_produccion_leche (producción diaria)
└── ⚖️ registros_pesaje (control de peso)
```

**Producción de Leche**:
- Registro por ordeño (mañana, tarde, noche)
- Control de calidad y temperatura
- Cálculo automático de promedios

**Control de Peso**:
- Pesajes por tipo (nacimiento, destete, rutinario, pre-venta)
- Cálculo de ganancias diarias
- Condición corporal (escala 1-5)

---

#### 6. 🚚 **Módulo de Movimientos**
Registro de traslados y transacciones.

```
📦 registros_movimientos
├── Traslados (cambio de potrero/lote)
├── Ventas (salida del inventario)
├── Compras (ingreso al inventario)
├── Muertes (baja por muerte)
└── Donaciones
```

**Información registrada**:
- Origen y destino
- Comprador/vendedor
- Precio y guía de movilización
- Causa (en caso de muerte)

---

#### 7. 🔔 **Sistema de Alertas**
Recordatorios y notificaciones automatizadas.

```
📦 alertas
├── Prioridad (Alta, Media, Baja)
├── Tipos:
│   ├── Vacunación pendiente
│   ├── Revisión veterinaria
│   ├── Próximo parto
│   ├── Tratamiento por completar
│   ├── Revisión de gestación
│   ├── Pesaje pendiente
│   └── Destete programado
└── Estado (Pendiente/Completada)
```

**Funcionalidades**:
- Notificaciones automáticas
- Vinculación opcional con animal específico
- Fechas de vencimiento
- Marcado de completadas

---

#### 8. ⚙️ **Módulo de Configuración**
Catálogos y datos maestros.

```
📦 Configuración
├── 📚 catalogo_razas (Holstein, Jersey, Angus, etc.)
├── 📦 lotes (grupos de animales)
└── 🌾 potreros (divisiones de tierra)
```

---

## 🔗 Relaciones Clave

### Relación Central: Usuario → Ganado → Registros

```
USUARIO (1)
    ↓
GANADO (N)
    ↓
    ├── Vacunaciones (N)
    ├── Tratamientos (N)
    ├── Inseminaciones (N)
    ├── Partos (N)
    ├── Producción (N)
    ├── Pesajes (N)
    └── Movimientos (N)
```

### Genealogía (Auto-referencia)

```
GANADO
    ├── madre_id → GANADO.id
    └── padre_id → GANADO.id
```

Permite construir árboles genealógicos completos:
- Bisabuelos
- Abuelos
- Padres
- Hermanos (misma madre/padre)
- Hijos/Crías

### Ciclo Reproductivo Completo

```
INSEMINACION (1)
    ├── → DIAGNOSTICO_GESTACION (N)
    ├── → PARTO (1)
    │       └── cria_id → GANADO (1)
    └── DESTETE (1)
```

---

## 📊 Campos Especiales

### UUIDs como Claves Primarias
```sql
id UUID PRIMARY KEY DEFAULT gen_random_uuid()
```
**Ventajas**:
- ✅ No secuenciales (mayor seguridad)
- ✅ Únicos globalmente
- ✅ Ideales para sistemas distribuidos
- ✅ Facilitan sincronización offline

### Timestamps Automáticos
```sql
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```
Con triggers que actualizan `updated_at` automáticamente en cada UPDATE.

### JSONB para Datos Flexibles
```sql
valores_medidos JSONB
```
Usado en exámenes para almacenar múltiples resultados:
```json
{
  "hemoglobina": 12.5,
  "leucocitos": 8000,
  "hematocrito": 38.5
}
```

### Arrays para Listas
```sql
sintomas_observados TEXT[]
```
Ejemplo: `['Inquietud', 'Monta a otras vacas', 'Secreción mucosa']`

---

## 🎯 Características Avanzadas

### 1. **Soft Deletes**
Muchas tablas incluyen campo `activo BOOLEAN` para borrado lógico:
```sql
UPDATE ganado SET activo = false WHERE id = '...';
-- En lugar de DELETE
```

### 2. **Validaciones con CHECK Constraints**
```sql
sexo VARCHAR(20) CHECK (sexo IN ('Macho', 'Hembra'))
estado CHECK (estado IN ('Activo', 'Vendido', 'Muerto', 'Donado'))
condicion_corporal CHECK (condicion_corporal >= 1 AND condicion_corporal <= 5)
```

### 3. **Índices Optimizados**
```sql
-- Búsquedas frecuentes
CREATE INDEX idx_ganado_usuario ON ganado(usuario_id);
CREATE INDEX idx_ganado_rfid ON ganado(rfid_tag);
CREATE INDEX idx_alertas_pendientes ON alertas(completada) WHERE completada = false;
```

### 4. **Políticas ON DELETE**
```sql
-- Eliminar usuario elimina todo su ganado
usuario_id REFERENCES usuarios(id) ON DELETE CASCADE

-- Eliminar ganado NO elimina sus crías
madre_id REFERENCES ganado(id) ON DELETE SET NULL
```

---

## 📋 Vistas Predefinidas

### 1. `vista_ganado_activo`
Lista rápida de todos los animales activos con información resumida.
```sql
SELECT * FROM vista_ganado_activo WHERE raza = 'Holstein';
```

### 2. `vista_alertas_pendientes`
Alertas no completadas ordenadas por prioridad.
```sql
SELECT * FROM vista_alertas_pendientes;
```

### 3. `vista_produccion_diaria`
Producción de leche del día por animal.
```sql
SELECT * FROM vista_produccion_diaria WHERE fecha_registro = CURRENT_DATE;
```

### 4. `vista_estado_reproductivo`
Estado reproductivo actual de todas las hembras.
```sql
SELECT * FROM vista_estado_reproductivo WHERE diagnostico_gestacion = 'Gestante';
```

---

## 🚀 Casos de Uso Principales

### 1. **Registrar un Nuevo Animal**
```sql
INSERT INTO ganado (
    usuario_id, numero_identificacion, nombre, raza, sexo, 
    fecha_nacimiento, peso_actual, estado, proposito
) VALUES (
    'usuario-uuid', 'BOV-001', 'Margarita', 'Holstein', 'Hembra',
    '2020-05-15', 350.0, 'Activo', 'Leche'
);
```

### 2. **Registrar Producción Diaria**
```sql
INSERT INTO registros_produccion_leche (
    ganado_id, usuario_id, fecha_registro,
    produccion_manana, produccion_tarde, produccion_total, calidad
) VALUES (
    'ganado-uuid', 'usuario-uuid', CURRENT_DATE,
    12.5, 10.8, 23.3, 'Excelente'
);
```

### 3. **Consultar Historial Completo**
```sql
-- Unión de todos los eventos
SELECT 'Vacuna' as tipo, fecha_aplicacion, nombre_vacuna as detalle
FROM registros_vacunacion WHERE ganado_id = 'ganado-uuid'
UNION ALL
SELECT 'Parto', fecha_parto, tipo_parto
FROM registros_parto WHERE ganado_id = 'ganado-uuid'
ORDER BY fecha DESC;
```

### 4. **Animales Próximos a Parir**
```sql
SELECT g.numero_identificacion, g.nombre, d.fecha_probable_parto,
       (d.fecha_probable_parto - CURRENT_DATE) as dias_restantes
FROM ganado g
JOIN registros_diagnostico_gestacion d ON g.id = d.ganado_id
WHERE d.resultado = 'Gestante'
AND d.fecha_probable_parto BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '30 days'
ORDER BY d.fecha_probable_parto;
```

### 5. **Top 10 Mejores Productoras**
```sql
SELECT g.numero_identificacion, g.nombre,
       AVG(p.produccion_total) as promedio_litros
FROM ganado g
JOIN registros_produccion_leche p ON g.id = p.ganado_id
WHERE p.fecha_registro >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY g.id, g.numero_identificacion, g.nombre
ORDER BY promedio_litros DESC
LIMIT 10;
```

---

## 📱 Integración con Aplicación Móvil

### Flujo de Datos

```
┌─────────────────┐
│   App Móvil     │
│   (React)       │
└────────┬────────┘
         │
         │ HTTPS/REST
         │
┌────────▼────────┐
│   Backend API   │
│ (Node/Python)   │
└────────┬────────┘
         │
         │ SQL
         │
┌────────▼────────┐
│   PostgreSQL    │
│   GanaderoPro   │
└─────────────────┘
```

### Características para Móvil

✅ **Soporte RFID**: Campo `rfid_tag` para lectura de tags
✅ **Búsqueda rápida**: Índices en campos frecuentes
✅ **Fotos**: Campo `foto_url` para almacenar imágenes
✅ **Geolocalización**: Campos de ubicación de finca
✅ **Sincronización**: UUIDs para evitar conflictos
✅ **Modo offline**: Estructura que permite cache local

---

## 🔐 Seguridad

### Recomendaciones

1. **Usuarios de Base de Datos**
```sql
-- Usuario con permisos limitados para la app
CREATE USER ganadero_app WITH PASSWORD 'password_seguro';
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES TO ganadero_app;
```

2. **Conexión Encriptada**
```javascript
// Usar SSL en producción
const pool = new Pool({
  ssl: {
    rejectUnauthorized: false
  }
});
```

3. **Validación de Datos**
- ✅ Checks a nivel de BD
- ✅ Validación en backend
- ✅ Validación en frontend

4. **Auditoría**
- Todos los registros tienen `created_at` y `updated_at`
- Todos los eventos guardan `usuario_id`
- Soft deletes permiten recuperación

---

## 📈 Escalabilidad

### Preparado para Crecimiento

**Actual**: Soporta miles de animales y millones de registros

**Futuro**:
- ✅ Particionamiento por fecha (tablas de producción)
- ✅ Replicación master-slave
- ✅ Índices parciales para consultas específicas
- ✅ Archivado de datos históricos

### Estimaciones de Capacidad

| Tabla | Registros Estimados/Año | Tamaño Aprox. |
|-------|------------------------|---------------|
| ganado | 500-1000 | 1-2 MB |
| registros_produccion_leche | 18,250 (50 vacas × 365 días) | 10-15 MB |
| registros_vacunacion | 1,500 | 500 KB |
| registros_pesaje | 2,000 | 500 KB |
| alertas | 5,000 | 2 MB |

**Total estimado por año**: ~30-50 MB de datos

---

## 🛠️ Instalación Rápida

### Requisitos
- PostgreSQL 12 o superior
- Cliente psql o pgAdmin

### Pasos

```bash
# 1. Crear base de datos
createdb ganadero_pro

# 2. Ejecutar schema
psql -d ganadero_pro -f ganadero_pro_schema.sql

# 3. Verificar instalación
psql -d ganadero_pro -c "\dt"

# 4. (Opcional) Insertar datos de prueba
psql -d ganadero_pro -f datos_prueba.sql
```

Para más detalles, ver **DATABASE_SETUP.md**

---

## 📚 Documentación Adicional

| Documento | Contenido |
|-----------|-----------|
| [DATABASE_SETUP.md](./DATABASE_SETUP.md) | Guía completa de instalación, configuración y ejemplos |
| [DATABASE_ERD.md](./DATABASE_ERD.md) | Diagrama visual de entidades y relaciones |
| [API_EXAMPLES.md](./API_EXAMPLES.md) | Modelos TypeScript y ejemplos de endpoints REST |

---

## 🔍 Consultas Frecuentes

### ¿Por qué PostgreSQL?
- ✅ Open source y gratuito
- ✅ JSONB para datos flexibles
- ✅ Arrays nativos
- ✅ Excelente rendimiento
- ✅ Triggers y funciones avanzadas
- ✅ Comunidad activa

### ¿Puedo usar con MySQL/MariaDB?
Requiere adaptaciones:
- Cambiar UUID por CHAR(36) o usar AUTO_INCREMENT
- Adaptar sintaxis de triggers
- Cambiar JSONB por JSON
- Modificar arrays por tablas relacionadas

### ¿Cómo migrar datos existentes?
1. Crear la estructura con `ganadero_pro_schema.sql`
2. Mapear campos de tu sistema actual
3. Crear scripts de migración SQL
4. Validar integridad referencial
5. Verificar datos migrados

### ¿Cuántos animales soporta?
- **Sin problemas**: Hasta 10,000 animales
- **Con optimización**: 50,000+ animales
- **Con particionamiento**: 100,000+ animales

---

## 🧪 Testing

### Datos de Prueba

El schema incluye datos iniciales:
- 7 razas comunes
- 6 vacunas estándar

Para más datos de prueba, ver ejemplos en **DATABASE_SETUP.md**

### Validaciones Importantes

```sql
-- Verificar integridad referencial
SELECT COUNT(*) FROM ganado WHERE usuario_id NOT IN (SELECT id FROM usuarios);

-- Verificar UUIDs únicos
SELECT numero_identificacion, COUNT(*) 
FROM ganado 
GROUP BY numero_identificacion 
HAVING COUNT(*) > 1;

-- Verificar fechas lógicas
SELECT * FROM ganado WHERE fecha_nacimiento > CURRENT_DATE;
```

---

## 📊 Estadísticas del Schema

```
📦 Total de Objetos: 60+
├── 18 Tablas
├── 25+ Índices
├── 16 Triggers
├── 4 Vistas
├── 1 Función (actualizar_updated_at)
└── 50+ Constraints (PK, FK, CHECK, UNIQUE)
```

### Complejidad por Módulo

| Módulo | Tablas | Complejidad |
|--------|--------|-------------|
| Usuario | 1 | Baja |
| Ganado | 1 | Media |
| Sanitario | 4 | Alta |
| Reproductivo | 5 | Alta |
| Producción | 2 | Media |
| Movimientos | 1 | Baja |
| Alertas | 1 | Media |
| Configuración | 3 | Baja |

---

## 🤝 Contribuir

### Sugerencias de Mejora

Si necesitas agregar funcionalidades:

1. **Módulo de Alimentación**
   - Tabla: `registros_alimentacion`
   - Campos: tipo_alimento, cantidad, costo

2. **Módulo Financiero**
   - Tabla: `gastos`
   - Tabla: `ingresos`
   - Reportes de rentabilidad

3. **Módulo de Recursos Humanos**
   - Tabla: `empleados`
   - Vinculación: registros → empleado

4. **Imágenes y Documentos**
   - Tabla: `archivos`
   - Vinculación múltiple (ganado, tratamientos, etc.)

---

## 📞 Soporte y Contacto

### Problemas Comunes

**Error: "relation does not exist"**
- Verifica que estés en la BD correcta: `\c ganadero_pro`

**Error: "permission denied"**
- Usa superusuario para crear estructura
- Luego asigna permisos a usuario de app

**Lentitud en consultas**
- Ejecuta `EXPLAIN ANALYZE` para identificar cuellos de botella
- Verifica que los índices existen: `\di`

---

## 📄 Licencia

Este esquema de base de datos es parte del proyecto GanaderoPro.

---

## 🚦 Estado del Proyecto

| Componente | Estado | Notas |
|------------|--------|-------|
| Schema SQL | ✅ Completo | Listo para producción |
| Vistas | ✅ Completo | 4 vistas útiles |
| Triggers | ✅ Completo | Auto-update timestamps |
| Índices | ✅ Completo | Optimizado para consultas frecuentes |
| Datos iniciales | ✅ Completo | Razas y vacunas |
| Documentación | ✅ Completo | 4 archivos MD |
| Testing | ⚠️ Recomendado | Probar con datos reales |
| API Backend | 📋 Pendiente | Por implementar |
| Frontend Integration | 📋 Pendiente | Por implementar |

---

## 🎯 Próximos Pasos

### Para el Desarrollador Backend

1. ✅ Instalar PostgreSQL localmente
2. ✅ Ejecutar `ganadero_pro_schema.sql`
3. ⬜ Crear API REST (Node.js/Express o Python/FastAPI)
4. ⬜ Implementar autenticación JWT
5. ⬜ Crear endpoints según `API_EXAMPLES.md`
6. ⬜ Implementar sincronización offline

### Para el Desarrollador Frontend

1. ✅ Revisar modelos TypeScript en `API_EXAMPLES.md`
2. ⬜ Implementar servicios de API
3. ⬜ Integrar con formularios existentes
4. ⬜ Implementar cache local (React Query / Zustand)
5. ⬜ Probar flujos completos

### Para Testing

1. ⬜ Insertar 50-100 animales de prueba
2. ⬜ Crear registros de todos los tipos
3. ⬜ Probar consultas complejas
4. ⬜ Medir rendimiento con datos reales
5. ⬜ Validar integridad referencial

---

## 📸 Capturas Conceptuales

### Dashboard Esperado
```
┌─────────────────────────────────────┐
│  Dashboard GanaderoPro              │
├─────────────────────────────────────┤
│  Total Animales:         125        │
│  Alertas Pendientes:     8          │
│  Producción Hoy:         1,850 L    │
│  Partos este mes:        5          │
├─────────────────────────────────────┤
│  📊 Gráfico Producción              │
│  📈 Tendencia Peso                  │
│  🔔 Próximas Alertas               │
└─────────────────────────────────────┘
```

### Perfil de Animal
```
┌─────────────────────────────────────┐
│  BOV-001 - Margarita               │
│  Holstein • Hembra • 5 años        │
├─────────────────────────────────────┤
│  [General] [Sanitario] [Repro]     │
│  [Producción] [Historial]          │
├─────────────────────────────────────┤
│  Última producción: 23.5 L         │
│  Último pesaje: 450 kg             │
│  Estado: Gestante (120 días)       │
│  Próximo evento: Parto (15 Feb)    │
└─────────────────────────────────────┘
```

---

## 🎓 Conceptos Clave Explicados

### Trazabilidad
Capacidad de seguir la vida completa de un animal desde el nacimiento hasta la salida del sistema, con todos los eventos registrados.

### RFID (Radio Frequency Identification)
Sistema de identificación mediante ondas de radio. Cada animal tiene un tag único que se puede leer automáticamente.

### Condición Corporal
Escala del 1 al 5 que evalúa el estado nutricional del animal:
- 1: Muy delgado
- 3: Ideal
- 5: Obeso

### Días de Retiro
Tiempo que debe pasar entre la aplicación de un medicamento y el uso de leche/carne para consumo humano.

### Inseminación Artificial (IA)
Técnica reproductiva que usa semen congelado de toros seleccionados para mejorar genética.

---

## 🌟 Características Destacadas

### 1. Sistema de Genealogía Completo
```sql
-- Consultar todos los hijos de una vaca
SELECT * FROM ganado WHERE madre_id = 'vaca-uuid';

-- Consultar hermanos (misma madre)
SELECT * FROM ganado 
WHERE madre_id = (SELECT madre_id FROM ganado WHERE id = 'animal-uuid')
AND id != 'animal-uuid';
```

### 2. Historial Unificado
Todos los eventos del animal en un solo lugar usando UNION.

### 3. Alertas Inteligentes
Sistema que puede crear alertas automáticamente basado en:
- Fechas de refuerzo de vacunas
- Fechas probables de parto
- Finalización de tratamientos

### 4. Multi-tenancy Ready
Cada tabla incluye `usuario_id` permitiendo múltiples usuarios en la misma BD.

---

## 📐 Principios de Diseño

1. **Normalización**: 3ra forma normal para evitar redundancia
2. **Integridad referencial**: FK con políticas ON DELETE apropiadas
3. **Auditoría**: Timestamps en todo
4. **Flexibilidad**: JSONB para datos variables
5. **Performance**: Índices en campos de búsqueda frecuente
6. **Escalabilidad**: UUIDs y estructura preparada para crecimiento
7. **Mantenibilidad**: Nombres descriptivos y documentación

---

## 🎉 Conclusión

Este esquema de base de datos representa una solución completa y profesional para gestión ganadera, diseñada pensando en:

✅ **Ganaderos**: Interface intuitiva a través de la app móvil
✅ **Veterinarios**: Registro completo de tratamientos y diagnósticos
✅ **Administradores**: Reportes y estadísticas detalladas
✅ **Desarrolladores**: Estructura clara y bien documentada

**Todo listo para construir tu backend y conectarlo con la aplicación móvil.**

---

**Versión**: 1.0.0  
**Fecha**: Febrero 2026  
**Autor**: Sistema GanaderoPro  
**Licencia**: Propietaria

---

> 💡 **Tip**: Comienza instalando la base de datos localmente, inserta algunos datos de prueba, y familiarízate con las consultas antes de construir el backend.

> 🚀 **Next Step**: Lee [DATABASE_SETUP.md](./DATABASE_SETUP.md) para comenzar la instalación.

