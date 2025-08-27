"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTypeIndex } from "@/lib/useTypes";

export type DynamicInputValues = {
  areaM2?: number;
  fixedSeats?: number;
  carSpaces?: number;
};

export default function DynamicInput({
  useTypeKey,
  values,
  onChange,
}: {
  useTypeKey?: string;
  values: DynamicInputValues;
  onChange: (v: DynamicInputValues) => void;
}) {
  if (!useTypeKey) return null;
  const meta = useTypeIndex.get(useTypeKey as any);
  if (!meta) return null;

  if (meta.mode === "fixedSeating") {
    return (
      <div className="space-y-2">
        <Label htmlFor="fixedSeats">Fixed seating (number of seats)</Label>
        <Input
          id="fixedSeats"
          type="number"
          min={0}
          step="1"
          value={values.fixedSeats ?? ""}
          onChange={(e) => onChange({ ...values, fixedSeats: e.currentTarget.value === "" ? undefined : Number(e.currentTarget.value) })}
        />
      </div>
    );
  }

  if (meta.mode === "carPark") {
    return (
      <div className="space-y-2">
        <Label htmlFor="carSpaces">Car park (number of spaces)</Label>
        <Input
          id="carSpaces"
          type="number"
          min={0}
          step="1"
          value={values.carSpaces ?? ""}
          onChange={(e) => onChange({ ...values, carSpaces: e.currentTarget.value === "" ? undefined : Number(e.currentTarget.value) })}
        />
      </div>
    );
  }

  // factor mode
  return (
    <div className="space-y-2">
      <Label htmlFor="areaM2">Area (m²)</Label>
      <Input
        id="areaM2"
        type="number"
        min={0}
        step="0.01"
        value={values.areaM2 ?? ""}
        onChange={(e) => onChange({ ...values, areaM2: e.currentTarget.value === "" ? undefined : Number(e.currentTarget.value) })}
      />
      {typeof meta.factor === "number" && (
        <p className="text-xs text-muted-foreground">
          Factor: <span className="font-medium">{meta.factor} m²/person</span>
        </p>
      )}
    </div>
  );
}
