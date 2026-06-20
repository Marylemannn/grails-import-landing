import { NextResponse } from "next/server";
import type { LeadAttribution } from "@/lib/lead-attribution";

const contactMethodLabels = {
  telegram: "Telegram",
  phone: "Звонок",
  whatsapp: "WhatsApp",
  max: "Макс",
} as const;

type ContactMethod = keyof typeof contactMethodLabels;

type LeadPayload = {
  phone?: unknown;
  contactMethod?: unknown;
  attribution?: Partial<LeadAttribution>;
};

function isContactMethod(value: unknown): value is ContactMethod {
  return (
    typeof value === "string" &&
    Object.prototype.hasOwnProperty.call(contactMethodLabels, value)
  );
}

function sanitizeText(value: unknown, maxLength = 500) {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/[\u0000-\u001F\u007F]/g, " ").trim().slice(0, maxLength);
}

function appendField(lines: string[], label: string, value: unknown) {
  const safeValue = sanitizeText(value);

  if (safeValue) {
    lines.push(`${label}: ${safeValue}`);
  }
}

function buildTelegramMessage(payload: Required<Pick<LeadPayload, "phone">> & {
  contactMethod: ContactMethod;
  attribution?: Partial<LeadAttribution>;
}) {
  const submittedAt = new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "short",
    timeStyle: "medium",
    timeZone: "Europe/Moscow",
  }).format(new Date());

  const lines = [
    "Новая заявка с сайта GRAILS IMPORT",
    "",
    `Телефон: ${sanitizeText(payload.phone)}`,
    `Связаться через: ${contactMethodLabels[payload.contactMethod]}`,
    `Время заявки: ${submittedAt}`,
    "",
    "Источник:",
  ];

  appendField(lines, "utm_source", payload.attribution?.utm_source);
  appendField(lines, "utm_medium", payload.attribution?.utm_medium);
  appendField(lines, "utm_campaign", payload.attribution?.utm_campaign);
  appendField(lines, "utm_content", payload.attribution?.utm_content);
  appendField(lines, "utm_term", payload.attribution?.utm_term);
  appendField(lines, "Referrer", payload.attribution?.referrer);
  appendField(lines, "Первый вход", payload.attribution?.landingPage);
  appendField(lines, "Страница заявки", payload.attribution?.currentPage);
  appendField(lines, "Первый визит", payload.attribution?.firstVisitAt);

  return lines.join("\n");
}

export async function POST(request: Request) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID || process.env.TELEGRAM_LEADS_CHAT_ID;

  if (!botToken || !chatId) {
    return NextResponse.json(
      { message: "Telegram для заявок не настроен." },
      { status: 500 },
    );
  }

  let payload: LeadPayload;

  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ message: "Некорректные данные заявки." }, { status: 400 });
  }

  const phone = sanitizeText(payload.phone, 40);
  const phoneDigits = phone.replace(/\D/g, "");

  if (phoneDigits.length < 10) {
    return NextResponse.json(
      { message: "Укажите корректный номер телефона." },
      { status: 400 },
    );
  }

  if (!isContactMethod(payload.contactMethod)) {
    return NextResponse.json(
      { message: "Выберите способ связи." },
      { status: 400 },
    );
  }

  const telegramResponse = await fetch(
    `https://api.telegram.org/bot${botToken}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: buildTelegramMessage({
          phone,
          contactMethod: payload.contactMethod,
          attribution: payload.attribution,
        }),
        disable_web_page_preview: true,
      }),
    },
  );

  if (!telegramResponse.ok) {
    return NextResponse.json(
      { message: "Не удалось отправить заявку в Telegram." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
