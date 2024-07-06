import { Button, Card, CircularProgress, Container, Paper, TextField } from "@mui/material";
import {zodResolver} from '@hookform/resolvers/zod'

import { useForm } from "react-hook-form";
import { SignUpType, signUpValidation } from "../types/auth";
import axios from "axios";
import { useState } from "react";

export default function SignUp(){
    const { register, handleSubmit, formState: { errors } } = useForm<SignUpType>({
      resolver: zodResolver(signUpValidation)
    });

    const [apiErrors, setApiErrors] = useState<string[]>([])
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const [user, setUser] = useState<any>(null)

    const onSubmit = async (data: SignUpType) => {
      setApiErrors([])
      if(isSuccess) return
      setLoading(true)
      const response: {errors: string[]} | any = await axios.post("http://localhost:37650/createUser", {
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
        return res.response.data
      })

      if(response?.errors) {
        setLoading(false)
        setApiErrors(response.errors)
        return
      }else if(!response) {
        setLoading(false)
        setIsSuccess(false)
        setApiErrors(["error getting user info"])
        return
      }

      setIsSuccess(true)
      setLoading(false)
      setUser(response)
    };

    return <>
      <Container maxWidth="xl" className='h-minus-nav flex items-center justify-center overflow-hidden relative'>
        {JSON.stringify(user) || user}
        <Paper className=" min-h-[80%] h-1 my-24 py-8 relative">
          {
          loading ? <> 
            <div className={`w-full h-full items-center justify-center my-auto ${loading ? 'flex' : 'hidden'}`}>
              <CircularProgress/>
            </div>
          </> :
          <Container>
            <h2 className="text-2xl mb-6 font-semibold">Sign Up</h2>
            <form className="flex gap-4 flex-col " onSubmit={handleSubmit(onSubmit)}>
              {apiErrors.length > 0 && apiErrors.map((error, index) => {
                return <div key={index} className="bg-red-700 text-slate-200 rounded-xl mx-auto text-center p-4">
                  <p>{error}</p>
                </div>
              })}
              <div className="flex gap-2 flex-col ">
                <label htmlFor="name">
                  Your name
                </label>
                <TextField placeholder="ex: roger" id="name" {...(errors.name?.message &&  {helperText: errors.name?.message, error: true})} {...register("name")}/>
              </div>
              <div className="flex gap-4 flex-col ">
                <label htmlFor="email">
                  Your Email
                </label>
                <TextField placeholder="ex: roger" id="email" type="email" {...(errors.email?.message &&  {helperText: errors.email?.message, error: true})} {...register("email")}/>
              </div>
              <div className="flex gap-4 flex-col ">
                <label htmlFor="password">
                  Your password
                </label>
                <TextField type="password" id="password" {...(errors.password?.message &&  {helperText: errors.password?.message, error: true})} {...register("password")}/>
              </div>
              <div className="flex gap-4 flex-col ">
                <label htmlFor="repeatPassword">
                  RepeatPassword
                </label>
                <TextField placeholder="ex: roger" type="RepeatPassword" id="repeatPassword" {...(errors?.repeatPassword?.message &&  {helperText: errors?.repeatPassword?.message, error: true})} {...register("repeatPassword")}/>
              </div>
              <Button type="submit" variant="contained"> Create </Button>
            </form>
          </Container>
          }
        </Paper>

      </Container>
    </>
}