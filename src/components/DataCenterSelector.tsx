import Poland from "@/assets/poland.svg?react";
import Netherlands from "@/assets/netherlands.svg?react";
import Germany from "@/assets/germany.svg?react";
import Usa from "@/assets/usa.svg?react";
import type { DatacenterId } from "@/types/pricing";

interface DataCenterSelectorProps {
  value: DatacenterId;
  onChange: (id: DatacenterId) => void;
}

const items: { id: DatacenterId; label: string; Icon: typeof Poland }[] = [
  { id: "poland", label: "Poland", Icon: Poland },
  { id: "netherlands", label: "Netherlands", Icon: Netherlands },
  { id: "germany", label: "Germany", Icon: Germany },
  { id: "usa", label: "USA", Icon: Usa },
];

export default function DataCenterSelector({
  value,
  onChange,
}: DataCenterSelectorProps) {
  return (
    <div className="selector-container">
      <p>DATA CENTER</p>

      <div className="data-center-selector">
        {items.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={`data-center-selector__item ${value === id ? "data-center-selector__item--active" : ""}`}
          >
            <Icon width={16} height={16} />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
