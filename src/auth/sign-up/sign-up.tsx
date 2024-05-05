import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as React from 'react';
import { Button } from  "./../../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./../../components/ui/form";
import { Input } from "./../../components/ui/input";
import { useNavigate,NavLink } from 'react-router-dom';
import AuthService from "./../../services/authService";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(8, {
    message: "Confirm password must be at least 8 characters.",
  }),
});

const SignUp = () => {
 
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    AuthService.signUp(values).then((res:any)=>{
       localStorage.setItem('token',res.data.data.token)
    })
    navigate('/login');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" style={{
      border: "inset",
      borderRadius: "50px",
      padding: "50px",
    }}>
      <FormLabel>Sign Up</FormLabel>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage>{form.formState.errors.name?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage>{form.formState.errors.email?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage>{form.formState.errors.password?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Confirm your password" {...field} />
                </FormControl>
                <FormMessage>{form.formState.errors.confirmPassword?.message}</FormMessage>
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button><br></br>
          <NavLink to="/login">Already have an account? Login</NavLink>
        </form>
      </Form>
    </div>
  );
};

export default SignUp;
