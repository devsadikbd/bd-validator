# bd-validator 🇧🇩

A lightweight, zero-dependency utility library for validating Bangladeshi data — phone numbers, NID, TIN, passport, postal codes, and bank accounts.


---

## Features

- ✅ **Phone number** validation + formatting + operator detection
- ✅ **NID** (National ID) — supports 10, 13, and 17-digit formats
- ✅ **TIN** (Tax Identification Number)
- ✅ **Passport** number
- ✅ **Postal code**
- ✅ **Bank account** number
- ✅ Full **TypeScript** support
- ✅ Works in **Node.js**, **React**, **Next.js**, **Vue**, and browsers
- ✅ Zero dependencies

---

## Installation

```bash
npm install bd-validator
# or
yarn add bd-validator
# or
pnpm add bd-validator
```

---

## Usage

```typescript
import {
  isValidPhone,
  formatPhone,
  getOperator,
  isValidNID,
  validate,
} from "bd-validator";

// Phone validation
isValidPhone("01711234567"); // true
isValidPhone("+8801711234567"); // true
isValidPhone("01211234567"); // false (invalid prefix)

// Format phone
formatPhone("01711234567"); // '+8801711234567'

// Detect operator
getOperator("01711234567"); // 'Grameenphone'
getOperator("01911234567"); // 'Banglalink'
getOperator("01511234567"); // 'Teletalk'
getOperator("01611234567"); // 'Robi'

// NID validation
isValidNID("1234567890"); // true (10-digit)
isValidNID("1234567890123"); // true (13-digit old format)
isValidNID("12345678901234567"); // true (17-digit new format)

// TIN
isValidTIN("123456789012"); // true

// Postal code
isValidPostalCode("1216"); // true

// Passport
isValidPassport("AB1234567"); // true

// Bank account
isValidBankAccount("1234567890123"); // true

// Generic validate function
const result = validate("01711234567", "phone");
// {
//   valid: true,
//   type: 'phone',
//   formatted: '+8801711234567',
//   meta: { operator: 'Grameenphone' }
// }
```

---

## API Reference

### Phone

| Function              | Description                 | Returns          |
| --------------------- | --------------------------- | ---------------- |
| `isValidPhone(phone)` | Validates BD mobile number  | `boolean`        |
| `formatPhone(phone)`  | Formats to `+880XXXXXXXXXX` | `string \| null` |
| `getOperator(phone)`  | Returns operator name       | `string \| null` |

**Supported operators:** Grameenphone, Banglalink, Robi, Airtel (Robi), Teletalk

**Supported formats:** `01XXXXXXXXX`, `8801XXXXXXXXX`, `+8801XXXXXXXXX`

---

### NID

| Function          | Description                     | Returns                  |
| ----------------- | ------------------------------- | ------------------------ |
| `isValidNID(nid)` | Validates NID (10/13/17 digits) | `boolean`                |
| `getNIDType(nid)` | Returns `'old'` or `'new'`      | `'old' \| 'new' \| null` |

---

### Other Validators

| Function                      | Description                            | Returns   |
| ----------------------------- | -------------------------------------- | --------- |
| `isValidTIN(tin)`             | Validates 12-digit TIN                 | `boolean` |
| `isValidPostalCode(code)`     | Validates 4-digit postal code          | `boolean` |
| `isValidPassport(passport)`   | Validates BD passport (e.g. AB1234567) | `boolean` |
| `isValidBankAccount(account)` | Validates 13–17 digit bank account     | `boolean` |

---

### Generic `validate()`

```typescript
validate(value: string, type: ValidationType): ValidationResult
```

`ValidationType`: `'phone' | 'nid' | 'tin' | 'postal' | 'passport' | 'bank'`

```typescript
interface ValidationResult {
  valid: boolean;
  type: ValidationType;
  formatted?: string | null;
  meta?: Record<string, unknown>;
}
```

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

```bash
git clone https://github.com/devsadikbd/bd-validator.git
cd bd-validator
npm install
npm test
```

---

## License

MIT © [Md Sadik Hasan](https://github.com/devsadikbd)
