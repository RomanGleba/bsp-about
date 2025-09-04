// src/data/backgrounds.js
export const backgrounds = {
    home: {
        mobileWebp: "/images/backgrounds/mobile/dogs-mobile.webp",
        mobileJpg:  "/images/backgrounds/mobile/dogs-mobile.jpg",
        tabletWebp: "/images/backgrounds/tablet/family-dogs-tablet.webp",
        tabletJpg:  "/images/backgrounds/tablet/family-dogs-tablet.jpg",
        desktopWebp:"/images/backgrounds/desktop/dogs-desktop.webp",
        desktopJpg: "/images/backgrounds/desktop/dogs-desktop.jpg",
        alt: "Собака та людина — BSP Group",
    },
    about: {

        mobileWebp: "/images/backgrounds/mobile/fura-mobile.webp",
        // якщо у тебе НЕМає fura-mobile.jpg — тимчасово можна лишити будь-який jpg як fallback
        // краще покласти реальний /images/backgrounds/mobile/fura-mobile.jpg і замінити нижче
        mobileJpg:  "/images/backgrounds/mobile/only-dogs-mobile.jpg",

        // tablet: переконайся, що ці файли справді існують у /public/images/backgrounds/tablet/
        // якщо їх нема — або додай, або підстав тимчасово інші (наприклад з desktop)
        tabletWebp: "/images/backgrounds/tablet/only-dogs-tablet.webp",
        tabletJpg:  "/images/backgrounds/tablet/only-dogs-tablet.jpg",

        // ✅ desktop: виправили ім'я файлу та заповнили jpg
        desktopWebp:"/images/backgrounds/desktop/fura-desktop.webp",
        // якщо немає fura-desktop.jpg — використовуй наявний dogs-desktop.jpg як fallback
        desktopJpg: "/images/backgrounds/desktop/dogs-desktop.jpg",

        alt: "Собака на природі — BSP Group",
    }
};
