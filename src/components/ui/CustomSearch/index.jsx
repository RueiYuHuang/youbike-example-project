import PropTypes from 'prop-types'
import { useState } from "react"
import './index.scss'

const CustomSearch = ({search, setSearch, defineSearch, setDefineSearch, searchDatas, placeholder}) => {
  const [searchIsActive, setSearchIsActive] = useState(false)
  
  // 綁定搜尋
  const searchData = (e) => {
    if(e.target.value === ''){
      setDefineSearch('')
    }
    setSearch(e.target.value)
  }
  
  // 搜尋結果
  const searchResult = searchDatas.reduce((prev, next) => {
    return search !== '' && next.sna.split('_')[1].indexOf(search) !== -1? [...prev, next.sna.split('_')[1]] : prev
  },[])
  
  // 選擇搜尋結果
  const handleDefineSearch = (data) => {
    setSearch(data)
    setDefineSearch(data);
    setSearchIsActive(false)
  }

  return (
    <div className={`custom-search ${searchIsActive && 'custom-search--active'}`}>
      <input type="text" className={`search ${search === defineSearch && 'search--active'}`} placeholder={placeholder} value={search} onChange={searchData} onFocus={() => {setSearchIsActive(true)}} />
      <div className="preview">
        {searchResult && searchResult.map((data, index) => {
          return (
            <div className={`preview__item ${data === defineSearch &&'preview__item--active'}`} key={index} onClick={() => handleDefineSearch(data)}>{data}</div>
          )
        })}
      </div>
      <div className={`search-logo ${ search !== '' && search === defineSearch && 'search-logo--active'}`}>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}

export default CustomSearch

CustomSearch.propTypes = {
  search: PropTypes.string,
  setSearch: PropTypes.func,
  defineSearch: PropTypes.string,
  setDefineSearch: PropTypes.func,
  searchDatas: PropTypes.array,
  placeholder: PropTypes.string
}