import styles from './Switch.module.scss';
interface SwitchProps {
    isToggled: boolean;
    onToggle: () => void;
}
const Switch = ({isToggled, onToggle}: SwitchProps) : JSX.Element => {

    return (
        <div className={styles.switchContainer}>
            <label className={styles.switch}>
                <input type="checkbox" checked={isToggled} 
                onChange={onToggle}
                />
                <span className={styles.slider}></span>
                <span className={styles.labels} data-farenheit="F°" data-celcius="C°"></span>              
            </label>
        </div>
    )
}

export default Switch;