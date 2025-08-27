import { Space, UseTypeMeta } from "./types";
import { useTypeIndex } from "./useTypes";

export function ceilInt(n: number): number {
  return Math.ceil(n);
}

export function computeByFactor(areaM2: number, factor: number): number {
  if (!(areaM2 > 0) || !(factor > 0)) return 0;
  return ceilInt(areaM2 / factor);
}

export function computeByPersonsPerM2(areaM2: number, personsPerM2: number): number {
  if (!(areaM2 > 0) || !(personsPerM2 > 0)) return 0;
  return ceilInt(areaM2 * personsPerM2);
}

export function computeByFixed(value: number): number {
  const v = Number.isFinite(value) ? value : 0;
  return Math.max(0, ceilInt(v));
}

export function getUseTypeMeta(key: string): UseTypeMeta | undefined {
  return useTypeIndex.get(key as any);
}

/**
 * Core: returns occupant count (rounded up) for a single space input.
 * - for "factor": area / factor
 * - for "carPark": 2 persons per space (configurable)
 * - for "fixedSeating": seats as-is
 * - override: either persons/m² or fixed value (reason required at UI level)
 */
export function computeOccupantsForInput(args: {
  useTypeKey: string;
  areaM2?: number;
  carSpaces?: number;
  fixedSeats?: number;
  override?: { mode: "personsPerM2" | "fixed"; value: number };
  perCarSpacePersons?: number; // default 2
  factorOverride?: number;     // optional per-space factor override
}): number {
  const meta = getUseTypeMeta(args.useTypeKey);
  if (!meta) return 0;

  // Override first
  if (args.override) {
    if (args.override.mode === "personsPerM2") {
      return computeByPersonsPerM2(args.areaM2 ?? 0, args.override.value);
    }
    if (args.override.mode === "fixed") {
      return computeByFixed(args.override.value);
    }
  }

  // Mode paths
  if (meta.mode === "carPark") {
    const ppl = Number.isFinite(args.perCarSpacePersons) ? (args.perCarSpacePersons as number) : 2;
    const spaces = Math.max(0, Math.floor(args.carSpaces ?? 0));
    return computeByFixed(spaces * ppl);
  }

  if (meta.mode === "fixedSeating") {
    const seats = Math.max(0, Math.floor(args.fixedSeats ?? 0));
    return computeByFixed(seats);
  }

  // factor mode
  const factor = Number.isFinite(args.factorOverride) && (args.factorOverride as number) > 0
    ? (args.factorOverride as number)
    : (meta.factor ?? 0);

  return computeByFactor(args.areaM2 ?? 0, factor);
}

/**
 * Produces a display-friendly formula string for transparency.
 * Examples:
 *  - "Area ÷ Factor = Occupants (rounded up)"
 *  - "Seats = Occupants"
 *  - "Spaces × 2 = Occupants"
 *  - "Area × persons/m² = Occupants (rounded up)"
 */
export function formulaText(args: {
  useTypeKey: string;
  areaM2?: number;
  factor?: number;
  carSpaces?: number;
  fixedSeats?: number;
  override?: { mode: "personsPerM2" | "fixed"; value: number };
  perCarSpacePersons?: number;
}): string {
  const meta = getUseTypeMeta(args.useTypeKey);
  if (!meta) return "";

  if (args.override) {
    if (args.override.mode === "personsPerM2") return "Area × persons/m² = Occupants (rounded up)";
    if (args.override.mode === "fixed") return "Fixed value = Occupants";
  }

  if (meta.mode === "carPark") {
    const ppl = Number.isFinite(args.perCarSpacePersons) ? (args.perCarSpacePersons as number) : 2;
    return `Spaces × ${ppl} = Occupants`;
  }
  if (meta.mode === "fixedSeating") {
    return "Seats = Occupants";
  }
  return "Area ÷ Factor = Occupants (rounded up)";
}
