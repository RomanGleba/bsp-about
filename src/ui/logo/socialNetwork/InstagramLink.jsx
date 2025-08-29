import React from "react";
import s from "./InstagramLink.module.scss";
import ig from "@/assets/logo/instagram.svg"; // <— ІМПОРТУЄМО ФАЙЛ

export default function InstagramLink({ size = 22, className = "" }) {
    return (
        <a
            className={`${s.iconBtn} ${className}`}
            href="https://www.instagram.com/bspgroup2020?igsh=MWI1bWNsNzdkOGd6cg=="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ми в Instagram"
            title="Instagram"
        >
            <img
                src={ig}                 // <— використовуємо імпортований URL
                alt="Instagram"
                className={s.iconImg}
                width={size}
                height={size}
                loading="lazy"
                decoding="async"
            />
        </a>
    );
}
