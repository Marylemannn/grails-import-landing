export const siteConfig = {
  name: "GRAILS IMPORT",
  title: "GRAILS IMPORT - авто из Кореи под ключ",
  description:
    "Подбор, проверка, выкуп и доставка автомобилей из Южной Кореи под ключ с договором, расчетом стоимости и фото/видео отчетами на каждом этапе.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://grails-import.ru",
  email: "nkpiml@mkdm.ru",
  phone: "+7 (961) 253-50-00",
  address: "Москва, где-то там тут",
  managerTelegramUrl: "https://t.me/grails_manager",
  calculatorTelegramUrl: "https://t.me/grails_import_bot",
};

export const navItems = [
  { label: "Кейсы", href: "#cases" },
  { label: "Процесс", href: "#process" },
  { label: "Стоимость", href: "#price" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Вопросы", href: "#faq" },
] as const;

export const legalNavItems = [
  { label: "Политика конфиденциальности", href: "/legal#privacy" },
  { label: "Пользовательское соглашение", href: "/legal#terms" },
] as const;

export const footerLegalLinks = [
  { label: "Политика конфиденциальности", href: "/legal#privacy" },
  { label: "Пользовательское соглашение", href: "/legal#terms" },
] as const;

export const stats = [
  {
    value: "200+",
    text: "автомобилей привезли из Кореи",
  },
  {
    value: "20%",
    text: "предоплата, остаток при получении авто",
  },
  {
    value: "Фото и видео",
    text: "отчеты на всех этапах сделки в чате",
  },
  {
    value: "Стоимость",
    text: "расчет за 1 минуту в калькуляторе",
  },
] as const;

export const caseItems = [
  {
    title: "AUDI Q8",
    description: "55 TFSI 2022 - 10.000 КМ",
    image: "/images/audi-more.jpg",
    imagePosition: "50% 50%",
    alt: "Audi из Кореи",
    href: "https://t.me/grails_import/69",
  },
  {
    title: "MB GLE",
    description: " 53 КАКОЙ ГОД - 10.000 КМ",
    image: "/images/mb-gle-white.jpg",
    imagePosition: "50% 50%",
    alt: "Белый Mercedes-Benz GLE из Кореи",
    href: "https://t.me/grails_import/231",
  },
  {
    title: "Porsche 718",
    description: " КАКОЙ ГОД - 10.000 КМ",
    image: "/images/porsche-718.jpg",
    imagePosition: "50% 50%",
    alt: "Porsche 718 из Кореи",
    href: "https://t.me/grails_import/503",
  },
  {
    title: "MB CLS",
    description: " 53 AMG 2023 - 10.000 КМ",
    image: "/images/mb-cls-main.jpg",
    imagePosition: "50% 50%",
    alt: "Mercedes-Benz CLS из Кореи",
    href: "https://t.me/grails_import/132",
  },
  {
    title: "Audi A6",
    description: "35 TFSI КАКОЙ ГОД - 10.000 КМ",
    image: "/images/audi-a6.jpg",
    imagePosition: "50% 50%",
    alt: "Audi A6 из Кореи",
    href: "https://t.me/grails_import/852",
  },
  {
    title: "BMW 320d",
    description: " КАКОЙ ГОД - 10.000 КМ",
    image: "/images/bmw-320d.jpg",
    imagePosition: "50% 50%",
    alt: "BMW 320d из Кореи",
    href: "https://t.me/grails_import/598",
  },
] as const;

export const processSteps = [
  {
    number: "01",
    title: "Консультация",
    text: "Обсуждаем ваш запрос, бюджет и пожелания по автомобилю",
    className: "left-[3px] top-[127px]",
  },
  {
    number: "02",
    title: "Договор",
    text: "Обсуждаем условия и стоимость, затем подписываем договор онлайн или в офисе",
    className: "left-[162px] top-[418px]",
  },
  {
    number: "03",
    title: "Поиск",
    text: "Создаем общий чат, подбираем лучшие варианты в Корее и в закрытых базах дилеров",
    className: "left-[317px] top-[112px]",
  },
  {
    number: "04",
    title: "Осмотр",
    text: "Эксперт выезжает к дилеру, проводит диагностику и присылает отчет с резюме в чат",
    className: "left-[495px] top-[440px]",
  },
  {
    number: "05",
    title: "Бронь и задаток",
    text: "Бронируем выбранный автомобиль и вносим задаток дилеру для фиксации сделки",
    className: "left-[627px] top-[92px]",
  },
  {
    number: "06",
    title: "Доставка",
    text: "Оформляем экспортные документы и организуем доставку в закрытом контейнере",
    className: "left-[827px] top-[392px]",
  },
  {
    number: "07",
    title: "Получение авто",
    text: "Проходим таможню, доставляем в Москву, оформляем документы и передаем автомобиль вам",
    className: "left-[963px] top-[60px]",
  },
] as const;

export const guaranteeCards = [
  {
    icon: "file",
    iconImage: "/images/guarantee-contract.svg",
    title: "Прозрачный договор",
    text: "В договоре фиксируем все условия, сроки и стоимость. Работаем официально",
    image: "/images/card-contract.png",
    alt: "Документ договора",
  },
  {
    icon: "message",
    iconImage: "/images/guarantee-telegram.svg",
    title: "Отзывы в telegram",
    text: "Реальные отзывы с видео от наших клиентов и процесс привоза авто у нас в тг: @grails_import",
    image: "/images/card-iphone.png",
    alt: "Телефон с отзывами",
  },
  {
    icon: "key",
    iconImage: "/images/guarantee-handshake.svg",
    title: "Гибкие условия",
    text: "Возможность начала работы от 20% предоплаты. Остальное - после доставки автомобиля",
    image: "/images/card-keys.png",
    alt: "Ключи от автомобиля",
  },
] as const;

export const paymentCards = [
  {
    icon: "percent",
    iconImage: "/images/payment-percent.svg",
    title: "Предоплата 20%",
    text: "Начинаем работу после предоплаты 20%, остаток вносится при получении автомобиля.",
    image: "/images/card-calculator.png",
    alt: "Калькулятор для расчета оплаты",
  },
  {
    icon: "lock",
    iconImage: "/images/payment-wallet.svg",
    title: "Поэтапная оплата",
    text: "Сначала оплачивается стоимость автомобиля в Корее, остаток вносится на этапе таможенного оформления.",
    image: "/images/card-card.png",
    alt: "Передача оплаты за автомобиль",
  },
  {
    icon: "car",
    iconImage: "/images/payment-car-check.svg",
    title: "100% оплата сразу",
    text: "Полная оплата автомобиля сразу после подбора",
    image: "/images/card-wallet.png",
    alt: "Банковская карта для оплаты",
  },
] as const;

export const faqItems = [
  {
    question: "Как вы проверяете автомобиль перед покупкой?",
    answer:
      "Сначала мы проверяем автомобиль по базам: ДТП, страховые выплаты, пробег, количество владельцев, регистрационные данные и сервисную историю, если она доступна.\n\nПосле этого наш специалист выезжает на осмотр и проверяет машину уже на месте: кузов, ЛКП, салон, электронику, двигатель, коробку, ходовую и общее техническое состояние.\n\nПо итогу вы получаете подробный фото- и видеоотчет, чтобы понимать, что именно покупаете, еще до выкупа автомобиля.\n\nПример осмотра можно посмотреть в Telegram-канале: t.me/grails_inspection",
  },
  {
    question: "Из чего складывается итоговая стоимость автомобиля?",
    answer:
      "Итоговая стоимость формируется из нескольких частей: цена автомобиля в стране покупки, логистика до порта отправки, таможенное оформление, утилизационного сбора и доставка до вашего региона.\n\nЧтобы заранее понимать бюджет, у нас есть калькулятор стоимости «под ключ». Он помогает рассчитать ориентировочную цену автомобиля без неприятных сюрпризов и скрытых платежей.\n\nКалькулятор доступен здесь: t.me/grails_import_bot",
  },
  {
    question: "Какая предоплата нужна для покупки автомобиля?",
    answer:
      "Предоплата начинается от 20% стоимости автомобиля.\n\nКогда подходящий вариант найден, может потребоваться задаток, чтобы забронировать машину и не потерять ее до момента выкупа.\n\nВсе условия оплаты фиксируются в договоре: сумма, этапы платежей и порядок сделки. Вы заранее понимаете, за что платите и на каком этапе находится автомобиль.",
  },
  {
    question: "Сколько занимает доставка автомобиля?",
    answer:
      "В среднем доставка автомобиля из Южной Кореи до Москвы занимает около 30 дней.\n\nМы сопровождаем сделку на каждом этапе и держим вас в курсе движения автомобиля.",
  },
  {
    question: "Какие гарантии вы предоставляете?",
    answer:
      "Мы несем финансовую ответственность на каждом этапе сделки и работаем только по прозрачному договору.\n\nДо покупки автомобиль проходит профессиональную проверку: кузов, ЛКП, агрегаты, электроника, ходовая часть и общее техническое состояние.\n\nНаша задача - не просто привезти машину, а подобрать автомобиль с понятной историей, реальным пробегом и честным состоянием.\n\nВсе условия сделки согласовываются заранее. Без скрытых платежей, неожиданных доплат и «сюрпризов» после выкупа.",
  },
] as const;
