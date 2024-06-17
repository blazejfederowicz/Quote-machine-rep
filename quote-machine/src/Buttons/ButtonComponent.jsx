import Styles from './button.module.css'
import PropTypes from 'prop-types'

const ButtonComponent = ({
    purple="Place Holder",
    white='Place Holder',
    onclickPurple,
    onclickWhite
}) =>{
    const purpleLen = purple.trim().length;
    const whiteLen =white.trim().length;

    const maxLen = Math.max(purpleLen,whiteLen);

    const buttonWidth = `${maxLen}rem`

    return(
    <div className={Styles.buttonContainer}>
        <button type='button' className={Styles.purpleButton} style={{width: buttonWidth}} onClick={onclickPurple}>{purple}</button>
        <button type='button' className={Styles.whiteButton} style={{width: buttonWidth}} onClick={onclickWhite}>{white}</button>
    </div>);
}

ButtonComponent.propTypes = {
    purple: PropTypes.string,
    white: PropTypes.string,
    onclickPurple: PropTypes.func,
    onclickWhite: PropTypes.func
}

export default ButtonComponent
