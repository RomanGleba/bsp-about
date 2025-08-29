import React from 'react';

/**
 * Респонсивне фото товару (WebP only).
 * Папки: /images/products/{mobile|tablet|desktop}
 *
 * За замовчуванням шукає файли з суфіксами:
 *   <key>-mobile.webp, <key>-tablet.webp, <key>-desktop.webp
 * Якщо твої файли без суфіксів (просто <key>.webp у кожній папці),
 *   передай addSuffix={false}.
 * Якщо маєш тільки один файл (desktop), передай single.
 */
export default function ProductImage({
                                         imageKey,
                                         alt = 'Фото товару',
                                         className = '',
                                         basePath = '/images/products',
                                         loading = 'lazy',
                                         decoding = 'async',
                                         fetchPriority = 'auto',
                                         width,
                                         height,
                                         single = false,      // true → використовує тільки desktop.webp
                                         addSuffix = true     // false → імена без -mobile/-tablet/-desktop
                                     }) {
    // Прибрати випадкове розширення у ключі
    const key = String(imageKey || '').replace(/\.(webp|avif|jpe?g|png)$/i, '');

    const file = (subdir, suf) =>
        `${basePath}/${subdir}/${key}${addSuffix ? `-${suf}` : ''}.webp`;

    const d = file('desktop', 'desktop');
    const t = single ? d : file('table', 'table');
    const m = single ? d : file('mobile', 'mobile');

    return (
        <picture className={className}>
            <source media="(max-width: 767px)"  srcSet={m} type="image/webp" />
            <source media="(max-width: 1199px)" srcSet={t} type="image/webp" />
            <source media="(min-width: 1200px)" srcSet={d} type="image/webp" />
            <img
                src={d}
                alt={alt}
                loading={loading}
                decoding={decoding}
                fetchPriority={fetchPriority}
                width={width}
                height={height}
                style={{ width: '100%', height: 'auto' }}
            />
        </picture>
    );
}
