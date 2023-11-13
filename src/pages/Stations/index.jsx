import './index.scss'
import { useState } from "react"
import axios from "axios"
import DefaultLayout from "@/layouts/DefaultLayout"
import { cityLocation } from "@/utils/location"

// img
import background from '@/assets/background.png'

// components
import CustomSelect from "@/components/ui/CustomSelect"
import CustomSearch from "@/components/ui/CustomSearch"
import CustomCheckbox from "@/components/ui/CustomCheckbox"
import CustomTable from "@/components/ui/CustomTable"

const Stations = () => {
  const [originalDatas, setOriginalDatas ] = useState([])
  const [city, setCity ] = useState('')
  const [dist, setDist ] = useState([])
  const [filterDist, setFilterDist ] = useState([])
  const [allDist, setAllDist ] = useState(true)
  const [search, setSearch] = useState('')
  const [defineSearch, setDefineSearch] = useState('')

  // 選擇縣市
  const selectCity = (city) => {
    //  初始化資料
    setOriginalDatas([])
    setSearch('')
    setDefineSearch('')
    setDist([])

    setCity(city)
    fetchData(city)
  }

  // 初始化地區資料
  const distInit = (datas) => {
    // 過濾重複地區
    const newDist = datas.reduce((prev, next) => {
      const findIndex = prev.findIndex((data) => data.dist === next.sarea)
      return findIndex === -1 ? [...prev, {dist: next.sarea, checked: true}] : prev
    },[])
    setDist(newDist)
    // 更新已勾選
    checkedDistResult(newDist)
    setAllDist(true)
  } 

  const fetchData = async (city) => {
    try {
      let url = ''
      switch (city) {
        case '臺北市':
          url = 'https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json'
          break;
        default:
          url = 'https://mocki.io/v1/ac5ccee7-6dad-4f25-8c1d-59c7555eedac'
          break;
      }
      const res = await axios.get(url)
      setOriginalDatas(res.data)
      distInit(res.data)
    }catch(e){
      console.log(e)
    }
  }

  // 已勾選結果
  const checkedDistResult = (newDist) => {
    const newFilterDist = newDist.reduce((prev, next) => {
      return next.checked === true? [...prev, next.dist] : prev
    },[])
    setFilterDist(newFilterDist)
    return newFilterDist
  }

  // 勾選部分地區
  const checkedDist = (e) => {
    const newDist = dist.map((data) => {
      return data.dist === e.target.value ? {...data, checked: !data.checked} : data
    })
    setDist(newDist)
    const newfilterDist =  checkedDistResult(newDist)
    newfilterDist.length === newDist.length? setAllDist(true) : setAllDist(false)
  }

  // 勾選全部地區
  const checkedAllDist = () => {
    const newDist = dist.map((data) => {
      return {...data, checked: true}
    })
    setDist(newDist)
    checkedDistResult(newDist)
    setAllDist(true)
  }

  // 篩選地區後資料
  const filterDatas = originalDatas.filter((data)=> {
    return filterDist.includes(data.sarea)
  })

  // 輸出
  const finalDatas = filterDatas.filter((data)=> {
    if (defineSearch === '') {return true}
    return data.sna.split('_')[1].indexOf(defineSearch) !== -1
  })
  
  return (
    <DefaultLayout>
      <div className="stations">
        <h1 className="title">站點資訊</h1>
        <article className="query">
          <section>
            <div className="query__filter">
              <CustomSelect data={city} setData={selectCity} selectDatas={cityLocation} placeholder={'選擇縣市'}/>
              <CustomSearch search={search} setSearch={setSearch} defineSearch={defineSearch} setDefineSearch={setDefineSearch} searchDatas={filterDatas} placeholder={'搜尋站點'}/>
            </div>
            {dist.length !== 0 && (
              <>
                <div className="query__checkbox--all">
                  <CustomCheckbox checked={allDist} onChange={checkedAllDist}>全部勾選</CustomCheckbox>
                </div>
                <div className="query__checkbox">
                  {dist.map((data) => {
                    return (
                      <div className="query__checkbox__item" key={data.dist}>
                        <CustomCheckbox value={data.dist} checked={data.checked} onChange={checkedDist}>{data.dist}</CustomCheckbox>
                      </div>
                    )
                  })}
                </div>
              </>
            )}
          </section>
          <aside className="query__background">
            <img src={background} alt="background" />
          </aside>
        </article>
        <div className="result">
          <CustomTable>
            <thead>
              <tr>
                <th>縣市</th>
                <th>區域</th>
                <th>站點名稱</th>
                <th>可借車輛</th>
                <th>可還空位</th>
              </tr>
            </thead>
            <tbody>
              {finalDatas.length !== 0 ? (finalDatas.map((data) => {
                return (
                  <tr key={data.sno}>
                    <td>{city}</td>
                    <td>{data.sarea}</td>
                    <td>{data.sna.split('_')[1]}</td>
                    <td className="table__body__cell--green">{data.sbi}</td>
                    <td className="table__body__cell--green">{data.bemp}</td>
                  </tr>
                )
              })):(
                <tr>
                  <td colSpan="5">無資料</td>
                </tr>
              )}
            </tbody>
          </CustomTable>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default Stations