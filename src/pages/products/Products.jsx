import React, { useMemo, useState, useCallback } from 'react';
import { Row, Col, Divider } from 'antd';
import { useTranslation } from 'react-i18next';

import productsData from '@/data/json/Products.json';
import brandsData from '@/data/json/Brends.json';
import ProductCard from '@/components/productCard/ProductCard.jsx';
import ResponsiveBanner from '@/ui/background/ResponsiveBanner.jsx';
import Logo from '@/ui/logo/Logo.jsx';
import s from './Products.module.scss';

// helpers
const normKey = (v) => (v ?? '').toString().trim().toLowerCase().replace(/\s+/g, '-');
const hasExt = (s='') => /\.(png|jpe?g|webp|svg)$/i.test(s);
const isAbs  = (s='') => /^\/|^https?:\/\//i.test(s);

// мапа логотипів із src/assets/brands/*
const logoUrlByKey = (() => {
    const mods = import.meta.glob('@/assets/brands/*.{png,jpg,jpeg,webp,svg}', { eager: true, as: 'url' });
    const map = {};
    for (const [path, url] of Object.entries(mods)) {
        const file = path.split('/').pop();
        const key = normKey(file.replace(/\.(png|jpe?g|webp|svg)$/i, ''));
        map[key] = url;
    }
    return map;
})();

// резолвер src для лого бренду
const resolveBrandSrc = (brand) => {
    const keyFromName = normKey(brand.name);
    const img = (brand.image || '').trim();

    if (img) {
        if (!isAbs(img) && !hasExt(img)) {
            const k = normKey(img);
            return logoUrlByKey[k] || `/images/brands/${k}.webp`;
        }
        return img; // абсолютний шлях або вже з розширенням
    }
    return logoUrlByKey[keyFromName] || `/images/brands/${keyFromName}.webp`;
};

export default function Products() {
    const { t } = useTranslation();
    const items = productsData?.products || [];

    // унікальні бренди (дедуп за назвою)
    const brands = useMemo(() => {
        const list = (brandsData?.brends || []).map((b) => ({
            key: normKey(b.name),
            name: (b.name ?? '').trim(),
            image: b.image || null,
            id: b.id || null,
        }));
        const map = new Map();
        for (const b of list) if (!map.has(b.key)) map.set(b.key, b);
        return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name, 'uk'));
    }, [brandsData]);

    const [openBrandKey, setOpenBrandKey] = useState(null);
    const toggleBrand = useCallback((key) => setOpenBrandKey((cur) => (cur === key ? null : key)), []);

    // товари активного бренду
    const productsByOpenBrand = useMemo(() => {
        if (!openBrandKey) return [];
        return items.filter((p) => normKey(p.brand) === openBrandKey);
    }, [items, openBrandKey]);

    return (
        <section className={s.section}>
            <ResponsiveBanner
                height="clamp(320px, 52vh, 560px)"
                overlay="linear-gradient(180deg, rgba(0,0,0,.55), rgba(0,0,0,.25))"
                className={s.bannerFull}
                positionDesktop="50% 32%"
                positionTablet="50% 40%"
                positionMobile="50% 48%"
            >
                <div className={s.bannerContent}>
                    <h1 className={s.bannerTitle}>
                        {t('products.title', { defaultValue: 'Наша продукція' })}
                    </h1>
                    <p className={s.bannerLead}>
                        {t('products.lead', { defaultValue: 'Ми імпортуємо та дистриб’юємо якісні товари для ваших улюбленців.' })}
                    </p>
                </div>
            </ResponsiveBanner>

            <div className={s.container}>
                <Divider orientation="left">
                    {t('brands.all', { defaultValue: 'Продукція' })}
                </Divider>

                {/* Сітка брендів; під активним просто з’являються товари без “блоку” */}
                <Row gutter={{ xs: [12, 16], sm: [16, 20], md: [24, 24] }}>
                    {brands.map((b, i) => {
                        const logoSrc = resolveBrandSrc(b);

                        const openThis = () => {
                            toggleBrand(b.key);
                        };
                        const onKey = (e) => {
                            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openThis(); }
                        };

                        return (
                            <React.Fragment key={b.key || b.id || i}>
                                <Col xs={12} sm={8} lg={6}>
                                    <button
                                        type="button"
                                        className={`${s.brandTile} ${openBrandKey === b.key ? s.active : ''}`}
                                        onClick={openThis}
                                        onKeyDown={onKey}
                                        aria-expanded={openBrandKey === b.key}
                                        aria-controls={`brand-products-${i}`}
                                    >
                                        <div className={s.brandLogo} aria-hidden="true">
                                            {b.image ? (
                                                <Logo
                                                    src={logoSrc}
                                                    alt={b.name}
                                                    width={56}
                                                    height={56}
                                                    className={s.brandLogoImg}
                                                    loading="lazy"
                                                    onError={(e) => {
                                                        const imgEl = e.currentTarget; imgEl.onerror = null;
                                                        if (/\/images\/brands\/.+\.webp$/i.test(logoSrc)) { imgEl.src = logoSrc.replace(/\.webp$/i, '.png'); return; }
                                                        if (/\/images\/brands\/.+\.png$/i.test(logoSrc))  { imgEl.src = logoSrc.replace(/\.png$/i,  '.jpg'); return; }
                                                        const key = normKey(b.image || b.name);
                                                        imgEl.src = `/images/brands/${key}.png`;
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
                                    <Col xs={24} id={`brand-products-${i}`} className={s.brandProducts}>
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
                                    </Col>
                                )}
                            </React.Fragment>
                        );
                    })}
                </Row>
            </div>
        </section>
    );
}
