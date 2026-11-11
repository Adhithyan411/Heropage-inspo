"use client";

import React from "react";
import type { StickerProps, StickerName } from "../types";
import { FlameSticker } from "../stickers/FlameSticker";
import { MetalSticker } from "../stickers/MetalSticker";
import { BlobBurstSticker } from "../stickers/BlobBurstSticker";
import { StarBurstSticker } from "../stickers/StarBurstSticker";
import { DevilConeSticker } from "../stickers/DevilConeSticker";
import { FlameStarSticker } from "../stickers/FlameStarSticker";
import { FoldedPaperSticker } from "../stickers/FoldedPaperSticker";
import { RedBerrySticker } from "../stickers/RedBerrySticker";
import { BlueberrySticker } from "../stickers/BlueberrySticker";
import { BerriesSticker } from "../stickers/BerriesSticker";
import { BadgeSmileySticker } from "../stickers/BadgeSmileySticker";
import { CosmicPillSticker } from "../stickers/CosmicPillSticker";

// Characters & Symbols
import { RedCatSticker } from "../stickers/RedCatSticker";
import { PinkCatSticker } from "../stickers/PinkCatSticker";
import { PinkCatStampSticker } from "../stickers/PinkCatStampSticker";
import { YellowCatSticker } from "../stickers/YellowCatSticker";
import { BlackCatSticker } from "../stickers/BlackCatSticker";
import { CatSticker } from "../stickers/CatSticker";
import { CatSeriousSticker } from "../stickers/CatSeriousSticker";
import { DogSticker } from "../stickers/DogSticker";
import { FaceSticker } from "../stickers/FaceSticker";
import { BlackFaceSticker } from "../stickers/BlackFaceSticker";
import { FlowerSticker } from "../stickers/FlowerSticker";
import { PeaceHandSticker } from "../stickers/PeaceHandSticker";
import { SparklesSticker } from "../stickers/SparklesSticker";
import { SparkleTrioSticker } from "../stickers/SparkleTrioSticker";
import { CosmicEyeSticker } from "../stickers/CosmicEyeSticker";
import { CuriousGlobeSticker } from "../stickers/CuriousGlobeSticker";
import { SpiralSticker } from "../stickers/SpiralSticker";
import { EyeSplatSticker } from "../stickers/EyeSplatSticker";
import { JapanBadgeSticker } from "../stickers/JapanBadgeSticker";
import { ConeSticker } from "../stickers/ConeSticker";
import { IcyFleurSticker } from "../stickers/IcyFleurSticker";
import { AppBadgeSticker } from "../stickers/AppBadgeSticker";
import { BunnySticker } from "../stickers/BunnySticker";
import { CatSitSticker } from "../stickers/CatSitSticker";
import { FishSticker } from "../stickers/FishSticker";
import { LuffyHatSticker } from "../stickers/LuffyHatSticker";
import { CoffeeSticker } from "../stickers/CoffeeSticker";
import { JapanFlagSticker } from "../stickers/JapanFlagSticker";
import { CatCuteSticker } from "../stickers/CatCuteSticker";
import { CherrySticker } from "../stickers/CherrySticker";
import { GooSticker } from "../stickers/GooSticker";
import { HeartSticker } from "../stickers/HeartSticker";
import { NazarSticker } from "../stickers/NazarSticker";
import { BadCatSticker } from "../stickers/BadCatSticker";
import { NoriCoffeeSticker } from "../stickers/NoriCoffeeSticker";
import { NoriCoolSticker } from "../stickers/NoriCoolSticker";
import { NoriHeadphonesSticker } from "../stickers/NoriHeadphonesSticker";
import { NoriHeartSticker } from "../stickers/NoriHeartSticker";
import { NoriLaptopSticker } from "../stickers/NoriLaptopSticker";
import { NoriRocketSticker } from "../stickers/NoriRocketSticker";
import { PipCoffeeSticker } from "../stickers/PipCoffeeSticker";
import { PipDetectiveSticker } from "../stickers/PipDetectiveSticker";
import { PipHeadphonesSticker } from "../stickers/PipHeadphonesSticker";
import { PipRocketSticker } from "../stickers/PipRocketSticker";
import { PipThinkingSticker } from "../stickers/PipThinkingSticker";
import { PipWizardSticker } from "../stickers/PipWizardSticker";
import { KuroCoffeeSticker } from "../stickers/KuroCoffeeSticker";
import { KuroCoolSticker } from "../stickers/KuroCoolSticker";
import { KuroHeadphonesSticker } from "../stickers/KuroHeadphonesSticker";
import { KuroHeartSticker } from "../stickers/KuroHeartSticker";
import { KuroLaptopSticker } from "../stickers/KuroLaptopSticker";
import { KuroRocketSticker } from "../stickers/KuroRocketSticker";
import { MochiCoffeeSticker } from "../stickers/MochiCoffeeSticker";
import { MochiCoolSticker } from "../stickers/MochiCoolSticker";
import { MochiHeadphonesSticker } from "../stickers/MochiHeadphonesSticker";
import { MochiHeartSticker } from "../stickers/MochiHeartSticker";
import { MochiLaptopSticker } from "../stickers/MochiLaptopSticker";
import { MochiRocketSticker } from "../stickers/MochiRocketSticker";

export const STICKER_MAP: Record<StickerName, React.FC<StickerProps>> = {
  flame: FlameSticker,
  metal: MetalSticker,
  "blob-burst": BlobBurstSticker,
  "star-burst": StarBurstSticker,
  "devil-cone": DevilConeSticker,
  "flame-star": FlameStarSticker,
  "folded-paper": FoldedPaperSticker,
  "red-berry": RedBerrySticker,
  blueberry: BlueberrySticker,
  berries: BerriesSticker,
  "badge-smiley": BadgeSmileySticker,
  "cosmic-pill": CosmicPillSticker,

  // Characters & Symbols
  "red-cat": RedCatSticker,
  "pink-cat": PinkCatSticker,
  "pink-cat-stamp": PinkCatStampSticker,
  "yellow-cat": YellowCatSticker,
  "black-cat": BlackCatSticker,
  cat: CatSticker,
  "cat-serious": CatSeriousSticker,
  dog: DogSticker,
  face: FaceSticker,
  "black-face": BlackFaceSticker,
  flower: FlowerSticker,
  "peace-hand": PeaceHandSticker,
  sparkles: SparklesSticker,
  "sparkle-trio": SparkleTrioSticker,
  "cosmic-eye": CosmicEyeSticker,
  "curious-globe": CuriousGlobeSticker,
  spiral: SpiralSticker,
  "eye-splat": EyeSplatSticker,
  "japan-badge": JapanBadgeSticker,
  cone: ConeSticker,
  "icy-fleur": IcyFleurSticker,
  "app-badge": AppBadgeSticker,
  bunny: BunnySticker,
  "cat-sit": CatSitSticker,
  fish: FishSticker,
  "luffy-hat": LuffyHatSticker,
  coffee: CoffeeSticker,
  "japan-flag": JapanFlagSticker,
  "cat-cute": CatCuteSticker,
  cherry: CherrySticker,
  goo: GooSticker,
  heart: HeartSticker,
  nazar: NazarSticker,
  "bad-cat": BadCatSticker,
  "nori-coffee": NoriCoffeeSticker,
  "nori-cool": NoriCoolSticker,
  "nori-headphones": NoriHeadphonesSticker,
  "nori-heart": NoriHeartSticker,
  "nori-laptop": NoriLaptopSticker,
  "nori-rocket": NoriRocketSticker,
  "pip-coffee": PipCoffeeSticker,
  "pip-detective": PipDetectiveSticker,
  "pip-headphones": PipHeadphonesSticker,
  "pip-rocket": PipRocketSticker,
  "pip-thinking": PipThinkingSticker,
  "pip-wizard": PipWizardSticker,
  "kuro-coffee": KuroCoffeeSticker,
  "kuro-cool": KuroCoolSticker,
  "kuro-headphones": KuroHeadphonesSticker,
  "kuro-heart": KuroHeartSticker,
  "kuro-laptop": KuroLaptopSticker,
  "kuro-rocket": KuroRocketSticker,
  "mochi-coffee": MochiCoffeeSticker,
  "mochi-cool": MochiCoolSticker,
  "mochi-headphones": MochiHeadphonesSticker,
  "mochi-heart": MochiHeartSticker,
  "mochi-laptop": MochiLaptopSticker,
  "mochi-rocket": MochiRocketSticker,
};

export interface DynamicStickerProps extends StickerProps {
  name: StickerName;
}

/**
 * Dynamic Sticker component that renders any sticker by name
 *
 * @example
 * ```tsx
 * import { Sticker } from "stick-it-up";
 *
 * <Sticker name="devil-cone" size={130} peel />
 * <Sticker name="red-cat" size={130} peel />
 * ```
 */
export const Sticker: React.FC<DynamicStickerProps> = ({ name, ...props }) => {
  const Component = STICKER_MAP[name];
  if (!Component) {
    console.warn(`[stickers-react] Unknown sticker name: "${name}". Available: ${Object.keys(STICKER_MAP).join(", ")}`);
    return null;
  }
  return <Component {...props} />;
};

export default Sticker;
