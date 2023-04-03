import React from 'react';
import styles from './Highlights.module.scss';
//import cx from 'classnames';

const Highlights: React.FC = () => {
    return (
        <div className={styles.highlights}>
            <div className={styles.highlightsTitle}>Today's Highlights</div>
        </div>
    )
}

export default Highlights;