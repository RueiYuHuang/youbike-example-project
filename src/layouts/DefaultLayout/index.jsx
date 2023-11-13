import PropTypes from 'prop-types'
import Header from '@/components/Header'
import './index.scss'
function DefaultLayout({ children }) {
  return (
    <div className='default-layout'>
      <Header />
      <div className='backdrop'>
        <div className='main'>{ children }</div>
      </div>
    </div>
    
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.node,
}

export default DefaultLayout