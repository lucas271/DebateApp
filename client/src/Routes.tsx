import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import HomePage from './pages/HomePage'
import SignUp from './pages/SignUp'
import Footer from './components/layout/Footer'
import TopicsPage from './pages/TopicsPage'
import { Button, Container } from '@mui/material'
import CreateTopic from './pages/CreateTopic'
import Topic from './pages/Topic'

const WithSidebar = () => {

    return <>
        <Container maxWidth="xl" >
            <div className='py-10 flex justify-between align-center gap-10 w-full overflow-hidden relative min-h-minus-nav'>
                <main className='overflow-hidden w-full'>
                    <Routes>
                        <Route path='/' element={<HomePage/>}/>
                        <Route path='/topics' element={<TopicsPage/>}/>
                        <Route path='/topics/createNew' element={<CreateTopic/>}/>
                        <Route path='/topics/:title/:id' element={<Topic/>}/>
                    </Routes>
                </main>
                <aside className='h-3/4 w-64  relative hidden md:flex flex-col '>
                    <header className='flex  justify-between items-center gap-2 px-1 border-2 py-1 border-blue-950  border-b-0'>
                        <h3 className='text-sm text-gray-500 font-bold'>Recent Activity</h3>
                        <Button variant="contained" size='small'>Pools</Button>

                    </header>
                    <ul className=' h-full flex-shrink w-64 bg-blue-950'>
                        <li className='border border-b-2 p-2 h-[fit-content] border-blue-700 w-full relative'>
                        <a className=' block w-full overflow-hidden text-ellipsis text-nowrap text-white '>fdosakfodfoakfldpdflpalfpdlapflapdfa foasdofkaokfoakdfokaofkaokofaksodfkodas</a>
                        </li>
                    </ul>
                </aside>
            </div>
        </Container>
    </>
}



const RoutesComponent = () => {
    return <>
        <Router>
            <Navbar/>
            <Routes>
                <Route path='/signUp' element={
                    <main className='min-h-minus-nav overflow-x-hidden'>
                        <SignUp/>
                    </main>
                }/>
                <Route path='*' element={<WithSidebar/>}/>
            </Routes>
            <Footer/>
        </Router>
    </>
}

export default RoutesComponent