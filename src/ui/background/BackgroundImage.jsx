// BackgroundImage.jsx
import React from "react";
import style from "./Background.module.scss";

export default function BackgroundImage({
                                            mobileWebp,
                                            mobileJpg,
                                            tabletWebp,
                                            tabletJpg,
                                            desktopWebp,
                                            desktopJpg,
                                            alt,
                                        }) {
    return (
        <picture className={style.bgWrap}>
            {/* mobile */}
            <source media="(max-width: 767px)" srcSet={mobileWebp} type="image/webp" />
            <source media="(max-width: 767px)" srcSet={mobileJpg} />

            {/* tablet */}
            <source media="(max-width: 1199px)" srcSet={tabletWebp} type="image/webp" />
            <source media="(max-width: 1199px)" srcSet={tabletJpg} />

            {/* desktop */}
            <source media="(min-width: 1200px)" srcSet={desktopWebp} type="image/webp" />

            <img
                src={desktopJpg}
                alt={alt}
                className={style.bg}
                loading="eager"
                fetchPriority="high"
                decoding="async"
            />
        </picture>
    );
}
