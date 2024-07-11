import {Dialog} from "@mui/material";
import SignInForm from "./forms/SignInForm";
import SuccessPlaceholder from "./shared/SuccessPlaceholder";
import { useState } from "react";
import { useLoginUserMutation } from "../lib/services/reducers/userReducer";

export default function SignInDialog({showSignIn, setShowSignIn}: {showSignIn: boolean, setShowSignIn: React.Dispatch<React.SetStateAction<boolean>>}){
  const [_loginUser, {isSuccess}] = useLoginUserMutation({
      fixedCacheKey: "login:main"
  })
  return <>
    <Dialog open={showSignIn} onClose={() => setShowSignIn(false)} aria-labelledby="customized-dialog-title">
      <div className=' w-80  max-w-full h-[450px]'>
        {isSuccess ? <SuccessPlaceholder/> : <SignInForm/>}
      </div>
    </Dialog>
  </>
}