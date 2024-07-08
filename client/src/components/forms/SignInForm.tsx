import { Button, CircularProgress, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { SignInType, signInValidation } from "../../types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import PasswordField from "../shared/PasswordField";

export default function SignInForm({setIsSuccess}: {setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>}){
    const { register, handleSubmit, formState: { errors } } = useForm<SignInType>({
        resolver: zodResolver(signInValidation)
    });

    const [apiErrors, setApiErrors] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const onSubmit = async (data: SignInType): Promise<void> => {
        setApiErrors([])
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

        if(response?.errors) {
            setLoading(false)
            setIsSuccess(false)
            setApiErrors(response.errors)
            return
          }else if(!response) {
            setLoading(false)
            setIsSuccess(false)
            setApiErrors(["error getting user info"])
            return
          }

        setLoading(false)
        setIsSuccess(true)
    };

    return <>
        <div className={`w-full h-full flex-col items-center ${loading ? 'hidden' : 'flex'}`}>
            <DialogTitle id="customized-dialog-title text-center p-0 m-0">Sign In</DialogTitle>
            <DialogContent>
                {apiErrors.length > 0 && apiErrors.map((error, index) => {
                    return <div key={index} className="bg-red-700 text-slate-200 rounded-xl mx-auto text-center">
                        <p>{error}</p>
                    </div>
                })}
                <form className='flex h-full flex-col gap-4 grow justify-center' onSubmit={handleSubmit(onSubmit)}>
                    <div className='mx-auto w-full'>
                        <TextField className="w-full" id="outlined-basic" label="Your Email" variant="outlined"  {...(errors.email?.message &&  {helperText: errors.email?.message, error: true})} {...register("email")}/>
                    </div>
                    <div className="w-full">
                        <PasswordField register={register} registerName="password" {...(errors.password?.message && {errors: {message: errors.password.message}})} />
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
    </>
}