import { ChevronDown } from "lucide-react";
import { faqItems } from "@/lib/site";
import { SectionIntro } from "./ui";

function renderAnswer(answer: string) {
  return answer.split("\n\n").map((paragraph, paragraphIndex) => {
    const parts = paragraph.split(/(t\.me\/grails_(?:inspection|import_bot))/g);

    return (
      <p className="mt-5 first:mt-0 max-sm:mt-3" key={`${paragraph}-${paragraphIndex}`}>
        {parts.map((part, partIndex) => {
          if (part === "t.me/grails_inspection" || part === "t.me/grails_import_bot") {
            return (
              <a
                className="text-black underline decoration-black/30 underline-offset-4 transition hover:decoration-black"
                href={`https://${part}`}
                key={`${part}-${partIndex}`}
                rel="noreferrer"
                target="_blank"
              >
                {part}
              </a>
            );
          }

          return part;
        })}
      </p>
    );
  });
}

export function FaqSection() {
  return (
    <section className="bg-page pb-[118px] max-sm:pb-10" id="faq" aria-labelledby="faq-title">
      <div className="hero-container">
        <SectionIntro
          eyebrow="Вопросы"
          headingId="faq-title"
          titleClassName="!text-[30px] max-sm:!text-[28px]"
          title="Отвечаем на самые частые вопросы клиентов о нашей работе"
        />

        <div className="mt-16 max-sm:mt-6">
          {faqItems.map((item, index) => (
            <details
              className="group border-b border-[#d8dde2] py-7 last:border-b-0 max-sm:py-4"
              key={`${item.question}-${index}`}
              open={index === 0}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-8 text-[25px] font-medium leading-tight text-black marker:hidden max-sm:gap-4 max-sm:text-[18px] max-sm:font-semibold max-sm:leading-[1.18]">
                <span>{item.question}</span>
                <ChevronDown
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 stroke-[2.5] transition group-open:rotate-180 max-sm:h-[18px] max-sm:w-[18px]"
                />
              </summary>
              <div className="mt-5 max-w-[1330px] text-[20px] font-light leading-[1.5] text-[#7a828a] max-sm:mt-3 max-sm:text-[15px] max-sm:leading-[1.35]">
                {renderAnswer(item.answer)}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
