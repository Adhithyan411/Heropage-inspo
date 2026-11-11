import React, { useId } from "react";
import type { StickerProps } from "../types";
import { usePeel } from "../utils/usePeel";

export const BlueberrySticker: React.FC<StickerProps> = ({
  size = 120,
  width,
  height,
  peel = false,
  className = "",
  style,
  ...props
}) => {
  const rawId = useId();
  const id = rawId.replace(/[:]/g, "_");

  const filter5 = `f5_${id}`;
  const filter6 = `f6_${id}`;
  const filter7 = `f7_${id}`;
  const filter8 = `f8_${id}`;
  const filter9 = `f9_${id}`;
  const stroke4 = `s4_${id}`;
  const stroke5 = `s5_${id}`;
  const stroke6 = `s6_${id}`;
  const stroke7 = `s7_${id}`;

  const finalWidth = width ?? size;
  const finalHeight = height ?? size;

  const { style: peelStyle, onMouseEnter, onMouseLeave } = usePeel(peel, style);

  return (
    <svg
      width={finalWidth}
      height={finalHeight}
      viewBox="90 120 545 470"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
      style={peelStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-label="Blueberry Sticker"
      role="img"
      {...props}
    >
      <g filter={`url(#${filter5})`}>
        <path
          d="M362.5 132.439C502.966 132.439 625 229.259 625 357.939C625 486.62 502.966 583.439 362.5 583.439C222.034 583.439 100 486.62 100 357.939C100 229.259 222.034 132.439 362.5 132.439Z"
          fill="white"
        />
      </g>
      <g filter={`url(#${filter6})`}>
        <use xlinkHref={`#${stroke4}`} fill="#7876FF" />
        <mask id={stroke5} fill="white">
          <use xlinkHref={`#${stroke4}`} />
        </mask>
        <path
          d="M598 357.939C598 467.568 492.563 556.439 362.5 556.439C232.437 556.439 127 467.568 127 357.939C127 248.311 232.437 159.439 362.5 159.439C492.563 159.439 598 248.311 598 357.939Z"
          strokeWidth="10"
          stroke="#7876FF"
          mask={`url(#${stroke5})`}
        />
      </g>
      <g filter={`url(#${filter7})`}>
        <path
          d="M197.939 268.811C172.876 262.182 281.743 216.916 281.743 216.916C281.743 216.916 282.152 179.246 272 158.44C261.848 137.633 358.336 187.218 358.336 187.218C358.336 187.218 435.339 135.738 426 161.44C416.661 187.141 420.87 220.671 420.87 220.671C420.87 220.671 516.798 292.875 483.5 285.94C450.202 279.004 384.731 290.025 384.731 290.025C384.731 290.025 350.621 335.717 332.754 371.618C314.887 407.519 298.644 290.025 298.644 290.025C298.644 290.025 223.002 275.44 197.939 268.811Z"
          fill="#4D3DFD"
          strokeWidth="5"
          stroke="#4D3DFD"
        />
      </g>
      <g filter={`url(#${filter8})`}>
        <use xlinkHref={`#${stroke6}`} fill="#7876FF" />
        <mask id={stroke7} fill="white">
          <use xlinkHref={`#${stroke6}`} />
        </mask>
        <path
          d="M411.25 243.939C411.25 260.784 384.387 274.439 351.25 274.439C318.113 274.439 291.25 260.784 291.25 243.939C291.25 227.095 318.113 213.439 351.25 213.439C384.387 213.439 411.25 227.095 411.25 243.939Z"
          strokeWidth="10"
          stroke="#7876FF"
          mask={`url(#${stroke7})`}
        />
      </g>
      <g filter={`url(#${filter9})`}>
        <path
          d="M492.362 445.916C511.547 428.786 540.047 368.786 541.431 362.105C542.816 355.423 557.145 349.139 558.542 378.262C559.939 407.386 541.13 443.149 509.914 456.597C478.698 470.045 473.177 463.046 492.362 445.916Z"
          fill="#ABA9FF"
          strokeWidth="5"
          stroke="#ABA9FF"
        />
      </g>
      <defs>
        <filter
          id={filter5}
          x="90"
          y="122.439"
          width="545"
          height="471"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <filter
          id={filter6}
          x="123"
          y="155.439"
          width="479"
          height="405"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence type="fractalNoise" baseFrequency="0.25 0.25" numOctaves="3" seed="9599" />
          <feDisplacementMap
            in="shape"
            scale="8"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displacedImage"
            width="100%"
            height="100%"
          />
          <feMerge result="effect1_texture">
            <feMergeNode in="displacedImage" />
          </feMerge>
        </filter>
        <filter
          id={filter7}
          x="187.693"
          y="146.84"
          width="309.33"
          height="238.101"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence type="fractalNoise" baseFrequency="0.25 0.25" numOctaves="3" seed="1792" />
          <feDisplacementMap
            in="shape"
            scale="8"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displacedImage"
            width="100%"
            height="100%"
          />
          <feMerge result="effect1_texture">
            <feMergeNode in="displacedImage" />
          </feMerge>
        </filter>
        <filter
          id={filter8}
          x="287.25"
          y="209.439"
          width="128"
          height="69"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence type="fractalNoise" baseFrequency="0.25 0.25" numOctaves="3" seed="6509" />
          <feDisplacementMap
            in="shape"
            scale="8"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displacedImage"
            width="100%"
            height="100%"
          />
          <feMerge result="effect1_texture">
            <feMergeNode in="displacedImage" />
          </feMerge>
        </filter>
        <filter
          id={filter9}
          x="474.746"
          y="349.987"
          width="90.3682"
          height="120.166"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence type="fractalNoise" baseFrequency="0.25 0.25" numOctaves="3" seed="4730" />
          <feDisplacementMap
            in="shape"
            scale="8"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displacedImage"
            width="100%"
            height="100%"
          />
          <feMerge result="effect1_texture">
            <feMergeNode in="displacedImage" />
          </feMerge>
        </filter>
        <path
          id={stroke4}
          d="M598 357.939C598 467.568 492.563 556.439 362.5 556.439C232.437 556.439 127 467.568 127 357.939C127 248.311 232.437 159.439 362.5 159.439C492.563 159.439 598 248.311 598 357.939Z"
        />
        <path
          id={stroke6}
          d="M411.25 243.939C411.25 260.784 384.387 274.439 351.25 274.439C318.113 274.439 291.25 260.784 291.25 243.939C291.25 227.095 318.113 213.439 351.25 213.439C384.387 213.439 411.25 227.095 411.25 243.939Z"
        />
      </defs>
    </svg>
  );
};

export default BlueberrySticker;
