import {
  CarFront,
  FileText,
  Handshake,
  Percent,
  Send,
  WalletCards,
} from "lucide-react";
import Image from "next/image";
import { guaranteeCards, paymentCards } from "@/lib/site";

const icons = {
  car: CarFront,
  file: FileText,
  key: Handshake,
  lock: WalletCards,
  message: Send,
  percent: Percent,
};

type CardItem = (typeof guaranteeCards)[number] | (typeof paymentCards)[number];

function renderCardText(text: string) {
  const telegramHandle = "@grails_import";

  if (!text.includes(telegramHandle)) {
    return text;
  }

  const [before, after] = text.split(telegramHandle);

  return (
    <>
      {before}
      <a
        className="text-inherit"
        href="https://t.me/grails_import"
        rel="noopener noreferrer"
        target="_blank"
      >
        {telegramHandle}
      </a>
      {after}
    </>
  );
}

function getCardImageClass(title: string) {
  switch (title) {
    case "Прозрачный договор":
      return "right-[-82px] bottom-[-50px] h-[208px] w-[250px] rotate-[-8deg] max-sm:right-[-28px] max-sm:bottom-[-24px] max-sm:h-[134px] max-sm:w-[162px]";
    case "Отзывы в telegram":
      return "right-[-44px] bottom-[-104px] h-[282px] w-[223px] rotate-[2deg] max-sm:right-[-14px] max-sm:bottom-[-54px] max-sm:h-[184px] max-sm:w-[146px]";
    case "Гибкие условия":
      return "right-[4px] bottom-[20px] h-[162px] w-[170px] rotate-[-6deg] max-sm:right-[14px] max-sm:bottom-[22px] max-sm:h-[104px] max-sm:w-[109px]";
    case "Предоплата 20%":
      return "right-[-32px] bottom-[10px] h-[164px] w-[181px] rotate-[-7deg] max-sm:right-[16px] max-sm:bottom-[18px] max-sm:h-[108px] max-sm:w-[119px]";
    case "Поэтапная оплата":
      return "right-[6px] bottom-[18px] h-[122px] w-[148px] rotate-[-15deg] max-sm:right-[38px] max-sm:bottom-[24px] max-sm:h-[82px] max-sm:w-[99px]";
    case "100% оплата сразу":
      return "right-[-28px] bottom-[20px] h-[112px] w-[194px] rotate-[-2deg] max-sm:right-[12px] max-sm:bottom-[28px] max-sm:h-[78px] max-sm:w-[135px]";
    default:
      return "right-0 bottom-0 h-[128px] w-[128px]";
  }
}

function InfoCard({
  item,
  variant = "default",
}: {
  item: CardItem;
  variant?: "default" | "guarantee";
}) {
  const Icon = icons[item.icon];
  const isHandshakeIcon =
    "iconImage" in item && item.iconImage.includes("handshake");
  const isGuarantee = variant === "guarantee";
  const textClass = "w-[68%] max-w-[310px]";

  return (
    <article
      className="relative h-[164px] overflow-hidden rounded-panel border border-[#e6ebef] bg-white px-[21px] py-[24px] shadow-card max-sm:h-auto max-sm:min-h-[124px] max-sm:rounded-[12px] max-sm:p-4"
    >
      <div className="relative z-10 max-w-[360px] max-sm:w-[66%]">
        <div
          className={
            isGuarantee
              ? "flex items-center gap-[13px]"
              : "flex items-center gap-[14px]"
          }
        >
          {"iconImage" in item ? (
            <Image
              src={item.iconImage}
              alt=""
              aria-hidden="true"
              width={isHandshakeIcon ? 30 : 22}
              height={isHandshakeIcon ? 30 : 22}
              loading="lazy"
              className={
                isHandshakeIcon
                  ? "h-[24px] w-[24px] object-contain max-sm:h-[20px] max-sm:w-[20px]"
                  : "h-[22px] w-[22px] object-contain max-sm:h-[19px] max-sm:w-[19px]"
              }
            />
          ) : (
            <Icon
              aria-hidden="true"
              className="h-[22px] w-[22px] fill-none stroke-black stroke-[2.8] max-sm:h-[19px] max-sm:w-[19px]"
            />
          )}
          <h3
            className="text-[20px] font-medium leading-[1.12] text-black max-sm:text-[18px] max-sm:font-semibold max-sm:leading-tight"
          >
            {item.title}
          </h3>
        </div>
        <p
          className={`mt-[16px] ${textClass} text-[15px] font-light leading-[1.22] text-[#72787f] max-sm:mt-1.5 max-sm:w-auto max-sm:max-w-none max-sm:text-[14.5px] max-sm:font-light max-sm:leading-[1.18]`}
        >
          {renderCardText(item.text)}
        </p>
      </div>
      <Image
        src={item.image}
        alt={item.alt}
        width={180}
        height={150}
        loading="lazy"
        className={`pointer-events-none absolute object-contain object-right-bottom ${getCardImageClass(item.title)}`}
      />
    </article>
  );
}

export function InfoCardsSection() {
  return (
    <section
      className="bg-page py-[54px] max-md:py-10 max-sm:pb-8 max-sm:pt-5"
      aria-label="Гарантии и варианты оплаты"
    >
      <div className="hero-container">
        <h2 className="text-[30px] font-semibold leading-tight text-black max-sm:text-[28px]">
          Гарантии
        </h2>
        <div className="mt-[27px] grid grid-cols-3 gap-x-[78px] gap-y-7 max-[1500px]:gap-x-12 max-lg:grid-cols-1 max-sm:mt-3.5 max-sm:gap-y-2.5">
          {guaranteeCards.map((item) => (
            <InfoCard item={item} key={item.title} variant="guarantee" />
          ))}
        </div>
      </div>

      <div className="hero-container mt-[92px] max-md:mt-12 max-sm:mt-7">
        <h2 className="text-[30px] font-semibold leading-tight text-black max-sm:text-[28px]">
          Варианты оплаты автомобиля
        </h2>
        <div className="mt-7 grid grid-cols-3 gap-x-[78px] gap-y-7 max-[1500px]:gap-x-12 max-lg:grid-cols-1 max-sm:mt-3.5 max-sm:gap-y-2.5">
          {paymentCards.map((item) => (
            <InfoCard item={item} key={item.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
