import SingleSpaceForm from "@/components/ui/SingleSpaceForm";

export default function CalcPage() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Calculation</h2>
      <p className="text-muted-foreground">
        Select a use type, enter area/seats/spaces, and see the design occupancy with the formula used.
      </p>
      <SingleSpaceForm />
    </section>
  );
}
