import { Button, CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import {zodResolver} from '@hookform/resolvers/zod'

import { useForm } from "react-hook-form";
import { SignInType, signInValidation } from "../types/auth";
import { Link, json } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SignInDialog({showSignIn, setShowSignIn}: {showSignIn: boolean, setShowSignIn: React.Dispatch<React.SetStateAction<boolean>>}){
    const { register, handleSubmit, formState: { errors } } = useForm<SignInType>({
      resolver: zodResolver(signInValidation)
    });

    const [apiErrors, setApiErrors] = useState<string[]>([])
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const onSubmit = async (data: SignInType): Promise<void> => {
      setApiErrors([])
      if(isSuccess) return
      setLoading(true)
      const response: {errors: string[]} | any = await axios.post("http://localhost:37650/loginUser", {
        ...data
      }, {
        headers: {
          "Content-Type": "application/json",
        }
      }).then(res => {
        return res.data.response
      }).catch((res) => {
        apiErrors.push("Api error")
        setIsSuccess(false)
        setLoading(false)
        return res.response.data
      })

      if(!isSuccess) {
        setApiErrors(response.errors)
        return
      }

      setLoading(false)
      setIsSuccess(true)
    };

    useEffect(() => {
      if(!isSuccess) return

      console.log("Success logging in")
    }, [isSuccess])

    return <>
      <Dialog open={showSignIn} onClose={() => setShowSignIn(false)} aria-labelledby="customized-dialog-title">
        <div className=' w-80  max-w-full h-[450px]'>
          <div className={`w-full h-full flex-col items-center ${loading ? 'hidden' : 'flex'}`}>
            <DialogTitle id="customized-dialog-title text-center p-0 m-0">Sign In</DialogTitle>
            <DialogContent>
              {apiErrors.length > 0 && apiErrors.map((error, index) => {

                return <div key={index} className="bg-red-700 text-slate-200 rounded-xl mx-auto text-center">
                  <p>{error}</p>
                </div>
              })}
              <form className='flex h-full flex-col gap-4 grow justify-center' onSubmit={handleSubmit(onSubmit)}>
                <div className='mx-auto'>
                  <TextField id="outlined-basic" label="Your name" variant="outlined"  {...(errors.name?.message &&  {helperText: errors.name?.message, error: true})} {...register("name")}/>
                </div>
                <div>
                  <TextField id="outlined-basic" label="Your password" variant="outlined" {...(errors.password?.message &&  {helperText: errors.password?.message, error: true})} {...register("password")}/>
                </div>

                <Button variant='outlined' type="submit"> Login </Button>
              </form>
            </DialogContent>

            <DialogContentText className='sm:py-4 py-2 w-3/4 text-center' >
              Don't have an account yet? <Link to="/signUp" className=' text-grey-800 transition underline cursor-pointer hover:text-gray-900'> Create One</Link>
            </DialogContentText>
          </div>
          <div className={`w-full h-full items-center justify-center ${loading ? 'flex' : 'hidden'}`}>
            <CircularProgress/>
          </div>
        </div>
      </Dialog>
    </>
}