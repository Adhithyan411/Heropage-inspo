"use client";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

const EASE_OUT = "cubic-bezier(0.2, 0.8, 0.2, 1)";

function useInView({
  threshold = 0.05,
  rootMargin = "250px 0px 100px 0px",
  animateOnLoad = true,
  loadDelay = 180,
}: {
  threshold?: number;
  rootMargin?: string;
  animateOnLoad?: boolean;
  loadDelay?: number;
} = {}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (animateOnLoad) {
      timer = setTimeout(() => {
        setInView(true);
      }, loadDelay);
    }

    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      queueMicrotask(() => setInView(true));
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [threshold, rootMargin, animateOnLoad, loadDelay]);

  return [ref, inView] as const;
}

function MotionBlur({
  inView,
  delay = 0,
  blur = 8,
  children,
  className = "",
}: {
  inView: boolean;
  delay?: number;
  blur?: number;
  children: ReactNode;
  className?: string;
}) {
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setSettled(true), delay + 850);
      return () => clearTimeout(t);
    }
  }, [inView, delay]);

  return (
    <div
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translate3d(0, 0, 0)" : "translate3d(0, 24px, 0)",
        filter: settled ? "none" : inView ? "blur(0px)" : `blur(${blur}px)`,
        transition: settled
          ? "none"
          : `opacity 650ms ${EASE_OUT} ${delay}ms, transform 750ms ${EASE_OUT} ${delay}ms, filter 650ms ${EASE_OUT} ${delay}ms`,
        willChange: settled ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------
   YOUR SCREENSHOTS
   Drop your own (or licensed / permission-cleared) sticker UI shots into
   /public/previews and list them here. Leave a slot "" to use the built-in
   sticker mockup for that card instead.
------------------------------------------------------------------- */
const WEB_SHOTS = ["", "", ""]; // e.g. "/previews/web-1.png"
const APP_SHOTS = ["", "", ""]; // e.g. "/previews/app-1.png"

/* ---------- shared ---------- */

const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";

/* all sizes inside a folder use em; 1em = 1/56 of the folder width (cqw) */
const UNIT = "1.78cqw";

/* cheap paper grain — no SVG feTurbulence (that filter is re-rasterized while scrolling) */
const GRAIN =
  "radial-gradient(rgba(0,0,0,0.18) 0.6px, transparent 0.7px)";

const WEB_AVATARS = [
  { src: "/stickers/blueberry.svg", bg: "#fbd3e2" },
  { src: "/stickers/star.svg", bg: "#ddd7fb" },
  { src: "/stickers/Flame.svg", bg: "#d3f0dc" },
];

const APP_AVATARS = [
  { src: "/stickers/cat.svg", bg: "#ffe0c2" },
  { src: "/stickers/Curious%20blue%20globe.svg", bg: "#cfe2ff" },
  { src: "/stickers/Flame.svg", bg: "#e3d3ff" },
];


function Img({ src, style }: { src: string; style?: CSSProperties }) {
  return (
    <img
      src={src}
      alt=""
      draggable={false}
      className="pointer-events-none absolute select-none"
      style={style}
    />
  );
}

/* a printed photo / screen card: white frame, soft layered shadow */
const printFrame: CSSProperties = {
  border: "0.35em solid #fff",
  boxShadow:
    "0 0.05em 0.1em rgba(0,0,0,0.10), 0 0.3em 0.7em rgba(0,0,0,0.10), 0 1em 2em rgba(0,0,0,0.08)",
};

/* ---------- built-in website mockup ---------- */

type WebProps = {
  bg: string;
  url: string;
  brand: string;
  headline: string;
  cta: string;
  logo: string;
  stickers: { src: string; size: number; right: number; top: number; rot: number }[];
};

function WebMock({ bg, url, brand, headline, cta, logo, stickers }: WebProps) {
  return (
    <div className="h-full w-full overflow-hidden bg-white" style={{ borderRadius: "1.6em", ...printFrame }}>
      <div
        className="flex items-center"
        style={{ gap: "0.5em", padding: "0.8em 1em", borderBottom: "0.05em solid #eee" }}
      >
        {["#ff7b72", "#ffd166", "#4cd97b"].map((c) => (
          <span
            key={c}
            style={{
              width: "0.7em",
              height: "0.7em",
              borderRadius: 999,
              background: c,
              boxShadow: "inset 0 0.08em 0.1em rgba(255,255,255,0.6), 0 0.05em 0.1em rgba(0,0,0,0.2)",
            }}
          />
        ))}
        <span
          className="truncate text-zinc-400"
          style={{
            marginLeft: "0.8em",
            fontSize: "0.9em",
            padding: "0.2em 1em",
            borderRadius: 999,
            background: "#f4f4f5",
            boxShadow: "inset 0 0.08em 0.15em rgba(0,0,0,0.08)",
          }}
        >
          {url}
        </span>
      </div>

      <div className="relative" style={{ background: bg, height: "100%", padding: "1.2em" }}>
        <div className="flex items-center" style={{ gap: "0.6em" }}>
          <img src={logo} alt="" draggable={false} style={{ width: "2em", height: "2em" }} />
          <span className="font-semibold text-zinc-900" style={{ fontSize: "1.1em" }}>
            {brand}
          </span>
          <span className="ml-auto flex" style={{ gap: "0.5em" }}>
            {[3, 2.4, 2.8].map((w, i) => (
              <span
                key={i}
                style={{ width: `${w}em`, height: "0.5em", borderRadius: 999, background: "#0000001a" }}
              />
            ))}
          </span>
        </div>

        <p
          className="font-medium leading-[1.1] tracking-tight text-zinc-900"
          style={{ marginTop: "1.6em", maxWidth: "62%", fontSize: "2.1em" }}
        >
          {headline}
        </p>

        <span
          className="inline-block font-medium text-white"
          style={{
            marginTop: "1em",
            fontSize: "1em",
            padding: "0.5em 1.1em",
            borderRadius: "0.8em",
            background: "linear-gradient(180deg,#3f3f46,#18181b)",
            boxShadow: "inset 0 0.08em 0 #ffffff22, 0 0.1em 0.2em rgba(0,0,0,0.25)",
          }}
        >
          {cta}
        </span>

        {stickers.map((s, i) => (
          <Img
            key={i}
            src={s.src}
            style={{
              width: `${s.size}em`,
              right: `${s.right}em`,
              top: `${s.top}em`,
              rotate: `${s.rot}deg`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------- built-in phone mockup ---------- */

type PhoneProps = {
  bg: string;
  title: string;
  hero: string;
  heroBg: string;
  chips: string[];
  tiles: string[];
};

function PhoneMock({ bg, title, hero, heroBg, chips, tiles }: PhoneProps) {
  return (
    <div className="h-full w-full overflow-hidden bg-white" style={{ borderRadius: "2.6em", ...printFrame }}>
      <div className="relative h-full" style={{ background: bg, padding: "0.9em 1em" }}>
        <div className="mx-auto bg-zinc-900" style={{ width: "4.4em", height: "1.2em", borderRadius: 999 }} />
        <p className="font-semibold text-zinc-900" style={{ marginTop: "1em", fontSize: "1.3em" }}>
          {title}
        </p>

        <div className="flex" style={{ gap: "0.4em", marginTop: "0.6em" }}>
          {chips.map((c, i) => (
            <span
              key={c}
              className={i === 0 ? "bg-zinc-900 text-white" : "bg-white text-zinc-600"}
              style={{
                fontSize: "0.85em",
                padding: "0.25em 0.8em",
                borderRadius: 999,
                boxShadow: "0 0.05em 0.15em rgba(0,0,0,0.12)",
              }}
            >
              {c}
            </span>
          ))}
        </div>

        <div
          className="relative"
          style={{
            marginTop: "0.9em",
            height: "7.4em",
            borderRadius: "1.4em",
            background: heroBg,
            boxShadow: "inset 0 0.1em 0 #ffffff99, inset 0 -0.15em 0.4em rgba(0,0,0,0.06)",
          }}
        >
          <Img
            src={hero}
            style={{
              width: "6.4em",
              left: "50%",
              top: "50%",
              translate: "-50% -50%",
              rotate: "-8deg",
            }}
          />
        </div>

        <div className="grid grid-cols-2" style={{ gap: "0.6em", marginTop: "0.7em" }}>
          {tiles.map((t) => (
            <div
              key={t}
              className="relative bg-white"
              style={{
                height: "4.4em",
                borderRadius: "1.1em",
                boxShadow: "0 0.05em 0.15em rgba(0,0,0,0.08)",
              }}
            >
              <Img src={t} style={{ width: "3em", left: "50%", top: "50%", translate: "-50% -50%" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- your own screenshot, in the same printed frame ---------- */

function Shot({ src, round }: { src: string; round: string }) {
  return (
    <div className="h-full w-full overflow-hidden bg-white" style={{ borderRadius: round, ...printFrame }}>
      <img src={src} alt="" draggable={false} className="h-full w-full object-cover object-top" />
    </div>
  );
}


/* ---------- the folder ---------- */

type Card = {
  left: number;
  width: number;
  rot: number;
  lift: number;
  node: ReactNode;
};

type FolderProps = {
  title: string;
  stamp: ReactNode;
  stampRot: number;
  cards: Card[];
  avatars: { src: string; bg: string }[];
};

function Folder({ title, stamp, stampRot, cards, avatars }: FolderProps) {
  const [hover, setHover] = useState(false);
  const [pinned, setPinned] = useState(false);
  const open = hover || pinned;

  return (
    <div className="flex w-full flex-col items-center">
      <button
        type="button"
        aria-label={`${title}`}
        aria-pressed={pinned}
        onClick={() => setPinned((p) => !p)}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        className="block w-full cursor-pointer outline-none"
        style={{ containerType: "inline-size" }}
      >
        <div className="relative w-full" style={{ fontSize: UNIT, aspectRatio: "1.2 / 1" }}>
          {/* contact shadow on the surface */}
          <div
            className="absolute inset-x-[6%] bottom-[-1.5%] h-[5%]"
            style={{
              borderRadius: "50%",
              background: "rgba(0,0,0,0.18)",
              boxShadow: "0 0 1.6em 0.4em rgba(0,0,0,0.18)",
              scale: open ? "0.94 1" : "1 1",
              transition: "scale 300ms ease-out",
            }}
          />

          {/* back panel (recessed inside) */}
          <div
            className="absolute inset-x-0 bottom-0"
            style={{
              top: "6%",
              borderRadius: "2.8em",
              background: "linear-gradient(180deg,#dcdce0 0%,#ececef 100%)",
              boxShadow:
                "inset 0 0.3em 0.6em rgba(0,0,0,0.10), inset 0 -0.1em 0 #ffffffaa, 0 0.1em 0.2em rgba(0,0,0,0.06)",
            }}
          />
          {/* tab */}
          <div
            className="absolute left-0"
            style={{
              top: 0,
              width: "22em",
              height: "8em",
              borderRadius: "2.8em 2.8em 0 0",
              background: "linear-gradient(180deg,#f4f4f6 0%,#e2e2e6 100%)",
              boxShadow: "inset 0 0.12em 0 #fff, 0 -0.05em 0.2em rgba(0,0,0,0.05)",
            }}
          />

          {/* peeking previews */}
          <div className="absolute inset-x-0" style={{ top: "4%", height: "70%" }}>
            {cards.map((c, i) => (
              <div
                key={i}
                className="absolute top-0 h-full"
                style={{
                  left: `${c.left}%`,
                  width: `${c.width}%`,
                  zIndex: i + 1,
                  rotate: `${c.rot + (open ? c.rot * 0.6 : 0)}deg`,
                  translate: `0 ${open ? c.lift - 5 : c.lift}em`,
                  transition: `translate 600ms ${SPRING} ${i * 40}ms, rotate 600ms ${SPRING} ${i * 40}ms`,
                }}
              >
                {c.node}
              </div>
            ))}
          </div>


          {/* folder component  */}
          {/* front panel: frosted, bevelled, with grain */}
          <div
            className="absolute inset-x-0 bottom-0 overflow-visible"
            style={{
              height: "66%",
              zIndex: 10,
              borderRadius: "2.8em",
              background: "linear-gradient(180deg,#ffffff 0%,#f6f6f7 45%,#ececee 100%)",
              border: "0.24em solid rgba(255,255,255,0.95)",
              boxShadow: [
                "inset 0 0.18em 0 #fff",
                "inset 0 -0.2em 0.5em rgba(0,0,0,0.05)",
                "0 -0.1em 0.4em rgba(0,0,0,0.05)",
                "0 0.1em 0.15em rgba(0,0,0,0.08)",
                "0 0.8em 1.6em rgba(0,0,0,0.08)",
                "0 2em 3em rgba(0,0,0,0.06)",
              ].join(","),
            }}
          >
            {/* grain */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                borderRadius: "inherit",
                backgroundImage: GRAIN,
                backgroundSize: "3px 3px",
                opacity: 0.06,
              }}
            />

            {/* clipped stamp */}
            <div
              className="absolute"
              style={{
                right: "2.4em",
                top: "-1.8em",
                width: "11em",
                rotate: `${stampRot + (open ? 5 : 0)}deg`,
                transition: `rotate 600ms ${SPRING}`,
              }}
            >
        
              {stamp}
            </div>

            {/* raised avatar discs */}
            <div className="absolute flex" style={{ left: "2em", bottom: "2em" }}>
              {avatars.map((a, i) => (
                <span
                  key={a.src}
                  className="relative block overflow-hidden hover:scale-110 transition-all duration-200 hover:-translate-y-1"
                  style={{
                    width: "5em",
                    height: "5em",
                    marginLeft: i ? "-1em" : 0,
                    borderRadius: 999,
                    background: a.bg,
                    border: "0.35em solid #fff",
                    boxShadow:
                      "inset 0 -0.15em 0.3em rgba(0,0,0,0.08), 0 0.1em 0.2em rgba(0,0,0,0.14), 0 0.4em 0.8em rgba(0,0,0,0.08)",
                  }}
                >
                  <img src={a.src} alt="" draggable={false} className="h-full w-full p-[12%]" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </button>


      {/* letterpress title */}
      <h3
        className="mt-8 text-3xl font-semibold tracking-tight text-zinc-600"
        style={{ textShadow: "0 1px 0 #fff" }}
      >
        {title}
      </h3>
     
    </div>
  );
}

/* ---------- section ---------- */

export default function FolderShowcase() {
  const [sectionRef, inView] = useInView({ loadDelay: 150 });

  const webMocks: ReactNode[] = [
    <WebMock
      key="w1"
      bg="#fff1e4"
      url="sweetcrumb.co"
      brand="Sweet Crumb"
      headline="Bakes that taste like Sunday."
      cta="Order now"
      logo="/stickers/blueberry.svg"
      stickers={[
        { src: "/stickers/flower.svg", size: 7.5, right: 1.2, top: 4.2, rot: 14 },
        { src: "/stickers/Sparkles.svg", size: 3.6, right: 8.4, top: 9.4, rot: -10 },
      ]}
    />,
    <WebMock
      key="w2"
      bg="#eaf2ff"
      url="mia.design"
      brand="Mia Rao"
      headline="Designer with a loud personality."
      cta="See my work"
      logo="/stickers/star.svg"
      stickers={[
        { src: "/stickers/face.svg", size: 7.2, right: 1.2, top: 4, rot: -12 },
        { src: "/stickers/Curious%20blue%20globe.svg", size: 4, right: 7.6, top: 10, rot: 8 },
      ]}
    />,
    <WebMock
      key="w3"
      bg="#f3eaff"
      url="shipfast.dev"
      brand="Shipfast"
      headline="Ship the thing. Skip the dread."
      cta="Start free"
      logo="/stickers/Flame.svg"
      stickers={[
        { src: "/stickers/Flame.svg", size: 7, right: 1.2, top: 4.4, rot: 10 },
        { src: "/stickers/Peace-hand.svg", size: 4, right: 7.8, top: 9.8, rot: -14 },
      ]}
    />,
  ];

  const phoneMocks: ReactNode[] = [
    <PhoneMock
      key="p1"
      bg="#fff1e4"
      title="Good morning"
      hero="/stickers/cat.svg"
      heroBg="#ffe0c2"
      chips={["Today", "Pets"]}
      tiles={["/stickers/blueberry.svg", "/stickers/star.svg"]}
    />,
    <PhoneMock
      key="p2"
      bg="#eaf2ff"
      title="Your trips"
      hero="/stickers/Curious%20blue%20globe.svg"
      heroBg="#cfe2ff"
      chips={["Plan", "Saved"]}
      tiles={["/stickers/Sparkles.svg", "/stickers/flower.svg"]}
    />,
    <PhoneMock
      key="p3"
      bg="#f3eaff"
      title="Streaks"
      hero="/stickers/Flame.svg"
      heroBg="#e3d3ff"
      chips={["Daily", "Friends"]}
      tiles={["/stickers/face.svg", "/stickers/Peace-hand.svg"]}
    />,
  ];

  const pick = (shots: string[], mocks: ReactNode[], i: number, round: string) =>
    shots[i] ? <Shot src={shots[i]} round={round} /> : mocks[i];

  const webCards: Card[] = [
    { left: 3, width: 46, rot: -4, lift: 1.4, node: pick(WEB_SHOTS, webMocks, 0, "1.6em") },
    { left: 27, width: 46, rot: 2, lift: -1.6, node: pick(WEB_SHOTS, webMocks, 1, "1.6em") },
    { left: 51, width: 46, rot: 5, lift: 0.4, node: pick(WEB_SHOTS, webMocks, 2, "1.6em") },
  ];

  const phoneCards: Card[] = [
    { left: 6, width: 29, rot: -5, lift: 1.6, node: pick(APP_SHOTS, phoneMocks, 0, "2.6em") },
    { left: 35.5, width: 29, rot: 1, lift: -1.8, node: pick(APP_SHOTS, phoneMocks, 1, "2.6em") },
    { left: 65, width: 29, rot: 6, lift: 0.6, node: pick(APP_SHOTS, phoneMocks, 2, "2.6em") },
  ];

  return (
    <section
      ref={sectionRef}
      id="stickers"
      className="relative z-10 mx-4 mb-10 rounded-[40px] px-4 py-20 sm:px-8"
    >
      <div className="mx-auto max-w-6xl w-full">
        <div className="mx-auto mb-16 flex max-w-2xl flex-col items-center text-center">
          <MotionBlur inView={inView} delay={0}>
            <h2 className="mt-5 font-sans text-4xl font-normal leading-[1.1] tracking-tight text-zinc-900 sm:text-5xl">
              See your brand, stickered.
            </h2>
          </MotionBlur>
          <MotionBlur inView={inView} delay={100}>
            <p className="mt-4 text-base text-neutral-400">
              Peek inside a folder to see how a website or an app feels once it has a little
              personality. Hover or tap to open.
            </p>
          </MotionBlur>
        </div>

        <div className="grid w-full grid-cols-1 items-start gap-14 md:grid-cols-2 md:gap-8 lg:gap-20">
          <MotionBlur inView={inView} delay={200} className="w-full">
            <Folder
              title="Landing pages"
              avatars={WEB_AVATARS}
              stampRot={0}
              cards={webCards}
              stamp={
                <img
                  src="/stickers/pink-cat.svg"
                  alt=""
                  draggable={false}
                  className="h-[80%] w-[80%] mt-11 -ml-2 object-contain"
                />
              }
            />
          </MotionBlur>

          <MotionBlur inView={inView} delay={340} className="w-full">
            <Folder
              title="Mobile apps"
              avatars={APP_AVATARS}
              stampRot={-6}
              cards={phoneCards}
              stamp={
                <img
                  src="/stickers/japan.svg"
                  alt=""
                  draggable={false}
                  className="h-full w-full mt-8 -ml-2 object-contain"
                />
              }
            />
          </MotionBlur>
        </div>
      </div>
    </section>
  );
}