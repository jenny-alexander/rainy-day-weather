import styles from './Modal.module.scss';
import {useEffect} from 'react';
interface ModalProps {
    title: string,
    content: [{
        description: string,
        start: number,
        end: number,
        event: string,
        sender_name: string
    }],
    actions: [{name: string, action: ()=>void}],
}

const Modal = ({title, actions, content} : ModalProps) : JSX.Element => {
    useEffect(() => {
        console.log('content is:', content)
    })
        return (
            <div className={styles.modalContainer}>
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        <div className={styles.modalTitle}>{title}</div>
                    </div>
    
                    <div className={styles.modalBodyContainer}>
                        <div className={styles.modalBody}>
                        {
                                    content.length > 0 ? 
                                        // <p>I see {content.length} alerts</p>
                                        content.map((content) => {
                                            return(
                                                <div className={styles.modalContent}>{content.description}</div>
                                            )
                                        })
                                        : null
                                }
                            <div className={styles.modalActions}>
                                {
                                    actions.length > 0 ?
                                    actions.map((action) => {
                                        return(
                                            <button onClick={()=> action.action()}>{action.name}</button>
                                        )
                                    }) : null
                                }
                            </div>
                        </div>
                    </div>
                </div>    
            </div>
        )
}

export default Modal;