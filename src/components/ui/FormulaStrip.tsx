"use client";
import { formulaText } from "@/lib/calc";

type Props = {
  useTypeKey: string;
  areaM2?: number;
  carSpaces?: number;
  fixedSeats?: number;
  override?: { mode: "personsPerM2" | "fixed"; value: number };
  factor?: number;
  perCarSpacePersons?: number;
};

export default function FormulaStrip(props: Props) {
  const txt = formulaText(props);
  if (!txt) return null;
  return (
    <div className="text-sm text-muted-foreground">
      <span className="font-medium">Formula:</span> {txt}
    </div>
  );
}
