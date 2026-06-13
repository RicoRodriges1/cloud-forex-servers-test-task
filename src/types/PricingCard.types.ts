export interface PricingCardSpecs {
  trm: number;
  ram: number;
  nvme: number;
  bandwidthMbps: number;
}

export interface PricingCardMenuOption {
  id: string;
  specs: PricingCardSpecs;
}

export interface PricingCardSpecDetail {
  label: string;
  value: string;
}

export interface PricingCardProps {
  id?: string;
  title: string;
  price?: string | null;
  priceState?: "loading" | "ready" | "unavailable";
  currency?: string;
  period?: string;
  specs: PricingCardSpecs;
  terminalsCount: number;
  features: string[];
  tags: string[];
  featuresLabel?: string;
  tagsLabel?: string;
  buyLabel?: string;
  terminalsLabel?: string;
  menuOptions?: PricingCardMenuOption[];
  specDetails?: PricingCardSpecDetail[];
  onBuy?: () => void;
  onAddToCart?: () => void;
  onMenuOptionSelect?: (option: PricingCardMenuOption) => void;
  onTerminalsHelpClick?: () => void;
  isBestChoice?: boolean;
  bestChoiceLabel?: string;
  className?: string;
}
