import React from 'react';
import style from './Background.module.scss';

export default function BackgroundImage() {
    return (
        <picture className={style.bgWrap}>
            {/* mobile */}
            <source
                media="(max-width: 767px)"
                srcSet="/images/backgrounds/mobile/dogs-mobile.webp"
                type="image/webp"
            />
            <source
                media="(max-width: 767px)"
                srcSet="/images/backgrounds/mobile/dogs-mobile.jpg"
            />

            {/* tablet */}
            <source
                media="(max-width: 1199px)"
                srcSet="/images/family-dog-tablet.webp"
                type="image/webp"
            />
            <source
                media="(max-width: 1199px)"
                srcSet="/images/family-dog-tablet.jpg"
            />

            {/* desktop */}
            <source
                media="(min-width: 1200px)"
                srcSet="/images/backgrounds/desktop/dogs-desktop.webp"
                type="image/webp"
            />

            <img
                src="/images/backgrounds/desktop/family-dog-desktop.jpg"
                alt="Сім'я з собаками на природі — BSP Group"
                className={style.bg}
                loading="eager"
                fetchPriority="high"
                decoding="async"
            />
        </picture>
    );
}

