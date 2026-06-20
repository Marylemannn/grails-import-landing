import Image from "next/image";
import Link from "next/link";
import { navItems, siteConfig } from "@/lib/site";
import { CarPickerModal } from "./car-picker-modal";
import telegramWhiteIcon from "../../картинки/тгбел.svg";

type HeaderNavItem = {
  label: string;
  href: string;
};

type SiteHeaderProps = {
  items?: readonly HeaderNavItem[];
};

export function SiteHeader({ items = navItems }: SiteHeaderProps) {
  return (
    <header className="bg-ink text-white">
      <div className="border-b border-white/10">
        <div className="hero-container flex min-h-[50px] items-center justify-between gap-5 py-3 text-[17px] font-light text-white/85 max-[1500px]:min-h-[46px] max-[1500px]:text-[15px] max-md:flex-wrap max-md:justify-center max-md:gap-x-6 max-md:gap-y-2 max-md:py-2 max-sm:text-[13px]">
          <div className="flex items-center gap-[24px] max-md:gap-4 max-sm:flex-wrap max-sm:justify-center max-sm:gap-y-2">
            <a
              className="inline-flex items-center gap-3 whitespace-nowrap transition hover:text-white max-sm:gap-2"
              href="tel:+79612535000"
            >
              <Image
                aria-hidden="true"
                className="h-5 w-5 max-[1500px]:h-[18px] max-[1500px]:w-[18px] max-sm:h-4 max-sm:w-4"
                src="/images/телефон.svg"
                alt=""
                width={24}
                height={24}
              />
              <span>+7 (961) 253-50-00</span>
            </a>

            <span className="h-5 w-px bg-white/20 max-sm:hidden" aria-hidden="true" />

            <div className="inline-flex items-center gap-3 whitespace-nowrap max-sm:gap-2">
              <Image
                aria-hidden="true"
                className="h-5 w-5 max-[1500px]:h-[18px] max-[1500px]:w-[18px] max-sm:h-4 max-sm:w-4"
                src="/images/время.svg"
                alt=""
                width={22}
                height={22}
              />
              <span className="max-sm:hidden">Ежедневно 10:00–20:00</span>
              <span className="hidden max-sm:inline">10:00–20:00</span>
            </div>
          </div>

          <div className="flex items-center gap-[24px] max-md:gap-4 max-sm:flex-wrap max-sm:justify-center max-sm:gap-y-2">
            <a
              className="inline-flex items-center gap-3 whitespace-nowrap transition hover:text-white max-sm:gap-2"
              href={siteConfig.managerTelegramUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Image
                aria-hidden="true"
                className="h-5 w-5 max-[1500px]:h-[18px] max-[1500px]:w-[18px] max-sm:h-4 max-sm:w-4"
                src={telegramWhiteIcon}
                alt=""
                width={23}
                height={20}
              />
              <span>Telegram</span>
            </a>

            <span className="h-5 w-px bg-white/20 max-sm:hidden" aria-hidden="true" />

            <a
              className="inline-flex items-center gap-3 whitespace-nowrap transition hover:text-white max-sm:gap-2"
              href="https://wa.me/79612535000"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Image
                aria-hidden="true"
                className="h-5 w-5 max-[1500px]:h-[18px] max-[1500px]:w-[18px] max-sm:h-4 max-sm:w-4"
                src="/images/вотсап.svg"
                alt=""
                width={22}
                height={22}
              />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      <div className="h-[72px] max-[1500px]:h-[64px]">
        <div className="hero-container flex h-full items-center justify-between">
          <Link
            className="whitespace-nowrap text-[30px] font-medium uppercase tracking-normal max-[1500px]:text-[24px] max-[1320px]:text-[23px]"
            href="/"
            aria-label="GRAILS IMPORT, перейти на главную страницу"
          >
            GRAILS IMPORT
          </Link>

          <nav
            className="hidden items-center gap-[54px] text-white/80 lg:flex max-[1500px]:gap-[48px] max-[1320px]:gap-[42px]"
            aria-label="Главная навигация"
          >
            {items.map((item) => (
              <a
                className="text-[20px] font-light transition hover:text-white"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <CarPickerModal
            buttonClassName="!h-[43px] !gap-[14px] !bg-white px-[26px] !text-[20px] !font-normal !text-ink hover:scale-105 hover:!bg-slate-100 max-[1500px]:!h-[40px] max-[1500px]:!gap-[12px] max-[1500px]:px-[24px] max-[1500px]:!text-[17px] max-[1320px]:px-[22px] max-[1320px]:!text-[16px]"
          >
            <span className="whitespace-nowrap max-sm:hidden">Связаться с нами</span>
            <span className="sm:hidden">Связаться</span>
          </CarPickerModal>
        </div>
      </div>
    </header>
  );
}
