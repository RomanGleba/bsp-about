import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from '@/components/navbar/Navbar.jsx';
import s from './App.module.scss';

const { Content } = Layout;

function ScrollTopOnRouteChange() {
    const { pathname } = useLocation();
    useEffect(() => {
        // без плавності, щоб уникнути “гойдалки”
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, [pathname]);
    return null;
}

/**
 * Редірект на головну ТІЛЬКИ при першому відкритті вкладки.
 * Коли вкладку/браузер закривають, sessionStorage очищується,
 * тому наступного разу знову відкриється головна.
 * Reload у тій самій вкладці НЕ перенаправляє.
 */
function ForceHomeOnFirstOpen() {
    const nav = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        const handled = sessionStorage.getItem('firstOpenHandled');
        if (!handled) {
            sessionStorage.setItem('firstOpenHandled', '1');
            if (pathname !== '/') nav('/', { replace: true });
        }
    }, [nav, pathname]);

    return null;
}

export default function App() {
    const { pathname } = useLocation();

    // Повна ширина сторінки (герої/банери без відступів по краях і зверху/знизу)
    const isFlush = ['/', '/products'].some(
        (p) => pathname === p || pathname.startsWith(p + '/')
    );

    // Тільки зверху без відступу (напр., About із full-bleed героєм)
    const isFlushTop = ['/about'].some(
        (p) => pathname === p || pathname.startsWith(p + '/')
    );

    const contentClass = isFlush
        ? `${s.content} ${s['content--flush']}`
        : isFlushTop
            ? `${s.content} ${s['content--flushTop']}`
            : s.content;

    return (
        <Layout className={s.layout}>
            <Navbar />
            <ForceHomeOnFirstOpen />
            <ScrollTopOnRouteChange />
            <Content className={contentClass}>
                <Outlet />
            </Content>
        </Layout>
    );
}
