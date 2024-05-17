import { Button, Card, Container, Paper, TextField } from "@mui/material";
import {zodResolver} from '@hookform/resolvers/zod'

import { useForm } from "react-hook-form";
import { SignUpType, signUpValidation } from "../types/auth";

export default function SignUp(){
    const { register, handleSubmit, formState: { errors } } = useForm<SignUpType>({
      resolver: zodResolver(signUpValidation)
    });
    const onSubmit = (data: any) => console.log(data);

    return <>
      <Container maxWidth="xl" className='h-minus-nav flex items-center justify-center overflow-hidden relative'>
        <Paper className=" my-24 py-8">
          <Container>
            <h2 className="text-2xl mb-6 font-semibold">Sign Up</h2>
            <form className="flex gap-4 flex-col " onSubmit={handleSubmit(onSubmit)}>
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

        </Paper>

      </Container>
    </>
}