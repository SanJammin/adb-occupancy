export default function Page() {
  return (
    <section className="grid place-items-center py-24">
      <div className="text0ceter space-y-6">
        <h1 className="text-3xl md:text-5xl font-bold">ADB Vol.2 Table D1 - Occupancy Calculator</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Calculate design occupancy using Table D1 floor space factors. Rounds up by rule.
        </p>
        <div className="space-x-3">
          <a href="/calc" className="inline-flex items-center rounded-md border px-4 py-2">Start Calculation</a>
          <a href="/help" className="inline-flex items-center rounded-md border px-4 py-2">Help & Guidance</a>
        </div>
      </div>
    </section>
  );
}