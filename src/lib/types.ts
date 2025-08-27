export type ScenarioKey = "normal" | "event";

export type UseTypeKey =
  | "office"
  | "shopGeneral"
  | "shopBulky"
  | "storageWarehouse"
  | "factory"
  | "diningRoom"
  | "assemblyHall"
  | "concourse"
  | "carPark"
  | "fixedSeating";

export type UseTypeMode = "factor" | "carPark" | "fixedSeating";

export interface UseTypeMeta {
  key: UseTypeKey;
  label: string;
  mode: UseTypeMode;
  factor?: number; // m² per person when mode === "factor"
  notes?: string;  // brief hint like "Table D1 note 6"
  hint?: string;   // short definition for tooltip
}

export interface OverrideSpec {
  mode: "personsPerM2" | "fixed";
  value: number;
  reason: string;
}

export interface Space {
  id: string;
  name?: string;
  useType: UseTypeKey;
  areaM2?: number;     // required when factor mode
  fixedSeats?: number; // when fixed seating
  carSpaces?: number;  // when car park
  factor?: number;     // copy of useType factor (can be overridden per-space if needed)
  override?: OverrideSpec;
  notes?: string;
  storey?: string;
  occupants: number;   // computed & rounded up
}