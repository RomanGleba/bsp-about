import { Outlet, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import { useEffect } from 'react';
import Navbar from '@/components/navbar/Navbar.jsx';
import s from './App.module.scss';

const { Content } = Layout;

function ScrollTopOnRouteChange() {
    const { pathname } = useLocation();
    useEffect(() => {
        // без плавності, щоб не було «гойдалки»
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, [pathname]);
    return null;
}

export default function App() {
    const { pathname } = useLocation();

    // Повна ширина сторінки (герої/банери без відступів по краях і зверху/знизу)
    const isFlush = ['/', '/products'].some(
        p => pathname === p || pathname.startsWith(p + '/')
    );

    // Тільки зверху без відступу (напр., About з full-bleed героєм)
    const isFlushTop = ['/about'].some(
        p => pathname === p || pathname.startsWith(p + '/')
    );

    const contentClass =
        isFlush ? `${s.content} ${s['content--flush']}` :
            isFlushTop ? `${s.content} ${s['content--flushTop']}` :
                s.content;

    return (
        <Layout className={s.layout}>
            <Navbar />
            <ScrollTopOnRouteChange />
            <Content className={contentClass}>
                <Outlet />
            </Content>
        </Layout>
    );
}
