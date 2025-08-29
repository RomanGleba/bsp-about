import React from 'react';
import { Card, Typography } from 'antd';
import { PhoneOutlined, MailOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import InstagramLink from '@/ui/logo/socialNetwork/InstagramLink.jsx';
import s from './Contact.module.scss';

const { Title, Paragraph, Text } = Typography;


const CONTACTS = {
    phone: '+380979445353',
    email: 'info@bsp-group.ua ',
    address: 'Україна, Закарпатська обл., м. Ужгород, вул. Трудова, 2 ',
    instagramLabel: 'Instagram',
};

export default function Contacts() {
    const { t } = useTranslation();

    return (
        <section className={s.section} aria-labelledby="contacts-title">
            <div className={s.container}>
                <header className={s.header}>
                    <Title id="contacts-title" level={1} className={s.h1}>
                        {t('contacts.title', 'Контакти')}
                    </Title>
                    <Paragraph className={s.lead}>
                        {t('contacts.lead', 'Ми завжди на звʼязку. Оберіть зручний спосіб — і напишіть або подзвоніть.')}
                    </Paragraph>
                </header>

                <Card variant="outlined" className={s.card} styles={{ body: { padding: 20 } }}>
                    <ul className={s.list} aria-label={t('contacts.title', 'Контакти')}>
                        <li className={s.item}>
                            <PhoneOutlined className={s.icon} />
                            <div className={s.itemBody}>
                                <span className={s.label}>{t('contacts.phone', 'Телефон')}</span>
                                <a
                                    href={`tel:${CONTACTS.phone.replace(/\s+/g, '')}`}
                                    className={s.link}
                                >
                                    {CONTACTS.phone}
                                </a>
                            </div>
                        </li>

                        <li className={s.item}>
                            <MailOutlined className={s.icon} />
                            <div className={s.itemBody}>
                                <span className={s.label}>Email</span>
                                <a href={`mailto:${CONTACTS.email}`} className={s.link}>
                                    {CONTACTS.email}
                                </a>
                            </div>
                        </li>

                        <li className={s.item}>
                            <EnvironmentOutlined className={s.icon} />
                            <div className={s.itemBody}>
                                <span className={s.label}>{t('contacts.address', 'Адреса')}</span>
                                <Text className={s.text}>{CONTACTS.address}</Text>
                            </div>
                        </li>

                        <li className={`${s.item} ${s.itemInline}`}>
                            <InstagramLink className={s.ig} size={22} />
                            <div className={s.itemBody}>
                                <span className={s.label}>{t('contacts.social', 'Соціальні мережі')}</span>
                                <Text className={s.text}>{CONTACTS.instagramLabel}</Text>
                            </div>
                        </li>
                    </ul>

                    <Paragraph className={s.note}>
                        {t('contacts.note', 'Графік: Пн–Пт, 09:00–18:00')}
                    </Paragraph>
                </Card>
            </div>
        </section>
    );
}
