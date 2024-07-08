import {Fade, Grow } from "@mui/material";

export default function SuccessPlaceholder({message="Operacao bem sucedida", title="Sucesso"}: {message?: string, title?: string}){

    return<Fade in={true}> 
            <div className="h-full w-full bg-green-700" >
                <Grow in={true} timeout={1200}>
                    <div className="flex h-full sm:w-1/2 w-5/6 mx-auto justify-center text-center items-center gap-6 flex-col text-slate-200">     
                        <article >
                            <h1 className=" text-4xl">{title}</h1>
                            <p className="text-xl text-slate-300">{message}</p>    
                        </article>           

                        <span className=" font-bold text-md animate-pulse hover:animate-none">Redirecionando...</span>
                    </div>
                </Grow>
            </div>
    </Fade>
}