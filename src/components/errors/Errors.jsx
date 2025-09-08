import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { WifiOutlined, CloseCircleFilled } from "@ant-design/icons";
import s from "./Errors.module.scss";

export default function Errors({ children }) {
    const [online, setOnline] = useState(navigator.onLine);

    useEffect(() => {
        const on = () => setOnline(true);
        const off = () => setOnline(false);
        window.addEventListener("online", on);
        window.addEventListener("offline", off);
        return () => {
            window.removeEventListener("online", on);
            window.removeEventListener("offline", off);
        };
    }, []);

    if (!online) {
        return (
            <div className={s.fullscreen}>
                <div className={s.icon}>
                    <WifiOutlined />
                    <CloseCircleFilled className={s.close} />
                </div>
                <h1 className={s.title}>Немає інтернету</h1>
                <p className={s.subtitle}>Перевірте підключення та спробуйте ще раз</p>
                <Button type="primary" onClick={() => window.location.reload()}>
                    Оновити сторінку
                </Button>
            </div>
        );
    }

    return children;
}
