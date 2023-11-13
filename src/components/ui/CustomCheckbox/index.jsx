import PropTypes from 'prop-types'
import './index.scss'

const CustomCheckbox = ({value = '' , checked, onChange, children}) => {

  return (
    <label className="custom-checkbox">
      <input type="checkbox" value={value} checked={checked} onChange={onChange}/>
      &nbsp;&nbsp;{children}
      <span className="checkmark"></span>
    </label>
  )
}

export default CustomCheckbox

CustomCheckbox.propTypes = {
  children: PropTypes.node,
  value: PropTypes.any,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
}