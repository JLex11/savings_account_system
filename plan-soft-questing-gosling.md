# Plan: Sistema de Cuenta de Ahorro (Savings Account System)

## Context

The user has a partially implemented savings account system using Astro with a fake in-memory database. The current implementation includes:
- Basic user data structure with a `usuarios` array containing one user (John Doe, id=1, balance=0)
- Two database functions: `addBalance()` for deposits and `debitBalance()` for withdrawals
- One API endpoint at `/savecash/[id].json.ts` (currently buggy and will be replaced)
- No UI for the savings account operations

**Goal:** Complete the system to allow users to deposit money, withdraw money, check balance, and validate insufficient funds - all in a simple, functional interface.

## Implementation Plan

### Phase 1: Complete Database Layer

**File:** [src/lib/db.ts](src/lib/db.ts)

**Changes:**
1. Add TypeScript interface for `User` type for better type safety
2. Add `getBalance(userId)` function to query current balance
3. Translate error messages to Spanish
4. Fix typo: "acoount" → "account" (line 42)

**New function signature:**
```typescript
export const getBalance = (userId: number) => {
  // Returns: { success: boolean, balance?: number, userName?: string, message?: string }
}
```

**Reusable utilities:** The existing `addBalance()` and `debitBalance()` functions already handle all validation logic (amount > 0, user exists, sufficient balance).

---

### Phase 2: Create API Endpoints

**New File 1:** [src/pages/api/savecash/balance.json.ts](src/pages/api/savecash/balance.json.ts)
- GET endpoint to retrieve balance
- Query parameter: `userId`
- Calls `getBalance()` from db.ts
- Returns JSON with balance and userName

**New File 2:** [src/pages/api/savecash/deposit.json.ts](src/pages/api/savecash/deposit.json.ts)
- POST endpoint for deposits
- Request body: `{ userId: number, amount: number }`
- Calls `addBalance()` from db.ts
- Returns JSON with success status and updated balance

**New File 3:** [src/pages/api/savecash/withdraw.json.ts](src/pages/api/savecash/withdraw.json.ts)
- POST endpoint for withdrawals
- Request body: `{ userId: number, amount: number }`
- Calls `debitBalance()` from db.ts
- Returns JSON with success status, updated balance, or error for insufficient funds

**File to Delete:** [src/pages/savecash/[id].json.ts](src/pages/savecash/[id].json.ts)
- Remove old endpoint (has bugs and is replaced by the new API structure)

---

### Phase 3: Build UI

**New File:** [src/pages/savecash/index.astro](src/pages/savecash/index.astro)

**Structure:**
- **Server-side:** Fetch initial balance using `getBalance(1)` for hardcoded user
- **Display sections:**
  - Header: "Sistema de Cuenta de Ahorro"
  - Balance card: Large, prominent display showing current balance and user name (gradient purple background)
  - Message area: For success/error feedback (auto-hides after 5 seconds)
  - Two cards side-by-side:
    - **Deposit card** (green theme): Form with amount input and "Depositar" button
    - **Withdraw card** (red theme): Form with amount input and "Retirar" button

**Client-side functionality:**
- Form submission handlers for deposit and withdraw
- Fetch API calls to `/api/savecash/deposit.json` and `/api/savecash/withdraw.json`
- `updateBalance()` function to refresh balance from `/api/savecash/balance.json`
- `showMessage()` function for success/error notifications
- Form reset after successful operations

**Styling approach:**
- Scoped CSS (following existing pattern from Welcome.astro)
- Responsive grid layout (2 columns on desktop, 1 column on mobile)
- Gradient backgrounds for visual appeal
- Smooth transitions and hover effects

---

### Phase 4: Update Supporting Files

**File:** [src/layouts/Layout.astro](src/layouts/Layout.astro)
- Update page title to "Sistema de Ahorro"

**Optional File:** [src/pages/index.astro](src/pages/index.astro)
- Update landing page with link to `/savecash/` instead of showing Welcome component
- Simple centered layout with call-to-action button

---

## Critical Files

1. **[src/lib/db.ts](src/lib/db.ts)** - Add getBalance(), translate messages, fix typo
2. **[src/pages/api/savecash/balance.json.ts](src/pages/api/savecash/balance.json.ts)** - New GET endpoint
3. **[src/pages/api/savecash/deposit.json.ts](src/pages/api/savecash/deposit.json.ts)** - New POST endpoint
4. **[src/pages/api/savecash/withdraw.json.ts](src/pages/api/savecash/withdraw.json.ts)** - New POST endpoint
5. **[src/pages/savecash/index.astro](src/pages/savecash/index.astro)** - Complete new UI page
6. **[src/layouts/Layout.astro](src/layouts/Layout.astro)** - Minor title update

---

## Validation & Requirements Coverage

✅ **Depositar dinero** - Handled by `addBalance()` + deposit API + deposit form UI
✅ **Retirar dinero** - Handled by `debitBalance()` + withdraw API + withdraw form UI
✅ **Consultar el saldo** - Handled by `getBalance()` + balance API + balance display UI
✅ **Validar saldo insuficiente** - Already implemented in `debitBalance()` (line 41-43), error message will be shown in UI

---

## Testing Plan

After implementation, verify the following:

1. **Navigate to `/savecash/`**
   - Page loads with balance showing $0.00
   - User name "John Doe" is displayed

2. **Deposit functionality:**
   - Enter $100 and click "Depositar"
   - Success message appears
   - Balance updates to $100.00
   - Form clears

3. **Withdraw functionality:**
   - Enter $30 and click "Retirar"
   - Success message appears
   - Balance updates to $70.00
   - Form clears

4. **Insufficient balance validation:**
   - Try to withdraw $100 (more than $70 balance)
   - Error message appears: "Saldo insuficiente"
   - Balance remains $70.00

5. **Invalid input validation:**
   - Try to deposit $0 - Error: "La cantidad debe ser mayor que cero"
   - Try to deposit negative amount - Error: "La cantidad debe ser mayor que cero"

6. **Persistence check:**
   - Refresh the page
   - Balance should remain $70.00 (persists in memory until server restart)

---

## Design Decisions

- **Single-page app:** All operations on one page for simplicity
- **Hardcoded user:** Using userId=1 throughout (no authentication needed)
- **Spanish UI:** All labels, buttons, and messages in Spanish
- **RESTful API:** Separate endpoints for each operation (follows standard patterns)
- **In-memory storage:** Data resets on server restart (acceptable for fake DB requirement)
- **Scoped CSS:** Follows existing project pattern instead of Tailwind utility classes
- **Client-side updates:** Forms use fetch API with JavaScript for smooth UX without page reloads
