import Image from "next/image";
import { Play } from "lucide-react";
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
    details: "Restyling 2025 - 10.000 км",
  },
  {
    id: "testimonial-4",
    name: "Роман",
    car: "BMW X5",
    details: "Restyling 2025 - 10.000 км",
  },
] as const;

export function TestimonialsSection() {
  return (
    <section
      className="bg-page pb-[112px] pt-[62px]"
      id="reviews"
      aria-labelledby="reviews-title"
    >
      <div className="hero-container">
        <SectionIntro
          eyebrow="Отзывы"
          headingId="reviews-title"
          titleClassName="!text-[30px]"
          title="Клиенты делятся опытом совместной работы"
        />

        <div className="mt-14 grid grid-cols-4 gap-[48px] max-xl:gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {testimonials.map((item) => {
            const isVideo = "videoSrc" in item;

            return (
              <article
                className="group relative aspect-[9/16] overflow-hidden rounded-panel bg-ink shadow-card transition duration-300 ease-out hover:z-10 hover:scale-[1.018] hover:shadow-[0_10px_22px_-10px_rgba(24,28,32,0.14)] max-sm:rounded-[14px]"
                key={item.id}
              >
                {isVideo ? (
                  <video
                    aria-label={`Видео отзыв: ${item.name} - ${item.car}`}
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
                    alt={`Видео отзыв: ${item.name} - ${item.car}`}
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 45vw, 315px"
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
                    {item.name} - {item.car}
                  </h3>
                  <p className="mt-[7px] text-[14px] font-normal leading-none text-[#8d9399]">
                    {item.details}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
