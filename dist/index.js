var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default,
  formatPhone: () => formatPhone,
  getNIDType: () => getNIDType,
  getOperator: () => getOperator,
  isValidBankAccount: () => isValidBankAccount,
  isValidNID: () => isValidNID,
  isValidPassport: () => isValidPassport,
  isValidPhone: () => isValidPhone,
  isValidPostalCode: () => isValidPostalCode,
  isValidTIN: () => isValidTIN,
  validate: () => validate
});
module.exports = __toCommonJS(src_exports);
var BD_PHONE_REGEX = /^(?:\+?88)?01[3-9]\d{8}$/;
var OPERATOR_PREFIXES = {
  "013": "Grameenphone",
  "017": "Grameenphone",
  "014": "Banglalink",
  "019": "Banglalink",
  "015": "Teletalk",
  "016": "Robi",
  "018": "Robi (Airtel)"
};
function isValidPhone(phone) {
  if (!phone || typeof phone !== "string")
    return false;
  return BD_PHONE_REGEX.test(phone.trim());
}
function formatPhone(phone) {
  if (!isValidPhone(phone))
    return null;
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("880"))
    return `+${digits}`;
  if (digits.startsWith("88"))
    return `+${digits}`;
  return `+88${digits}`;
}
function getOperator(phone) {
  if (!isValidPhone(phone))
    return null;
  const digits = phone.replace(/\D/g, "");
  const local = digits.startsWith("880") ? digits.slice(3) : digits.startsWith("88") ? digits.slice(2) : digits;
  const prefix = local.slice(0, 3);
  return OPERATOR_PREFIXES[prefix] || "Unknown Operator";
}
function isValidNID(nid) {
  if (!nid || typeof nid !== "string")
    return false;
  const cleaned = nid.trim().replace(/\s/g, "");
  return /^\d{10}$/.test(cleaned) || /^\d{13}$/.test(cleaned) || /^\d{17}$/.test(cleaned);
}
function getNIDType(nid) {
  if (!isValidNID(nid))
    return null;
  const len = nid.trim().replace(/\s/g, "").length;
  return len === 13 ? "old" : "new";
}
function isValidTIN(tin) {
  if (!tin || typeof tin !== "string")
    return false;
  return /^\d{12}$/.test(tin.trim().replace(/\s/g, ""));
}
function isValidPostalCode(code) {
  if (!code || typeof code !== "string")
    return false;
  return /^\d{4}$/.test(code.trim());
}
function isValidPassport(passport) {
  if (!passport || typeof passport !== "string")
    return false;
  return /^[A-Z]{2}\d{7}$/.test(passport.trim().toUpperCase());
}
function isValidBankAccount(account) {
  if (!account || typeof account !== "string")
    return false;
  return /^\d{13,17}$/.test(account.trim().replace(/\s/g, ""));
}
function validate(value, type) {
  switch (type) {
    case "phone":
      return {
        valid: isValidPhone(value),
        type,
        formatted: formatPhone(value),
        meta: { operator: getOperator(value) }
      };
    case "nid":
      return {
        valid: isValidNID(value),
        type,
        meta: { nidType: getNIDType(value) }
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
var src_default = {
  isValidPhone,
  formatPhone,
  getOperator,
  isValidNID,
  getNIDType,
  isValidTIN,
  isValidPostalCode,
  isValidPassport,
  isValidBankAccount,
  validate
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  formatPhone,
  getNIDType,
  getOperator,
  isValidBankAccount,
  isValidNID,
  isValidPassport,
  isValidPhone,
  isValidPostalCode,
  isValidTIN,
  validate
});
