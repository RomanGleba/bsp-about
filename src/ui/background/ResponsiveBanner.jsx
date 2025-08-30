import React, { memo } from "react";
import s from "./ResponsiveBanner.module.scss";

function ResponsiveBanner({
                              alt = "Корм для улюбленців — BSP Group",

                              // банерні опції
                              height = "clamp(280px, 50vh, 560px)",
                              overlay = "linear-gradient(180deg, rgba(0,0,0,.45), rgba(0,0,0,.20))",
                              positionDesktop = "50% 30%",
                              positionTablet  = "50% 38%",
                              positionMobile  = "50% 45%",

                              loading = "eager",
                              fetchPriority = "high",
                              decoding = "async",
                              className = "",
                              children,

                              // джерела (банерний API)
                              srcDesktopWebp = "/images/backgrounds/desktop/korm.webp",
                              srcDesktopJpg  = "/images/backgrounds/desktop/korm.jpg",
                              srcTabletWebp,   // якщо не передані — візьмемо desktop
                              srcTabletJpg,
                              srcMobileWebp  = "/images/backgrounds/mobile/korms.webp",
                              srcMobileJpg   = "/images/backgrounds/mobile/korms.jpg",

                              // підказка розмірів (зменшує CLS)
                              fallbackWidth  = 1600,
                              fallbackHeight = 900,
                          }) {
    const tWebp = srcTabletWebp ?? srcDesktopWebp;
    const tJpg  = srcTabletJpg  ?? srcDesktopJpg;

    const styleVars = {
        "--banner-h": height,
        "--overlay": overlay,
        "--img-pos-desktop": positionDesktop,
        "--img-pos-tablet": positionTablet,
        "--img-pos-mobile": positionMobile,
    };

    return (
        <section className={`${s.banner} ${className}`} style={styleVars}>
            <picture className={s.picture}>
                {/* mobile ≤ 767 */}
                <source media="(max-width: 767px)" srcSet={srcMobileWebp} type="image/webp" />
                <source media="(max-width: 767px)" srcSet={srcMobileJpg} />

                {/* tablet 768–1199 */}
                <source media="(max-width: 1199px)" srcSet={tWebp} type="image/webp" />
                <source media="(max-width: 1199px)" srcSet={tJpg} />

                {/* desktop ≥ 1200 */}
                <source media="(min-width: 1200px)" srcSet={srcDesktopWebp} type="image/webp" />

                {/* fallback */}
                <img
                    className={s.img}
                    src={srcDesktopJpg}
                    alt={alt}
                    loading={loading}
                    decoding={decoding}
                    fetchPriority={fetchPriority}
                    sizes="(max-width: 767px) 100vw, (max-width: 1199px) 100vw, 100vw"
                    width={fallbackWidth}
                    height={fallbackHeight}
                />
            </picture>

            <span className={s.overlay} aria-hidden="true" />
            {children ? <div className={s.content}>{children}</div> : null}
        </section>
    );
}

export default memo(ResponsiveBanner);
