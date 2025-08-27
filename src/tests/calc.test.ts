import { describe, it, expect } from "vitest";
import { computeOccupantsForInput, formulaText } from "../lib/calc";

describe("computeOccupantsForInput", () => {
  it("office: 120 m² @ 6.0 → 20", () => {
    const out = computeOccupantsForInput({ useTypeKey: "office", areaM2: 120 });
    expect(out).toBe(20);
  });

  it("shop general: 500 m² @ 2.0 → 250", () => {
    const out = computeOccupantsForInput({ useTypeKey: "shopGeneral", areaM2: 500 });
    expect(out).toBe(250);
  });

  it("car park: 80 spaces × 2 → 160", () => {
    const out = computeOccupantsForInput({ useTypeKey: "carPark", carSpaces: 80 });
    expect(out).toBe(160);
  });

  it("fixed seating: 340 seats → 340", () => {
    const out = computeOccupantsForInput({ useTypeKey: "fixedSeating", fixedSeats: 340 });
    expect(out).toBe(340);
  });

  it("override persons/m²: 120 m² × 0.25 → 30", () => {
    const out = computeOccupantsForInput({
      useTypeKey: "office",
      areaM2: 120,
      override: { mode: "personsPerM2", value: 0.25 }
    });
    expect(out).toBe(30);
  });

  it("override fixed: → 123", () => {
    const out = computeOccupantsForInput({
      useTypeKey: "office",
      areaM2: 120,
      override: { mode: "fixed", value: 123 }
    });
    expect(out).toBe(123);
  });

  it("factor override per space wins", () => {
    const out = computeOccupantsForInput({
      useTypeKey: "office",
      areaM2: 60,
      factorOverride: 3.0
    });
    expect(out).toBe(20);
  });
});

describe("formulaText", () => {
  it("factor mode shows Area ÷ Factor", () => {
    expect(formulaText({ useTypeKey: "office", areaM2: 120, factor: 6 })).toContain("Area ÷ Factor");
  });
  it("car park shows Spaces × 2", () => {
    expect(formulaText({ useTypeKey: "carPark", carSpaces: 10 })).toContain("Spaces × 2");
  });
  it("fixed seating shows Seats = Occupants", () => {
    expect(formulaText({ useTypeKey: "fixedSeating", fixedSeats: 10 })).toContain("Seats = Occupants");
  });
  it("override persons/m² shows Area × persons/m²", () => {
    expect(
      formulaText({ useTypeKey: "office", areaM2: 100, override: { mode: "personsPerM2", value: 0.2 } })
    ).toContain("Area × persons/m²");
  });
});
