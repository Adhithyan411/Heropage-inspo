import React, { useId } from "react";
import type { StickerProps } from "../types";
import { usePeel } from "../utils/usePeel";

export const ConeSticker: React.FC<StickerProps> = ({
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
      viewBox="0 0 467 409"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={peelStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-label="cone Sticker"
      role="img"
      {...props}
    >
      <g filter={`url(#filter0_d_13_2169_${id})`}>
<path d="M156.15 26.6105C158.634 13.9557 169.617 5.17809 181.864 6.0611L281.408 13.2382L281.912 13.2803C292.489 14.272 301.286 22.3262 303.659 33.2626L279.73 39.0155L303.66 33.2661C303.661 33.2682 303.661 33.2713 303.662 33.2752C303.664 33.2836 303.667 33.2964 303.67 33.3131C303.677 33.3467 303.688 33.3971 303.703 33.4638C303.732 33.5974 303.775 33.7972 303.832 34.0602C303.946 34.5863 304.116 35.3672 304.337 36.3858C304.779 38.4232 305.428 41.412 306.254 45.217C307.905 52.8271 310.266 63.7027 313.102 76.7633C318.775 102.885 326.348 137.747 333.954 172.708C341.56 207.672 349.196 242.728 354.993 269.24C357.753 281.862 360.094 292.534 361.815 300.333C369.881 302.541 380.653 305.248 391.721 307.994C402.722 310.722 414.038 313.495 422.587 315.702C426.835 316.799 430.696 317.831 433.623 318.698C435.021 319.113 436.638 319.615 438.111 320.164C438.774 320.411 440.03 320.894 441.424 321.603C442.085 321.939 443.405 322.64 444.913 323.734C445.597 324.231 449.826 327.178 452.763 332.99L453.044 333.561L453.309 334.139C454.588 337.006 455.101 339.5 455.238 340.15C455.488 341.339 455.648 342.415 455.75 343.181C455.958 344.739 456.101 346.365 456.205 347.76C456.419 350.622 456.572 353.957 456.683 356.94C456.796 359.981 456.874 362.921 456.923 365.083C456.948 366.169 456.967 367.072 456.979 367.707C456.985 368.024 456.989 368.276 456.992 368.452C456.994 368.539 456.995 368.608 456.995 368.656C456.996 368.68 456.996 368.699 456.996 368.713C456.996 368.72 456.997 368.726 456.997 368.73V368.738C456.993 368.739 456.703 368.744 432.455 369.162L456.997 368.739C457.106 375.787 454.476 382.577 449.715 387.533C444.953 392.49 438.475 395.184 431.781 394.99L34.6289 383.507C22.1672 383.147 11.9412 373.01 10.8516 359.937L35.3027 357.679L10.8516 359.935C10.8515 359.934 10.851 359.932 10.8509 359.931C10.8507 359.929 10.8505 359.926 10.8503 359.923C10.8498 359.917 10.849 359.909 10.8483 359.901C10.8469 359.884 10.8451 359.862 10.8429 359.835C10.8385 359.781 10.8329 359.708 10.8256 359.616C10.811 359.434 10.7907 359.178 10.7664 358.859C10.7177 358.22 10.6514 357.321 10.5786 356.236C10.4342 354.083 10.2575 351.112 10.1378 347.938C10.0212 344.844 9.94331 341.173 10.0519 337.743C10.1059 336.04 10.216 334.028 10.4614 331.982C10.6504 330.407 11.1285 326.813 12.646 322.979L12.8917 322.381C15.4769 316.283 19.5532 312.937 20.7098 312.001C22.4891 310.56 24.1423 309.595 25.1309 309.053C27.1663 307.939 29.2202 307.094 30.7225 306.516C33.8888 305.295 37.7633 304.066 41.6694 302.907C49.6192 300.549 59.9243 297.838 69.9337 295.232C80.1497 292.572 90.1105 290.007 98.003 287.807C99.1336 287.491 100.197 287.189 101.19 286.903C103.15 279.564 105.665 269.118 108.572 256.375C114.455 230.591 121.698 196.501 128.762 162.386C135.819 128.31 142.666 94.363 147.752 68.9246C150.294 56.2082 152.394 45.6241 153.858 38.2214C154.591 34.5202 155.164 31.6145 155.554 29.6355C155.749 28.6461 155.898 27.8883 155.998 27.3786C156.049 27.1241 156.086 26.9312 156.112 26.8025C156.124 26.7382 156.134 26.6895 156.14 26.6574C156.143 26.6416 156.145 26.6295 156.147 26.6217C156.148 26.6178 156.149 26.6145 156.149 26.6126C156.156 26.6124 156.558 26.6991 179.645 31.7207L156.15 26.6105Z" fillRule="evenodd" clipRule="evenodd" fill="white"/>
</g>
<g filter={`url(#filter1_g_13_2169_${id})`}>
<path d="M279.73 39.0155L180.186 31.8384C180.186 31.8384 127.006 302.774 120.187 307.439C113.369 312.104 37.0072 328.612 35.3026 332.918C33.5979 337.224 35.3026 357.679 35.3026 357.679L432.455 369.162C432.455 369.162 432.114 347.272 431.091 345.119C430.068 342.966 342.115 323.588 341.093 320.358C340.07 317.128 279.73 39.0155 279.73 39.0155Z" fill="#FF2424" strokeWidth="5" stroke="#FF2424"/>
</g>
<g filter={`url(#filter2_g_13_2169_${id})`}>
<path d="M281.435 37.9389C281.435 43.6864 261.492 42.2452 232.685 42.2452C203.879 42.2452 178.823 35.7916 178.823 30.0441C178.823 24.2966 196.379 21.0728 225.186 21.0728C253.992 21.0728 281.435 32.1914 281.435 37.9389Z" fill="#FFC4C4"/>
</g>
<g filter={`url(#filter3_g_13_2169_${id})`}>
<path d="M127.346 267.965C200.506 228.099 335.719 210.956 334.274 239.257C332.83 267.558 356.653 89.1405 301.889 129.088C247.125 169.036 209.104 196.036 135.187 227.415C61.2704 258.793 127.346 267.965 127.346 267.965Z" fill="white" strokeWidth="5" stroke="white"/>
</g>
<g filter={`url(#filter4_g_13_2169_${id})`}>
<path d="M291.662 74.9011C236.822 88.3067 206.784 84.9899 168.596 72.7479L152.573 148.466C194.251 166.806 233.587 125.639 297.457 102.174L291.662 74.9011Z" fill="white" strokeWidth="5" stroke="white"/>
</g>
<g filter={`url(#filter5_g_13_2169_${id})`}>
<path d="M345.524 318.923C266.966 303.618 214.228 306.182 118.824 308.157L123.596 291.65C273.224 268.928 332.243 262.899 336.32 279.449L345.524 318.923Z" fill="white" strokeWidth="5" stroke="white"/>
</g>
<g filter={`url(#filter6_g_13_2169_${id})`}>
<path d="M433.136 371.674C433.136 380.791 370.394 373.469 258.935 373.469C157.005 369.88 36.1248 366.896 34.9614 356.961C43.1763 348.979 231.322 356.961 236.435 356.961C241.549 356.961 433.136 362.558 433.136 371.674Z" fill="#FFC4C4"/>
</g>
<g filter={`url(#filter7_g_13_2169_${id})`}>
<path d="M172.345 68.0828L119.165 314.975" strokeWidth="6" stroke="#FF2424"/>
</g>
<g filter={`url(#filter8_g_13_2169_${id})`}>
<path d="M286.889 69.5182L343.479 325.023" strokeWidth="6" stroke="#FF2424"/>
</g>
<defs>
<filter id={`filter0_d_13_2169_${id}`} x="0" y="0" width="467" height="409" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="5"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_13_2169"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_13_2169" result="shape"/>
</filter>
<filter id={`filter1_g_13_2169_${id}`} x="28.0449" y="25.1858" width="410.95" height="350.551" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feTurbulence type="fractalNoise" baseFrequency="0.25 0.25" numOctaves="3" seed="236" />
<feDisplacementMap in="shape" scale="8" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
<feMerge result="effect1_texture_13_2169">
<feMergeNode in="displacedImage"/>
</feMerge>
</filter>
<filter id={`filter2_g_13_2169_${id}`} x="174.823" y="17.0728" width="110.612" height="29.3332" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feTurbulence type="fractalNoise" baseFrequency="0.25 0.25" numOctaves="3" seed="4970" />
<feDisplacementMap in="shape" scale="8" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
<feMerge result="effect1_texture_13_2169">
<feMergeNode in="displacedImage"/>
</feMerge>
</filter>
<filter id={`filter3_g_13_2169_${id}`} x="93.6709" y="116.727" width="251.042" height="157.828" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feTurbulence type="fractalNoise" baseFrequency="0.25 0.25" numOctaves="3" seed="9717" />
<feDisplacementMap in="shape" scale="8" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
<feMerge result="effect1_texture_13_2169">
<feMergeNode in="displacedImage"/>
</feMerge>
</filter>
<filter id={`filter4_g_13_2169_${id}`} x="145.707" y="65.5223" width="158.646" height="94.0204" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feTurbulence type="fractalNoise" baseFrequency="0.25 0.25" numOctaves="3" seed="9717" />
<feDisplacementMap in="shape" scale="8" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
<feMerge result="effect1_texture_13_2169">
<feMergeNode in="displacedImage"/>
</feMerge>
</filter>
<filter id={`filter5_g_13_2169_${id}`} x="111.478" y="263.538" width="241.357" height="62.5768" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feTurbulence type="fractalNoise" baseFrequency="0.25 0.25" numOctaves="3" seed="9749" />
<feDisplacementMap in="shape" scale="8" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
<feMerge result="effect1_texture_13_2169">
<feMergeNode in="displacedImage"/>
</feMerge>
</filter>
<filter id={`filter6_g_13_2169_${id}`} x="30.9614" y="349.414" width="406.175" height="30.8364" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feTurbulence type="fractalNoise" baseFrequency="0.25 0.25" numOctaves="3" seed="9562" />
<feDisplacementMap in="shape" scale="8" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
<feMerge result="effect1_texture_13_2169">
<feMergeNode in="displacedImage"/>
</feMerge>
</filter>
<filter id={`filter7_g_13_2169_${id}`} x="112.232" y="63.4511" width="67.0461" height="256.156" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feTurbulence type="fractalNoise" baseFrequency="0.25 0.25" numOctaves="3" seed="5066" />
<feDisplacementMap in="shape" scale="8" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
<feMerge result="effect1_texture_13_2169">
<feMergeNode in="displacedImage"/>
</feMerge>
</filter>
<filter id={`filter8_g_13_2169_${id}`} x="279.96" y="64.8695" width="70.448" height="264.802" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feTurbulence type="fractalNoise" baseFrequency="0.25 0.25" numOctaves="3" seed="7517" />
<feDisplacementMap in="shape" scale="8" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
<feMerge result="effect1_texture_13_2169">
<feMergeNode in="displacedImage"/>
</feMerge>
</filter>
</defs>
    </svg>
  );
};
