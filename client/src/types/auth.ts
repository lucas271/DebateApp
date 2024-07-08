import {z} from 'zod'

export const signInValidation = z.object({
  email: z.string().min(1,"Fill the field").email("This is not a valid email."),
  password: z.string().min(1, "Fill the field").min(6, 'Password must have at least 6 digits')
  .refine((input) => /[a-z]/.test(input) && /[A-Z]/.test(input),
  {message: 'Password must contain at least one lowerCase and One uppercase letter'})
})

export const signUpValidation = signInValidation.extend({
  name: z.string().min(1,"Fill the field").refine(data => Number(data[0]) ? false : true, {message: "name must not start with a letter"}),
  repeatPassword: z.string()
}).refine(data => data.repeatPassword === data.password,
{message: 'Different password', path:['repeatPassword']})

export type SignInType = z.infer<typeof signInValidation>
export type SignUpType = z.infer<typeof signUpValidation>