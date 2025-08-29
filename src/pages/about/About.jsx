import React from 'react';
import { Typography } from 'antd';
import {
    HistoryOutlined, TagsOutlined, RocketOutlined,
    CarOutlined, SafetyOutlined, HeartOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import s from './About.module.scss';

const { Title, Paragraph, Text } = Typography;

const Para = React.memo(({ children, className }) =>
    children ? <Paragraph className={className || s.text}>{children}</Paragraph> : null
);

const StatStrip = React.memo(({ stats = [] }) => {
    if (!stats?.length) return null;
    return (
        <div className={s.stats} role="list" aria-label="Company statistics">
            {stats.map((it, i) => (
                <div key={`${it.label}-${i}`} className={s.statItem} role="listitem">
                    <div className={s.statValue}>{it.value}</div>
                    <div className={s.statLabel}>{it.label}</div>
                </div>
            ))}
        </div>
    );
});

const BrandChips = React.memo(({ title, names = [] }) => {
    if (!names?.length) return null;
    return (
        <div className={s.brandBlock}>
            <Title level={4} className={s.h4}>{title}</Title>
            <div className={s.brandCloud} role="list">
                {names.map((name) => (
                    <div className={s.brandChip} key={name} role="listitem">{name}</div>
                ))}
            </div>
        </div>
    );
});

export default function About() {
    const { i18n } = useTranslation();

    // Автоматичний вибір файлу даних: AboutUs.en.json → для en, інакше AboutUs.json
    const about = React.useMemo(() => {
        // Збираємо всі JSON, що відповідають патерну
        const files = import.meta.glob('../../data/AboutUs*.json', { eager: true, import: 'default' });
        const hasEN = files['../../data/AboutUs.en.json'];
        if (i18n.language?.toLowerCase().startsWith('en') && hasEN) {
            return hasEN;
        }
        // дефолт — український файл
        return files['../../data/AboutUs.json'] || {};
    }, [i18n.language]);

    const title    = about?.title || '';
    const lead     = about?.lead || '';
    const slogan   = about?.slogan || '';
    const position = about?.position || '';

    const stats    = about?.stats || [];
    const sec      = about?.sections || {};
    const labels   = sec?.labels || {};
    const tt       = sec?.titles || {};

    const brands   = about?.brands || {};
    const own      = brands?.own || [];
    const ua       = brands?.exclusive_ukraine || [];
    const regions  = brands?.exclusive_region || [];
    const note     = brands?.distributed_note;

    const growthText =
        sec?.brands_intro ||
        ((own.length || ua.length)
            ? `Маємо ${own.length} власні ТМ та ${ua.length} ексклюзивні ТМ в Україні.`
            : '');

    const blocks = [
        sec?.history && { key: 'history',     title: tt?.history,     icon: <HistoryOutlined />, text: sec.history },
        growthText   && { key: 'growth',      title: tt?.growth,      icon: <RocketOutlined />,  text: growthText },
        regions.length > 0 && { key: 'brands', title: tt?.brands,      icon: <TagsOutlined />,   text: sec.exclusive_region },
        sec?.distribution && { key: 'distribution', title: tt?.distribution, icon: <TagsOutlined />, text: sec.distribution },
        sec?.logistics &&    { key: 'logistics',    title: tt?.logistics,    icon: <CarOutlined />,    text: sec.logistics },
        sec?.quality &&      { key: 'quality',      title: tt?.quality,      icon: <SafetyOutlined />, text: sec.quality },
        (sec?.gratitude_partners || sec?.gratitude_army || sec?.patriotism || sec?.promise || sec?.position) && {
            key: 'gratitude',
            title: tt?.gratitude,
            icon: <HeartOutlined />,
            text: [sec.position, sec.promise, sec.gratitude_partners, sec.gratitude_army, sec.patriotism]
                .filter(Boolean).join(' ')
        }
    ].filter(Boolean);

    return (
        <main className={s.page}>
            {/* FULLSCREEN HERO без зображень */}
            <section className={s.hero} aria-labelledby="about-title">
                <div className={s.heroBg} aria-hidden />
                <div className={s.heroGlass}>
                    <div className={s.heroInner}>
                        {slogan && <Text className={s.kicker}>{slogan}</Text>}
                        <span className={s.kickerLine} aria-hidden />
                        <Title id="about-title" level={1} className={s.title}>{title}</Title>
                        {lead && <Paragraph className={s.lead}>{lead}</Paragraph>}
                        {position && <Paragraph className={s.position}>{position}</Paragraph>}
                        <StatStrip stats={stats} />
                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <section className={s.section}>
                <div className={s.container}>
                    <section className={s.brandsSummary} aria-labelledby="brands-summary-title">
                        <Title level={2} id="brands-summary-title" className={s.h2}>
                            {labels?.brands_summary_title || 'Бренди та партнерства'}
                        </Title>
                        <BrandChips title={labels?.own || 'Власні ТМ'}     names={own} />
                        <BrandChips title={labels?.ua || 'Ексклюзивні ТМ в Україні'}      names={ua} />
                        <BrandChips title={labels?.regions || 'Ексклюзивні ТМ у регіонах'} names={regions} />
                        {note && <Para className={s.note}>{note}</Para>}
                    </section>

                    <div className={s.timeline}>
                        <div className={s.rail} aria-hidden />
                        {blocks.map((b) => (
                            <article key={b.key} className={s.card}>
                                <span className={s.pin} aria-hidden />
                                <div className={s.body}>
                                    <div className={s.head}>
                                        <span className={s.icon}>{b.icon}</span>
                                        <Title level={3} className={s.h3}>{b.title}</Title>
                                    </div>
                                    <Para>{b.text}</Para>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
