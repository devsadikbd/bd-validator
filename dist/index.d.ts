/**
 * bd-validator
 * A utility library for validating Bangladeshi phone numbers, NID, TIN, and more.
 * Author: Md Sadik Hasan (devsadikbd)
 */
/**
 * Validates a Bangladeshi mobile phone number.
 * Supports formats: 01XXXXXXXXX, 8801XXXXXXXXX, +8801XXXXXXXXX
 */
declare function isValidPhone(phone: string): boolean;
/**
 * Formats a phone number to the standard +880XXXXXXXXXX format.
 * Returns null if the number is invalid.
 */
declare function formatPhone(phone: string): string | null;
/**
 * Returns the mobile operator name for a given phone number.
 * Returns null if the number is invalid or operator is unknown.
 */
declare function getOperator(phone: string): string | null;
/**
 * Validates a Bangladeshi National ID (NID).
 * Accepts old 13-digit or new 10/17-digit formats.
 */
declare function isValidNID(nid: string): boolean;
/**
 * Returns the NID type: 'old' (13-digit), 'new' (10 or 17-digit), or null if invalid.
 */
declare function getNIDType(nid: string): "old" | "new" | null;
/**
 * Validates a Bangladeshi Tax Identification Number (TIN).
 * TIN is a 12-digit number issued by NBR.
 */
declare function isValidTIN(tin: string): boolean;
/**
 * Validates a Bangladeshi postal code (4-digit).
 */
declare function isValidPostalCode(code: string): boolean;
/**
 * Validates a Bangladeshi passport number.
 * Format: 2 letters followed by 7 digits (e.g. AB1234567)
 */
declare function isValidPassport(passport: string): boolean;
/**
 * Validates a generic Bangladeshi bank account number (13–17 digits).
 */
declare function isValidBankAccount(account: string): boolean;
type ValidationType = "phone" | "nid" | "tin" | "postal" | "passport" | "bank";
interface ValidationResult {
    valid: boolean;
    type: ValidationType;
    formatted?: string | null;
    meta?: Record<string, unknown>;
}
/**
 * Generic validate function — validates any supported Bangladeshi data type.
 */
declare function validate(value: string, type: ValidationType): ValidationResult;
declare const _default: {
    isValidPhone: typeof isValidPhone;
    formatPhone: typeof formatPhone;
    getOperator: typeof getOperator;
    isValidNID: typeof isValidNID;
    getNIDType: typeof getNIDType;
    isValidTIN: typeof isValidTIN;
    isValidPostalCode: typeof isValidPostalCode;
    isValidPassport: typeof isValidPassport;
    isValidBankAccount: typeof isValidBankAccount;
    validate: typeof validate;
};

export { ValidationResult, ValidationType, _default as default, formatPhone, getNIDType, getOperator, isValidBankAccount, isValidNID, isValidPassport, isValidPhone, isValidPostalCode, isValidTIN, validate };
