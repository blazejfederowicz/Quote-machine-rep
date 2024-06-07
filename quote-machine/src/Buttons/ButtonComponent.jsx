import Styles from './button.module.css'
import PropTypes from 'prop-types'

const ButtonComponent = ({
    purple="Place Holder",
    white='Place Holder'
}) =>{
    const purpleLen = purple.trim().length;
    const whiteLen =white.trim().length;

    const maxLen = Math.max(purpleLen,whiteLen);

    const buttonWidth = `${maxLen}rem`

    return(
    <div className={Styles.buttonContainer}>
        <button className={Styles.purpleButton} style={{width: buttonWidth}}>{purple}</button>
        <button className={Styles.whiteButton} style={{width: buttonWidth}}>{white}</button>
    </div>);
}

ButtonComponent.propTypes = {
    purple: PropTypes.string,
    white: PropTypes.string
}

export default ButtonComponent
