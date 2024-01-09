import { useState, useEffect } from 'react';
import styles from './Alert.module.scss';
import Modal from '../Common/Modal/Modal';
import { config } from '../../config/appConfig';
import { IWeatherResponseDTO } from '../../ts/interfaces/weather.interface';

type AlertProps = {
    weatherProp: IWeatherResponseDTO
    show: boolean
    themeProp: string
    setShow: (value: boolean) => void
}

const Alert = ({ weatherProp, show, themeProp, setShow }: AlertProps): JSX.Element => {
    const [weather, setWeather] = useState<IWeatherResponseDTO>();
    const [showModal, setShowModal] = useState<boolean>(show);
    const [theme, setTheme] = useState<string>('');

    useEffect(() => {
        setShowModal(show);
    }, [show]);

    useEffect(() => {
        setWeather(weatherProp);
    }, [weatherProp]);

    useEffect(() => {
        setTheme(themeProp);
    }, [themeProp]);

    return (
        <Modal show={showModal}
            setShow={setShowModal}
            // config={config.alertModal}
            wrapperId='modal-portal'
            theme={theme}>
            <div className={styles.modalContainer}>
                <div className={styles.modal}>
                    <div className={styles.modalTitle}>{config.alertModal.title}</div>
                    <div className={styles.modalBody}>
                        <div className={styles.modalContentContainer} tabIndex={0} >
                            {weather?.alerts && weather.alerts.length > 0 && (
                                weather.alerts.map((alert, index: number) => {
                                    return (
                                        <div className={styles.modalContent} key={alert + "-" + index}>{alert.description}</div>
                                    )
                                })
                            )}
                        </div>
                        <div className={styles.modalActions}>
                            <div className={styles.actionButtons}>
                                <button onClick={() => setShow(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
export default Alert;