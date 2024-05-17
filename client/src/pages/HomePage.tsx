import { Button, Container } from "@mui/material";
import RelevantNews from "../components/shared/RelevantNews";

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
          </div>
        </div>
        <div>
          <h3 className='text-2xl text-blue-950 mb-1.5'>Latest news</h3>
          <RelevantNews/>

        </div>

      </div>
    </section>
}