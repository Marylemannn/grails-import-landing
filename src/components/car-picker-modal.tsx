"use client";

import Image from "next/image";
import { ChevronRight, X } from "lucide-react";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { captureLeadAttribution, getLeadAttribution } from "@/lib/lead-attribution";
import { metrikaGoals, trackMetrikaGoal } from "@/lib/metrika";
import telegramIcon from "../../картинки/чернитг.svg";
import phoneIcon from "../../картинки/чернителефон.svg";
import whatsappIcon from "../../картинки/чернивотс.svg";
import maxIcon from "../../картинки/чернимакс.svg";

const contactMethods = [
  { id: "telegram", label: "Telegram", icon: telegramIcon },
  { id: "phone", label: "Звонок", icon: phoneIcon },
  { id: "whatsapp", label: "WhatsApp", icon: whatsappIcon },
  { id: "max", label: "Макс", icon: maxIcon },
] as const;

type ContactMethod = (typeof contactMethods)[number]["id"];

type CarPickerModalProps = {
  buttonClassName?: string;
  children: React.ReactNode;
  goalSource?: string;
};

type ModalPhase = "closed" | "open" | "closing";
type SubmitStatus = "idle" | "sending" | "success" | "error";

function formatRussianPhone(value: string) {
  if (!value.trim()) {
    return "";
  }

  if (value.trim() === "+") {
    return "+7";
  }

  const digits = value.replace(/\D/g, "");

  if (!digits) {
    return "";
  }

  const nationalDigits =
    digits.startsWith("7") || digits.startsWith("8") ? digits.slice(1) : digits;
  const limitedDigits = nationalDigits.slice(0, 10);
  const area = limitedDigits.slice(0, 3);
  const first = limitedDigits.slice(3, 6);
  const second = limitedDigits.slice(6, 8);
  const third = limitedDigits.slice(8, 10);

  let formattedPhone = "+7";

  if (area) {
    formattedPhone += ` (${area}`;
  }

  if (area.length === 3) {
    formattedPhone += ")";
  }

  if (first) {
    formattedPhone += ` ${first}`;
  }

  if (second) {
    formattedPhone += `-${second}`;
  }

  if (third) {
    formattedPhone += `-${third}`;
  }

  return formattedPhone;
}

export function CarPickerModal({
  buttonClassName = "",
  children,
  goalSource = "cta",
}: CarPickerModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [modalPhase, setModalPhase] = useState<ModalPhase>("closed");
  const [contactMethod, setContactMethod] = useState<ContactMethod>("telegram");
  const [phone, setPhone] = useState("");
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const modalPhaseRef = useRef<ModalPhase>("closed");
  const isOpen = modalPhase !== "closed";
  const isClosing = modalPhase === "closing";

  useEffect(() => {
    setIsMounted(true);
    captureLeadAttribution();
  }, []);

  useEffect(() => {
    modalPhaseRef.current = modalPhase;
  }, [modalPhase]);

  const closeModal = useCallback(() => {
    if (modalPhaseRef.current !== "open") {
      return;
    }

    modalPhaseRef.current = "closing";
    setModalPhase("closing");
    closeTimeoutRef.current = setTimeout(() => {
      modalPhaseRef.current = "closed";
      setModalPhase("closed");
      closeTimeoutRef.current = null;
    }, 320);
  }, []);

  const openModal = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    modalPhaseRef.current = "open";
    setModalPhase("open");
    setSubmitStatus("idle");
    setSubmitMessage("");
    trackMetrikaGoal(metrikaGoals.leadFormOpen, { source: goalSource });
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal, isOpen]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitStatus("sending");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
          contactMethod,
          attribution: getLeadAttribution(),
        }),
      });
      const result = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;

      if (!response.ok) {
        throw new Error(result?.message || "Не удалось отправить заявку.");
      }

      setSubmitStatus("success");
      setSubmitMessage("Заявка отправлена. Менеджер свяжется с вами выбранным способом.");
      trackMetrikaGoal(metrikaGoals.leadFormSubmitSuccess, {
        contactMethod,
        source: goalSource,
      });
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : "Не удалось отправить заявку. Попробуйте еще раз.",
      );
    }
  };

  const modal = isOpen ? (
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 px-5 py-8 max-sm:px-4 max-sm:py-5 ${
        isClosing ? "modal-overlay-exit" : "modal-overlay-enter"
      }`}
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          closeModal();
        }
      }}
    >
      <div
        aria-labelledby="car-picker-modal-title"
        aria-modal="true"
        className={`relative w-full max-w-[640px] rounded-[20px] bg-white px-[58px] pb-[40px] pt-[38px] text-ink shadow-[0_24px_80px_rgba(0,0,0,0.34)] max-md:max-h-[calc(100vh-48px)] max-md:overflow-y-auto max-md:max-w-[560px] max-md:px-8 max-md:pb-8 max-md:pt-10 max-sm:max-h-[calc(100vh-128px)] max-sm:w-[min(100%,340px)] max-sm:rounded-[15px] max-sm:px-[18px] max-sm:pb-5 max-sm:pt-6 ${
          isClosing ? "modal-panel-exit" : "modal-panel-enter"
        }`}
        role="dialog"
      >
        <button
          aria-label="Закрыть форму"
          className="absolute right-6 top-6 inline-flex h-10 w-10 items-center justify-center rounded-full text-[#6d747c] transition hover:bg-slate-100 hover:text-black focus:outline-none focus-visible:ring-4 focus-visible:ring-black/10 max-sm:right-3 max-sm:top-3 max-sm:h-8 max-sm:w-8"
          type="button"
          ref={closeButtonRef}
          onClick={closeModal}
        >
          <X aria-hidden="true" className="h-8 w-8 stroke-[1.8] max-sm:h-6 max-sm:w-6" />
        </button>

        <h2
          className="mx-auto max-w-[460px] text-center text-[31px] font-semibold leading-[1.22] tracking-normal max-md:text-[29px] max-sm:max-w-[280px] max-sm:text-[21px] max-sm:leading-[1.18]"
          id="car-picker-modal-title"
        >
          Подберём авто из Кореи
          <br />
          под ваш запрос
        </h2>

        <form className="mt-[34px] space-y-[19px] max-sm:mt-6 max-sm:space-y-[13px]" onSubmit={handleSubmit}>
          <div>
            <label
              className="mb-[10px] block text-[17px] font-light text-[#737b85] max-sm:mb-2 max-sm:text-[14px]"
              htmlFor="car-picker-phone"
            >
              Номер телефона
            </label>
            <input
              className="h-[58px] w-full rounded-[15px] border border-[#d9dfe6] bg-white px-6 text-[21px] font-light text-ink outline-none transition placeholder:text-[#99a3ad] focus:border-[1.5px] focus:border-black focus:ring-4 focus:ring-black/5 max-sm:h-[46px] max-sm:rounded-[12px] max-sm:px-4 max-sm:text-[17px]"
              id="car-picker-phone"
              inputMode="tel"
              name="phone"
              placeholder="+7 (___) ___-__-__"
              type="tel"
              value={phone}
              onChange={(event) => {
                setPhone(formatRussianPhone(event.target.value));
                setSubmitStatus("idle");
                setSubmitMessage("");
              }}
            />
          </div>

          <fieldset>
            <legend className="mb-[12px] text-[17px] font-light text-[#737b85] max-sm:mb-2 max-sm:text-[14px]">
              Как связаться?
            </legend>
            <div className="grid grid-cols-4 gap-[14px] max-md:grid-cols-2 max-sm:grid-cols-1 max-sm:gap-[9px]">
              {contactMethods.map((method) => {
                const isSelected = contactMethod === method.id;

                return (
                  <button
                    aria-pressed={isSelected}
                    className={`inline-flex h-[58px] items-center justify-center gap-[10px] rounded-[14px] bg-white px-3 text-[16px] font-medium transition hover:border-black hover:shadow-[0_8px_20px_rgba(20,26,33,0.08)] max-sm:h-[44px] max-sm:rounded-[11px] max-sm:text-[15px] ${
                      isSelected
                        ? "border-[1.5px] border-black text-black shadow-[0_10px_24px_rgba(20,26,33,0.08)]"
                        : "border border-[#d9dfe6] text-[#151515]"
                    }`}
                    key={method.id}
                    type="button"
                    onClick={() => {
                      setContactMethod(method.id);
                      setSubmitStatus("idle");
                      setSubmitMessage("");
                      trackMetrikaGoal(metrikaGoals.contactMethodSelect, {
                        contactMethod: method.id,
                        source: goalSource,
                      });
                    }}
                  >
                    <Image
                      alt=""
                      aria-hidden="true"
                      className="h-[18px] w-[18px] shrink-0 object-contain max-sm:h-4 max-sm:w-4"
                      src={method.icon}
                    />
                    <span>{method.label}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <button
            className="mt-[29px] flex h-[64px] w-full items-center justify-center rounded-[16px] bg-ink px-6 text-[23px] font-medium text-white transition hover:scale-[1.01] hover:bg-black focus:outline-none focus:ring-4 focus:ring-black/15 max-sm:mt-5 max-sm:h-[50px] max-sm:rounded-[12px] max-sm:text-[18px]"
            disabled={submitStatus === "sending"}
            type="submit"
          >
            {submitStatus === "sending" ? "Отправляем..." : "Оставить заявку"}
          </button>

          <p className="mx-auto max-w-[350px] text-center text-[15px] font-light leading-[1.35] text-[#8d96a0] max-sm:max-w-[250px] max-sm:text-[12px]">
            Нажимая на кнопку вы соглашаетесь
            <br />
            с политикой конфиденциальности
          </p>

          {submitMessage ? (
            <p
              className={`text-center text-[16px] font-medium ${
                submitStatus === "error" ? "text-red-600" : "text-ink"
              }`}
              role="status"
            >
              {submitMessage}
            </p>
          ) : null}
        </form>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        className={`group inline-flex h-[76px] items-center justify-center gap-4 rounded-full bg-ink px-10 text-[25px] font-extrabold text-white transition duration-200 hover:bg-black ${buttonClassName}`}
        type="button"
        onClick={openModal}
      >
        <span>{children}</span>
        <ChevronRight aria-hidden="true" className="h-5 w-5 shrink-0 stroke-[2.6]" />
      </button>

      {isMounted ? createPortal(modal, document.body) : null}
    </>
  );
}
