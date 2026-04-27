"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Minus,
  Plus,
  X,
} from "lucide-react";

import { useInView } from "@/hooks/use-in-view";

const MENU_PAGES = [
  "/menu/menu-page-01.png",
  "/menu/menu-page-02.png",
  "/menu/menu-page-03.png",
  "/menu/menu-page-04.png",
  "/menu/menu-page-05.png",
  "/menu/menu-page-06.png",
  "/menu/menu-page-07.png",
  "/menu/menu-page-08.png",
  "/menu/menu-page-09.png",
  "/menu/menu-page-10.png",
  "/menu/menu-page-11.png",
  "/menu/menu-page-12.png",
  "/menu/menu-page-13.png",
  "/menu/menu-page-14.png",
  "/menu/menu-page-15.png",
  "/menu/menu-page-16.png",
  "/menu/menu-page-17.png",
];

const MENU_PDF_HREF = "/menu/speisekarte.pdf";
const FLIP_DURATION = 720;
const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.35;

type FlipState = {
  direction: "next" | "prev";
  from: number;
  to: number;
};

function clampPage(page: number) {
  return Math.min(Math.max(page, 0), MENU_PAGES.length - 1);
}

function getDesktopStart(page: number) {
  return Math.floor(clampPage(page) / 2) * 2;
}

function getVisiblePages(page: number, isDesktop: boolean) {
  if (!isDesktop) {
    return [clampPage(page)];
  }

  const start = getDesktopStart(page);
  return [start, start + 1].filter((index) => index < MENU_PAGES.length);
}

function PageImage({
  index,
  side,
  onOpen,
}: {
  index: number;
  side?: "left" | "right";
  onOpen?: (index: number) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen?.(index)}
      className="relative block w-full cursor-zoom-in border-0 bg-[#fffaf0] p-0 text-left"
      aria-label={`Seite ${index + 1} fullscreen öffnen`}
      style={{
        boxShadow:
          side === "left"
            ? "inset -18px 0 28px rgba(38, 23, 12, 0.09)"
            : side === "right"
              ? "inset 18px 0 28px rgba(38, 23, 12, 0.09)"
              : "inset 0 0 26px rgba(38, 23, 12, 0.07)",
        imageRendering: "auto",
      }}
    >
      <img
        src={MENU_PAGES[index]}
        alt={`Bonfini Speisekarte Seite ${index + 1}`}
        className="block h-auto w-full object-contain"
        draggable={false}
        loading="lazy"
        decoding="async"
        style={{ imageRendering: "auto" }}
      />
    </button>
  );
}

function BlankPage() {
  return (
    <div className="flex aspect-[3508/2480] w-full items-center justify-center bg-[#fffaf0]">
      <div className="h-[78%] w-[84%] border border-[#9a6a28]/10 bg-[#fff7e7]" />
    </div>
  );
}

export function MenuPdfSection() {
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.18 });
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const flipTimerRef = useRef<number | null>(null);
  const zoomDragRef = useRef<{
    x: number;
    y: number;
    startX: number;
    startY: number;
  } | null>(null);

  const [isDesktop, setIsDesktop] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [flip, setFlip] = useState<FlipState | null>(null);
  const [zoomPage, setZoomPage] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1.35);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const updateLayout = () => setIsDesktop(query.matches);

    updateLayout();
    query.addEventListener("change", updateLayout);

    return () => query.removeEventListener("change", updateLayout);
  }, []);

  useEffect(() => {
    if (isDesktop) {
      setCurrentPage((page) => getDesktopStart(page));
    }
  }, [isDesktop]);

  const visiblePages = useMemo(
    () => getVisiblePages(flip ? flip.to : currentPage, isDesktop),
    [currentPage, flip, isDesktop],
  );

  const currentVisiblePages = useMemo(
    () => getVisiblePages(currentPage, isDesktop),
    [currentPage, isDesktop],
  );

  const firstVisible = currentVisiblePages[0];
  const lastVisible = currentVisiblePages[currentVisiblePages.length - 1];
  const pageLabel =
    firstVisible === lastVisible
      ? `Seite ${firstVisible + 1}`
      : `Seiten ${firstVisible + 1}-${lastVisible + 1}`;
  const progress = Math.round(((lastVisible + 1) / MENU_PAGES.length) * 100);
  const canGoPrevious = currentPage > 0;
  const canGoNext = isDesktop
    ? getDesktopStart(currentPage) + 2 < MENU_PAGES.length
    : currentPage < MENU_PAGES.length - 1;

  const goToPage = useCallback(
    (targetPage: number) => {
      const normalizedTarget = isDesktop
        ? getDesktopStart(targetPage)
        : clampPage(targetPage);
      const normalizedCurrent = isDesktop
        ? getDesktopStart(currentPage)
        : clampPage(currentPage);

      if (normalizedTarget === normalizedCurrent || flip) {
        return;
      }

      const direction = normalizedTarget > normalizedCurrent ? "next" : "prev";
      setFlip({
        direction,
        from: normalizedCurrent,
        to: normalizedTarget,
      });

      if (flipTimerRef.current) {
        window.clearTimeout(flipTimerRef.current);
      }

      flipTimerRef.current = window.setTimeout(() => {
        setCurrentPage(normalizedTarget);
        setFlip(null);
      }, FLIP_DURATION);
    },
    [currentPage, flip, isDesktop],
  );

  const goPrevious = useCallback(() => {
    goToPage(currentPage - (isDesktop ? 2 : 1));
  }, [currentPage, goToPage, isDesktop]);

  const goNext = useCallback(() => {
    goToPage(currentPage + (isDesktop ? 2 : 1));
  }, [currentPage, goToPage, isDesktop]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tagName = target?.tagName;

      if (
        tagName === "INPUT" ||
        tagName === "TEXTAREA" ||
        tagName === "SELECT"
      ) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        if (zoomPage !== null) {
          setZoomPage((page) => (page === null ? null : clampPage(page - 1)));
        } else {
          goPrevious();
        }
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        if (zoomPage !== null) {
          setZoomPage((page) => (page === null ? null : clampPage(page + 1)));
        } else {
          goNext();
        }
      }

      if (event.key === "Escape" && zoomPage !== null) {
        setZoomPage(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrevious, zoomPage]);

  useEffect(() => {
    const step = isDesktop ? 2 : 1;
    const preloadIndexes = [
      ...getVisiblePages(currentPage - step, isDesktop),
      ...getVisiblePages(currentPage + step, isDesktop),
    ];

    Array.from(new Set(preloadIndexes))
      .filter((index) => index >= 0 && index < MENU_PAGES.length)
      .forEach((index) => {
        const image = new window.Image();
        image.src = MENU_PAGES[index];
      });
  }, [currentPage, isDesktop]);

  useEffect(() => {
    return () => {
      if (flipTimerRef.current) {
        window.clearTimeout(flipTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (zoomPage === null) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [zoomPage]);

  const onTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    const touch = event.changedTouches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
    if (!touchStartRef.current) {
      return;
    }

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;

    touchStartRef.current = null;

    if (Math.abs(deltaX) < 45 || Math.abs(deltaY) > 90) {
      return;
    }

    if (deltaX < 0) {
      goNext();
    } else {
      goPrevious();
    }
  };

  const openZoomPage = (index: number) => {
    setZoomPage(index);
    setZoom(isDesktop ? 1.65 : 1.2);
    setPan({ x: 0, y: 0 });
  };

  const closeZoomPage = () => {
    setZoomPage(null);
    setPan({ x: 0, y: 0 });
  };

  const updateZoom = (nextZoom: number) => {
    setZoom(Math.min(Math.max(nextZoom, MIN_ZOOM), MAX_ZOOM));
  };

  const onZoomPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (zoom <= 1) {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    zoomDragRef.current = {
      x: event.clientX,
      y: event.clientY,
      startX: pan.x,
      startY: pan.y,
    };
  };

  const onZoomPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!zoomDragRef.current) {
      return;
    }

    setPan({
      x: zoomDragRef.current.startX + event.clientX - zoomDragRef.current.x,
      y: zoomDragRef.current.startY + event.clientY - zoomDragRef.current.y,
    });
  };

  const onZoomPointerUp = () => {
    zoomDragRef.current = null;
  };

  const onZoomWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    updateZoom(zoom + (event.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP));
  };

  const overlaySide =
    !flip || !isDesktop
      ? "inset-0"
      : flip.direction === "next"
        ? "right-0 w-1/2"
        : "left-0 w-1/2";
  const overlayOrigin = !flip
    ? ""
    : flip.direction === "next"
      ? "origin-left"
      : "origin-right";
  const overlayAnimation = !flip
    ? ""
    : flip.direction === "next"
      ? "menu-flip-next"
      : "menu-flip-prev";
  const overlayFromPages = flip ? getVisiblePages(flip.from, isDesktop) : [];
  const overlayToPages = flip ? getVisiblePages(flip.to, isDesktop) : [];
  const overlayFrontIndex = flip
    ? isDesktop
      ? flip.direction === "next"
        ? overlayFromPages[1]
        : overlayFromPages[0]
      : overlayFromPages[0]
    : undefined;
  const overlayBackIndex = flip
    ? isDesktop
      ? flip.direction === "next"
        ? overlayToPages[0]
        : overlayToPages[1]
      : overlayToPages[0]
    : undefined;

  return (
    <section
      ref={sectionRef}
      id="speisekarte"
      className="relative overflow-x-hidden bg-[#fbf3e5] px-0 py-12 text-[#21170f] sm:px-4 md:px-6 md:py-18"
    >
      <style>{`
        .menu-flipbook-shell {
          perspective: 2800px;
          touch-action: pan-y pinch-zoom;
        }

        .menu-flipbook-page {
          backface-visibility: hidden;
          transform-style: preserve-3d;
        }

        .menu-flipbook-turn {
          animation-duration: ${FLIP_DURATION}ms;
          animation-timing-function: cubic-bezier(0.2, 0.72, 0.2, 1);
          animation-fill-mode: forwards;
          transform-style: preserve-3d;
        }

        .menu-flip-next {
          animation-name: menu-flip-next;
        }

        .menu-flip-prev {
          animation-name: menu-flip-prev;
        }

        @keyframes menu-flip-next {
          0% {
            transform: rotateY(0deg) translateZ(2px);
            box-shadow: -8px 10px 26px rgba(36, 22, 12, 0.18);
          }
          45% {
            box-shadow: -30px 22px 45px rgba(36, 22, 12, 0.3);
          }
          100% {
            transform: rotateY(-180deg) translateZ(2px);
            box-shadow: -12px 12px 32px rgba(36, 22, 12, 0.18);
          }
        }

        @keyframes menu-flip-prev {
          0% {
            transform: rotateY(0deg) translateZ(2px);
            box-shadow: 8px 10px 26px rgba(36, 22, 12, 0.18);
          }
          45% {
            box-shadow: 30px 22px 45px rgba(36, 22, 12, 0.3);
          }
          100% {
            transform: rotateY(180deg) translateZ(2px);
            box-shadow: 12px 12px 32px rgba(36, 22, 12, 0.18);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .menu-flipbook-turn {
            animation-duration: 1ms;
          }
        }

        .menu-zoom-surface {
          touch-action: none;
        }
      `}</style>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#f3e3ca]/70 to-transparent" />
        <div className="absolute left-1/2 top-20 h-px w-[min(680px,78vw)] -translate-x-1/2 bg-[#8b1e22]/20" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1760px] flex-col items-center">
        <div
          className={`mb-7 text-center transition-all duration-1000 md:mb-9 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <img
            src="/images/logo/logo-red.png"
            alt="Bonfini"
            className="mx-auto mb-5 h-auto w-36 object-contain md:w-44"
            loading="lazy"
            decoding="async"
          />
          <div className="mb-4 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-[#8b1e22]/45" />
            <span className="h-1.5 w-1.5 rotate-45 bg-[#8b1e22]" />
            <span className="h-px w-12 bg-[#8b1e22]/45" />
          </div>
          <p className="font-serif text-sm uppercase tracking-[0.28em] text-[#8b1e22]">
            Bonfini
          </p>
          <h2 className="mt-2 font-serif text-4xl leading-tight md:text-5xl">
            Speisekarte
          </h2>
        </div>

        <div
          className={`w-full transition-all delay-150 duration-1000 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative mx-auto flex w-screen max-w-[1680px] items-center justify-center md:w-[97vw] md:gap-4 xl:w-[95vw]">
            <button
              type="button"
              onClick={goPrevious}
              disabled={!canGoPrevious || Boolean(flip)}
              aria-label="Vorherige Seite"
              className="absolute left-2 top-1/2 z-30 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#8b1e22]/25 bg-[#fffaf1]/90 text-[#8b1e22] shadow-[0_12px_30px_rgba(54,31,13,0.18)] transition hover:-translate-y-[52%] hover:border-[#8b1e22]/50 hover:bg-white disabled:pointer-events-none disabled:opacity-35 md:static md:size-12 md:translate-y-0 md:shrink-0 md:hover:-translate-y-0.5"
            >
              <ChevronLeft className="size-5" />
            </button>

            <div
              className="menu-flipbook-shell relative w-full max-w-[1640px]"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <div className="absolute -inset-2 rounded-[1.5rem] bg-[#7d4e1b]/10 blur-2xl md:-inset-6 md:rounded-[2rem] md:blur-3xl" />
              <div className="relative overflow-visible rounded-[0.35rem] border border-[#8b1e22]/18 bg-[#4b2d16] p-1.5 shadow-[0_28px_70px_rgba(48,28,12,0.24)] md:p-2">
                <div className="relative overflow-visible rounded-[0.25rem] bg-[#fffaf0]">
                  <div className="grid grid-cols-1 items-start md:grid-cols-2">
                    <div className="relative border-[#4b2d16]/10 md:border-r">
                      {visiblePages[0] !== undefined ? (
                        <PageImage
                          index={visiblePages[0]}
                          side="left"
                          onOpen={openZoomPage}
                        />
                      ) : (
                        <BlankPage />
                      )}
                    </div>
                    <div className="relative hidden md:block">
                      {visiblePages[1] !== undefined ? (
                        <PageImage
                          index={visiblePages[1]}
                          side="right"
                          onOpen={openZoomPage}
                        />
                      ) : (
                        <BlankPage />
                      )}
                    </div>
                  </div>

                  <div className="pointer-events-none absolute inset-y-0 left-1/2 z-10 hidden w-px bg-gradient-to-b from-transparent via-[#4b2d16]/28 to-transparent md:block" />
                  <div className="pointer-events-none absolute inset-y-0 left-1/2 z-10 hidden w-8 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#2d1a0b]/14 to-transparent md:block" />

                  {flip && overlayFrontIndex !== undefined ? (
                    <div
                      className={`absolute top-0 z-20 h-full ${overlaySide} ${overlayOrigin} menu-flipbook-turn ${overlayAnimation}`}
                    >
                      <div className="menu-flipbook-page absolute inset-0">
                        <PageImage
                          index={overlayFrontIndex}
                          side={flip.direction === "next" ? "right" : "left"}
                          onOpen={openZoomPage}
                        />
                      </div>
                      <div
                        className="menu-flipbook-page absolute inset-0"
                        style={{ transform: "rotateY(180deg)" }}
                      >
                        {overlayBackIndex !== undefined ? (
                          <PageImage
                            index={overlayBackIndex}
                            side={flip.direction === "next" ? "left" : "right"}
                            onOpen={openZoomPage}
                          />
                        ) : (
                          <BlankPage />
                        )}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={goNext}
              disabled={!canGoNext || Boolean(flip)}
              aria-label="Nächste Seite"
              className="absolute right-2 top-1/2 z-30 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#8b1e22]/25 bg-[#fffaf1]/90 text-[#8b1e22] shadow-[0_12px_30px_rgba(54,31,13,0.18)] transition hover:-translate-y-[52%] hover:border-[#8b1e22]/50 hover:bg-white disabled:pointer-events-none disabled:opacity-35 md:static md:size-12 md:translate-y-0 md:shrink-0 md:hover:-translate-y-0.5"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>

          <div className="mx-auto mt-5 flex w-[min(100vw,1640px)] flex-col items-center gap-3 px-4 md:mt-6 md:w-[min(95vw,1640px)] md:px-14">
            <div className="flex w-full flex-col items-center gap-3 md:flex-row md:justify-between">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#6c5240]">
                {pageLabel} von {MENU_PAGES.length}
              </p>
              <p className="text-sm text-[#8b1e22]">{progress}%</p>
            </div>
            <div
              className="h-1.5 w-full overflow-hidden rounded-full bg-[#8b1e22]/12"
              aria-label={`Fortschritt ${progress} Prozent`}
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            >
              <div
                className="h-full rounded-full bg-[#8b1e22] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <a
              href={MENU_PDF_HREF}
              download
              className="inline-flex items-center justify-center gap-3 rounded-full border border-[#8b1e22]/30 bg-[#8b1e22] px-7 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-[0_16px_34px_rgba(139,30,34,0.24)] transition hover:-translate-y-0.5 hover:bg-[#6f171b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b1e22] focus-visible:ring-offset-4 focus-visible:ring-offset-[#fbf3e5]"
            >
              <Download className="size-4" />
              PDF herunterladen
            </a>
          </div>
        </div>
      </div>

      {zoomPage !== null ? (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-[#160f0a]/95 text-white"
          role="dialog"
          aria-modal="true"
          aria-label={`Speisekarte Seite ${zoomPage + 1}`}
        >
          <div className="flex min-h-16 items-center justify-between gap-3 border-b border-white/10 bg-black/20 px-4 py-3 md:px-6">
            <div>
              <p className="font-serif text-xl">Speisekarte</p>
              <p className="text-xs uppercase tracking-[0.18em] text-white/65">
                Seite {zoomPage + 1} von {MENU_PAGES.length}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => updateZoom(zoom - ZOOM_STEP)}
                className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/10 transition hover:bg-white/18"
                aria-label="Verkleinern"
              >
                <Minus className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setZoom(1);
                  setPan({ x: 0, y: 0 });
                }}
                className="hidden h-10 rounded-full border border-white/15 bg-white/10 px-4 text-xs font-semibold uppercase tracking-[0.14em] transition hover:bg-white/18 sm:inline-flex sm:items-center"
              >
                100%
              </button>
              <button
                type="button"
                onClick={() => updateZoom(zoom + ZOOM_STEP)}
                className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/10 transition hover:bg-white/18"
                aria-label="Vergrößern"
              >
                <Plus className="size-4" />
              </button>
              <button
                type="button"
                onClick={closeZoomPage}
                className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/10 transition hover:bg-white/18"
                aria-label="Fullscreen schließen"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>

          <div
            className="menu-zoom-surface relative flex-1 cursor-grab overflow-hidden active:cursor-grabbing"
            onPointerDown={onZoomPointerDown}
            onPointerMove={onZoomPointerMove}
            onPointerUp={onZoomPointerUp}
            onPointerCancel={onZoomPointerUp}
            onWheel={onZoomWheel}
          >
            <button
              type="button"
              onClick={() => setZoomPage(clampPage(zoomPage - 1))}
              disabled={zoomPage === 0}
              className="absolute left-3 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/35 transition hover:bg-black/55 disabled:pointer-events-none disabled:opacity-30 md:left-5"
              aria-label="Vorherige Seite"
            >
              <ChevronLeft className="size-5" />
            </button>

            <img
              src={MENU_PAGES[zoomPage]}
              alt={`Bonfini Speisekarte Seite ${zoomPage + 1}`}
              className="absolute left-1/2 top-1/2 max-h-none max-w-none select-none object-contain"
              draggable={false}
              style={{
                width: isDesktop ? "min(94vw, 1580px)" : "98vw",
                transform: `translate(calc(-50% + ${pan.x}px), calc(-50% + ${pan.y}px)) scale(${zoom})`,
                transformOrigin: "center",
                imageRendering: "auto",
              }}
            />

            <button
              type="button"
              onClick={() => setZoomPage(clampPage(zoomPage + 1))}
              disabled={zoomPage === MENU_PAGES.length - 1}
              className="absolute right-3 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/35 transition hover:bg-black/55 disabled:pointer-events-none disabled:opacity-30 md:right-5"
              aria-label="Nächste Seite"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
