
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Cards from './Components/Cards/Cards'
import Header from './Components/header/Header'
import Home from './Components/Home/Home'

function App() {

  return (
    <>
      {/* <Header/>
      <Cards/> */}

      <Routes>
        <Route path='/' element={<Header/>}>
        <Route index element={<Home/>} />
        <Route path='cards'>
        <Route index element={<Cards/>}/>
        <Route path=':id' element={<h1>hello</h1>}/>
        </Route>
        </Route>
        <Route path='*' element={<h1>Not found</h1>} />
      </Routes>
    </>
    
  )
}

export default App
