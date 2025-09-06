import React from 'react';
import styles from './Partners.module.scss';

import Epicentrk from '@/assets/partners/Epicentrk.svg';
import Rozetka from '@/assets/partners/logorozetka.svg';
import Spar from '@/assets/partners/spar-1.svg';
import Ambar from '@/assets/partners/Ambar.svg';
import Velmart from '@/assets/partners/Velmart.svg';
import Divochin from '@/assets/partners/divochin.svg';
import Kasta from '@/assets/partners/kasta.svg';
import Maudau from '@/assets/partners/Maudau.svg';

const partners = [
    { id: 1, name: 'Епіцентр', logo: Epicentrk },
    { id: 2, name: 'Rozetka', logo: Rozetka },
    { id: 3, name: 'SPAR', logo: Spar },
    { id: 4, name: 'Амбар', logo: Ambar },
    { id: 5, name: 'Velmart', logo: Velmart },
    { id: 6, name: 'Дивоцін', logo: Divochin },
    { id: 7, name: 'Kasta', logo: Kasta },
    { id: 8, name: 'Maudau', logo: Maudau },
];

export default function PartnersPage() {

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Наші партнери</h1>
            <p className={styles.subtitle}>
                Ми пишаємося співпрацею з провідними компаніями світу
            </p>

            <div className={styles.grid}>
                {partners.map((partner) => (
                    <div key={partner.id} className={styles.card}>
                        <img
                            src={partner.logo}
                            alt={partner.name}
                            className={styles.logo}
                        />
                        <span></span>
                    </div>
                ))}
            </div>
        </div>
    );
}
