"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { USE_TYPES_SEED } from "@/lib/useTypes";

export type UseTypeSelectValue = string;

export default function UseTypeSelect({
  value,
  onChange,
}: {
  value?: UseTypeSelectValue;
  onChange: (val: UseTypeSelectValue) => void;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor="useType">Use type</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="useType">
          <SelectValue placeholder="Select a use type" />
        </SelectTrigger>
        <SelectContent>
          {USE_TYPES_SEED.map((u) => (
            <SelectItem key={u.key} value={u.key}>
              {u.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {value && (
        <p className="text-xs text-muted-foreground">
          {
            USE_TYPES_SEED.find((u) => u.key === value)?.hint
          }
        </p>
      )}
    </div>
  );
}
