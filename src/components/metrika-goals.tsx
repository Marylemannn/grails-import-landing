"use client";

import { useEffect } from "react";
import { trackMetrikaGoal } from "@/lib/metrika";

export function MetrikaGoals() {
  useEffect(() => {
    const handleGoalClick = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const goalElement = target.closest<HTMLElement>("[data-metrika-goal]");
      const goal = goalElement?.dataset.metrikaGoal;

      if (!goal) {
        return;
      }

      let params: Record<string, unknown> | undefined;

      if (goalElement.dataset.metrikaParams) {
        try {
          params = JSON.parse(goalElement.dataset.metrikaParams) as Record<
            string,
            unknown
          >;
        } catch {
          params = undefined;
        }
      }

      trackMetrikaGoal(goal as Parameters<typeof trackMetrikaGoal>[0], params);
    };

    document.addEventListener("click", handleGoalClick, true);

    return () => {
      document.removeEventListener("click", handleGoalClick, true);
    };
  }, []);

  return null;
}
