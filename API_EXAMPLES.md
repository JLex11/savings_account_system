# Ejemplos de Uso de la API

## 🔧 Requisitos Previos

Asegúrate de que el servidor esté corriendo:

```bash
bun dev
# Servidor disponible en http://localhost:4321
```

---

## 📋 Ejemplos con cURL

### 1. Consultar Saldo

```bash
# Consultar saldo del usuario 1
curl "http://localhost:4321/api/savecash/balance.json?userId=1"

# Respuesta esperada:
# {"success":true,"balance":0,"userName":"John Doe"}
```

### 2. Realizar Depósito

```bash
# Depositar $500
curl -X POST http://localhost:4321/api/savecash/deposit.json \
  -H "Content-Type: application/json" \
  -d '{"userId": 1, "amount": 500}'

# Respuesta esperada:
# {"success":true,"message":"Depósito realizado exitosamente","balance":500}
```

### 3. Realizar Retiro

```bash
# Retirar $200
curl -X POST http://localhost:4321/api/savecash/withdraw.json \
  -H "Content-Type: application/json" \
  -d '{"userId": 1, "amount": 200}'

# Respuesta esperada:
# {"success":true,"message":"Retiro realizado exitosamente","balance":300}
```

---

## 💻 Ejemplos con JavaScript/Fetch

### 1. Consultar Saldo

```javascript
async function consultarSaldo(userId) {
  try {
    const response = await fetch(
      `http://localhost:4321/api/savecash/balance.json?userId=${userId}`
    );
    const data = await response.json();

    if (data.success) {
      console.log(`Saldo de ${data.userName}: $${data.balance}`);
    } else {
      console.error('Error:', data.message);
    }

    return data;
  } catch (error) {
    console.error('Error de red:', error);
  }
}

// Uso
consultarSaldo(1);
```

### 2. Realizar Depósito

```javascript
async function realizarDeposito(userId, amount) {
  try {
    const response = await fetch(
      'http://localhost:4321/api/savecash/deposit.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, amount }),
      }
    );

    const data = await response.json();

    if (data.success) {
      console.log(data.message);
      console.log(`Nuevo saldo: $${data.balance}`);
    } else {
      console.error('Error:', data.message);
    }

    return data;
  } catch (error) {
    console.error('Error de red:', error);
  }
}

// Uso
realizarDeposito(1, 500);
```

### 3. Realizar Retiro

```javascript
async function realizarRetiro(userId, amount) {
  try {
    const response = await fetch(
      'http://localhost:4321/api/savecash/withdraw.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, amount }),
      }
    );

    const data = await response.json();

    if (data.success) {
      console.log(data.message);
      console.log(`Nuevo saldo: $${data.balance}`);
    } else {
      console.error('Error:', data.message);
    }

    return data;
  } catch (error) {
    console.error('Error de red:', error);
  }
}

// Uso
realizarRetiro(1, 200);
```

---

## 🔄 Flujo Completo de Prueba

```javascript
// Script completo para probar todas las operaciones
async function probarAPI() {
  const userId = 1;

  console.log('=== 1. Consultando saldo inicial ===');
  await consultarSaldo(userId);

  console.log('\n=== 2. Depositando $1000 ===');
  await realizarDeposito(userId, 1000);

  console.log('\n=== 3. Consultando saldo después del depósito ===');
  await consultarSaldo(userId);

  console.log('\n=== 4. Retirando $300 ===');
  await realizarRetiro(userId, 300);

  console.log('\n=== 5. Consultando saldo final ===');
  await consultarSaldo(userId);
}

// Ejecutar
probarAPI();
```

---

## 🧪 Casos de Prueba

### Caso 1: Depósito Exitoso

```bash
# Request
curl -X POST http://localhost:4321/api/savecash/deposit.json \
  -H "Content-Type: application/json" \
  -d '{"userId": 1, "amount": 1000}'

# Response (200)
{
  "success": true,
  "message": "Depósito realizado exitosamente",
  "balance": 1000
}
```

### Caso 2: Error - Cantidad Negativa

```bash
# Request
curl -X POST http://localhost:4321/api/savecash/deposit.json \
  -H "Content-Type: application/json" \
  -d '{"userId": 1, "amount": -100}'

# Response (400)
{
  "success": false,
  "message": "La cantidad debe ser mayor que cero"
}
```

### Caso 3: Error - Saldo Insuficiente

```bash
# Request
curl -X POST http://localhost:4321/api/savecash/withdraw.json \
  -H "Content-Type: application/json" \
  -d '{"userId": 1, "amount": 999999}'

# Response (400)
{
  "success": false,
  "message": "Saldo insuficiente"
}
```

### Caso 4: Error - Usuario No Encontrado

```bash
# Request
curl "http://localhost:4321/api/savecash/balance.json?userId=999"

# Response (404)
{
  "success": false,
  "message": "Usuario no encontrado"
}
```

### Caso 5: Error - Parámetros Faltantes

```bash
# Request
curl -X POST http://localhost:4321/api/savecash/deposit.json \
  -H "Content-Type: application/json" \
  -d '{"userId": 1}'

# Response (400)
{
  "success": false,
  "message": "userId y amount son requeridos"
}
```

---

## 🎯 Ejemplo con Axios

```javascript
import axios from 'axios';

const API_BASE = 'http://localhost:4321/api/savecash';

// Consultar saldo
const getBalance = async (userId) => {
  const { data } = await axios.get(`${API_BASE}/balance.json`, {
    params: { userId }
  });
  return data;
};

// Depositar
const deposit = async (userId, amount) => {
  const { data } = await axios.post(`${API_BASE}/deposit.json`, {
    userId,
    amount
  });
  return data;
};

// Retirar
const withdraw = async (userId, amount) => {
  const { data } = await axios.post(`${API_BASE}/withdraw.json`, {
    userId,
    amount
  });
  return data;
};

// Uso
(async () => {
  try {
    // Consultar saldo
    const balance = await getBalance(1);
    console.log('Saldo:', balance);

    // Depositar
    const depositResult = await deposit(1, 500);
    console.log('Depósito:', depositResult);

    // Retirar
    const withdrawResult = await withdraw(1, 200);
    console.log('Retiro:', withdrawResult);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
})();
```

---

## 🐍 Ejemplo con Python (requests)

```python
import requests
import json

BASE_URL = "http://localhost:4321/api/savecash"

# Consultar saldo
def get_balance(user_id):
    response = requests.get(
        f"{BASE_URL}/balance.json",
        params={"userId": user_id}
    )
    return response.json()

# Depositar
def deposit(user_id, amount):
    response = requests.post(
        f"{BASE_URL}/deposit.json",
        json={"userId": user_id, "amount": amount},
        headers={"Content-Type": "application/json"}
    )
    return response.json()

# Retirar
def withdraw(user_id, amount):
    response = requests.post(
        f"{BASE_URL}/withdraw.json",
        json={"userId": user_id, "amount": amount},
        headers={"Content-Type": "application/json"}
    )
    return response.json()

# Uso
if __name__ == "__main__":
    user_id = 1

    # Consultar saldo
    balance = get_balance(user_id)
    print(f"Saldo: {balance}")

    # Depositar
    deposit_result = deposit(user_id, 500)
    print(f"Depósito: {deposit_result}")

    # Retirar
    withdraw_result = withdraw(user_id, 200)
    print(f"Retiro: {withdraw_result}")
```

---

## 📱 Variables de Entorno (Opcional)

Crea un archivo `.env.local` para configurar la URL base:

```bash
PUBLIC_API_BASE_URL=http://localhost:4321
```

Luego úsala en tu código:

```javascript
const API_BASE = import.meta.env.PUBLIC_API_BASE_URL || 'http://localhost:4321';
```
