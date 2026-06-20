import Image from "next/image";
import { footerLegalLinks } from "@/lib/site";

export function SiteFooter() {
  const footerPhone = "+7 (961) 253-50-00";

  return (
    <footer className="bg-ink pb-7 pt-[54px] text-white" id="contact">
      <div className="hero-container">
        <div className="grid grid-cols-[1.3fr_1fr] gap-16 max-lg:grid-cols-1">
          <div className="flex flex-col">
            <a
              className="text-[30px] font-medium uppercase leading-none"
              href="#top"
            >
              GRAILS IMPORT
            </a>
            <p className="mt-6 max-w-[560px] text-[15px] font-light leading-[1.45] text-white/45">
              Авто из Кореи под ваш запрос: подберем, проверим и выкупим
              автомобиль по вашему запросу, с официальным договором и доставим
              под ключ в любую точку России
            </p>
            <a
              aria-label="Перейти в Telegram GRAILS IMPORT"
              className="mt-6 block w-fit"
              href="https://t.me/grails_import"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Image
                aria-hidden="true"
                alt=""
                className="h-auto w-6 brightness-0 invert"
                height={18}
                src="/images/tg.svg"
                width={20}
              />
            </a>
            <div className="mt-auto grid max-w-[620px] grid-cols-[max-content_minmax(300px,1fr)] gap-12 pt-20 max-lg:mt-12 max-lg:pt-0 max-sm:grid-cols-1">
              <div>
                <p className="text-[20px] font-light text-white/35">Телефон</p>
                <a
                  className="mt-6 block text-[20px] font-light"
                  href={`tel:${footerPhone.replaceAll(" ", "")}`}
                >
                  {footerPhone}
                </a>
              </div>
              <div>
                <p className="text-[20px] font-light text-white/35">Адрес</p>
                <p className="mt-6 max-w-[320px] text-[20px] font-light leading-tight">
                  Москва,
                  <br />
                  <span className="whitespace-nowrap">
                    Ленинградский проспект 34А
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end text-right max-lg:items-start max-lg:text-left">
            <div className="text-[20px] font-light leading-[1.55]">
              <p>ИП Дуенин Роман</p>
              <p>ИНН 0585202293</p>
              <p>ОГРН 5025483838</p>
            </div>
            <nav
              aria-label="Юридическая информация"
              className="mt-auto flex flex-col gap-1 pt-28 text-[15px] font-light leading-tight text-white/35 max-lg:pt-12"
            >
              {footerLegalLinks.map((link) => (
                <a className="transition hover:text-white/70" href={link.href} key={link.label}>
                  {link.label}
                </a>
              ))}
            </nav>
            <p className="mt-4 text-[15px] font-light text-white/35">
              © 2022-2026 Все права защищены. GRAILS IMPORT
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
