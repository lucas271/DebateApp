import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import HomePage from './pages/HomePage'
import SignUp from './pages/SignUp'
import Footer from './components/layout/Footer'
import TopicsPage from './pages/TopicsPage'
import { Button, Container } from '@mui/material'
import CreateTopic from './pages/CreateTopic'
import Topic from './pages/Topic'
import Sidebar from './components/layout/Sidebar'
import AuthRoutes from './AuthRoutes'
import NoAuthRoutes from './NoAuthRoutes'

const WithSidebar = () => {

    return <>
        <Container maxWidth="xl">
            <div className='flex justify-between align-center gap-10 w-full  relative min-h-minus-nav'>
                <main className='flex-shrink overflow-hidden flex-grow py-10'>
                    <Routes>
                        <Route path='/' element={<HomePage/>}/>
                        <Route path='/topics' element={<TopicsPage/>}/>
                        <Route path='/topics/createNew' element={<AuthRoutes Component={CreateTopic}/>}/>
                        <Route path='/topics/:title/:id' element={<Topic/>}/>
                    </Routes>
                </main>
                <Sidebar/>
            </div>
        </Container>
    </>
}



const RoutesComponent = () => {
    return <>
        <Router>
            <div className='h-[79px]'>
                <Navbar/>

            </div>
            <Routes>
                <Route path='/signUp' element={ 
                    <NoAuthRoutes Component={ 
                        <>
                            <main className='min-h-minus-nav overflow-x-hidden'>
                                <SignUp/>
                            </main>
                        </>
                    }/>

                }/>

                <Route path='*' element={<WithSidebar/>}/>
            </Routes>
            <Footer/>
        </Router>
    </>
}

export default RoutesComponent