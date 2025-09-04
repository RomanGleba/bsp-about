import { useEffect } from 'react';
import { Segmented, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import s from './LangSwitcher.module.scss';

const OPTIONS = [
    { value: 'ua', label: <span className={s.opt}>МОВА</span> },
    { value: 'en', label: <span className={s.opt}>EN</span> },
];

export default function LangSwitcher() {
    const { i18n } = useTranslation();
    const current = i18n.language?.startsWith('en') ? 'en' : 'ua';

    useEffect(() => {
        const saved = localStorage.getItem('lang');
        if (saved && saved !== current) i18n.changeLanguage(saved);
        document.documentElement.lang = (saved || current) === 'en' ? 'en' : 'uk';
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChange = (v) => {
        i18n.changeLanguage(v);
        localStorage.setItem('lang', v);
        document.documentElement.lang = v === 'en' ? 'en' : 'uk';
    };

    return (
        <Tooltip title={current === 'ua' ? 'Мова: Українська' : 'Language: English'}>
            {/* фіксована ширина всього свічера */}
            <Segmented
                aria-label="Language switcher"
                value={current}
                onChange={onChange}
                options={OPTIONS}
                size="small"
                className={s.switcher}
            />
        </Tooltip>
    );
}
