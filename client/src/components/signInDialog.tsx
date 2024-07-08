import {Dialog} from "@mui/material";
import SignInForm from "./forms/SignInForm";
import SuccessPlaceholder from "./shared/SuccessPlaceholder";
import { useState } from "react";

export default function SignInDialog({showSignIn, setShowSignIn}: {showSignIn: boolean, setShowSignIn: React.Dispatch<React.SetStateAction<boolean>>}){
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  
  return <>
    <Dialog open={showSignIn} onClose={() => setShowSignIn(false)} aria-labelledby="customized-dialog-title">
      <div className=' w-80  max-w-full h-[450px]'>
        {isSuccess ? <SuccessPlaceholder/> : <SignInForm setIsSuccess={setIsSuccess}/>}
      </div>
    </Dialog>
  </>
}