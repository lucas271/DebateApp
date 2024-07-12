import { Container, Paper } from "@mui/material";
import SignUpForm from "../components/forms/SignUpForm";
import SuccessPlaceholder from "../components/shared/SuccessPlaceholder";
import { useSignUpUserMutation } from "../lib/services/reducers/userReducer";

export default function SignUp(){
  const [_, {isSuccess}] = useSignUpUserMutation({
    fixedCacheKey: "user:main"
  })
  return <>
    <Container maxWidth="xl" className='h-minus-nav flex items-center justify-center overflow-hidden relative'>
      <Paper className=" min-h-[80%]  h-1 my-24 relative">
        {!isSuccess ? <SignUpForm /> : <SuccessPlaceholder />}
      </Paper>
    </Container>
  </>
}