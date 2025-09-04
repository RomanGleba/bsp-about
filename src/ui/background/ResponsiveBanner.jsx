// src/ui/background/ResponsiveBanner.jsx
import React from 'react';
import clsx from 'clsx';
import s from './ResponsiveBanner.module.scss';

export default function ResponsiveBanner({
                                             alt = 'Hero banner',
                                             className = '',
                                             height = 'clamp(320px, 52vh, 560px)',
                                             overlay,
                                             children,
                                         }) {
    return (
        <section
            className={clsx(s.wrap, className)}
            style={{ minHeight: height }}
            aria-label={alt}
        >
            {overlay && <div className={s.overlay} style={{ background: overlay }} />}
            <div className={s.inner}>{children}</div>
        </section>
    );
}
