import Image from "next/image";
import carTop from "../../картинки/машинаСверху.png";
import carLight from "../../картинки/свет.png";
import { siteConfig } from "@/lib/site";
import { ButtonLink } from "./ui";

export function FinalCta() {
  return (
    <section className="bg-page pb-[116px] max-sm:pb-10" aria-labelledby="final-cta-title">
      <div className="hero-container">
        <div className="relative min-h-[225px] overflow-hidden rounded-panel bg-ink px-[52px] py-[40px] text-white shadow-card max-2xl:px-9 max-lg:px-8 max-md:min-h-[300px] max-md:rounded-[14px] max-md:px-6 max-md:py-[39px] max-sm:min-h-0 max-sm:rounded-[12px] max-sm:px-5 max-sm:py-5 max-[360px]:min-h-[273px]">
          <div className="pointer-events-none absolute top-1/2 left-[-250px] z-0 h-[456px] w-[660px] -translate-y-1/2 -mt-[100px] -rotate-[8deg] min-[1440px]:w-[760px] max-lg:hidden">
            <Image
              alt=""
              aria-hidden="true"
              className="absolute left-[310px] top-[270px] z-0 h-auto w-[300px] object-contain min-[1440px]:left-[350px] min-[1440px]:top-[265px] min-[1440px]:w-[360px]"
              priority={false}
              src={carLight}
            />
            <Image
              alt="Автомобиль сверху"
              className="z-10 object-contain object-left"
              fill
              priority={false}
              sizes="(min-width: 1440px) 860px, 660px"
              src={carTop}
            />
          </div>
          <div className="relative z-10 flex min-h-[145px] items-center justify-between gap-8 pl-[255px] max-2xl:gap-2 max-lg:min-h-[162px] max-lg:flex-col max-lg:items-start max-lg:pl-0 max-sm:min-h-0 max-sm:gap-4">
            <div className="relative top-[-24px] translate-x-[20px] max-lg:top-0 max-lg:translate-x-0 max-md:-translate-y-[10px] max-sm:translate-y-0">
              <h2
                className="max-w-[620px] text-[35px] font-medium leading-[1.12] max-md:text-[33px] max-sm:text-[22px] max-sm:font-semibold max-sm:leading-[1.12]"
                id="final-cta-title"
              >
                <span className="hidden min-[1440px]:inline">
                  Автомобиль, который подходит
                  <br />
                  именно вам
                </span>
                <span className="min-[1440px]:hidden">
                  Автомобиль, который подходит именно вам
                </span>
              </h2>
              <p className="mt-[24px] max-w-[520px] text-[20px] font-light leading-[1.15] text-[#899097] max-md:-translate-y-[10px] max-md:text-[20px] max-sm:mt-2 max-sm:translate-y-0 max-sm:text-[15px] max-sm:leading-[1.25]">
                <span className="hidden min-[1440px]:inline">
                  Расскажите, что ищете, а мы подберём варианты,
                  <br />
                  рассчитаем стоимость и поможем с выбором.
                </span>
                <span className="min-[1440px]:hidden">
                  Расскажите, что ищете, а мы подберём варианты, рассчитаем
                  стоимость и поможем с выбором.
                </span>
              </p>
            </div>
            <ButtonLink
              className="!h-[65px] w-[320px] max-w-full shrink-0 whitespace-nowrap !rounded-full px-7 !text-[23px] !font-medium transition-transform hover:scale-[1.04] max-sm:!h-[48px] max-sm:w-full max-sm:px-5 max-sm:!text-[16px]"
              href={siteConfig.managerTelegramUrl}
              icon="chevron"
              rel="noopener noreferrer"
              target="_blank"
              variant="light"
            >
              Начать подбор
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
