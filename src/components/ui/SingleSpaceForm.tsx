"use client";

import { useEffect, useMemo, useState } from "react";
import UseTypeSelect from "@/components/ui/UseTypeSelect";
import DynamicInput, { DynamicInputValues } from "@/components/ui/DynamicInput";
import FormulaStrip from "@/components/ui/FormulaStrip";
import ResultBadge from "@/components/ui/ResultBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { computeOccupantsForInput } from "@/lib/calc";
import { useTypeIndex } from "@/lib/useTypes";

export default function SingleSpaceForm() {
  const [useTypeKey, setUseTypeKey] = useState<string>();
  const [vals, setVals] = useState<DynamicInputValues>({});
  const meta = useMemo(() => (useTypeKey ? useTypeIndex.get(useTypeKey as any) : undefined), [useTypeKey]);

  const occupants = useMemo(() => {
    if (!useTypeKey) return 0;
    return computeOccupantsForInput({
      useTypeKey,
      areaM2: vals.areaM2,
      carSpaces: vals.carSpaces,
      fixedSeats: vals.fixedSeats,
    });
  }, [useTypeKey, vals]);

  // Basic reset when use type changes (so you don't carry seats → area etc.)
  useEffect(() => {
    setVals({});
  }, [useTypeKey]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Add Space</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <UseTypeSelect value={useTypeKey} onChange={setUseTypeKey} />
          <DynamicInput useTypeKey={useTypeKey} values={vals} onChange={setVals} />
          <div className="flex items-center gap-3">
            <FormulaStrip
              useTypeKey={useTypeKey ?? ""}
              areaM2={vals.areaM2}
              carSpaces={vals.carSpaces}
              fixedSeats={vals.fixedSeats}
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Design Occupancy:</span>
            <ResultBadge value={occupants} />
          </div>

          <div className="pt-2">
            <Button
              type="button"
              variant="outline"
              disabled={!useTypeKey || occupants <= 0}
              onClick={() => alert(`This is where “Add Space” will push into a list. Occupants: ${occupants}`)}
            >
              Add space (coming next)
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Running Total</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>This panel will show totals once we add the multi-space list in the next step.</p>
          <p>For now, try different use types and inputs to see the formula + result update live.</p>
        </CardContent>
      </Card>
    </div>
  );
}
