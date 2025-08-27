import { UseTypeMeta } from "./types";

export const USE_TYPES_SEED: UseTypeMeta[] = [
  {
    key: "office",
    label: "Office",
    mode: "factor",
    factor: 6.0,
    hint: "General offices; m² per person."
  },
  {
    key: "shopGeneral",
    label: "Shop – General",
    mode: "factor",
    factor: 2.0,
    notes: "Check sales floor vs back-of-house.",
    hint: "General retail sales area."
  },
  {
    key: "shopBulky",
    label: "Shop – Bulky goods",
    mode: "factor",
    factor: 7.0,
    notes: "E.g., furniture/DIY; lower density.",
    hint: "Retail where bulky goods reduce density."
  },
  {
    key: "storageWarehouse",
    label: "Storage & warehousing",
    mode: "factor",
    factor: 30.0,
    hint: "Predominantly storage areas."
  },
  {
    key: "factory",
    label: "Factory/Workshops (typical)",
    mode: "factor",
    factor: 10.0,
    hint: "Typical industrial workrooms."
  },
  {
    key: "diningRoom",
    label: "Dining room / Restaurant floor",
    mode: "factor",
    factor: 1.0,
    hint: "Seated dining floor area."
  },
  {
    key: "assemblyHall",
    label: "Assembly hall (standing)",
    mode: "factor",
    factor: 0.5,
    notes: "Bar/standing areas often very dense.",
    hint: "Standing assembly (not fixed seating)."
  },
  {
    key: "concourse",
    label: "Concourse",
    mode: "factor",
    factor: 3.0,
    notes: "Check specialist stadia guidance when applicable.",
    hint: "Concourse/circulation in assembly buildings."
  },
  {
    key: "carPark",
    label: "Car park (persons per space)",
    mode: "carPark",
    hint: "Use number of spaces; persons per space rule."
  },
  {
    key: "fixedSeating",
    label: "Fixed seating (use seats count)",
    mode: "fixedSeating",
    hint: "Enter number of fixed seats."
  }
];

// Helper for UI lookups:
export const useTypeIndex = new Map(USE_TYPES_SEED.map(u => [u.key, u]));
