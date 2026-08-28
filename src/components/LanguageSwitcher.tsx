"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { LOCALES, LOCALE_LABELS, ValidLocale, getLocalizedUrl } from "@/lib/i18n";

export function LanguageSwitcher({ currentLocale }: { currentLocale: ValidLocale }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectLocale = (targetLocale: ValidLocale) => {
    setIsOpen(false);
    if (targetLocale === currentLocale) return;

    const newUrl = getLocalizedUrl(pathname || "/", targetLocale);
    router.push(newUrl);
  };

  const currentInfo = LOCALE_LABELS[currentLocale] || LOCALE_LABELS["pt-br"];

  return (
    <div className="language-switcher" ref={dropdownRef}>
      <button
        type="button"
        className="lang-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Selecionar idioma / Select language"
      >
        <Globe size={14} className="lang-icon" />
        <span className="lang-code">{currentInfo.code}</span>
        <ChevronDown size={12} className={`lang-chevron ${isOpen ? "open" : ""}`} />
      </button>

      {isOpen && (
        <div className="lang-dropdown" role="menu">
          <div className="lang-dropdown-header">Idioma / Language</div>
          {LOCALES.map((loc) => {
            const info = LOCALE_LABELS[loc];
            const isSelected = loc === currentLocale;
            return (
              <button
                key={loc}
                type="button"
                className={`lang-option ${isSelected ? "selected" : ""}`}
                onClick={() => handleSelectLocale(loc)}
                role="menuitem"
              >
                <span className="lang-flag">{info.flag}</span>
                <span className="lang-label">{info.label}</span>
                <span className="lang-short">({info.code})</span>
                {isSelected && <Check size={14} className="lang-check" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
