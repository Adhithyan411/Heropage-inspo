import React, { useId } from "react";
import type { StickerProps } from "../types";
import { usePeel } from "../utils/usePeel";

export const FlameStarSticker: React.FC<StickerProps> = ({
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

  const finalWidth = width ?? size;
  const finalHeight = height ?? size;

  const { style: peelStyle, onMouseEnter, onMouseLeave } = usePeel(peel, style);

  return (
    <svg
      width={finalWidth}
      height={finalHeight}
      viewBox="0 0 883 825"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={peelStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-label="Flame Star Cartoon Sticker"
      role="img"
      {...props}
    >
      <g filter={`url(#${filter0})`}>
        <path
          d="M522.147 358.088C531.916 358.088 540.923 363.365 545.699 371.887C624.063 511.694 652.721 639.413 681.58 778.087C683.236 786.042 681.22 794.32 676.093 800.624C670.966 806.928 663.272 810.588 655.147 810.588H238.147C230.451 810.588 223.122 807.304 217.999 801.562C212.877 795.819 210.447 788.164 211.321 780.519C223.995 669.766 271.804 551.79 357.299 373.418L357.513 372.982C362.085 363.865 371.42 358.088 381.647 358.088H522.147Z"
          fill="white"
        />
      </g>
      <g filter={`url(#${filter1})`}>
        <path
          d="M522.147 385.088H381.647C296.044 563.685 250.241 677.895 238.147 783.588H655.147C626.326 645.099 598.312 520.973 522.147 385.088Z"
          fill="black"
          strokeWidth="5"
          stroke="black"
        />
      </g>
      <g filter={`url(#${filter2})`}>
        <path
          d="M421.422 16.6231C428.919 1.90953 446.487 2.56794 452.225 18.0528C456.639 30.7231 460.489 41.33 463.393 48.3614C473.738 73.4109 484.343 102.623 493.712 128.435C502.588 152.888 510.359 174.295 515.755 186.225C518.448 184.625 521.277 182.953 524.28 181.179C536.069 174.213 550.535 165.661 569.952 153.652C592.369 139.788 608.495 130.4 622.201 122.421C641.491 111.191 656.005 102.741 676.59 88.4883C690.933 78.5571 705.786 68.5081 719.691 59.4668C732.732 51.4152 746.417 62.0813 741.37 76.5528C738.343 85.9327 735.351 94.8257 732.483 102.856C728.979 112.668 725.197 123.969 721.264 135.728C716.056 151.295 710.577 167.669 705.113 182.462C700.611 194.653 696.305 204.531 692.495 213.272C691.307 215.998 690.167 218.616 689.084 221.157C685.777 230.961 682.476 240.767 679.184 250.576C678.785 252.21 678.375 253.931 677.944 255.726C677.643 256.983 677.33 258.28 677.007 259.619C679.006 260.409 681.065 261.236 683.183 262.105C703.753 270.555 721.299 279.083 739.805 288.082C754.213 295.089 769.205 302.38 786.664 310.137C798.569 315.426 812.229 321.221 825.769 326.965C838.612 332.414 851.354 337.82 862.401 342.711C876.559 349.309 875.459 366.698 860.439 370.984C853.904 372.987 847.885 374.76 842.658 376.178C837.239 377.648 832.448 378.469 827.707 379.278C827.686 379.281 827.665 379.284 827.644 379.286C827.322 379.341 826.998 379.398 826.677 379.453C791.81 390.228 756.953 401.046 722.106 411.888C719.116 412.926 716.093 413.973 713.097 415.009C703.648 418.275 694.372 421.481 686.528 424.341C691.213 434.266 696.571 445.828 702.056 457.67C709.805 474.401 717.817 491.7 724.563 505.73C728.507 513.933 731.415 522.079 734.404 530.459C737.193 538.278 740.057 546.307 743.903 554.771C744.465 556.007 745.054 557.267 745.664 558.551C753.536 577.136 737.926 592.917 719.531 584.61C716.327 583.327 712.931 582.028 709.376 580.669C704.957 578.98 700.284 577.194 695.436 575.228C690.93 573.4 681.15 568.754 668.608 562.8C660.857 559.12 652.049 554.941 642.779 550.613C617.88 540.08 592.982 529.531 568.099 518.961C564.663 517.813 561.48 516.846 558.614 516.097C558.384 516.686 558.123 517.313 557.821 517.98C552.519 529.677 546.302 542.886 540.212 555.825C533.439 570.214 526.821 584.279 521.777 595.589C516.127 608.259 507.285 625.952 498.432 643.676C496.349 647.846 494.266 652.018 492.223 656.127C481.678 678.312 456.467 679.513 444.949 657.816C440.862 649.777 436.877 642.006 433.204 635.05C427.773 624.764 421.631 614.321 415.682 604.209C408.54 592.071 401.668 580.397 396.642 570.03C395.626 567.934 394.861 565.057 393.9 561.449C393.219 558.893 392.432 555.952 391.397 552.681C384.355 539.838 377.337 526.979 370.343 514.11C370.01 513.705 369.668 513.285 369.323 512.866C369.317 512.86 369.312 512.854 369.306 512.848C367.386 510.512 365.293 507.963 363.084 505.131C360.161 505.97 357.803 506.443 355.604 506.884C352.305 507.544 349.357 508.134 345.399 509.781C340.905 511.652 335.874 514.467 330.39 517.533C322.689 521.839 314.087 526.649 304.809 530.06C304.175 530.292 303.493 530.542 302.784 530.804C296.064 533.285 286.114 536.958 275.881 539.884C247.298 552.462 218.682 564.975 190.051 577.445C178.904 582.301 167.753 587.15 156.6 591.994C138.167 600.201 122.187 583.932 131.259 565.908C149.522 530.432 167.838 494.979 186.149 459.533C197.778 437.036 210.434 416.2 221.439 401.66C229.331 391.241 235.899 384.66 240.509 382.516C235.558 383.996 226.072 383.362 212.96 380.629C194.759 376.831 171.057 369.277 147.055 359.719C105.673 343.233 64.283 326.745 22.9326 310.169C4.47799 302.33 6.12564 279.177 25.6289 274.523C32.8892 272.634 40.1506 270.746 47.4121 268.862C101.441 254.844 155.516 240.996 209.674 227.497C198.651 191.51 187.701 155.499 176.814 119.471C175.494 115.1 174.175 110.727 172.856 106.356C171.194 101.487 169.533 96.6187 167.886 91.7784C161.449 70.3219 184.19 55.5645 200.884 70.502C225.446 90.9105 249.04 110.646 266.182 125.354C282.602 139.442 294.015 150.344 303.79 159.681C310.517 166.106 316.47 171.791 322.741 177.261C325.291 179.484 328.56 182.31 332.416 185.638C343.036 163.956 355.122 139.748 367.073 116.994C376.686 98.6928 388.217 77.6104 399.225 57.4844C407.206 42.8911 414.915 28.797 421.422 16.6231Z"
          fillRule="evenodd"
          clipRule="evenodd"
          fill="white"
        />
      </g>
      <g filter={`url(#${filter3})`}>
        <path
          d="M148.584 574.429L243.539 381.362L30.1467 292.79L235.37 242.035L187.383 85.79L339.514 220.141L436.51 24.088L507.981 210.189L727.499 71.8573L661.133 267.91L856.147 356.482L661.133 414.203L727.499 566.468L541.675 484.862L468.162 645.088L373.207 471.925L148.584 574.429Z"
          fill="#FA2F24"
        />
      </g>
      <g filter={`url(#${filter4})`}>
        <path
          d="M287.147 359.343C431.579 183.732 640.669 314.921 640.146 371.362C508.074 459.601 431.105 462.284 287.147 359.343Z"
          fill="#FFFEFE"
          strokeWidth="5"
          stroke="white"
        />
      </g>
      <g filter={`url(#${filter5})`}>
        <path
          d="M543.647 352.101C543.647 392.28 510.74 424.851 470.147 424.851C429.554 424.851 396.647 392.28 396.647 352.101C396.647 311.923 429.554 279.351 470.147 279.351C510.74 279.351 543.647 311.923 543.647 352.101Z"
          fill="black"
        />
      </g>
      <defs>
        <filter
          id={filter0}
          x="201.146"
          y="352.088"
          width="491"
          height="472.5"
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
          x="231.344"
          y="378.588"
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
          width="882.392"
          height="687.445"
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
          x="20.882"
          y="16.4136"
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
          x="279.517"
          y="264.59"
          width="367.13"
          height="178.998"
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
          x="392.647"
          y="275.351"
          width="155"
          height="153.5"
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
      </defs>
    </svg>
  );
};

export default FlameStarSticker;
