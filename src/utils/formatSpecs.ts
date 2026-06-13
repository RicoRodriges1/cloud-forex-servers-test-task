import type { PricingCardSpecs } from "@/types/PricingCard.types";

export function formatSpecs(specs: PricingCardSpecs): string {
  return `${specs.trm} TRM • ${specs.ram} RAM • ${specs.nvme} NVMe • ${specs.bandwidthMbps} Mbps`;
}
