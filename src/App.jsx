import { Routes, Route} from 'react-router-dom'

// 主頁面
import Instructions from '@/pages/Instructions'
import Billing from '@/pages/Billing'
import Stations from '@/pages/Stations'
import News from '@/pages/News'
import Activities from '@/pages/Activities'
import NotFound from './pages/NotFound'

function App() {
  return (
        <Routes>
          <Route path='/instructions' element={<Instructions />}/> 
          <Route path='/billing' element={<Billing />}/> 
          <Route path='/stations' element={<Stations />}/> 
          <Route path='/news' element={<News />}/> 
          <Route path='/activities' element={<Activities />}/> 
          <Route path='*' element={<NotFound />}/> 
        </Routes>
  )
}

export default App
