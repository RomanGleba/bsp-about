import React from 'react';

/**
 * Универсальне зображення товару:
 * - якщо imageKey = "ключ" (basename без розширення) → будує responsive WebP з /mobile /tablet /desktop
 * - якщо imageKey = повний шлях/URL (.png/.jpg/.webp/https://...) → рендерить як є
 */
export default function ProductImage({
                                         imageKey,
                                         alt = 'Фото товару',
                                         className = '',
                                         basePath = '/images/products', // де лежать responsive набори (public/)
                                         loading = 'lazy',
                                         decoding = 'async',
                                         fetchPriority = 'auto',
                                         width,
                                         height,
                                         single = false,      // true → використовує тільки desktop.webp
                                         addSuffix = true,    // false → імена без -mobile/-tablet/-desktop
                                         sizes,               // опціонально: наприклад '(max-width: 768px) 50vw, 25vw'
                                     }) {
    const raw = String(imageKey || '').trim();
    if (!raw) return null;

    const isDirectPath =
        raw.startsWith('/') ||
        raw.startsWith('http://') || raw.startsWith('https://') ||
        /\.(webp|avif|jpe?g|png|gif|svg)$/i.test(raw);

    // Якщо це готовий шлях/URL — просто показуємо як є
    if (isDirectPath) {
        return (
            <img
                src={raw}
                alt={alt}
                className={className}
                loading={loading}
                decoding={decoding}
                fetchPriority={fetchPriority}
                width={width}
                height={height}
                sizes={sizes}
                style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }}
            />
        );
    }

    // Інакше — це "ключ": збираємо responsive WebP
    const key = raw.replace(/\.(webp|avif|jpe?g|png)$/i, '');
    const file = (subdir, suf) =>
        `${basePath}/${subdir}/${key}${addSuffix ? `-${suf}` : ''}.webp`;

    const d = file('desktop', 'desktop');
    const t = single ? d : file('tablet', 'tablet');  // ← tablet, не "table"
    const m = single ? d : file('mobile', 'mobile');

    return (
        <picture className={className}>
            <source media="(max-width: 767px)"  srcSet={m} type="image/webp" sizes={sizes} />
            <source media="(max-width: 1199px)" srcSet={t} type="image/webp" sizes={sizes} />
            <source media="(min-width: 1200px)" srcSet={d} type="image/webp" sizes={sizes} />
            <img
                src={d}
                alt={alt}
                loading={loading}
                decoding={decoding}
                fetchPriority={fetchPriority}
                width={width}
                height={height}
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                onError={(e) => {
                    // fallback: .webp → .png → .jpg
                    const base = d.replace(/\.webp$/i, '');
                    e.currentTarget.onerror = () => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = `${base}.jpg`;
                    };
                    e.currentTarget.src = `${base}.png`;
                }}
            />
        </picture>
    );
}
