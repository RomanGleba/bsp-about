import React, { useLayoutEffect } from 'react';
import { Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import BackgroundImage from '@/ui/background/BackgroundImage.jsx';
import s from './Home.module.scss';

export default function Home() {
    const nav = useNavigate();
    const { t } = useTranslation();

    useLayoutEffect(() => {
        const header =
            document.querySelector('header') ||
            document.querySelector('nav') ||
            document.querySelector('.navbar') ||
            document.querySelector('#navbar');

        const h = header ? header.getBoundingClientRect().height : 0;
        document.documentElement.style.setProperty('--navbar-h', `${Math.round(h)}px`);

        document.body.classList.add('no-scroll');
        return () => document.body.classList.remove('no-scroll');
    }, []);

    return (
        <section className={s.hero} aria-labelledby="hero-title">
            <BackgroundImage />
            <div className={s.overlay} aria-hidden="true" />

            <div className={s.inner}>
                <div className={s.copy}>
                    <Space direction="vertical" size={10} className={s.kickerWrap}>
                        <span className={s.kicker}>{t('home.slogan')}</span>
                        <span className={s.kickerLine} />
                    </Space>

                    <h1 id="hero-title" className={s.title}>
                        {t('home.headline')}
                    </h1>

                    <p className={s.lead}>{t('home.lead')}</p>

                    <div className={s.cta}>
                        <Button
                            type="primary"
                            size="large"
                            shape="round"
                            onClick={() => nav('/about')}
                            icon={<RightOutlined />}
                            aria-label={t('home.cta_about')}
                            className={s.ctaBtn}
                        >
                            {t('home.cta_about')}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
