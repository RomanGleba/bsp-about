import React from 'react';
import s from './Logo.module.scss';
import defaultLogo from '@/assets/logo/bsp.svg';

export default function Logo({
                                 src,
                                 alt = 'BSP Group',
                                 width = 180,
                                 height = 44,
                                 compact = false,
                                 className = '',
                                 loading = 'lazy',
                                 onError,
                             }) {
    const w = compact ? Math.round(width / 2) : width;
    const h = compact ? Math.round(height / 2) : height;

    return (
        <div className={`${s.logo} ${className}`}>
            <img
                src={src || defaultLogo}
                alt={alt}
                width={w}
                height={h}
                className={s.img}
                loading={loading}
                decoding="async"
                onError={onError}
            />
        </div>
    );
}
