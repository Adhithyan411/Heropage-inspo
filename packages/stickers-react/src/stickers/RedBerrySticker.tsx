import React, { useId } from "react";
import type { StickerProps } from "../types";
import { usePeel } from "../utils/usePeel";

export const RedBerrySticker: React.FC<StickerProps> = ({
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

  const filter0 = `f0_${id}`;
  const filter1 = `f1_${id}`;
  const filter2 = `f2_${id}`;
  const filter3 = `f3_${id}`;
  const filter4 = `f4_${id}`;
  const stroke0 = `s0_${id}`;
  const stroke1 = `s1_${id}`;
  const stroke2 = `s2_${id}`;
  const stroke3 = `s3_${id}`;

  const finalWidth = width ?? size;
  const finalHeight = height ?? size;

  const { style: peelStyle, onMouseEnter, onMouseLeave } = usePeel(peel, style);

  return (
    <svg
      width={finalWidth}
      height={finalHeight}
      viewBox="480 130 420 365"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
      style={peelStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-label="Red Berry Sticker"
      role="img"
      {...props}
    >
      <g filter={`url(#${filter0})`}>
        <path
          d="M502.828 239.883C535.724 149.502 647.628 116.996 744.85 152.383C842.072 187.769 906.902 284.601 874.006 374.981C841.11 465.361 729.206 497.867 631.984 462.481C534.761 427.095 469.932 330.263 502.828 239.883Z"
          fillRule="evenodd"
          clipRule="evenodd"
          fill="white"
        />
      </g>
      <g filter={`url(#${filter1})`}>
        <use xlinkHref={`#${stroke0}`} fill="#FF7678" />
        <mask id={stroke1} fill="white">
          <use xlinkHref={`#${stroke0}`} />
        </mask>
        <path
          d="M848.634 365.746C822.567 437.365 729.703 469.315 641.217 437.109C552.732 404.903 502.132 320.736 528.199 249.117C554.266 177.498 647.129 145.548 735.615 177.754C824.101 209.96 874.701 294.127 848.634 365.746Z"
          strokeWidth="10"
          stroke="#FF7678"
          mask={`url(#${stroke1})`}
        />
      </g>
      <g filter={`url(#${filter2})`}>
        <path
          d="M649.504 163.172C637.555 147.149 722.449 177.431 722.449 177.431C722.449 177.431 739.473 157.637 742.705 141.526C745.938 125.416 781.218 199.878 781.218 199.878C781.218 199.878 849.935 210.965 832.933 219.95C815.931 228.936 803.497 248.837 803.497 248.837C803.497 248.837 828.369 335.028 811.66 314.733C794.952 294.439 751.115 267.626 751.115 267.626C751.115 267.626 710.479 274.865 683.864 285.011C657.248 295.156 699.93 224.676 699.93 224.676C699.93 224.676 661.452 179.195 649.504 163.172Z"
          fill="#FF4144"
          strokeWidth="5"
          stroke="#FF4144"
        />
      </g>
      <g filter={`url(#${filter3})`}>
        <use xlinkHref={`#${stroke2}`} fill="#FF7678" />
        <mask id={stroke3} fill="white">
          <use xlinkHref={`#${stroke2}`} />
        </mask>
        <path
          d="M784.714 233.795C779.57 242.705 759.416 240.701 739.7 229.317C719.983 217.934 708.17 201.483 713.315 192.573C718.459 183.663 738.613 185.667 758.329 197.051C778.045 208.434 789.858 224.885 784.714 233.795Z"
          strokeWidth="10"
          stroke="#FF7678"
          mask={`url(#${stroke3})`}
        />
      </g>
      <g filter={`url(#${filter4})`}>
        <path
          d="M737.187 400.852C751.214 398.884 781.074 380.618 783.508 378.058C785.942 375.499 794.719 376.919 787.81 390.261C780.901 403.602 762.196 413.954 743.139 410.752C724.081 407.55 723.16 402.82 737.187 400.852Z"
          fill="#FFADAF"
        />
      </g>
      <defs>
        <filter
          id={filter0}
          x="484.182"
          y="132.367"
          width="408.471"
          height="358.129"
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
          id={filter1}
          x="517.347"
          y="161.21"
          width="342.138"
          height="292.442"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence type="fractalNoise" baseFrequency="0.25 0.25" numOctaves="3" seed="5897" />
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
          id={filter2}
          x="635.034"
          y="137.954"
          width="213.332"
          height="200.771"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence type="fractalNoise" baseFrequency="0.25 0.25" numOctaves="3" seed="6662" />
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
          id={filter3}
          x="706.777"
          y="180.796"
          width="84.4754"
          height="64.757"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence type="fractalNoise" baseFrequency="0.25 0.25" numOctaves="3" seed="3956" />
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
          id={filter4}
          x="724.316"
          y="375.467"
          width="67.7505"
          height="37.8929"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence type="fractalNoise" baseFrequency="0.25 0.25" numOctaves="3" seed="9749" />
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
          id={stroke0}
          d="M848.634 365.746C822.567 437.365 729.703 469.315 641.217 437.109C552.732 404.903 502.132 320.736 528.199 249.117C554.266 177.498 647.129 145.548 735.615 177.754C824.101 209.96 874.701 294.127 848.634 365.746Z"
        />
        <path
          id={stroke2}
          d="M784.714 233.795C779.57 242.705 759.416 240.701 739.7 229.317C719.983 217.934 708.17 201.483 713.315 192.573C718.459 183.663 738.613 185.667 758.329 197.051C778.045 208.434 789.858 224.885 784.714 233.795Z"
        />
      </defs>
    </svg>
  );
};

export default RedBerrySticker;

