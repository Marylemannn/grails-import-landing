"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import type { TouchEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { caseItems } from "@/lib/site";
import { SectionIntro } from "./ui";

const carouselItems = [...caseItems, ...caseItems, ...caseItems];
const firstMiddleIndex = caseItems.length;

export function CasesSection() {
  const [activeIndex, setActiveIndex] = useState<number>(firstMiddleIndex);
  const [isAnimating, setIsAnimating] = useState(true);
  const [slideStride, setSlideStride] = useState(296);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const touchDeltaRef = useRef({ x: 0, y: 0 });

  const measureSlide = useCallback(() => {
    if (!trackRef.current || !firstCardRef.current) {
      return;
    }

    const trackStyles = window.getComputedStyle(trackRef.current);
    const gap = Number.parseFloat(trackStyles.columnGap || trackStyles.gap || "0");
    setSlideStride(firstCardRef.current.getBoundingClientRect().width + gap);
  }, []);

  useEffect(() => {
    measureSlide();
    window.addEventListener("resize", measureSlide);

    return () => {
      window.removeEventListener("resize", measureSlide);
    };
  }, [measureSlide]);

  useEffect(() => {
    if (isAnimating) {
      return;
    }

    const frame = window.requestAnimationFrame(() => setIsAnimating(true));

    return () => window.cancelAnimationFrame(frame);
  }, [activeIndex, isAnimating]);

  const showPrevious = () => {
    setActiveIndex((index) => index - 1);
  };

  const showNext = () => {
    setActiveIndex((index) => index + 1);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    touchDeltaRef.current = { x: 0, y: 0 };
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    if (!touchStartRef.current) {
      return;
    }

    const touch = event.touches[0];
    touchDeltaRef.current = {
      x: touch.clientX - touchStartRef.current.x,
      y: touch.clientY - touchStartRef.current.y,
    };
  };

  const handleTouchEnd = () => {
    const { x, y } = touchDeltaRef.current;
    const isHorizontalSwipe = Math.abs(x) > 48 && Math.abs(x) > Math.abs(y) * 1.35;

    if (isHorizontalSwipe) {
      if (x < 0) {
        showNext();
      } else {
        showPrevious();
      }
    }

    touchStartRef.current = null;
    touchDeltaRef.current = { x: 0, y: 0 };
  };

  const handleTransitionEnd = () => {
    if (activeIndex >= caseItems.length * 2) {
      setIsAnimating(false);
      setActiveIndex(firstMiddleIndex);
    }

    if (activeIndex < firstMiddleIndex) {
      setIsAnimating(false);
      setActiveIndex(caseItems.length * 2 - 1);
    }
  };

  return (
    <section className="bg-page pb-[76px] pt-[24px] max-lg:pb-14 max-lg:pt-8 max-sm:pb-8 max-sm:pt-7" id="cases" aria-labelledby="cases-title">
      <div className="hero-container">
        <SectionIntro
          eyebrow="Кейсы"
          headingId="cases-title"
          titleClassName="!text-[30px] max-sm:!text-[28px]"
          title="Наши кейсы расскажут о нас больше, чем мы"
        />

        <div className="relative mt-[50px] max-md:mt-8 max-sm:mt-6">
          <button
            aria-label="Показать предыдущий кейс"
            className="absolute left-0 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-[0_7px_22px_rgba(24,28,32,0.12)] transition duration-200 hover:shadow-[0_10px_30px_rgba(24,28,32,0.22)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 max-sm:hidden"
            type="button"
            onClick={showPrevious}
          >
            <ChevronLeft aria-hidden="true" className="h-6 w-6 stroke-[2.2]" />
          </button>

          <div
            className="-my-20 mx-[60px] overflow-hidden py-20 max-md:mx-10 max-sm:mx-0 max-sm:touch-pan-y"
            onTouchCancel={handleTouchEnd}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
            onTouchStart={handleTouchStart}
          >
            <div
              className="flex gap-6 will-change-transform"
              ref={trackRef}
              style={{
                transform: `translate3d(-${activeIndex * slideStride}px, 0, 0)`,
                transition: isAnimating
                  ? "transform 430ms cubic-bezier(0.22, 1, 0.36, 1)"
                  : "none",
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {carouselItems.map((item, index) => (
                <article
                  className="group relative h-[386px] w-[calc((100%-88px)/4)] shrink-0 overflow-hidden rounded-panel bg-[#ede9e2] shadow-[0_8px_18px_-8px_rgba(24,28,32,0.12)] transition duration-300 ease-out hover:z-10 hover:scale-[1.018] hover:shadow-[0_10px_22px_-10px_rgba(24,28,32,0.14)] max-lg:h-[360px] max-sm:h-[398px] max-sm:w-full max-sm:rounded-[18px]"
                  key={`${item.title}-${index}`}
                  ref={index === 0 ? firstCardRef : undefined}
                >
                  <Image
                    alt={item.alt}
                    className="object-cover object-[25%_50%] transition duration-300 group-hover:scale-[1.02]"
                    fill
                    sizes="(max-width: 640px) calc(100vw - 72px), (max-width: 1024px) calc((100vw - 120px) / 4), calc((100vw - 272px) / 4)"
                    src={item.image}
                    style={{ objectPosition: "imagePosition" in item ? item.imagePosition : undefined }}
                  />
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 z-10 h-[142px] w-full object-cover max-sm:h-[156px]"
                    height={148}
                    sizes="(max-width: 640px) calc(100vw - 72px), (max-width: 1024px) calc((100vw - 120px) / 4), calc((100vw - 272px) / 4)"
                    src="/images/case-haze.png"
                    width={310}
                  />
                  <div className="absolute inset-x-0 bottom-0 z-20 px-4 pb-4 text-white max-sm:px-5 max-sm:pb-[17px]">
                    <h3 className="text-[20px] font-semibold leading-none">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-[14px] font-medium leading-none text-white/45 max-sm:text-[16px]">
                      {item.description}
                    </p>
                    <a
                      className="mt-4 inline-flex items-center gap-2 text-[16px] font-medium leading-none text-white underline-offset-4 transition hover:underline focus:outline-none focus-visible:underline max-sm:text-[18px]"
                      data-metrika-goal="case_details_click"
                      data-metrika-params={JSON.stringify({
                        caseTitle: item.title,
                        caseDescription: item.description,
                      })}
                      href={item.href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Подробнее
                      <ChevronRight aria-hidden="true" className="h-4 w-4 stroke-[2.2]" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <button
            aria-label="Показать следующий кейс"
            className="absolute right-0 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-[0_7px_22px_rgba(24,28,32,0.12)] transition duration-200 hover:shadow-[0_10px_30px_rgba(24,28,32,0.22)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 max-sm:hidden"
            type="button"
            onClick={showNext}
          >
            <ChevronRight aria-hidden="true" className="h-6 w-6 stroke-[2.2]" />
          </button>

          <div className="mt-4 hidden justify-center gap-4 max-sm:flex">
            <button
              aria-label="Показать предыдущий кейс"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black shadow-[0_7px_22px_rgba(24,28,32,0.12)] transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
              type="button"
              onClick={showPrevious}
            >
              <ChevronLeft aria-hidden="true" className="h-6 w-6 stroke-[2.2]" />
            </button>

            <button
              aria-label="Показать следующий кейс"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black shadow-[0_7px_22px_rgba(24,28,32,0.12)] transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
              type="button"
              onClick={showNext}
            >
              <ChevronRight aria-hidden="true" className="h-6 w-6 stroke-[2.2]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
