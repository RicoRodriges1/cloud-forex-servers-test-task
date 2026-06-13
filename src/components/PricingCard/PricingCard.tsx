import CartIcon from "@/assets/cart.svg?react";
import YellowTick from "@/assets/yellow-tick.svg?react";
import HelpIcon from "@/assets/help.svg?react";
import MenuIcon from "@/assets/menu.svg?react";
import TerminalIcon from "@/assets/terminal-icon.svg?react";
import TwoTerminals from "@/assets/two-terminals.svg?react";
import ThreeTerminals from "@/assets/three-terminals.svg?react";
import FourTerminals from "@/assets/four-terminals.svg?react";
import SixTerminals from "@/assets/six-terminals.svg?react";
import styles from "@/styles/PricingCard.module.scss";
import { buildSpecDetails } from "@/utils/buildSpecDetails";
import type { PricingCardProps } from "@/types/PricingCard.types";
import { formatSpecs } from "@/utils/formatSpecs";
import slugify from "@/utils/slugify";

export default function PricingCard({
  title,
  price,
  priceState = "ready",
  currency = "€",
  period = "month",
  specs,
  terminalsCount,
  features,
  tags,
  featuresLabel = "ВОЗМОЖНОСТИ",
  tagsLabel = "ПОДХОДИТ ДЛЯ",
  buyLabel = "КУПИТЬ",
  terminalsLabel = "Terminals",
  specDetails,
  onBuy,
  onTerminalsHelpClick,
  isBestChoice = false,
  bestChoiceLabel = "Best choice",
  className,
}: PricingCardProps) {
  const rootClassName = [styles.pricingCard, className].filter(Boolean).join(" ");
  const featuresId = `${slugify(title)}-features`;
  const tagsId = `${slugify(title)}-tags`;
  const actionButtonClassName = styles.pricingCard__actionButton;
  const detailRows = specDetails ?? buildSpecDetails(specs, terminalsCount);
  const isPriceLoading = priceState === "loading";
  const isPriceReady = priceState === "ready" && price != null && price !== "";

  return (
    <div className={rootClassName}>
      {isBestChoice && (
        <span className={styles.pricingCard__badge}>
          {bestChoiceLabel}
        </span>
      )}
      {
        !isBestChoice && <span className={styles.pricingCard__shadowLight} />
      }
      
      <div className={styles.pricingCard__header}>
        <div className={styles.pricingCard__heading}>
          <div className={styles.pricingCard__titleGroup}>
            <h2 className={styles.pricingCard__title}>{title}</h2>
            <p
              className={styles.pricingCard__price}
              aria-busy={isPriceLoading}
              aria-live="polite"
            >
              {isPriceLoading ? (
                <span
                  className={styles.pricingCard__priceSkeleton}
                  aria-hidden="true"
                />
              ) : isPriceReady ? (
                <span
                  className={[
                    styles.pricingCard__priceValue,
                    styles.pricingCard__priceValue_visible,
                  ].join(" ")}
                >
                  {currency} {price}
                </span>
              ) : (
                <span className={styles.pricingCard__priceUnavailable}>—</span>
              )}
              <span className={styles.pricingCard__pricePeriod}>{period}</span>
            </p>
          </div>

          <div className={styles.pricingCard__terminalStack}>
            {
              terminalsCount == 2 && <TwoTerminals />
              || terminalsCount == 3 && <ThreeTerminals />
              || terminalsCount == 4 && <FourTerminals />
              || terminalsCount == 6 && <SixTerminals />
            }
          </div>
        </div>

        <div className={styles.pricingCard__specBar}>
          <span className={styles.pricingCard__specText}>
            {formatSpecs(specs)}
          </span>
          <div className={styles.pricingCard__menu}>
            <button
              type="button"
              className={styles.pricingCard__menuButton}
            >
              <MenuIcon />
            </button>

            <div
              className={styles.pricingCard__menuDropdown}
              id={`${slugify(title)}-spec-details`}
              role="tooltip"
            >
              <dl className={styles.pricingCard__menuDetails}>
                {detailRows.map((detail) => (
                  <div key={detail.label} className={styles.pricingCard__menuDetailRow}>
                    <dt className={styles.pricingCard__menuDetailLabel}>{detail.label}</dt>
                    <dd className={styles.pricingCard__menuDetailValue}>{detail.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

      <dl className={styles.pricingCard__meta}>
        <div className={styles.pricingCard__metaRow}>
          <dt className={styles.pricingCard__metaLabel}>
            <TerminalIcon className={styles.pricingCard__metaIcon} />
            {terminalsLabel}
          </dt>
          <dd className={styles.pricingCard__metaValue}>
            <span>{terminalsCount}</span>
            <button
              type="button"
              className={styles.pricingCard__helpButton}
              onClick={onTerminalsHelpClick}
            >
              <HelpIcon />
            </button>
          </dd>
        </div>
      </dl>

      <section className={styles.pricingCard__section}>
        <h3 className={styles.pricingCard__sectionTitle} id={featuresId}>
          {featuresLabel}
        </h3>
        <ul className={styles.pricingCard__featureList}>
          {features.map((feature) => (
            <li key={feature} className={styles.pricingCard__featureItem}>
              <YellowTick className={styles.pricingCard__featureIcon} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.pricingCard__section}>
        <h3 className={styles.pricingCard__sectionTitle} id={tagsId}>
          {tagsLabel}
        </h3>
        <ul className={styles.pricingCard__tagList}>
          {tags.map((tag) => (
            <li key={tag} className={styles.pricingCard__tag}>
              {tag}
            </li>
          ))}
        </ul>
      </section>

      <div className={styles.pricingCard__actions}>
        <button
          type="button"
          className={[actionButtonClassName, styles.pricingCard__buyButton].join(" ")}
          onClick={onBuy}
          disabled={isPriceLoading}
        >
          {buyLabel}
        </button>
        <button
          type="button"
          className={[actionButtonClassName, styles.pricingCard__cartButton].join(" ")}
          disabled={isPriceLoading}
        >
          <CartIcon />
        </button>
      </div>
    </div>
  );
}
