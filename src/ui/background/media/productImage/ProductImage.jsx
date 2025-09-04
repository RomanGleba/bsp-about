import React from 'react';

/**
 * Якщо imageKey = "ключ" → будує WebP з /mobile /table /desktop (public/)
 * Якщо imageKey = повний шлях/URL → рендерить як є
 */
export default function ProductImage({
                                         imageKey,
                                         alt = 'Фото товару',
                                         className = '',
                                         basePath = '/images/products',  // public/images/products
                                         loading = 'lazy',
                                         decoding = 'async',
                                         fetchPriority = 'auto',
                                         width,
                                         height,
                                         single = false,      // true → лише desktop.webp
                                         addSuffix = true,    // false → без -mobile/-table/-desktop
                                         sizes,
                                         tabletDir = 'table', // у тебе папка 'table'
                                         placeholder = '/images/products/placeholder.png',
                                     }) {
    const raw = String(imageKey || '').trim();
    if (!raw) return null;

    const isDirectPath =
        raw.startsWith('/') ||
        raw.startsWith('http://') ||
        raw.startsWith('https://') ||
        /\.(webp|avif|jpe?g|png|gif|svg)$/i.test(raw);

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

    const key = raw.replace(/\.(webp|avif|jpe?g|png)$/i, '');
    const file = (subdir, suf) =>
        `${basePath}/${subdir}/${key}${addSuffix ? `-${suf}` : ''}.webp`;

    const d = file('desktop', 'desktop');
    const t = single ? d : file(tabletDir, tabletDir);
    const m = single ? d : file('mobile', 'mobile');

    const handleError = (imgEl) => {
        if (!imgEl) return;
        const cur = imgEl.dataset.fallbackStage || 'webp';
        const base = d.replace(/\.webp$/i, '');
        if (cur === 'webp') { imgEl.dataset.fallbackStage = 'png'; imgEl.src = `${base}.png`; return; }
        if (cur === 'png')  { imgEl.dataset.fallbackStage = 'jpg'; imgEl.src = `${base}.jpg`; return; }
        imgEl.onerror = null; imgEl.src = placeholder;
    };

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
                data-fallback-stage="webp"
                onError={(e) => handleError(e.currentTarget)}
            />
        </picture>
    );
}
