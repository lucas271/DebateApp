import { Button, CircularProgress, Container, IconButton, InputAdornment, TextField } from "@mui/material"
import { useState } from "react";
import { SignUpType, signUpValidation } from "../../types/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PasswordField from "../shared/PasswordField";


export default function SignUpForm({setIsSuccess}: {setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>}){
    const { register, handleSubmit, formState: { errors } } = useForm<SignUpType>({
      resolver: zodResolver(signUpValidation)
    });
    const [apiErrors, setApiErrors] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(false)
  
    const onSubmit = async (data: SignUpType) => {
      setApiErrors([])
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
        setLoading(false)
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
    };
    return <Container maxWidth="xl" className='h-minus-nav flex items-center justify-center overflow-hidden relative'>
      {
        loading ? <> 
            <div className={`w-full h-full items-center justify-center my-auto ${loading ? 'flex' : 'hidden'}`}>
            <CircularProgress/>
            </div>
        </> :
        <>
            <h2 className="text-2xl mb-6 font-semibold">Sign Up</h2>
            <form className="flex gap-4 flex-col " onSubmit={handleSubmit(onSubmit)}>
                {apiErrors.length > 0 && apiErrors.map((error, index) => {
                    return <div key={index} className="bg-red-700 text-slate-200 rounded-xl mx-auto text-center p-4">
                    <p>{error}</p>
                    </div>
                })}
                <div className="w-full flex gap-2 flex-col ">
                    <label htmlFor="name">
                    Your name
                    </label>
                    <TextField placeholder="ex: roger" className="w-full" id="name" {...(errors.name?.message &&  {helperText: errors.name?.message, error: true})} {...register("name")}/>
                </div>
                <div className="flex gap-4 flex-col w-full ">
                    <label htmlFor="email">
                    Your Email
                    </label>
                    <TextField className="w-full" placeholder="ex: roger" id="email" type="email" {...(errors.email?.message &&  {helperText: errors.email?.message, error: true})} {...register("email")}/>
                </div>
                <div className="flex w-full gap-4 flex-col ">
                    <label htmlFor="password">
                      Your password
                    </label>
                    <PasswordField register={register} registerName="password" {...(errors.password?.message && {errors: {message: errors.password.message}})} />
                </div>
                <div className="flex w-full gap-4 flex-col ">
                    <label htmlFor="repeatPassword">
                      Repeat Password
                    </label>
                    <PasswordField register={register} registerName="repeatPassword" {...(errors.repeatPassword?.message && {errors: {message: errors.repeatPassword.message}})}/>
                </div>
                <Button type="submit" variant="contained"> Create </Button>
            </form>
        </>
      }
    </Container>
}