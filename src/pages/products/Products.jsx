import React, { useMemo, useState, useCallback } from 'react';
import { Row, Col, Divider } from 'antd';
import { useTranslation } from 'react-i18next';

import productsData from '@/data/json/Products.json';
import brandsData from '@/data/json/Brends.json';
import ProductCard from '@/components/productCard/ProductCard.jsx';
import ResponsiveBanner from '@/ui/background/ResponsiveBanner.jsx';
import Logo from '@/ui/logo/Logo.jsx';
import s from './Products.module.scss';

const norm = (v) => (v ?? '').toString().trim().toLowerCase();

/** ==== МАПА логотипів з assets/brands (Vite/Webpack) ==== */
const logoUrlByKey = (() => {
    const modules = import.meta.glob('@/assets/brands/*.{png,jpg,jpeg,webp,svg}', {
        eager: true,
        as: 'url',
    });
    const map = {};
    for (const [path, url] of Object.entries(modules)) {
        const filename = path.split('/').pop(); // "dasty.png"
        const key = filename.replace(/\.(png|jpe?g|webp|svg)$/i, '').toLowerCase(); // "dasty"
        map[key] = url; // хешований URL з assets
    }
    return map;
})();

/** ==== Резолвер джерела лого (ключ або прямий шлях) ==== */
const resolveBrandSrc = (imageField) => {
    if (!imageField) return '';

    // Якщо вже дано повний шлях/URL із розширенням — повертаємо як є
    if (
        imageField.startsWith('/') ||
        imageField.startsWith('http://') ||
        imageField.startsWith('https://') ||
        /\.(png|jpe?g|webp|svg)$/i.test(imageField)
    ) {
        return imageField;
    }

    // Інакше це "ключ" — шукаємо в assets-мапі
    const fromAssets = logoUrlByKey[norm(imageField)];
    if (fromAssets) return fromAssets;

    // Фолбек на public
    return `/images/brands/${imageField}.webp`;
};

export default function Products() {
    const { t } = useTranslation();
    const items = productsData.products || [];

    // Унікальні бренди з Brends.json (дедуп по name)
    const brands = useMemo(() => {
        const list = (brandsData?.brends || []).map((b) => ({
            key: norm(b.name),               // "dasty"
            name: (b.name ?? '').trim(),     // "Dasty"
            image: b.image || null,
            id: b.id || null,
        }));
        const map = new Map();
        for (const b of list) if (!map.has(b.key)) map.set(b.key, b);
        return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name, 'uk'));
    }, [brandsData]);

    const [openBrandKey, setOpenBrandKey] = useState(null);

    const toggleBrand = useCallback((key) => {
        setOpenBrandKey((cur) => (cur === key ? null : key));
    }, []);

    const productsByOpenBrand = useMemo(() => {
        if (!openBrandKey) return [];
        return items.filter((p) => norm(p.brand) === openBrandKey);
    }, [items, openBrandKey]);

    return (
        <section className={s.section}>
            <ResponsiveBanner
                showAll
                height="clamp(320px, 52vh, 560px)"
                overlay="linear-gradient(180deg, rgba(0,0,0,.55), rgba(0,0,0,.25))"
                className={s.bannerFull}
                positionDesktop="50% 32%"
                positionTablet="50% 40%"
                positionMobile="50% 48%"

                srcMobileWebp="/images/backgrounds/mobile/fon-mobile.webp"
                srcMobileJpg="/images/backgrounds/mobile/fon-mobile.jpg"

                srcDesktopWebp="/images/backgrounds/desktop/fon-desktop.webp"
                srcDesktopJpg="/images/backgrounds/desktop/fon-desktop.jpg"

                fallbackWidth={1920}
                fallbackHeight={560}
                alt={t('products.bannerAlt', { defaultValue: 'Корм для улюбленців — BSP Group' })}
            >
                <h1 className={s.bannerTitle}>{t('products.title', { defaultValue: 'Наша продукція' })}</h1>
                <p className={s.bannerLead}>
                    {t('products.lead', { defaultValue: 'Ми імпортуємо та дистриб’юємо якісні товари для ваших улюбленців.' })}
                </p>
            </ResponsiveBanner>





            <div className={s.container}>
                <Divider orientation="left">
                    {t('brands.all', { defaultValue: 'Бренди' })}
                </Divider>

                {/* Сітка брендів + інлайн-експандер під активним брендом */}
                <Row gutter={{ xs: [12, 16], sm: [16, 20], md: [24, 24] }}>
                    {brands.map((b, i) => (
                        <React.Fragment key={b.key || b.id || i}>
                            <Col xs={12} sm={8} lg={6}>
                                <button
                                    type="button"
                                    className={`${s.brandTile} ${openBrandKey === b.key ? s.active : ''}`}
                                    onClick={() => toggleBrand(b.key)}
                                    aria-expanded={openBrandKey === b.key}
                                    aria-controls={`brand-expander-${i}`}
                                >
                                    <div className={s.brandLogo} aria-hidden="true">
                                        {b.image ? (
                                            <Logo
                                                src={resolveBrandSrc(b.image)}
                                                alt={b.name}
                                                width={56}
                                                height={56}
                                                className={s.brandLogoImg}
                                                loading="lazy"
                                                onError={(e) => {
                                                    // якщо fallback на public .webp 404 — пробуємо .png
                                                    if (e.currentTarget.src.endsWith('.webp')) {
                                                        e.currentTarget.onerror = null;
                                                        e.currentTarget.src = `/images/brands/${b.image}.png`;
                                                    }
                                                }}
                                            />
                                        ) : (
                                            <span className={s.brandLetter}>{b.name?.[0] || 'B'}</span>
                                        )}
                                    </div>
                                    <div className={s.brandName}>{b.name}</div>
                                </button>
                            </Col>

                            {openBrandKey === b.key && (
                                <Col xs={24}>
                                    <div
                                        id={`brand-expander-${i}`}
                                        className={s.inlineExpander}
                                        role="region"
                                        aria-label={`Товари бренду ${b.name}`}
                                    >
                                        <div className={s.expanderHeader}>
                      <span>
                        {t('products.ofBrand', { defaultValue: 'Товари бренду' })}{' '}
                          <strong>{b.name}</strong>
                      </span>
                                            <button
                                                className={s.expanderClose}
                                                onClick={() => setOpenBrandKey(null)}
                                                aria-label={t('common.close', { defaultValue: 'Закрити' })}
                                            >
                                                ✕
                                            </button>
                                        </div>

                                        {productsByOpenBrand.length === 0 ? (
                                            <div className={s.empty}>
                                                {t('products.emptyBrand', { defaultValue: 'Поки немає товарів цього бренду.' })}
                                            </div>
                                        ) : (
                                            <Row gutter={{ xs: [12, 16], sm: [16, 20], md: [24, 24] }}>
                                                {productsByOpenBrand.map((p, k) => (
                                                    <Col key={p.id || p.image || k} xs={12} sm={8} lg={6}>
                                                        <ProductCard p={p} priority={k < 4} />
                                                    </Col>
                                                ))}
                                            </Row>
                                        )}
                                    </div>
                                </Col>
                            )}
                        </React.Fragment>
                    ))}
                </Row>
            </div>
        </section>
    );
}
