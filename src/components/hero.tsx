import Image from "next/image";
import { siteConfig, stats } from "@/lib/site";
import { CarPickerModal } from "./car-picker-modal";

export function Hero() {
  return (
    <section
      className="hero-main relative overflow-hidden bg-[#f6f8fa]"
      id="top"
      aria-labelledby="hero-title"
    >
      <div className="hero-visual-layer pointer-events-none absolute inset-0">
        <div className="hero-car-layer absolute -right-[390px] left-[468px] -top-[104px] z-0 h-full max-xl:-right-[430px] max-xl:left-[420px] max-lg:right-[-464px] max-lg:left-[400px] max-lg:-top-8 max-md:right-[-400px] max-md:left-[400px] max-md:top-0">
          <Image
            alt=""
            aria-hidden="true"
            className="hero-car-image object-contain object-right-top max-lg:opacity-70"
            fill
            priority
            sizes="100vw"
            src="/images/bmw-on-background.png"
            unoptimized
          />
        </div>
        <div className="hero-fade absolute inset-y-0 left-0 z-20 w-[54%] bg-gradient-to-r from-[#f6f8fa] via-[#f6f8fa]/92 to-[#f6f8fa]/0 max-lg:w-[70%] max-md:w-full" />
      </div>

      <div className="hero-container hero-content relative min-h-[758px] pt-[101px] max-lg:min-h-[1000px] max-lg:pt-16 max-sm:min-h-[800px] max-sm:pt-11">
        <div className="relative z-30 max-w-[660px]">
          <h1
            className="font-sans text-[62px] font-bold leading-[1.08] tracking-normal text-black max-md:text-[53px] max-sm:text-[38px] max-sm:leading-[1.04]"
            id="hero-title"
          >
            Авто из Кореи
            <br />
            под ключ
          </h1>
          <p className="mt-[31px] max-w-[585px] text-[21px] font-light leading-[1.34] text-[#747b83] max-[1500px]:mt-[20px] max-[1500px]:leading-[1.2] max-md:text-[22px] max-sm:mt-4 max-sm:max-w-[300px] max-sm:text-[16px] max-sm:leading-[1.32]">
            Подберем, проверим, выкупим и доставим автомобиль из Кореи с{"\u00A0"}полным
            сопровождением сделки, прозрачным расчетом стоимости и фото/видео
            на каждом этапе
          </p>
          <CarPickerModal
            buttonClassName="mt-[48px] !h-[65px] w-[350px] max-w-full origin-center whitespace-nowrap !rounded-full border border-transparent px-7 !text-[23px] !font-medium hover:scale-105 hover:!border-black hover:!bg-white hover:!text-black max-[1500px]:mt-[40px] max-md:px-7 max-sm:mt-6 max-sm:!h-[46px] max-sm:w-[224px] max-sm:px-5 max-sm:!text-[15px]"
          >
            Связаться с нами
          </CarPickerModal>
        </div>

        <div className="hero-stats absolute bottom-[79px] left-1/2 z-30 grid w-full max-w-[1218px] -translate-x-1/2 grid-cols-4 overflow-hidden rounded-[8px] bg-white shadow-[0_8px_26px_rgba(31,41,55,0.1)] max-lg:static max-lg:mt-[560px] max-lg:translate-x-0 max-lg:grid-cols-2 max-sm:mt-[420px] max-sm:rounded-[8px] max-sm:shadow-[0_6px_18px_rgba(31,41,55,0.08)]">
          {stats.map((stat, index) => (
            <div
              className={`relative min-h-[106px] px-[36px] py-[18px] max-lg:border-b max-lg:border-[#d8dde2] max-lg:last:border-b-0 max-md:px-7 max-sm:min-h-[102px] max-sm:px-3 max-sm:py-3 ${
                index > 0
                  ? "before:absolute before:left-0 before:top-1/2 before:h-[76px] before:w-px before:-translate-y-1/2 before:bg-[#d8dde2] max-sm:before:hidden"
                  : ""
              } ${index === 2 ? "max-lg:before:hidden" : ""}`}
              key={stat.value}
            >
              <p className="text-[24px] font-medium leading-none text-black max-sm:text-[17px] max-sm:leading-[1.05]">
                {stat.value}
              </p>
              <p className="mt-[11px] max-w-[230px] text-[20px] font-normal leading-[1.18] text-[#151515] max-md:text-[20px] max-sm:mt-1 max-sm:max-w-none max-sm:text-[14px] max-sm:leading-[1.22] max-sm:text-[#4b5563]">
                {index === stats.length - 1 ? (
                  <>
                    расчет за 1 минуту в{" "}
                    <a
                      className="underline underline-offset-2"
                      href={siteConfig.calculatorTelegramUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      калькуляторе
                    </a>{" "}
                    <span aria-hidden="true">›</span>
                  </>
                ) : (
                  stat.text
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
