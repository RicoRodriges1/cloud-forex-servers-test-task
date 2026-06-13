import { useState } from "react";
import Calendar from "@/assets/calendar.svg?react";
import Arrow from "@/assets/arrow.svg?react";
import { PRICE_PERIODS, type PricePeriod } from "@/types/pricing";

interface PricePeriodSelectorProps {
  value: PricePeriod;
  onChange: (period: PricePeriod) => void;
}

export default function PricePeriodSelector({
  value,
  onChange,
}: PricePeriodSelectorProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (period: PricePeriod) => {
    onChange(period);
    setOpen(false);
  };

  return (
    <div className="selector-container">
      <p>BILLING PERIOD</p>

      <div
        className="price-period-selector"
        onClick={() => setOpen((current) => !current)}
      >
        <div className="price-period-selector__item">
          <Calendar />
          {value}
        </div>

        <Arrow
          className={`price-period-selector__arrow ${open ? "is-open" : ""}`}
        />
      </div>

      {open && (
        <div className="price-period-selector__dropdown">
          {PRICE_PERIODS.map((item) => (
            <div
              key={item}
              className="price-period-selector__option"
              onClick={() => handleSelect(item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
