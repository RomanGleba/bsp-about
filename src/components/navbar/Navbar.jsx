import React, { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { PhoneOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import LangSwitcher from '../lang/LangSwitcher';
import Logo from '../../ui/logo/Logo.jsx';
import s from './Navbar.module.scss';

export default function Navbar() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const navItems = useMemo(
        () => [
            { key: '/',         label: t('header.home'),     to: '/' },
            { key: '/products', label: t('header.products'), to: '/products' },
            {key: '/partners', label: t('header.partners'), to: '/partners' },
        ],
        [t],
    );

    const activeKey = useMemo(() => {
        const match = navItems
            .map((i) => i.key)
            .filter((k) => pathname === k || pathname.startsWith(k + '/'))
            .sort((a, b) => b.length - a.length)[0];
        return match || '/';
    }, [pathname, navItems]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 2);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // блокувати скрол сторінки, коли відкрите меню
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = open ? 'hidden' : prev || '';
        return () => { document.body.style.overflow = prev; };
    }, [open]);

    // закривати по Escape
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === 'Escape' && setOpen(false);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open]);

    const toContacts = () => navigate('/contacts');

    return (
        <header className={`${s.header} ${scrolled ? s.scrolled : ''}`} role="banner">
            <div className={s.inner}>
                <Link to="/" className={s.logo} aria-label="BSP Group — на головну">
                    <Logo width={150} height={30} className={s.logoShift} />
                </Link>

                {/* Desktop navigation */}
                <nav className={s.navDesktop} aria-label="Головна навігація">
                    <ul className={s.menu}>
                        {navItems.map((i) => (
                            <li key={i.key}>
                                <NavLink
                                    to={i.to}
                                    className={({ isActive }) =>
                                        isActive || activeKey === i.key ? `${s.navLink} ${s.navLinkActive}` : s.navLink
                                    }
                                >
                                    {i.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Actions (праворуч) */}
                <div className={s.actions}>
                    {/* тільки на десктопі */}
                    <div className={s.onlyDesktop}>
                        <LangSwitcher />
                    </div>

                    <Button
                        type="primary"
                        shape="round"
                        className={s.cta}
                        icon={<PhoneOutlined />}
                        onClick={toContacts}
                        aria-label={t('header.contact')}
                    >
                        {t('header.contact')}
                    </Button>

                    <Button
                        className={s.burger}
                        type="text"
                        icon={<MenuOutlined />}
                        aria-label={t('header.menu') || 'Меню'}
                        onClick={() => setOpen(true)}
                    />
                </div>
            </div>

            {/* MOBILE FULLSCREEN MENU */}
            <aside
                className={`${s.sidebar} ${open ? s.open : ''}`}
                role="dialog"
                aria-modal="true"
                aria-label={t('header.menu') || 'Меню'}
            >
                <div className={s.sidebarHeader}>
                    <Link to="/" className={s.logo} onClick={() => setOpen(false)} aria-label="На головну">
                        <Logo width={130} height={36} compact />
                    </Link>
                    <Button
                        type="text"
                        icon={<CloseOutlined />}
                        aria-label="Закрити меню"
                        onClick={() => setOpen(false)}
                    />
                </div>

                {/* верхній ряд дій: UA/ENG • Instagram • CTA */}
                <div className={s.sidebarTop}>
                    <LangSwitcher />
                    <Button
                        type="primary"
                        shape="round"
                        className={s.cta}
                        icon={<PhoneOutlined />}
                        onClick={() => { setOpen(false); toContacts(); }}
                        aria-label={t('header.contact')}
                    >
                        {t('header.contact')}
                    </Button>
                </div>

                <nav className={s.sidebarNav} aria-label="Мобільна навігація">
                    <ul>
                        {navItems.map((i) => (
                            <li key={i.key}>
                                <NavLink
                                    to={i.to}
                                    onClick={() => setOpen(false)}
                                    className={({ isActive }) =>
                                        isActive || activeKey === i.key ? `${s.navLink} ${s.navLinkActive}` : s.navLink
                                    }
                                >
                                    {i.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </header>
    );
}
