import {
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
} from "../src/index";

// ─── PHONE ───────────────────────────────────────────────────────────────────
describe("isValidPhone", () => {
  it("validates standard 11-digit numbers", () => {
    expect(isValidPhone("01711234567")).toBe(true);
    expect(isValidPhone("01911234567")).toBe(true);
    expect(isValidPhone("01611234567")).toBe(true);
  });
  it("validates with country code", () => {
    expect(isValidPhone("+8801711234567")).toBe(true);
    expect(isValidPhone("8801711234567")).toBe(true);
  });
  it("rejects invalid numbers", () => {
    expect(isValidPhone("01211234567")).toBe(false); // invalid prefix
    expect(isValidPhone("1234")).toBe(false);
    expect(isValidPhone("")).toBe(false);
  });
});

describe("formatPhone", () => {
  it("formats to +880 format", () => {
    expect(formatPhone("01711234567")).toBe("+8801711234567");
  });
  it("returns null for invalid", () => {
    expect(formatPhone("12345")).toBeNull();
  });
});

describe("getOperator", () => {
  it("identifies Grameenphone", () => {
    expect(getOperator("01711234567")).toBe("Grameenphone");
    expect(getOperator("01311234567")).toBe("Grameenphone");
  });
  it("identifies Banglalink", () => {
    expect(getOperator("01411234567")).toBe("Banglalink");
    expect(getOperator("01911234567")).toBe("Banglalink");
  });
  it("identifies Teletalk", () => {
    expect(getOperator("01511234567")).toBe("Teletalk");
  });
  it("returns null for invalid", () => {
    expect(getOperator("abc")).toBeNull();
  });
});

// ─── NID ─────────────────────────────────────────────────────────────────────
describe("isValidNID", () => {
  it("validates 10-digit NID", () => expect(isValidNID("1234567890")).toBe(true));
  it("validates 13-digit NID", () => expect(isValidNID("1234567890123")).toBe(true));
  it("validates 17-digit NID", () => expect(isValidNID("12345678901234567")).toBe(true));
  it("rejects invalid", () => {
    expect(isValidNID("123")).toBe(false);
    expect(isValidNID("abcdefghij")).toBe(false);
  });
});

describe("getNIDType", () => {
  it("returns old for 13-digit", () => expect(getNIDType("1234567890123")).toBe("old"));
  it("returns new for 10-digit", () => expect(getNIDType("1234567890")).toBe("new"));
  it("returns null for invalid", () => expect(getNIDType("123")).toBeNull());
});

// ─── TIN ─────────────────────────────────────────────────────────────────────
describe("isValidTIN", () => {
  it("validates 12-digit TIN", () => expect(isValidTIN("123456789012")).toBe(true));
  it("rejects invalid", () => expect(isValidTIN("1234")).toBe(false));
});

// ─── POSTAL ──────────────────────────────────────────────────────────────────
describe("isValidPostalCode", () => {
  it("validates 4-digit code", () => expect(isValidPostalCode("1216")).toBe(true));
  it("rejects invalid", () => expect(isValidPostalCode("12345")).toBe(false));
});

// ─── PASSPORT ────────────────────────────────────────────────────────────────
describe("isValidPassport", () => {
  it("validates correct format", () => expect(isValidPassport("AB1234567")).toBe(true));
  it("is case insensitive", () => expect(isValidPassport("ab1234567")).toBe(true));
  it("rejects invalid", () => expect(isValidPassport("A1234567")).toBe(false));
});

// ─── BANK ────────────────────────────────────────────────────────────────────
describe("isValidBankAccount", () => {
  it("validates 13-17 digit account", () => {
    expect(isValidBankAccount("1234567890123")).toBe(true);
    expect(isValidBankAccount("12345678901234567")).toBe(true);
  });
  it("rejects invalid", () => expect(isValidBankAccount("123")).toBe(false));
});

// ─── VALIDATE ────────────────────────────────────────────────────────────────
describe("validate", () => {
  it("returns full result for phone", () => {
    const result = validate("01711234567", "phone");
    expect(result.valid).toBe(true);
    expect(result.formatted).toBe("+8801711234567");
    expect(result.meta?.operator).toBe("Grameenphone");
  });
  it("returns result for NID", () => {
    const result = validate("1234567890123", "nid");
    expect(result.valid).toBe(true);
    expect(result.meta?.nidType).toBe("old");
  });
});
