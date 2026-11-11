import React, { useId } from "react";
import type { StickerProps } from "../types";
import { usePeel } from "../utils/usePeel";

export const BerriesSticker: React.FC<StickerProps> = ({
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

  const finalWidth = width ?? size;
  const finalHeight = height ?? size;
  const { style: peelStyle, onMouseEnter, onMouseLeave } = usePeel(peel, style);

  return (
    <svg
      width={finalWidth}
      height={finalHeight}
      viewBox="0 0 996 684"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
      style={peelStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-label="Berries Sticker"
      role="img"
      {...props}
    >
      <path d="M2 0V1H993.833V0V-1H2V0ZM995.833 2H994.833V681.439H995.833H996.833V2H995.833ZM993.833 683.439V682.439H2.00001V683.439V684.439H993.833V683.439ZM0 681.439H1V1.99998H0H-1V681.439H0ZM2.00001 683.439V682.439C1.44772 682.439 1 681.992 1 681.439H0H-1C-1 683.096 0.34316 684.439 2.00001 684.439V683.439ZM995.833 681.439H994.833C994.833 681.992 994.385 682.439 993.833 682.439V683.439V684.439C995.49 684.439 996.833 683.096 996.833 681.439H995.833ZM993.833 0V1C994.385 1 994.833 1.44772 994.833 2H995.833H996.833C996.833 0.34314 995.49 -1 993.833 -1V0ZM2 0V-1C0.343157 -1 -1 0.343117 -1 1.99998H0H1C1 1.44771 1.4477 1 2 1V0Z" fill="white" fillOpacity="0.1"/>
      <g filter={`url(#filter0_d_0_1_${id})`}>
        <path d="M502.828 239.883C535.724 149.502 647.628 116.996 744.85 152.383C842.072 187.769 906.902 284.601 874.006 374.981C841.11 465.361 729.206 497.867 631.984 462.481C534.761 427.095 469.932 330.263 502.828 239.883Z" fillRule="evenodd" clipRule="evenodd" fill="white"/>
      </g>
      <g filter={`url(#filter1_g_0_1_${id})`}>
        <use xlinkHref={`#stroke0_0_1_${id}`} fill="#FF7678"/>
        <mask id={`stroke1_0_1_${id}`} fill="white">
          <use xlinkHref={`#stroke0_0_1_${id}`}/>
        </mask>
        <path d="M848.634 365.746C822.567 437.365 729.703 469.315 641.217 437.109C552.732 404.903 502.132 320.736 528.199 249.117C554.266 177.498 647.129 145.548 735.615 177.754C824.101 209.96 874.701 294.127 848.634 365.746Z" strokeWidth="10" stroke="#FF7678" mask={`url(#stroke1_0_1_${id})`}/>
      </g>
      <g filter={`url(#filter2_g_0_1_${id})`}>
        <path d="M649.504 163.172C637.555 147.149 722.449 177.431 722.449 177.431C722.449 177.431 739.473 157.637 742.705 141.526C745.938 125.416 781.218 199.878 781.218 199.878C781.218 199.878 849.935 210.965 832.933 219.95C815.931 228.936 803.497 248.837 803.497 248.837C803.497 248.837 828.369 335.028 811.66 314.733C794.952 294.439 751.115 267.626 751.115 267.626C751.115 267.626 710.479 274.865 683.864 285.011C657.248 295.156 699.93 224.676 699.93 224.676C699.93 224.676 661.452 179.195 649.504 163.172Z" fill="#FF4144" strokeWidth="5" stroke="#FF4144"/>
      </g>
      <g filter={`url(#filter3_g_0_1_${id})`}>
        <use xlinkHref={`#stroke2_0_1_${id}`} fill="#FF7678"/>
        <mask id={`stroke3_0_1_${id}`} fill="white">
          <use xlinkHref={`#stroke2_0_1_${id}`}/>
        </mask>
        <path d="M784.714 233.795C779.57 242.705 759.416 240.701 739.7 229.317C719.983 217.934 708.17 201.483 713.315 192.573C718.459 183.663 738.613 185.667 758.329 197.051C778.045 208.434 789.858 224.885 784.714 233.795Z" strokeWidth="10" stroke="#FF7678" mask={`url(#stroke3_0_1_${id})`}/>
      </g>
      <g filter={`url(#filter4_g_0_1_${id})`}>
        <path d="M737.187 400.852C751.214 398.884 781.074 380.618 783.508 378.058C785.942 375.499 794.719 376.919 787.81 390.261C780.901 403.602 762.196 413.954 743.139 410.752C724.081 407.55 723.16 402.82 737.187 400.852Z" fill="#FFADAF"/>
      </g>
      <g filter={`url(#filter5_d_0_1_${id})`}>
        <path d="M362.5 132.439C502.966 132.439 625 229.259 625 357.939C625 486.62 502.966 583.439 362.5 583.439C222.034 583.439 100 486.62 100 357.939C100 229.259 222.034 132.439 362.5 132.439Z" fill="white"/>
      </g>
      <g filter={`url(#filter6_g_0_1_${id})`}>
        <use xlinkHref={`#stroke4_0_1_${id}`} fill="#7876FF"/>
        <mask id={`stroke5_0_1_${id}`} fill="white">
          <use xlinkHref={`#stroke4_0_1_${id}`}/>
        </mask>
        <path d="M598 357.939C598 467.568 492.563 556.439 362.5 556.439C232.437 556.439 127 467.568 127 357.939C127 248.311 232.437 159.439 362.5 159.439C492.563 159.439 598 248.311 598 357.939Z" strokeWidth="10" stroke="#7876FF" mask={`url(#stroke5_0_1_${id})`}/>
      </g>
      <g filter={`url(#filter7_g_0_1_${id})`}>
        <path d="M197.939 268.811C172.876 262.182 281.743 216.916 281.743 216.916C281.743 216.916 282.152 179.246 272 158.44C261.848 137.633 358.336 187.218 358.336 187.218C358.336 187.218 435.339 135.738 426 161.44C416.661 187.141 420.87 220.671 420.87 220.671C420.87 220.671 516.798 292.875 483.5 285.94C450.202 279.004 384.731 290.025 384.731 290.025C384.731 290.025 350.621 335.717 332.754 371.618C314.887 407.519 298.644 290.025 298.644 290.025C298.644 290.025 223.002 275.44 197.939 268.811Z" fill="#4D3DFD" strokeWidth="5" stroke="#4D3DFD"/>
      </g>
      <g filter={`url(#filter8_g_0_1_${id})`}>
        <use xlinkHref={`#stroke6_0_1_${id}`} fill="#7876FF"/>
        <mask id={`stroke7_0_1_${id}`} fill="white">
          <use xlinkHref={`#stroke6_0_1_${id}`}/>
        </mask>
        <path d="M411.25 243.939C411.25 260.784 384.387 274.439 351.25 274.439C318.113 274.439 291.25 260.784 291.25 243.939C291.25 227.095 318.113 213.439 351.25 213.439C384.387 213.439 411.25 227.095 411.25 243.939Z" strokeWidth="10" stroke="#7876FF" mask={`url(#stroke7_0_1_${id})`}/>
      </g>
      <g filter={`url(#filter9_g_0_1_${id})`}>
        <path d="M492.362 445.916C511.547 428.786 540.047 368.786 541.431 362.105C542.816 355.423 557.145 349.139 558.542 378.262C559.939 407.386 541.13 443.149 509.914 456.597C478.698 470.045 473.177 463.046 492.362 445.916Z" fill="#ABA9FF" strokeWidth="5" stroke="#ABA9FF"/>
      </g>
      <defs>
        <filter id={`filter0_d_0_1_${id}`} x="484.182" y="132.367" width="408.471" height="358.129" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="4"/>
          <feGaussianBlur stdDeviation="5"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape"/>
        </filter>
        <filter id={`filter1_g_0_1_${id}`} x="517.347" y="161.21" width="342.138" height="292.442" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feTurbulence type="fractalNoise" baseFrequency="0.25 0.25" numOctaves="3" seed="9599" />
          <feDisplacementMap in="shape" scale="8" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
          <feMerge result="effect1_texture_0_1">
            <feMergeNode in="displacedImage"/>
          </feMerge>
        </filter>
        <filter id={`filter2_g_0_1_${id}`} x="641.851" y="132.745" width="200.287" height="191.586" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feTurbulence type="fractalNoise" baseFrequency="0.25 0.25" numOctaves="3" seed="1792" />
          <feDisplacementMap in="shape" scale="8" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
          <feMerge result="effect1_texture_0_1">
            <feMergeNode in="displacedImage"/>
          </feMerge>
        </filter>
        <filter id={`filter3_g_0_1_${id}`} x="708.111" y="183.008" width="81.8076" height="60.3513" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feTurbulence type="fractalNoise" baseFrequency="0.25 0.25" numOctaves="3" seed="6509" />
          <feDisplacementMap in="shape" scale="8" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
          <feMerge result="effect1_texture_0_1">
            <feMergeNode in="displacedImage"/>
          </feMerge>
        </filter>
        <filter id={`filter4_g_0_1_${id}`} x="721.1" y="370.531" width="75.8347" height="47.2852" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feTurbulence type="fractalNoise" baseFrequency="0.25 0.25" numOctaves="3" seed="4730" />
          <feDisplacementMap in="shape" scale="8" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
          <feMerge result="effect1_texture_0_1">
            <feMergeNode in="displacedImage"/>
          </feMerge>
        </filter>
        <filter id={`filter5_d_0_1_${id}`} x="90" y="126.439" width="545" height="471" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="4"/>
          <feGaussianBlur stdDeviation="5"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape"/>
        </filter>
        <filter id={`filter6_g_0_1_${id}`} x="123" y="155.439" width="479" height="405" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feTurbulence type="fractalNoise" baseFrequency="0.25 0.25" numOctaves="3" seed="9599" />
          <feDisplacementMap in="shape" scale="8" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
          <feMerge result="effect1_texture_0_1">
            <feMergeNode in="displacedImage"/>
          </feMerge>
        </filter>
        <filter id={`filter7_g_0_1_${id}`} x="187.693" y="146.84" width="309.33" height="238.101" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feTurbulence type="fractalNoise" baseFrequency="0.25 0.25" numOctaves="3" seed="1792" />
          <feDisplacementMap in="shape" scale="8" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
          <feMerge result="effect1_texture_0_1">
            <feMergeNode in="displacedImage"/>
          </feMerge>
        </filter>
        <filter id={`filter8_g_0_1_${id}`} x="287.25" y="209.439" width="128" height="69" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feTurbulence type="fractalNoise" baseFrequency="0.25 0.25" numOctaves="3" seed="6509" />
          <feDisplacementMap in="shape" scale="8" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
          <feMerge result="effect1_texture_0_1">
            <feMergeNode in="displacedImage"/>
          </feMerge>
        </filter>
        <filter id={`filter9_g_0_1_${id}`} x="474.746" y="349.987" width="90.3682" height="120.166" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feTurbulence type="fractalNoise" baseFrequency="0.25 0.25" numOctaves="3" seed="4730" />
          <feDisplacementMap in="shape" scale="8" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
          <feMerge result="effect1_texture_0_1">
            <feMergeNode in="displacedImage"/>
          </feMerge>
        </filter>
        <path id={`stroke0_0_1_${id}`} d="M848.634 365.746C822.567 437.365 729.703 469.315 641.217 437.109C552.732 404.903 502.132 320.736 528.199 249.117C554.266 177.498 647.129 145.548 735.615 177.754C824.101 209.96 874.701 294.127 848.634 365.746Z"/>
        <path id={`stroke2_0_1_${id}`} d="M784.714 233.795C779.57 242.705 759.416 240.701 739.7 229.317C719.983 217.934 708.17 201.483 713.315 192.573C718.459 183.663 738.613 185.667 758.329 197.051C778.045 208.434 789.858 224.885 784.714 233.795Z"/>
        <path id={`stroke4_0_1_${id}`} d="M598 357.939C598 467.568 492.563 556.439 362.5 556.439C232.437 556.439 127 467.568 127 357.939C127 248.311 232.437 159.439 362.5 159.439C492.563 159.439 598 248.311 598 357.939Z"/>
        <path id={`stroke6_0_1_${id}`} d="M411.25 243.939C411.25 260.784 384.387 274.439 351.25 274.439C318.113 274.439 291.25 260.784 291.25 243.939C291.25 227.095 318.113 213.439 351.25 213.439C384.387 213.439 411.25 227.095 411.25 243.939Z"/>
      </defs>
    </svg>
  );
};

export default BerriesSticker;

