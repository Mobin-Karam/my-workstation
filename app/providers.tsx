"use client";

import { NotificationProvider } from "./features/notification/NotificationContext";
import NotificationViewport from "./features/notification/ui/NotificationViewport";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NotificationProvider>
      {children}

      <NotificationViewport />
    </NotificationProvider>
  );
}
