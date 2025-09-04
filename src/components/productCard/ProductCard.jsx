import React, { useCallback } from 'react';
import { Card, Typography } from 'antd';
import ProductImage from '@/ui/background/media/productImage/ProductImage.jsx';
import s from './ProductCard.module.scss';

const { Title } = Typography;

export default function ProductCard({ p, priority = false, onClick }) {
    const onKeyDown = useCallback((e) => {
        if (!onClick) return;
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
        }
    }, [onClick]);

    return (
        <Card
            className={s.productCard}
            variant="outlined"
            role={onClick ? 'button' : 'group'}
            tabIndex={onClick ? 0 : -1}
            aria-label={p?.name || 'Картка товару'}
            onClick={onClick}
            onKeyDown={onKeyDown}
            hoverable={!!onClick}
            styles={{ body: { padding: 18 } }}
        >
            {/* Світлий контейнер під фото — однаковий розмір для всіх */}
            <div className={s.media} aria-hidden="true">
                <div className={s.mediaInner}>
                    <ProductImage
                        imageKey={p.image || p.id}
                        alt={p.name || 'Фото товару'}
                        fetchPriority={priority ? 'high' : 'auto'}
                        loading={priority ? 'eager' : 'lazy'}
                        sizes="(max-width: 576px) 50vw, (max-width: 992px) 33vw, 25vw"
                        single={p.single === true}
                        basePath="/images/products"
                        tabletDir="table"
                    />
                </div>
            </div>

            {/* Назва у два рядки з однаковою висотою */}
            <Title level={5} className={s.title}>{p.name}</Title>
        </Card>
    );
}
