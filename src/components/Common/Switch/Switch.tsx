import styles from './Switch.module.scss';
interface SwitchProps {
    isToggled: boolean;
    title: string,
    onToggle: () => void;
}
const Switch = ({isToggled, onToggle, title}: SwitchProps) : JSX.Element => {
    
    return (
        <div className={styles.switchContainer}>
            <label className={styles.switch}>
                <input title={title} type="checkbox" checked={isToggled} 
                    onChange={onToggle}
                />
                <span className={styles.slider}></span>
                <span className={styles.labels}></span>   
                <span aria-hidden="true"></span>    
            </label>
            
        </div>
    )
}

export default Switch;