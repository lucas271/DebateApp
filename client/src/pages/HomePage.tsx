import { Button, Container } from "@mui/material";
import RelevantNews from "../components/shared/RelevantNews";
import { Suspense, useEffect, useState } from "react";
import { Api } from "@mui/icons-material";
import axios from "axios";


function ApiRequest(){
  const [fetchResponse, setFetchResponse] = useState<any>()


  useEffect(() => {
    const response = async () => await axios.get("http://localhost:37650/test", {
      withCredentials: true,
    }).then(res => {
      console.log(res)
      localStorage.setItem("X-CSRF-Token", res.data.response)
    }).catch(res => {
      return res.response.data.errors
    })

    response().then((res) => setFetchResponse(res))
  }, [])
  return <Suspense fallback={<h2>Loading...</h2>}>
    {JSON.stringify(fetchResponse)}
  </Suspense>
}

export default function HomePage(){


  
  return <section className="overflow-hidden">
    <h2 className='text-2xl text-blue-950 font-bold mb-4'>Interact with the community!</h2>
    <div className='overflow-hidden flex shrink grow flex-col-reverse gap-12 lg:flex-col'>
      <div >
        <h3 className='text-2xl text-blue-950 mb-1.5 lg:hidden'>Other stuff</h3>
        <div className=' grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-3 shrink'>
          <RelevantNews/>
          <RelevantNews/>
          <RelevantNews/>

          <ApiRequest/>
        </div>
      </div>
      <div>
        <h3 className='text-2xl text-blue-950 mb-1.5'>Latest news</h3>
        <RelevantNews/>

      </div>

    </div>
  </section>
}