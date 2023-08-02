import PropTypes from 'prop-types';
import style from './Button.module.css';

const Button = ({ onBtnClick }) => {
  return (
    <div className={style.btnContainer}>
      <button className={style.button} type="button" onClick={onBtnClick}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  onButtonClick: PropTypes.func,
};

export default Button;
