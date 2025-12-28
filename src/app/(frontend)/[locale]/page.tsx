"use client";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("try");

  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-3xl font-bold text-base-light">{t("welcome")}</h1>
    </main>
  );
}
