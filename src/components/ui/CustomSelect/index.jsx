import PropTypes from 'prop-types'
import { useState } from "react"
import './index.scss'

const CustomSelect = ({data, setData, selectDatas ,placeholder}) => {
    
  const [selectIsActive, setSelectIsActive] = useState(false)
  const handleSelectAvtice = () => {
    setSelectIsActive((prev) => !prev)
  }
  return (
    <div className={`custom-select ${selectIsActive && 'custom-select--active'}`} onClick={handleSelectAvtice}>
      <input type="text" value={data} className="select" placeholder={placeholder} readOnly/>
      <div className="option">
        {selectDatas.map((data) => {
          return (
            <div className="option__item" key={data.id} onClick={() => {setData(data.content)}}>{data.content}</div>
          )
        })}
      </div>
    </div>
  )
}

export default CustomSelect

CustomSelect.propTypes = {
  data: PropTypes.node,
  setData: PropTypes.func,
  selectDatas: PropTypes.array,
  placeholder: PropTypes.string
}