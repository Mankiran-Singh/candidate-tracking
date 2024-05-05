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

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  })
});

const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    navigate('/dashboard');
  };

  return (
    <div className="flex justify-center items-center h-screen" >
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" style={{
      border: "inset",
      borderRadius: "50px",
      padding: "20px",
    }}>
        <FormLabel>Login</FormLabel>
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
          <Button type="submit">Submit</Button><br></br>
          <NavLink to="/sign-up">Don't have an account? Login</NavLink>
        </form>
      </Form>
    </div>
  );
};

export default Login;
