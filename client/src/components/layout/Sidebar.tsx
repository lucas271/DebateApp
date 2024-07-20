import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useGetAllPostsQuery } from "../../lib/services/reducers/postReducer";

function Pools(){
    const location = useLocation()
    const urlPrefix = ""
    const poolTitles = [{
        id: "Doskaodaskda",
        title: "l,da;sld;asl"
    }]


    return <>
        {
            poolTitles.map(pool => {
            return <li className='border border-b-2 p-2 h-[fit-content] w-full relative' key={pool.id}>
                <Link to={`${urlPrefix}${pool.id}`} className=' block w-full overflow-hidden text-ellipsis text-nowrap text-white '>{pool.title}</Link>
            </li>
            })
        }

    </>
}

function Posts(){
    const urlPrefix = ""
    const poolTitles = [{
        id: "Doskaodaskda",
        title: "disaodkasodkas"
    }]
    return <>
        {
            poolTitles.map(pool => {
            return <li className='border border-b-2 p-2 h-[fit-content] w-full relative' key={pool.id}>
                <Link to={`${urlPrefix}${pool.id}`} className=' block w-full overflow-hidden text-ellipsis text-nowrap text-white '>{pool.title}</Link>
            </li>
            })
        }

    </>
}


export default function Sidebar(){
    const [isPool, setIsPool] = useState<boolean>(false)

    return <aside className='h-minus-nav w-full min-w-52 md:w-3/4 lg:1/4 sticky top-0 left-0 right-0 sm:flex flex-col justify-center items-center  hidden overflow-hidden '>
        <div className="h-5/6 w-full flex flex-col overflow-hidden ">
            <header className='flex w-full overflow-hidden  justify-between items-center gap-2 px-1 border-2 py-1 border-blue-950  border-b-0'>
                <h3 className='text-sm text-gray-500 font-bold'>Recent Activity</h3>
                <Button variant="contained" color={isPool ? "secondary" :"primary"} size='small' onClick={() => setIsPool(!isPool)}>{isPool ? "Talks" : "Pools"}</Button>
            </header>
            <ul className={`flex-grow flex-shrink w-full overflow-hidden  transition-all duration-700 ${isPool ? "bg-cyan-950" :"bg-blue-950"}`}>
                {!isPool ? <Posts/> :<Pools/>}
            </ul>
        </div>
    </aside>

}