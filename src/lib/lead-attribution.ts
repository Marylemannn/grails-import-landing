const attributionStorageKey = "grailsLeadAttribution";

const utmKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type LeadAttribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
  landingPage?: string;
  currentPage?: string;
  firstVisitAt?: string;
};

function readStoredAttribution(): LeadAttribution {
  try {
    const storedAttribution = window.localStorage.getItem(attributionStorageKey);

    return storedAttribution ? (JSON.parse(storedAttribution) as LeadAttribution) : {};
  } catch {
    return {};
  }
}

function writeStoredAttribution(attribution: LeadAttribution) {
  try {
    window.localStorage.setItem(attributionStorageKey, JSON.stringify(attribution));
  } catch {
    // localStorage can be unavailable in private browsing modes.
  }
}

export function captureLeadAttribution() {
  if (typeof window === "undefined") {
    return;
  }

  const url = new URL(window.location.href);
  const storedAttribution = readStoredAttribution();
  const utmAttribution = utmKeys.reduce<LeadAttribution>((accumulator, key) => {
    const value = url.searchParams.get(key);

    if (value) {
      accumulator[key] = value;
    }

    return accumulator;
  }, {});
  const hasUtmAttribution = Object.keys(utmAttribution).length > 0;

  if (storedAttribution.firstVisitAt && !hasUtmAttribution) {
    return;
  }

  writeStoredAttribution({
    ...storedAttribution,
    ...utmAttribution,
    referrer: storedAttribution.referrer || document.referrer || "direct",
    landingPage: storedAttribution.landingPage || url.href,
    firstVisitAt: storedAttribution.firstVisitAt || new Date().toISOString(),
  });
}

export function getLeadAttribution(): LeadAttribution {
  if (typeof window === "undefined") {
    return {};
  }

  return {
    ...readStoredAttribution(),
    currentPage: window.location.href,
  };
}
