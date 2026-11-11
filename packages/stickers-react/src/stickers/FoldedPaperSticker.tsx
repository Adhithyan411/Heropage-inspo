import React, { useId } from "react";
import type { StickerProps } from "../types";
import { usePeel } from "../utils/usePeel";

export const FoldedPaperSticker: React.FC<StickerProps> = ({
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
  const filter8 = `f8_${id}`;

  const finalWidth = width ?? size;
  const finalHeight = height ?? size;

  const { style: peelStyle, onMouseEnter, onMouseLeave } = usePeel(peel, style);

  return (
    <svg
      width={finalWidth}
      height={finalHeight}
      viewBox="0 0 676 562"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={peelStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-label="Folded Paper Ribbon Sticker"
      role="img"
      {...props}
    >
      <g filter={`url(#${filter0})`}>
        <path
          d="M224.356 34.717C228 17.0848 244.109 4.85482 262.071 6.08513L408.071 16.0851L408.812 16.1437C424.324 17.5255 437.227 28.7477 440.707 43.9855L405.611 52.0011L440.709 43.9904C440.71 43.9933 440.711 43.9976 440.712 44.0031C440.715 44.0148 440.718 44.0325 440.724 44.0558C440.734 44.1026 440.75 44.173 440.771 44.2658C440.814 44.4519 440.877 44.7304 440.961 45.0968C441.128 45.8299 441.377 46.9179 441.701 48.3371C442.35 51.1758 443.301 55.3402 444.513 60.6418C446.935 71.2451 450.398 86.3982 454.558 104.596C462.877 140.992 473.986 189.565 485.141 238.278C496.296 286.993 507.496 335.837 515.999 372.777C520.047 390.364 523.48 405.233 526.004 416.1C537.835 419.176 553.634 422.948 569.867 426.774C586.002 430.576 602.599 434.439 615.139 437.514C621.369 439.042 627.031 440.48 631.324 441.689C633.376 442.266 635.746 442.966 637.907 443.731C638.88 444.075 640.722 444.748 642.766 445.736C643.735 446.204 645.672 447.181 647.883 448.705C648.886 449.397 655.089 453.503 659.397 461.601L659.809 462.398L660.198 463.202C662.074 467.197 662.826 470.672 663.026 471.577C663.394 473.234 663.629 474.734 663.778 475.801C664.083 477.972 664.293 480.236 664.445 482.181C664.759 486.168 664.984 490.815 665.146 494.971C665.312 499.208 665.426 503.305 665.499 506.318C665.536 507.831 665.563 509.088 665.58 509.973C665.589 510.416 665.595 510.767 665.6 511.011C665.602 511.133 665.603 511.229 665.604 511.296C665.605 511.329 665.605 511.356 665.605 511.375C665.606 511.385 665.606 511.393 665.606 511.399V511.409C665.601 511.41 665.175 511.418 629.611 512.001L665.606 511.411C665.767 521.231 661.909 530.692 654.926 537.598C647.943 544.504 638.441 548.257 628.623 547.987L46.1231 531.987C27.8455 531.485 12.8471 517.362 11.249 499.148L47.1113 496.001L11.249 499.144C11.2489 499.143 11.2482 499.14 11.248 499.139C11.2478 499.135 11.2474 499.131 11.2471 499.127C11.2463 499.119 11.2452 499.109 11.2441 499.097C11.2421 499.073 11.2395 499.042 11.2363 499.005C11.2299 498.93 11.2216 498.827 11.2109 498.7C11.1895 498.446 11.1598 498.09 11.124 497.645C11.0526 496.755 10.9554 495.503 10.8486 493.99C10.6368 490.991 10.3776 486.851 10.2022 482.429C10.031 478.117 9.91686 473.003 10.0762 468.224C10.1553 465.85 10.3168 463.047 10.6768 460.196C10.9539 458.002 11.6551 452.995 13.8809 447.653L14.2412 446.819C18.033 438.323 24.0116 433.662 25.708 432.357C28.3177 430.349 30.7423 429.005 32.1924 428.25C35.1776 426.697 38.19 425.521 40.3936 424.714C45.0374 423.014 50.7203 421.301 56.4492 419.687C68.1091 416.401 83.2236 412.624 97.9043 408.992C112.888 405.286 127.497 401.713 139.073 398.647C140.732 398.207 142.291 397.787 143.748 397.388C146.622 387.162 150.311 372.608 154.575 354.853C163.203 318.927 173.826 271.428 184.188 223.896C194.537 176.417 204.581 129.118 212.039 93.674C215.768 75.956 218.848 61.209 220.996 50.8947C222.07 45.7378 222.912 41.6891 223.483 38.9318C223.769 37.5533 223.988 36.4974 224.135 35.7873C224.208 35.4325 224.264 35.1639 224.301 34.9845C224.319 34.8949 224.334 34.8271 224.343 34.7824C224.347 34.7603 224.35 34.7435 224.353 34.7326C224.354 34.7272 224.355 34.7226 224.355 34.7199C224.366 34.7196 224.955 34.8405 258.817 41.8371L224.356 34.717Z"
          fillRule="evenodd"
          clipRule="evenodd"
          fill="white"
        />
      </g>
      <g filter={`url(#${filter1})`}>
        <path
          d="M405.611 52.0012L259.611 42.0012C259.611 42.0012 181.611 419.501 171.611 426.001C161.611 432.501 49.6115 455.501 47.1112 461.501C44.611 467.501 47.1112 496.001 47.1112 496.001L629.611 512.001C629.611 512.001 629.111 481.501 627.611 478.501C626.11 475.501 497.111 448.501 495.611 444.001C494.112 439.501 405.611 52.0012 405.611 52.0012Z"
          fill="#FF2424"
          strokeWidth="5"
          stroke="#FF2424"
        />
      </g>
      <g filter={`url(#${filter2})`}>
        <path
          d="M408.111 50.5011C408.111 58.5092 378.861 56.5012 336.611 56.5012C294.361 56.5012 257.611 47.5092 257.611 39.5011C257.611 31.493 283.361 27.0012 325.611 27.0012C367.861 27.0012 408.111 42.493 408.111 50.5011Z"
          fill="#FFC4C4"
        />
      </g>
      <g filter={`url(#${filter3})`}>
        <path
          d="M182.111 371.001C289.414 315.454 487.729 291.569 485.611 331.001C483.492 370.433 518.433 121.841 438.111 177.501C357.789 233.161 302.024 270.781 193.611 314.501C85.1978 358.222 182.111 371.001 182.111 371.001Z"
          fill="white"
          strokeWidth="5"
          stroke="white"
        />
      </g>
      <g filter={`url(#${filter4})`}>
        <path
          d="M423.111 102.001C342.678 120.68 298.622 116.058 242.611 99.0012L219.111 204.501C280.239 230.055 337.933 172.695 431.611 140.001L423.111 102.001Z"
          fill="white"
          strokeWidth="5"
          stroke="white"
        />
      </g>
      <g filter={`url(#${filter5})`}>
        <path
          d="M502.111 442.001C386.889 420.676 309.54 424.25 169.611 427.001L176.611 404.001C396.069 372.343 482.631 363.942 488.611 387.001L502.111 442.001Z"
          fill="white"
          strokeWidth="5"
          stroke="white"
        />
      </g>
      <g filter={`url(#${filter6})`}>
        <path
          d="M630.611 515.501C630.611 528.204 538.587 518.001 375.111 518.001C225.611 513.001 48.3172 508.843 46.6108 495.001C58.6595 483.88 334.611 495.001 342.111 495.001C349.611 495.001 630.611 502.799 630.611 515.501Z"
          fill="#FFC4C4"
        />
      </g>
      <g filter={`url(#${filter7})`}>
        <path d="M248.111 92.5012L170.111 436.501" strokeWidth="6" stroke="#FF2424" />
      </g>
      <g filter={`url(#${filter8})`}>
        <path d="M416.111 94.5012L499.111 450.501" strokeWidth="6" stroke="#FF2424" />
      </g>
      <defs>
        <filter
          id={filter0}
          x="0"
          y="0"
          width="675.611"
          height="562.001"
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
          x="39.5"
          y="35.3578"
          width="596.654"
          height="483.214"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence type="fractalNoise" baseFrequency="0.25 0.25" numOctaves="3" seed="236" />
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
          x="253.611"
          y="23.0012"
          width="158.5"
          height="37.724"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence type="fractalNoise" baseFrequency="0.25 0.25" numOctaves="3" seed="4970" />
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
          x="135.753"
          y="162.836"
          width="362.134"
          height="214.747"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence type="fractalNoise" baseFrequency="0.25 0.25" numOctaves="3" seed="9717" />
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
          x="212.216"
          y="91.8234"
          width="226.321"
          height="125.553"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence type="fractalNoise" baseFrequency="0.25 0.25" numOctaves="3" seed="9717" />
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
          x="162.216"
          y="367.389"
          width="347.245"
          height="81.7745"
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
        <filter
          id={filter6}
          x="42.6108"
          y="486.058"
          width="592"
          height="39.8184"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence type="fractalNoise" baseFrequency="0.25 0.25" numOctaves="3" seed="9562" />
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
          x="163.185"
          y="87.8378"
          width="91.8516"
          height="353.327"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence type="fractalNoise" baseFrequency="0.25 0.25" numOctaves="3" seed="5066" />
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
          x="409.189"
          y="89.82"
          width="96.8433"
          height="365.362"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence type="fractalNoise" baseFrequency="0.25 0.25" numOctaves="3" seed="7517" />
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
      </defs>
    </svg>
  );
};

export default FoldedPaperSticker;
