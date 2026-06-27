"use client";

export const METRIKA_COUNTER_ID = 110143282;

export const metrikaGoals = {
  leadFormOpen: "lead_form_open",
  leadFormSubmitSuccess: "lead_form_submit_success",
  contactMethodSelect: "contact_method_select",
  phoneClick: "phone_click",
  whatsappClick: "whatsapp_click",
  telegramManagerClick: "telegram_manager_click",
  telegramChannelClick: "telegram_channel_click",
  calculatorClick: "calculator_click",
  caseDetailsClick: "case_details_click",
  sectionNavClick: "section_nav_click",
} as const;

type MetrikaGoal = (typeof metrikaGoals)[keyof typeof metrikaGoals];

declare global {
  interface Window {
    ym?: (
      counterId: number,
      method: "reachGoal",
      goal: MetrikaGoal,
      params?: Record<string, unknown>,
    ) => void;
  }
}

export function trackMetrikaGoal(
  goal: MetrikaGoal,
  params?: Record<string, unknown>,
) {
  if (typeof window === "undefined" || typeof window.ym !== "function") {
    return;
  }

  window.ym(METRIKA_COUNTER_ID, "reachGoal", goal, params);
}
