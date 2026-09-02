import {
  ScanLine,
  MapPin,
  TrendingUp,
  CloudSun,
  BadgeIndianRupee,
  LineChart,
  type LucideIcon,
} from "lucide-react";
import type { TranslationKey } from "@/i18n/translations";

export type Feature = {
  to: string;
  Icon: LucideIcon;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  tint: string;
};

export const FEATURES: Feature[] = [
  {
    to: "/crop-grading",
    Icon: ScanLine,
    titleKey: "features.grading.title",
    descKey: "features.grading.desc",
    tint: "bg-primary/12 text-primary",
  },
  {
    to: "/mandi",
    Icon: MapPin,
    titleKey: "features.mandi.title",
    descKey: "features.mandi.desc",
    tint: "bg-earth/15 text-earth",
  },
  {
    to: "/price-prediction",
    Icon: TrendingUp,
    titleKey: "features.price.title",
    descKey: "features.price.desc",
    tint: "bg-sun/20 text-sun-foreground",
  },
  {
    to: "/weather",
    Icon: CloudSun,
    titleKey: "features.weather.title",
    descKey: "features.weather.desc",
    tint: "bg-sky/15 text-sky",
  },
  {
    to: "/price-prediction",
    Icon: BadgeIndianRupee,
    titleKey: "features.sell.title",
    descKey: "features.sell.desc",
    tint: "bg-sprout/25 text-sprout-foreground",
  },
  {
    to: "/dashboard",
    Icon: LineChart,
    titleKey: "features.analytics.title",
    descKey: "features.analytics.desc",
    tint: "bg-primary/12 text-primary",
  },
];
