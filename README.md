# Sistema de Cuentas de Ahorro

Sistema de gestión de cuentas de ahorro implementado como API REST con Astro.

## 🚀 Estructura del Proyecto

```text
/
├── public/
├── src/
│   ├── lib/
│   │   └── db.ts              # Lógica de negocio y manejo de datos
│   ├── pages/
│   │   ├── api/savecash/      # Endpoints REST
│   │   │   ├── balance.json.ts    # Consultar saldo
│   │   │   ├── deposit.json.ts    # Realizar depósito
│   │   │   └── withdraw.json.ts   # Realizar retiro
│   │   ├── savecash/
│   │   │   └── index.astro    # Interfaz web
│   │   └── index.astro
│   ├── components/
│   │   └── savecash/          # Componentes UI
│   └── layouts/
└── package.json
```

## 🧞 Comandos

| Comando                   | Acción                                           |
| :------------------------ | :----------------------------------------------- |
| `bun install`             | Instala dependencias                            |
| `bun dev`                 | Inicia servidor de desarrollo en `localhost:4321`|
| `bun build`               | Construye el sitio para producción en `./dist/` |
| `bun preview`             | Previsualiza la build localmente                |

## 📡 Documentación de la API

Base URL: `http://localhost:4321/api/savecash`

### 1. Consultar Saldo

Obtiene el saldo actual de una cuenta de ahorro.

**Endpoint:** `GET /api/savecash/balance.json`

**Parámetros de consulta:**
| Parámetro | Tipo   | Requerido | Descripción          |
|-----------|--------|-----------|----------------------|
| `userId`  | number | Sí        | ID del usuario       |

**Ejemplo de Request:**
```bash
# cURL
curl "http://localhost:4321/api/savecash/balance.json?userId=1"

# JavaScript (Fetch)
fetch('http://localhost:4321/api/savecash/balance.json?userId=1')
  .then(res => res.json())
  .then(data => console.log(data));
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "balance": 1000,
  "userName": "John Doe"
}
```

**Respuestas de error:**
```json
// 400 - Bad Request (userId faltante)
{
  "success": false,
  "message": "userId es requerido"
}

// 404 - Not Found (usuario no existe)
{
  "success": false,
  "message": "Usuario no encontrado"
}
```

---

### 2. Realizar Depósito

Deposita dinero en una cuenta de ahorro.

**Endpoint:** `POST /api/savecash/deposit.json`

**Headers:**
```
Content-Type: application/json
```

**Body:**
| Campo    | Tipo   | Requerido | Descripción          |
|----------|--------|-----------|----------------------|
| `userId` | number | Sí        | ID del usuario       |
| `amount` | number | Sí        | Cantidad a depositar |

**Ejemplo de Request:**
```bash
# cURL
curl -X POST http://localhost:4321/api/savecash/deposit.json \
  -H "Content-Type: application/json" \
  -d '{"userId": 1, "amount": 500}'

# JavaScript (Fetch)
fetch('http://localhost:4321/api/savecash/deposit.json', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ userId: 1, amount: 500 })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Depósito realizado exitosamente",
  "balance": 1500
}
```

**Respuestas de error:**
```json
// 400 - Bad Request (parámetros faltantes)
{
  "success": false,
  "message": "userId y amount son requeridos"
}

// 400 - Bad Request (cantidad inválida)
{
  "success": false,
  "message": "La cantidad debe ser mayor que cero"
}

// 400 - Bad Request (usuario no encontrado)
{
  "success": false,
  "message": "Usuario no encontrado"
}
```

---

### 3. Realizar Retiro

Retira dinero de una cuenta de ahorro.

**Endpoint:** `POST /api/savecash/withdraw.json`

**Headers:**
```
Content-Type: application/json
```

**Body:**
| Campo    | Tipo   | Requerido | Descripción        |
|----------|--------|-----------|--------------------|
| `userId` | number | Sí        | ID del usuario     |
| `amount` | number | Sí        | Cantidad a retirar |

**Ejemplo de Request:**
```bash
# cURL
curl -X POST http://localhost:4321/api/savecash/withdraw.json \
  -H "Content-Type: application/json" \
  -d '{"userId": 1, "amount": 200}'

# JavaScript (Fetch)
fetch('http://localhost:4321/api/savecash/withdraw.json', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ userId: 1, amount: 200 })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Retiro realizado exitosamente",
  "balance": 1300
}
```

**Respuestas de error:**
```json
// 400 - Bad Request (parámetros faltantes)
{
  "success": false,
  "message": "userId y amount son requeridos"
}

// 400 - Bad Request (cantidad inválida)
{
  "success": false,
  "message": "La cantidad debe ser mayor que cero"
}

// 400 - Bad Request (saldo insuficiente)
{
  "success": false,
  "message": "Saldo insuficiente"
}

// 400 - Bad Request (usuario no encontrado)
{
  "success": false,
  "message": "Usuario no encontrado"
}
```

---

## 🧪 Probar con Postman

### Importar colección

1. Abre Postman
2. Click en "Import"
3. Pega la siguiente colección JSON:

```json
{
  "info": {
    "name": "Savings Account API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Consultar Saldo",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:4321/api/savecash/balance.json?userId=1",
          "protocol": "http",
          "host": ["localhost"],
          "port": "4321",
          "path": ["api", "savecash", "balance.json"],
          "query": [{ "key": "userId", "value": "1" }]
        }
      }
    },
    {
      "name": "Realizar Depósito",
      "request": {
        "method": "POST",
        "header": [{ "key": "Content-Type", "value": "application/json" }],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"userId\": 1,\n  \"amount\": 500\n}"
        },
        "url": {
          "raw": "http://localhost:4321/api/savecash/deposit.json",
          "protocol": "http",
          "host": ["localhost"],
          "port": "4321",
          "path": ["api", "savecash", "deposit.json"]
        }
      }
    },
    {
      "name": "Realizar Retiro",
      "request": {
        "method": "POST",
        "header": [{ "key": "Content-Type", "value": "application/json" }],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"userId\": 1,\n  \"amount\": 200\n}"
        },
        "url": {
          "raw": "http://localhost:4321/api/savecash/withdraw.json",
          "protocol": "http",
          "host": ["localhost"],
          "port": "4321",
          "path": ["api", "savecash", "withdraw.json"]
        }
      }
    }
  ]
}
```

### Probar manualmente

1. **Consultar saldo:**
   - Método: `GET`
   - URL: `http://localhost:4321/api/savecash/balance.json?userId=1`

2. **Depositar:**
   - Método: `POST`
   - URL: `http://localhost:4321/api/savecash/deposit.json`
   - Headers: `Content-Type: application/json`
   - Body: `{"userId": 1, "amount": 500}`

3. **Retirar:**
   - Método: `POST`
   - URL: `http://localhost:4321/api/savecash/withdraw.json`
   - Headers: `Content-Type: application/json`
   - Body: `{"userId": 1, "amount": 200}`

---

## 🔐 Códigos de Estado HTTP

| Código | Significado        | Cuándo se usa                              |
|--------|--------------------|--------------------------------------------|
| 200    | OK                 | Operación exitosa                          |
| 400    | Bad Request        | Parámetros inválidos o faltantes          |
| 404    | Not Found          | Usuario no encontrado                      |

---

## 💾 Modelo de Datos

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  savingAccount: {
    balance: number;
  };
}
```

**Usuario de prueba:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john_doe@gmail.com",
  "savingAccount": {
    "balance": 0
  }
}
```

---

## ✅ Validaciones

El sistema incluye las siguientes validaciones:

- ✅ **userId requerido** en todas las operaciones
- ✅ **amount requerido** en depósitos y retiros
- ✅ **amount > 0** en todas las transacciones
- ✅ **Saldo suficiente** para retiros
- ✅ **Usuario existe** antes de operar

---

## 🛠️ Tecnologías

- **Astro 5** - Framework web
- **TypeScript** - Tipado estático
- **Tailwind CSS v4** - Estilos
- **Vanilla Sonner** - Notificaciones toast

---

## 📝 Licencia

ISC
