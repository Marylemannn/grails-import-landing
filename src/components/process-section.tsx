import Image from "next/image";
import { processSteps, siteConfig } from "@/lib/site";
import { ButtonLink, SectionIntro } from "./ui";

function StepCard({ step }: { step: (typeof processSteps)[number] }) {
  return (
    <article
      className={`absolute z-30 min-h-[180px] w-[220px] rounded-panel border border-[#e7ebef] bg-white px-[24px] py-[22px] shadow-[0_8px_22px_rgba(24,28,32,0.09)] ${step.className}`}
    >
      <p className="text-[18px] font-bold leading-none text-[#6f767c]">
        {step.number}
      </p>
      <h3 className="mt-[12px] text-[20px] font-medium leading-tight text-black">
        {step.title}
      </h3>
      <p className="mt-[11px] text-[15px] font-light leading-[1.12] text-[#6f767c]">
        {step.text}
      </p>
    </article>
  );
}

const routeGuides = [
  "left-[113px] top-[307px] h-[74px]",
  "left-[272px] top-[364px] h-[52px]",
  "left-[427px] top-[292px] h-[64px]",
  "left-[605px] top-[376px] h-[64px]",
  "left-[737px] top-[272px] h-[51px]",
  "left-[937px] top-[328px] h-[64px]",
  "left-[1073px] top-[240px] h-[90px]",
] as const;

export function ProcessSection() {
  return (
    <section className="bg-page pb-[50px] max-sm:pb-6" id="process" aria-labelledby="process-title">
      <div className="site-container">
        <div className="relative">
          <SectionIntro
            className="process-intro-align pt-[50px] [&_p]:mb-[8px] [&_h2]:max-w-[760px] [&_h2]:leading-[1.08] max-2xl:[&_h2]:max-w-[calc(100%-430px)] max-lg:pt-[50px] max-lg:[&_h2]:max-w-[1120px] max-sm:pt-7"
            eyebrow="Процесс"
            headingId="process-title"
            titleClassName="!text-[30px] max-sm:!text-[28px]"
            title="Процесс заказа автомобиля из Южной Кореи"
          />

          <aside className="absolute right-[56px] top-[21px] flex h-[112px] w-[392px] overflow-hidden rounded-[7px] border border-[#e8ecef] bg-white shadow-[0_3px_10px_rgba(24,28,32,0.12)] max-lg:static max-lg:mt-8 max-sm:mt-5 max-sm:h-[92px] max-sm:w-full max-sm:rounded-[10px] max-sm:shadow-[0_6px_16px_rgba(24,28,32,0.08)]">
            <div className="relative z-10 px-[32px] py-[27px] max-sm:px-5 max-sm:py-5">
              <p className="text-[20px] font-light leading-none text-[#727a82] max-sm:text-[15px]">
                Сроки доставки
              </p>
              <p className="mt-[12px] whitespace-nowrap text-[30px] font-[600] leading-none text-black max-sm:mt-2 max-sm:text-[24px]">
                1 - 1.5 месяца
              </p>
            </div>
            <div className="relative ml-auto h-full w-[160px] shrink-0 max-sm:w-[112px]">
              <Image
                alt="BMW X5, который доставляют из Кореи"
                className="absolute bottom-[-15px] right-[-15px] h-auto w-[190px] max-w-none max-sm:bottom-[-10px] max-sm:right-[-10px] max-sm:w-[142px]"
                height={1233}
                sizes="(max-width: 640px) 142px, 190px"
                src="/images/bmw.png"
                width={1849}
              />
            </div>
          </aside>
        </div>

        <div className="process-route-container process-route-stage relative mt-[50px] max-lg:hidden">
          <div className="process-route-canvas relative h-[660px] w-[1218px]">
            <Image
              alt=""
              aria-hidden="true"
              className="absolute left-[32px] top-[250px] z-20 h-[179px] w-[1160px]"
              height={179}
              loading="lazy"
              src="/images/route-path.svg"
              width={1266}
            />
            {routeGuides.map((className) => (
              <Image
                alt=""
                aria-hidden="true"
                className={`absolute z-10 w-[3px] ${className}`}
                height={133}
                loading="lazy"
                key={className}
                src="/images/line.svg"
                width={3}
              />
            ))}
            <div className="absolute left-[-10px] top-[427px] z-30">
              <p className="text-[20px] font-medium leading-tight text-black">
                Южная Корея
              </p>
              <Image
                alt="Флаг Южной Кореи"
                className="ml-[19px] mt-3 h-auto w-[74px]"
                height={54}
                loading="lazy"
                sizes="74px"
                src="/images/korea-flag.png"
                width={74}
              />
            </div>
            <div className="absolute right-[33px] top-[286px] z-30">
              <p className="relative left-[40px] top-[5px] text-[20px] font-medium leading-tight text-black">
                Москва
              </p>
              <Image
                alt="Флаг России"
                className="relative left-[35px] top-[-5px] mt-3 h-auto w-[74px]"
                height={49}
                loading="lazy"
                sizes="74px"
                src="/images/russia-flag.png"
                width={74}
              />
            </div>
            {processSteps.map((step) => (
              <StepCard key={step.number} step={step} />
            ))}
          </div>
        </div>

        <div className="process-mobile-timeline mt-10 grid gap-4 lg:hidden max-sm:mt-6 max-sm:block">
          {processSteps.map((step) => (
            <article
              className="process-mobile-step rounded-panel border border-[#e3e8ed] bg-white p-5 shadow-card max-sm:grid max-sm:grid-cols-[44px_1fr] max-sm:gap-3 max-sm:border-0 max-sm:bg-transparent max-sm:p-0 max-sm:pb-5 max-sm:shadow-none"
              key={step.number}
            >
              <p className="process-mobile-step-number text-[20px] font-bold leading-none text-[#9ca3aa] max-sm:relative max-sm:z-10 max-sm:flex max-sm:h-9 max-sm:w-9 max-sm:items-center max-sm:justify-center max-sm:bg-page max-sm:text-[15px] max-sm:text-[#6f767c]">
                {step.number}
              </p>
              <div>
                <h3 className="mt-2.5 text-[25px] font-semibold leading-tight max-sm:mt-0 max-sm:text-[18px] max-sm:font-semibold">
                  {step.title}
                </h3>
                <p className="mt-2 text-[20px] font-light leading-[1.18] text-muted max-sm:mt-1.5 max-sm:text-[14.5px] max-sm:leading-[1.25]">
                  {step.text}
                </p>
              </div>
            </article>
          ))}
        </div>

      </div>

      <div className="hero-container">
        <div
          className="relative mt-[60px] min-h-[225px] overflow-hidden rounded-panel bg-ink px-[52px] py-[40px] text-white shadow-card max-2xl:px-9 max-lg:px-8 max-md:min-h-[300px] max-md:rounded-[14px] max-md:px-6 max-md:py-[39px] max-sm:mt-7 max-sm:min-h-0 max-sm:rounded-[12px] max-sm:px-5 max-sm:py-5 max-[360px]:min-h-[273px]"
          id="price"
        >
          <div className="pointer-events-none absolute top-[-28px] right-[220px] h-[300px] w-[322px] rotate-[13deg] opacity-[0.36] mix-blend-luminosity max-lg:right-[18px] max-lg:opacity-[0.22] max-md:hidden">
            <Image
              alt=""
              aria-hidden="true"
              className="object-contain"
              fill
              loading="lazy"
              sizes="322px"
              src="/images/calculator-block-2.png"
            />
          </div>
          <div className="relative z-10 flex min-h-[145px] items-center justify-between gap-8 max-2xl:gap-2 max-lg:flex-col max-lg:min-h-[162px] max-lg:items-start max-sm:min-h-0 max-sm:gap-4">
            <div className="relative top-[-24px] max-lg:top-0 max-md:-translate-y-[10px] max-sm:translate-y-0">
              <h2 className="max-w-[860px] text-[35px] font-medium leading-[1.12] min-[1440px]:whitespace-nowrap max-md:text-[33px] max-sm:text-[22px] max-sm:font-semibold max-sm:leading-[1.12]">
                Узнайте стоимость доставки авто за 1 минуту
              </h2>
              <p className="mt-[24px] max-w-[620px] text-[20px] font-light leading-[1.15] text-[#899097] max-md:-translate-y-[10px] max-md:text-[20px] max-sm:mt-2 max-sm:translate-y-0 max-sm:text-[15px] max-sm:leading-[1.25]">
                Калькулятор рассчитает доставку, таможню, оформление и другие
                расходы онлайн - без звонка менеджеру
              </p>
            </div>
            <ButtonLink
              className="!h-[65px] w-[320px] max-w-full shrink-0 whitespace-nowrap !rounded-full px-7 !text-[23px] !font-medium transition-transform hover:scale-[1.04] max-sm:!h-[48px] max-sm:w-full max-sm:px-5 max-sm:!text-[16px]"
              href={siteConfig.calculatorTelegramUrl}
              icon="chevron"
              rel="noopener noreferrer"
              target="_blank"
              variant="light"
            >
              Рассчитать стоимость
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
