import { footerLegalLinks } from "@/lib/site";

export function SiteFooter() {
  const footerPhone = "+7 (961) 253-50-00";

  return (
    <footer className="bg-ink py-9 text-white max-sm:py-8" id="contact">
      <div className="hero-container">
        <div className="grid grid-cols-[minmax(280px,1fr)_minmax(430px,1.1fr)_minmax(220px,0.75fr)] gap-10 max-xl:grid-cols-2 max-sm:grid-cols-1 max-sm:gap-7">
          <div>
            <a
              className="text-[28px] font-medium uppercase leading-none max-sm:text-[24px]"
              href="#top"
            >
              GRAILS IMPORT
            </a>
            <p className="mt-4 max-w-[430px] text-[14px] font-light leading-[1.45] text-white/45 max-sm:mt-4 max-sm:text-[13px] max-sm:leading-[1.35]">
              Подбор, проверка и доставка авто из Кореи под ключ.
            </p>
          </div>

          <div className="grid grid-cols-[max-content_minmax(230px,1fr)] gap-10 max-sm:grid-cols-1 max-sm:gap-5">
            <div>
              <p className="text-[13px] font-light uppercase leading-none tracking-[0.08em] text-white/35 max-sm:text-[12px]">
                Телефон
              </p>
              <a
                className="mt-3 block text-[17px] font-light leading-tight transition hover:text-white/70 max-sm:mt-2 max-sm:text-[14px]"
                href={`tel:${footerPhone.replaceAll(" ", "")}`}
              >
                {footerPhone}
              </a>
            </div>
            <div>
              <p className="text-[13px] font-light uppercase leading-none tracking-[0.08em] text-white/35 max-sm:text-[12px]">
                Адрес
              </p>
              <p className="mt-3 max-w-[220px] text-[17px] font-light leading-tight max-sm:mt-2 max-sm:text-[14px]">
                Москва, Ленинградский проспект 34А
              </p>
            </div>
          </div>

          <div className="text-[15px] font-light leading-[1.5] text-white/70 max-xl:col-span-2 max-sm:col-span-1 max-sm:text-[14px]">
            <p>ИП Дуенин Роман</p>
            <p className="text-white/35">ИНН 0585202293</p>
            <p className="text-white/35">ОГРН 5025483838</p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-8 border-t border-white/10 pt-5 text-[13px] font-light leading-tight text-white/35 max-md:flex-col max-md:items-start max-md:gap-4 max-sm:mt-7 max-sm:pt-5 max-sm:text-[12px]">
          <p>© 2022-2026 GRAILS IMPORT. Все права защищены.</p>
          <nav
            aria-label="Юридическая информация"
            className="flex flex-wrap justify-end gap-x-5 gap-y-2 max-md:justify-start"
          >
            {footerLegalLinks.map((link) => (
              <a className="transition hover:text-white/70" href={link.href} key={link.label}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
