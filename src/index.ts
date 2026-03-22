/**
 * bd-validator
 * A utility library for validating Bangladeshi phone numbers, NID, TIN, and more.
 * Author: Md Sadik Hasan (devsadikbd)
 */

// ─── PHONE NUMBER ────────────────────────────────────────────────────────────

const BD_PHONE_REGEX = /^(?:\+?88)?01[3-9]\d{8}$/;

const OPERATOR_PREFIXES: Record<string, string> = {
  "013": "Grameenphone",
  "017": "Grameenphone",
  "014": "Banglalink",
  "019": "Banglalink",
  "015": "Teletalk",
  "016": "Robi",
  "018": "Robi (Airtel)",
};

/**
 * Validates a Bangladeshi mobile phone number.
 * Supports formats: 01XXXXXXXXX, 8801XXXXXXXXX, +8801XXXXXXXXX
 */
export function isValidPhone(phone: string): boolean {
  if (!phone || typeof phone !== "string") return false;
  return BD_PHONE_REGEX.test(phone.trim());
}

/**
 * Formats a phone number to the standard +880XXXXXXXXXX format.
 * Returns null if the number is invalid.
 */
export function formatPhone(phone: string): string | null {
  if (!isValidPhone(phone)) return null;
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("880")) return `+${digits}`;
  if (digits.startsWith("88")) return `+${digits}`;
  return `+88${digits}`;
}

/**
 * Returns the mobile operator name for a given phone number.
 * Returns null if the number is invalid or operator is unknown.
 */
export function getOperator(phone: string): string | null {
  if (!isValidPhone(phone)) return null;
  const digits = phone.replace(/\D/g, "");
  const local = digits.startsWith("880")
    ? digits.slice(3)
    : digits.startsWith("88")
    ? digits.slice(2)
    : digits;
  const prefix = local.slice(0, 3);
  return OPERATOR_PREFIXES[prefix] || "Unknown Operator";
}

// ─── NID ─────────────────────────────────────────────────────────────────────

/**
 * Validates a Bangladeshi National ID (NID).
 * Accepts old 13-digit or new 10/17-digit formats.
 */
export function isValidNID(nid: string): boolean {
  if (!nid || typeof nid !== "string") return false;
  const cleaned = nid.trim().replace(/\s/g, "");
  return /^\d{10}$/.test(cleaned) ||
    /^\d{13}$/.test(cleaned) ||
    /^\d{17}$/.test(cleaned);
}

/**
 * Returns the NID type: 'old' (13-digit), 'new' (10 or 17-digit), or null if invalid.
 */
export function getNIDType(nid: string): "old" | "new" | null {
  if (!isValidNID(nid)) return null;
  const len = nid.trim().replace(/\s/g, "").length;
  return len === 13 ? "old" : "new";
}

// ─── TIN ─────────────────────────────────────────────────────────────────────

/**
 * Validates a Bangladeshi Tax Identification Number (TIN).
 * TIN is a 12-digit number issued by NBR.
 */
export function isValidTIN(tin: string): boolean {
  if (!tin || typeof tin !== "string") return false;
  return /^\d{12}$/.test(tin.trim().replace(/\s/g, ""));
}

// ─── POSTAL CODE ─────────────────────────────────────────────────────────────

/**
 * Validates a Bangladeshi postal code (4-digit).
 */
export function isValidPostalCode(code: string): boolean {
  if (!code || typeof code !== "string") return false;
  return /^\d{4}$/.test(code.trim());
}

// ─── PASSPORT ────────────────────────────────────────────────────────────────

/**
 * Validates a Bangladeshi passport number.
 * Format: 2 letters followed by 7 digits (e.g. AB1234567)
 */
export function isValidPassport(passport: string): boolean {
  if (!passport || typeof passport !== "string") return false;
  return /^[A-Z]{2}\d{7}$/.test(passport.trim().toUpperCase());
}

// ─── BANK ACCOUNT ────────────────────────────────────────────────────────────

/**
 * Validates a generic Bangladeshi bank account number (13–17 digits).
 */
export function isValidBankAccount(account: string): boolean {
  if (!account || typeof account !== "string") return false;
  return /^\d{13,17}$/.test(account.trim().replace(/\s/g, ""));
}

// ─── COMBINED VALIDATE ───────────────────────────────────────────────────────

export type ValidationType = "phone" | "nid" | "tin" | "postal" | "passport" | "bank";

export interface ValidationResult {
  valid: boolean;
  type: ValidationType;
  formatted?: string | null;
  meta?: Record<string, unknown>;
}

/**
 * Generic validate function — validates any supported Bangladeshi data type.
 */
export function validate(value: string, type: ValidationType): ValidationResult {
  switch (type) {
    case "phone":
      return {
        valid: isValidPhone(value),
        type,
        formatted: formatPhone(value),
        meta: { operator: getOperator(value) },
      };
    case "nid":
      return {
        valid: isValidNID(value),
        type,
        meta: { nidType: getNIDType(value) },
      };
    case "tin":
      return { valid: isValidTIN(value), type };
    case "postal":
      return { valid: isValidPostalCode(value), type };
    case "passport":
      return { valid: isValidPassport(value), type };
    case "bank":
      return { valid: isValidBankAccount(value), type };
    default:
      return { valid: false, type };
  }
}

export default {
  isValidPhone,
  formatPhone,
  getOperator,
  isValidNID,
  getNIDType,
  isValidTIN,
  isValidPostalCode,
  isValidPassport,
  isValidBankAccount,
  validate,
};
