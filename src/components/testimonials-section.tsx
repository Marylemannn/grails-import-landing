"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import type { TouchEvent } from "react";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { SectionIntro } from "./ui";

const testimonials = [
  {
    id: "testimonial-1",
    name: "Сергей",
    car: "MB GLE",
    details: "53 КАКОЙ ГОД - 10.000 KM",
    videoSrc: "/images/video1.mp4",
    poster: "/images/video1-poster.jpg",
  },
  {
    id: "testimonial-2",
    name: "Роман",
    car: "BMW X5",
    details: "Restyling 2025 - 10.000 км",
    videoSrc: "/images/video2.mp4",
    poster: "/images/video2-poster.jpg",
  },
  {
    id: "testimonial-3",
    name: "Роман",
    car: "BMW X5",
    title: "Андрей - MB S-class",
    details: "450 W223 2021 - 37.000 км",
    videoSrc: "/андрей.mp4",
    poster: "/images/testimonial-andrey-poster.jpg",
  },
  {
    id: "testimonial-4",
    name: "Роман",
    car: "BMW X5",
    details: "Restyling 2025 - 10.000 км",
  },
] as const;

const mobileCarouselItems = [...testimonials, ...testimonials, ...testimonials];
const firstMiddleIndex = testimonials.length;

const TestimonialCard = forwardRef<
  HTMLElement,
  {
    item: (typeof testimonials)[number];
    className?: string;
  }
>(function TestimonialCard({ item, className = "" }, ref) {
  const isVideo = "videoSrc" in item;
  const title = "title" in item ? item.title : `${item.name} - ${item.car}`;

  return (
    <article
      className={`group relative aspect-[9/16] overflow-hidden rounded-panel bg-ink shadow-card transition duration-300 ease-out hover:z-10 hover:scale-[1.018] hover:shadow-[0_10px_22px_-10px_rgba(24,28,32,0.14)] max-sm:rounded-[14px] ${className}`}
      ref={ref}
    >
      {isVideo ? (
        <video
          aria-label={`Видео отзыв: ${title}`}
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          controls
          playsInline
          poster={item.poster}
          preload="none"
        >
          <source src={item.videoSrc} type="video/mp4" />
        </video>
      ) : (
        <Image
          alt={`Видео отзыв: ${title}`}
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          fill
          sizes="(max-width: 640px) calc(100vw - 72px), (max-width: 768px) 100vw, (max-width: 1024px) 45vw, 315px"
          src="/images/testimonial-roman.png"
        />
      )}
      <Image
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-auto w-full select-none"
        height={148}
        src="/images/case-haze.png"
        width={310}
      />
      {!isVideo ? (
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 flex h-[54px] w-[54px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/50 text-white backdrop-blur-[1px]"
        >
          <Play className="ml-1 h-[28px] w-[28px] fill-current stroke-0" />
        </div>
      ) : null}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 px-4 pb-[14px] text-white">
        <h3 className="text-[20px] font-semibold leading-none">
          {title}
        </h3>
        <p className="mt-[7px] text-[14px] font-normal leading-none text-[#8d9399]">
          {item.details}
        </p>
      </div>
    </article>
  );
});

export function TestimonialsSection() {
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
    if (activeIndex >= testimonials.length * 2) {
      setIsAnimating(false);
      setActiveIndex(firstMiddleIndex);
    }

    if (activeIndex < firstMiddleIndex) {
      setIsAnimating(false);
      setActiveIndex(testimonials.length * 2 - 1);
    }
  };

  return (
    <section
      className="bg-page pb-[112px] pt-[62px] max-sm:pb-10 max-sm:pt-8"
      id="reviews"
      aria-labelledby="reviews-title"
    >
      <div className="hero-container">
        <SectionIntro
          eyebrow="Отзывы"
          headingId="reviews-title"
          titleClassName="!text-[30px] max-sm:!text-[28px]"
          title="Клиенты делятся опытом совместной работы"
        />

        <div className="mt-14 grid grid-cols-4 gap-[48px] max-xl:gap-6 max-lg:grid-cols-2 max-sm:hidden">
          {testimonials.map((item) => (
            <TestimonialCard item={item} key={item.id} />
          ))}
        </div>

        <div className="relative mt-6 hidden max-sm:block">
          <div
            className="overflow-hidden touch-pan-y"
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
              {mobileCarouselItems.map((item, index) => (
                <TestimonialCard
                  className="w-full shrink-0"
                  item={item}
                  key={`${item.id}-${index}`}
                  ref={index === 0 ? firstCardRef : undefined}
                />
              ))}
            </div>
          </div>

          <div className="mt-4 flex justify-center gap-4">
            <button
              aria-label="Показать предыдущий отзыв"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black shadow-[0_7px_22px_rgba(24,28,32,0.12)] transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
              type="button"
              onClick={showPrevious}
            >
              <ChevronLeft aria-hidden="true" className="h-6 w-6 stroke-[2.2]" />
            </button>

            <button
              aria-label="Показать следующий отзыв"
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
