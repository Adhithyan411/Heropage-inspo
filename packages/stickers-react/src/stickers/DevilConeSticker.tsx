import React, { useId } from "react";
import type { StickerProps } from "../types";
import { usePeel } from "../utils/usePeel";

export const DevilConeSticker: React.FC<StickerProps> = ({
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
  const filter5 = `f5_${id}`;
  const filter6 = `f6_${id}`;
  const filter7 = `f7_${id}`;
  const paint0 = `p0_${id}`;
  const paint1 = `p1_${id}`;

  const finalWidth = width ?? size;
  const finalHeight = height ?? size;

  const { style: peelStyle, onMouseEnter, onMouseLeave } = usePeel(peel, style);

  return (
    <svg
      width={finalWidth}
      height={finalHeight}
      viewBox="0 0 887 828"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={peelStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-label="Devil Cone Geometric Sticker"
      role="img"
      {...props}
    >
      <g filter={`url(#${filter0})`}>
        <path
          d="M524.619 359.308C534.75 359.308 544.091 364.78 549.044 373.617C627.49 513.57 656.172 641.422 685.033 780.103C686.749 788.353 684.659 796.937 679.342 803.475C674.025 810.012 666.046 813.808 657.619 813.808H240.619C232.639 813.808 225.037 810.403 219.725 804.448C214.412 798.492 211.894 790.553 212.801 782.624C225.496 671.684 273.379 553.569 358.87 375.205L359.092 374.753C363.834 365.298 373.514 359.308 384.119 359.308H524.619Z"
          fillRule="evenodd"
          clipRule="evenodd"
          fill={`url(#${paint0})`}
        />
      </g>
      <g filter={`url(#${filter1})`}>
        <path
          d="M524.619 387.308H384.119C298.516 565.905 252.714 680.115 240.619 785.808H657.619C628.799 647.319 600.785 523.193 524.619 387.308Z"
          fill="black"
          strokeWidth="5"
          stroke="black"
        />
      </g>
      <g filter={`url(#${filter2})`}>
        <path
          d="M422.042 17.9258C430.484 1.41821 450.21 2.13586 456.627 19.5313C460.993 32.2201 464.819 42.8365 467.744 49.8594C478.168 74.8791 488.707 104.116 498.018 129.95C506.339 153.04 513.684 173.416 519.093 185.637C521.209 184.392 523.411 183.101 525.715 181.751C537.529 174.826 552.026 166.324 571.456 154.335C593.888 140.494 610.056 131.174 623.799 123.253C643.14 112.105 657.692 103.716 678.206 89.3506C692.5 79.3408 707.315 69.231 721.205 60.1651C735.857 51.1409 751.232 63.1074 745.547 79.3497C742.536 88.7349 739.545 97.6283 736.661 105.652C733.136 115.458 729.36 126.761 725.432 138.522C720.231 154.091 714.759 170.467 709.245 185.243C704.701 197.42 700.289 207.262 696.386 215.971C695.168 218.687 694 221.296 692.893 223.829C689.587 233.634 686.288 243.441 682.999 253.251C682.618 254.891 682.226 256.617 681.814 258.418C681.645 259.161 681.47 259.918 681.294 260.689C682.952 261.337 684.65 262.011 686.387 262.715C706.998 271.073 724.518 279.658 742.997 288.718C757.384 295.771 772.353 303.113 789.82 310.852C801.731 316.129 815.41 321.882 828.969 327.585C841.83 332.995 854.588 338.362 865.642 343.24C881.529 350.668 880.309 370.193 863.438 374.985C856.905 376.996 850.887 378.767 845.656 380.17C840.232 381.625 835.421 382.379 830.66 383.122C830.639 383.124 830.618 383.126 830.597 383.128C830.273 383.178 829.949 383.231 829.626 383.281C794.774 394.107 759.934 404.982 725.104 415.884C722.119 416.94 719.101 418.003 716.11 419.056C707.674 422.024 699.375 424.944 692.117 427.617C696.606 437.065 701.646 447.861 706.797 458.901C714.593 475.611 722.653 492.888 729.465 506.891C733.447 515.076 736.288 523.252 739.209 531.662C741.934 539.509 744.734 547.566 748.596 556.023C749.16 557.258 749.752 558.516 750.367 559.798C759.179 580.677 741.667 598.412 721.025 589.059C717.816 587.788 714.411 586.508 710.847 585.17C706.417 583.506 701.732 581.749 696.876 579.799C692.364 577.987 682.599 573.305 670.077 567.305C662.339 563.597 653.545 559.385 644.287 555.031C619.369 544.539 594.453 534.029 569.554 523.496C567.425 522.811 565.392 522.199 563.469 521.666C558.174 533.364 551.944 546.563 545.84 559.492C539.05 573.873 532.415 587.93 527.386 599.247C521.752 611.925 512.837 629.584 503.91 647.274C501.81 651.436 499.709 655.601 497.649 659.703C485.768 684.593 457.463 685.981 444.571 661.599C440.515 653.543 436.556 645.758 432.896 638.795C427.485 628.499 421.303 618.076 415.315 607.985C408.128 595.873 401.213 584.222 396.248 573.821C395.245 571.718 394.557 568.799 393.692 565.14C393.079 562.546 392.37 559.562 391.407 556.251C384.365 543.409 377.35 530.548 370.361 517.677C370.018 517.277 369.665 516.862 369.31 516.449C369.303 516.443 369.297 516.437 369.291 516.431C367.799 514.696 366.206 512.841 364.539 510.836C362.618 511.272 360.93 511.564 359.325 511.84C355.988 512.415 353.004 512.928 349.039 514.559C344.536 516.412 339.53 519.278 334.071 522.402C326.407 526.789 317.846 531.689 308.529 535.016C307.893 535.243 307.209 535.486 306.497 535.741C299.749 538.163 289.759 541.749 279.445 544.497C250.841 557.028 222.2 569.486 193.541 581.896C182.383 586.727 171.221 591.552 160.057 596.371C139.35 605.563 121.395 587.306 131.604 567.081C149.947 531.645 168.35 496.234 186.748 460.832C198.433 438.362 211.328 417.642 222.715 403.29C229.843 394.311 236.005 388.279 240.756 385.58C235.312 386.732 226.492 386.245 214.912 384.102C196.547 380.698 172.746 373.383 148.727 363.867C107.315 347.454 65.8955 331.038 24.5195 314.523C3.80696 305.701 5.64284 279.703 27.5469 274.5C34.8045 272.599 42.0632 270.702 49.3223 268.808C102.484 254.935 155.694 241.245 208.995 227.935C198.236 192.783 187.554 157.607 176.94 122.411C175.622 118.04 174.306 113.666 172.989 109.294C171.308 104.431 169.63 99.5683 167.964 94.7335C160.756 70.6363 186.283 54.0581 205.014 70.8448C229.654 91.1648 253.316 110.824 270.484 125.502C286.929 139.562 298.292 150.521 308.024 159.905C314.722 166.364 320.648 172.079 326.924 177.544C328.875 179.243 331.249 181.293 333.985 183.65C344.232 162.753 355.767 139.737 367.23 118.068C376.898 99.7944 388.537 78.766 399.648 58.6915C407.705 44.1352 415.487 30.0762 422.042 17.9258Z"
          fillRule="evenodd"
          clipRule="evenodd"
          fill={`url(#${paint1})`}
        />
      </g>
      <g filter={`url(#${filter3})`}>
        <path
          d="M151.057 576.649L246.011 383.582L32.6194 295.01L237.843 244.255L189.855 88.0098L341.987 222.361L438.983 26.3079L510.454 212.409L729.972 74.0772L663.606 270.13L858.619 358.702L663.606 416.423L729.972 568.688L544.147 487.082L470.634 647.308L375.68 474.144L151.057 576.649Z"
          fill="#FA2F24"
        />
      </g>
      <g filter={`url(#${filter4})`}>
        <path
          d="M293.619 325.587C357.448 249.419 449.85 306.32 449.619 330.8C391.253 369.073 357.238 370.236 293.619 325.587Z"
          fill="#FFFEFE"
          strokeWidth="5"
          stroke="white"
        />
      </g>
      <g filter={`url(#${filter5})`}>
        <path
          d="M406.619 322.808C406.619 340.205 392.069 354.308 374.119 354.308C356.17 354.308 341.619 340.205 341.619 322.808C341.619 305.411 356.17 291.308 374.119 291.308C392.069 291.308 406.619 305.411 406.619 322.808Z"
          fill="black"
        />
      </g>
      <g filter={`url(#${filter6})`}>
        <path
          d="M501.619 329.587C565.448 253.419 657.85 310.32 657.619 334.8C599.253 373.073 565.238 374.236 501.619 329.587Z"
          fill="#FFFEFE"
          strokeWidth="5"
          stroke="white"
        />
      </g>
      <g filter={`url(#${filter7})`}>
        <path
          d="M614.619 326.808C614.619 344.205 392.069 358.308 582.119 358.308C564.17 358.308 549.619 344.205 549.619 326.808C549.619 309.411 564.17 295.308 582.119 295.308C600.069 295.308 614.619 309.411 614.619 326.808Z"
          fill="black"
        />
      </g>
      <defs>
        <filter
          id={filter0}
          x="202.619"
          y="353.308"
          width="493.001"
          height="474.5"
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
          x="233.817"
          y="380.808"
          width="430.876"
          height="411.5"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence type="fractalNoise" baseFrequency="0.25 0.25" numOctaves="3" seed="5513" />
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
          x="0"
          y="0"
          width="886.858"
          height="693.148"
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
          id={filter3}
          x="23.3546"
          y="18.6335"
          width="843.051"
          height="637.841"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence type="fractalNoise" baseFrequency="0.25 0.25" numOctaves="3" seed="9858" />
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
          x="285.954"
          y="280.81"
          width="170.165"
          height="84.9981"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence type="fractalNoise" baseFrequency="0.25 0.25" numOctaves="3" seed="4369" />
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
          id={filter5}
          x="337.619"
          y="287.308"
          width="73"
          height="71"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence type="fractalNoise" baseFrequency="0.25 0.25" numOctaves="3" seed="9348" />
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
          id={filter6}
          x="493.954"
          y="284.81"
          width="170.166"
          height="84.9981"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence type="fractalNoise" baseFrequency="0.25 0.25" numOctaves="3" seed="4369" />
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
          x="545.619"
          y="291.308"
          width="73"
          height="71"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence type="fractalNoise" baseFrequency="0.25 0.25" numOctaves="3" seed="9348" />
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
        <linearGradient
          id={paint0}
          x1="212.619"
          y1="359.308"
          x2="533.792"
          y2="693.554"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F2D980" />
          <stop offset="0.5" stopColor="#FFFCDD" />
          <stop offset="1" stopColor="#EFE2BE" />
        </linearGradient>
        <linearGradient
          id={paint1}
          x1="10"
          y1="6"
          x2="471.23"
          y2="599.957"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F2D980" />
          <stop offset="0.5" stopColor="#FFFCDD" />
          <stop offset="1" stopColor="#EFE2BE" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default DevilConeSticker;
