import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { SignInType, SignUpType } from "../../types/auth";

interface errorsInterface{
    message?: string
}


//room for typing improvement here
export default function PasswordField({errors, register, registerName}: {errors?: errorsInterface, register: UseFormRegister<any>, registerName: string}){
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    return <TextField
        className="w-full"
        placeholder="ex: roger"
        type={!showPassword ? "password" : "text"}
        id={registerName}
        {...(errors?.message &&  {helperText: errors?.message, error: true})}
        {...register(registerName)}
        InputProps={{ // <-- This is where the toggle button is added.
            endAdornment: (
                <InputAdornment position="end">
                <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                >
                    {!showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
                </InputAdornment>
            )
        }}
    />
}