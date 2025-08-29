import React from 'react';
import s from './Logo.module.scss';
import logoUrl from '../../assets/logo/bsp.svg';

/**
 * @param {object} props
 * @param {number} [props.width=180]
 * @param {number} [props.height=44]
 * @param {boolean} [props.compact]
 * @param {string} [props.className]
 */
export default function Logo({ width = 180, height = 44, compact = false, className = '' }) {
    return (
        <div
            className={`${s.logo} ${className}`}
            aria-label="BSP Group"
            role="img"
        >
            <img
                src={logoUrl}
                alt="BSP Group"
                width={compact ? width / 2 : width}
                height={compact ? height / 2 : height}
                className={s.img}
                loading="eager"
            />
        </div>
    );
}
