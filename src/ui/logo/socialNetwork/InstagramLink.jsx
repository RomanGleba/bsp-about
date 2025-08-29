import React from "react";
import s from "./InstagramLink.module.scss";

export default function InstagramLink({ size = 22 }) {
    return (
        <a
            className={s.iconBtn}
            href="https://www.instagram.com/bspgroup2020?igsh=MWI1bWNsNzdkOGd6cg=="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ми в Instagram"
            title="Instagram"
        >
            <img
                src="/src/assets/logo/instagram.svg"
                alt="Instagram"
                className={s.iconImg}
                width={size}
                height={size}
                loading="lazy"
            />
        </a>
    );
}
