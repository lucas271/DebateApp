import { Button, CircularProgress, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material"
import { Link } from "react-router-dom"
import { SignInType, signInValidation } from "../../types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PasswordField from "../shared/PasswordField";
import { useLoginUserMutation } from "../../lib/services/reducers/userReducer";

export default function SignInForm(){
    const { register, handleSubmit, formState: { errors } } = useForm<SignInType>({
        resolver: zodResolver(signInValidation)
    });

    const [loginUser, {isLoading, data, error: apiErrors}] = useLoginUserMutation({
        fixedCacheKey: "user:main"
    })
    const onSubmit = async (data: SignInType): Promise<void> => {
        await loginUser(data)
    };

    return <>
        { !isLoading ? <> 
            <div className={`w-full h-full flex-col items-center flex`}>
                <DialogTitle id="customized-dialog-title text-center p-0 m-0">Sign In</DialogTitle>
                <DialogContent>
                    {Array.isArray(apiErrors) && apiErrors.map((error, index) => {
                        return <div key={index} className="bg-red-700 text-slate-200 rounded-xl mx-auto text-center">
                            <p>{error}</p>
                        </div>
                    })}
                    {JSON.stringify(data)}
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
        </> :<>
            <div className={`w-full h-full items-center justify-center flex`}>
                <CircularProgress/>
            </div>
        </>
        }
    </>
}