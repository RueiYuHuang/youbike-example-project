import PropTypes from 'prop-types'
import './index.scss'

const CustomTable = ({children}) => {

  return (
    <table className="custom-table">
      {children}
    </table>
  )
}

export default CustomTable

CustomTable.propTypes = {
  children: PropTypes.node,
}