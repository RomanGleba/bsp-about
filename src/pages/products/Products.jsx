import React from 'react';
import { Row, Col, Divider } from 'antd';
import { useTranslation } from 'react-i18next';

import data from '@/data/products.json';
import ProductCard from '@/components/productCard/ProductCard.jsx';
import ResponsiveBanner from '@/ui/background/ResponsiveBanner.jsx';
import s from './Products.module.scss';

export default function Products() {
    const { t } = useTranslation();
    const items = data.products || [];

    return (
        <section className={s.section}>
            {/* full-bleed банер (можеш прибрати, якщо не потрібен) */}
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
                        {t('products.lead', {
                            defaultValue:
                                'Ми імпортуємо та дистриб’юємо якісні товари для ваших улюбленців.'
                        })}
                    </p>
                </div>
            </ResponsiveBanner>

            <div className={s.container}>
                <Divider orientation="left">
                    {t('products.all', { defaultValue: 'Вся продукція' })}
                </Divider>

                {/* 2 колонки на вузьких, 3 на планшеті, 4 на десктопі */}
                <Row gutter={{ xs: [12, 16], sm: [16, 20], md: [24, 24] }}>
                    {items.map((p, i) => (
                        <Col key={p.id || p.image} xs={12} sm={8} lg={6}>
                            <ProductCard p={p} priority={i < 6} />
                        </Col>
                    ))}
                </Row>
            </div>
        </section>
    );
}
