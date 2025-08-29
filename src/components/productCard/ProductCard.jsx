import React from 'react';
import { Card, Typography } from 'antd';
import ProductImage from '@/ui/background/media/productImage/ProductImage.jsx';
import s from './ProductCard.module.scss';

const { Title } = Typography;

export default function ProductCard({ p, priority = false }) {
    return (
        <Card
            className={s.productCard}
            variant="outlined"                          // сучасна альтернатива bordered
            styles={{ body: { padding: 16 }}}          // заміна bodyStyle
            role="group"
            aria-label={p?.name || 'Картка товару'}
        >
            <div className={s.media} aria-hidden="true">
                <div className={s.mediaInner}>
                    <ProductImage
                        imageKey={p.image || p.id}
                        alt={p.name || 'Фото товару'}
                        fetchPriority={priority ? 'high' : 'auto'}
                        loading={priority ? 'eager' : 'lazy'}
                        /* single */                          // зніми коментар, якщо немає tablet-версій
                    />
                </div>
            </div>

            <Title level={5} className={s.title}>
                {p.name}
            </Title>
        </Card>
    );
}
