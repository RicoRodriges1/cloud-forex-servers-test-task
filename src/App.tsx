import { useState } from "react";
import DataCenterSelector from "@/components/DataCenterSelector";
import Plans from "@/components/Plans/Plans";
import PricePeriodSelector from "@/components/PricePeriodSelector";
import { useTariffs } from "@/hooks/useTariffs";
import type { DatacenterId, PricePeriod } from "@/types/pricing";

export default function App() {
  const [datacenter, setDatacenter] = useState<DatacenterId>("poland");
  const [period, setPeriod] = useState<PricePeriod>("1 Month");
  const { data, status, refetch } = useTariffs();

  return (
    <main className="app">
      <div className="container">
        <div className="header">
          <h1>Buy Forex VPS plans</h1>
          <div className="selectors">
            <DataCenterSelector value={datacenter} onChange={setDatacenter} />
            <PricePeriodSelector value={period} onChange={setPeriod} />
          </div>
        </div>
        <Plans
          datacenter={datacenter}
          period={period}
          tariffs={data}
          status={status}
          onRetry={refetch}
        />
      </div>
    </main>
  );
}
