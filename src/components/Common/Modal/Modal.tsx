import styles from './Modal.module.scss';
interface ModalProps {
    show: boolean,
    title: string,
    actions: {},
}

const Modal = ({show, title, actions} : ModalProps) : JSX.Element => {
    const closeModal = () => {
        
    }


    // if (show) {
        return (
            <div className={styles.modalContainer}>
                <div className={styles.modal}>
                <div className={styles.modalHeaderContainer}>
                    <div className={styles.modalTitle}></div>
                </div>
    
                <div className={styles.modalBodyContainer}>
                    <div className={styles.modalBody}>
                        <div className={styles.modalContent}>
    
                        </div>
                        <div className={styles.modalActions}>
    
                        </div>
                    </div>
                </div>
                </div>
    
            </div>
        )
    // }else {
    //     return null;
    // }

}