import { Button, Card, CircularProgress, Container, Paper, TextField } from "@mui/material";
import {zodResolver} from '@hookform/resolvers/zod'

import { useForm } from "react-hook-form";
import { SignUpType, signUpValidation } from "../types/auth";
import axios from "axios";
import { useState } from "react";
import SignUpForm from "../components/forms/SignUpForm";
import SuccessPlaceholder from "../components/shared/SuccessPlaceholder";

export default function SignUp(){
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    return <>
      <Container maxWidth="xl" className='h-minus-nav flex items-center justify-center overflow-hidden relative'>
        <Paper className=" min-h-[80%]  h-1 my-24 relative">
          {!isSuccess ? <SignUpForm setIsSuccess={setIsSuccess}/> : <SuccessPlaceholder />}
        </Paper>
      </Container>
    </>
}