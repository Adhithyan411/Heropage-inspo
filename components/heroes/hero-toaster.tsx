"use client";

import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  Loader2,
  X,
} from "lucide-react";
import { Toaster } from "sonner";

/**
 * Global Sonner toast container styled for HeroAtlas's warm cream, espresso,
 * and burnt-orange editorial system. Rendered once in app/layout.tsx.
 */
export function HeroToaster() {
  return (
    <Toaster
      position="bottom-right"
      offset={{ bottom: 20, right: 20 }}
      mobileOffset={{
        bottom: "max(16px, env(safe-area-inset-bottom))",
        left: 16,
        right: 16,
      }}
      gap={10}
      visibleToasts={3}
      duration={3400}
      closeButton
      swipeDirections={["bottom", "right"]}
      containerAriaLabel="HeroAtlas notifications"
      icons={{
        success: <CheckCircle2 className="h-4 w-4 text-[#2F6B3B]" />,
        info: <Info className="h-4 w-4 text-[#C2410C]" />,
        warning: <AlertTriangle className="h-4 w-4 text-[#B45309]" />,
        error: <AlertCircle className="h-4 w-4 text-[#B91C1C]" />,
        loading: <Loader2 className="h-4 w-4 animate-spin text-[#FF5B14]" />,
        close: <X className="h-3 w-3" />,
      }}
      toastOptions={{
        classNames: {
          toast: "heroatlas-toast",
          title: "heroatlas-toast-title",
          description: "heroatlas-toast-description",
          actionButton: "heroatlas-toast-action",
          cancelButton: "heroatlas-toast-cancel",
          closeButton: "heroatlas-toast-close",
          icon: "heroatlas-toast-icon",
        },
      }}
    />
  );
}

