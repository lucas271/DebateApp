import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import {zodResolver} from '@hookform/resolvers/zod'

import { useForm } from "react-hook-form";
import { SignInType, signInValidation } from "../types/auth";
import { Link } from "react-router-dom";

export default function SignInDialog({showSignIn, setShowSignIn}: {showSignIn: boolean, setShowSignIn: React.Dispatch<React.SetStateAction<boolean>>}){
    const { register, handleSubmit, formState: { errors } } = useForm<SignInType>({
      resolver: zodResolver(signInValidation)
    });
    const onSubmit = (data: any) => console.log(data);

    return <>
      <Dialog open={showSignIn} onClose={() => setShowSignIn(false)} aria-labelledby="customized-dialog-title">
        <div className=' w-80  max-w-full h-[450px] items-center flex flex-col '>
          <DialogTitle id="customized-dialog-title text-center p-0 m-0">Sign In</DialogTitle>
          <DialogContent>
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
      </Dialog>
    </>
}