const attributionStorageKey = "grailsLeadAttribution";
const visitSessionStorageKey = "grailsLeadVisitCaptured";

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
  visitCount?: number;
  firstUtmSource?: string;
  lastUtmSource?: string;
  device?: LeadDeviceInfo;
};

export type LeadDeviceInfo = {
  type?: string;
};

type NavigatorWithUserAgentData = Navigator & {
  userAgentData?: {
    mobile?: boolean;
  };
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

function formatUtmSource(attribution: LeadAttribution) {
  return utmKeys
    .map((key) => {
      const value = attribution[key];

      return value ? `${key}=${value}` : "";
    })
    .filter(Boolean)
    .join(", ");
}

function shouldCountVisit() {
  try {
    if (window.sessionStorage.getItem(visitSessionStorageKey)) {
      return false;
    }

    window.sessionStorage.setItem(visitSessionStorageKey, "1");
  } catch {
    return true;
  }

  return true;
}

function detectDeviceType(userAgent: string, userAgentDataMobile?: boolean) {
  const normalizedUserAgent = userAgent.toLowerCase();

  if (
    /ipad|tablet|playbook|silk/.test(normalizedUserAgent) ||
    (/android/.test(normalizedUserAgent) && !/mobile/.test(normalizedUserAgent)) ||
    (/macintosh/.test(normalizedUserAgent) && navigator.maxTouchPoints > 1)
  ) {
    return "Планшет";
  }

  if (
    userAgentDataMobile ||
    /mobi|iphone|ipod|android.*mobile|blackberry|phone/.test(normalizedUserAgent)
  ) {
    return "Телефон";
  }

  return "Компьютер";
}

function getLeadDeviceInfo(): LeadDeviceInfo {
  const navigatorWithUserAgentData = navigator as NavigatorWithUserAgentData;
  const userAgent = navigator.userAgent || "";

  return {
    type: detectDeviceType(userAgent, navigatorWithUserAgentData.userAgentData?.mobile),
  };
}

export function captureLeadAttribution() {
  if (typeof window === "undefined") {
    return;
  }

  const url = new URL(window.location.href);
  const storedAttribution = readStoredAttribution();
  const isNewVisit = shouldCountVisit();
  const utmAttribution = utmKeys.reduce<LeadAttribution>((accumulator, key) => {
    const value = url.searchParams.get(key);

    if (value) {
      accumulator[key] = value;
    }

    return accumulator;
  }, {});
  const hasUtmAttribution = Object.keys(utmAttribution).length > 0;
  const currentUtmSource = hasUtmAttribution ? formatUtmSource(utmAttribution) : "";

  writeStoredAttribution({
    ...storedAttribution,
    ...utmAttribution,
    referrer: storedAttribution.referrer || document.referrer || "direct",
    landingPage: storedAttribution.landingPage || url.href,
    firstVisitAt: storedAttribution.firstVisitAt || new Date().toISOString(),
    visitCount: (storedAttribution.visitCount || 0) + (isNewVisit ? 1 : 0),
    firstUtmSource:
      storedAttribution.firstUtmSource || currentUtmSource || undefined,
    lastUtmSource:
      currentUtmSource || storedAttribution.lastUtmSource || undefined,
  });
}

export function getLeadAttribution(): LeadAttribution {
  if (typeof window === "undefined") {
    return {};
  }

  return {
    ...readStoredAttribution(),
    currentPage: window.location.href,
    device: getLeadDeviceInfo(),
  };
}
