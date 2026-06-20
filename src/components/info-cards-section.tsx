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
      return "right-[-82px] bottom-[-50px] h-[208px] w-[250px] rotate-[-8deg]";
    case "Отзывы в telegram":
      return "right-[-44px] bottom-[-104px] h-[282px] w-[223px] rotate-[2deg]";
    case "Гибкие условия":
      return "right-[4px] bottom-[20px] h-[162px] w-[170px] rotate-[-6deg]";
    case "Предоплата 20%":
      return "right-[-32px] bottom-[10px] h-[164px] w-[181px] rotate-[-7deg]";
    case "Поэтапная оплата":
      return "right-[6px] bottom-[18px] h-[122px] w-[148px] rotate-[-15deg]";
    case "100% оплата сразу":
      return "right-[-28px] bottom-[20px] h-[112px] w-[194px] rotate-[-2deg]";
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
  const isStagedPayment = item.title === "Поэтапная оплата";
  const textClass = "w-[68%] max-w-[310px]";

  return (
    <article
      className={
        isGuarantee
          ? "relative h-[164px] overflow-hidden rounded-panel border border-[#e6ebef] bg-white px-[21px] py-[24px] shadow-card max-sm:rounded-[14px]"
          : `relative h-[164px] overflow-hidden rounded-panel border border-[#e6ebef] bg-white px-[21px] py-[24px] shadow-card max-sm:rounded-[14px] ${isStagedPayment ? "max-sm:h-[184px]" : ""}`
      }
    >
      <div className="relative z-10 max-w-[360px]">
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
              priority={isGuarantee}
              className={
                isHandshakeIcon
                  ? "h-[24px] w-[24px] object-contain"
                  : "h-[22px] w-[22px] object-contain"
              }
            />
          ) : (
            <Icon
              aria-hidden="true"
              className="h-[22px] w-[22px] fill-none stroke-black stroke-[2.8]"
            />
          )}
          <h3
            className="text-[20px] font-medium leading-[1.12] text-black max-sm:text-[25px] max-sm:font-semibold"
          >
            {item.title}
          </h3>
        </div>
        <p
          className={
            isGuarantee
              ? `mt-[16px] ${textClass} text-[15px] font-light leading-[1.22] text-[#72787f] max-sm:w-auto max-sm:max-w-none max-sm:text-[20px] max-sm:font-light`
              : `mt-[16px] ${textClass} text-[15px] font-light leading-[1.22] text-[#72787f] max-sm:w-auto max-sm:max-w-none max-sm:text-[20px] max-sm:font-light`
          }
        >
          {renderCardText(item.text)}
        </p>
      </div>
      <Image
        src={item.image}
        alt={item.alt}
        width={180}
        height={150}
        priority={isGuarantee}
        className={`pointer-events-none absolute object-contain object-right-bottom max-sm:hidden ${getCardImageClass(item.title)}`}
      />
    </article>
  );
}

export function InfoCardsSection() {
  return (
    <section
      className="bg-page py-[54px] max-md:py-10"
      aria-label="Гарантии и варианты оплаты"
    >
      <div className="hero-container">
        <h2 className="text-[30px] font-semibold leading-tight text-black">
          Гарантии
        </h2>
        <div className="mt-[27px] grid grid-cols-3 gap-x-[78px] gap-y-7 max-[1500px]:gap-x-12 max-lg:grid-cols-1">
          {guaranteeCards.map((item) => (
            <InfoCard item={item} key={item.title} variant="guarantee" />
          ))}
        </div>
      </div>

      <div className="hero-container mt-[92px] max-md:mt-12">
        <h2 className="text-[30px] font-semibold leading-tight text-black">
          Варианты оплаты автомобиля
        </h2>
        <div className="mt-7 grid grid-cols-3 gap-x-[78px] gap-y-7 max-[1500px]:gap-x-12 max-lg:grid-cols-1">
          {paymentCards.map((item) => (
            <InfoCard item={item} key={item.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
