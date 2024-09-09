import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Loader from "../shared/Loader";

import { useSignInAccount } from "../../lib/router/hooksAuth";
import LogoLink from "../shared/LogoLink";

const SigninSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(16, { message: "Password must be at most 16 characters." }),
});

export default function SingInForm() {
  const navigate = useNavigate();
  const { signInAccount, isSigningInAccount } = useSignInAccount();

  const isLoading = isSigningInAccount;

  const form = useForm<z.infer<typeof SigninSchema>>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSignin(values: z.infer<typeof SigninSchema>) {
    const newSession = await signInAccount(values);

    if (!newSession) {
      return;
    }

    form.reset();

    navigate("/");
  }

  return (
    <Form {...form}>
      <div className="sm:w-[400px] flex flex-col justify-center items-center">
        <LogoLink size="lg" className="mb-3" />

        <h3 className="h3 mb-2">Log into your account</h3>

        <p className="text-sm text-light-3 mb-3">
          Welcome back, please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(handleSignin)}
          className="w-full flex flex-col gap-2 mb-3"
        >
          <FormField
            disabled={isSigningInAccount}
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input {...field} className="shad-input" />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />

          <FormField
            disabled={isSigningInAccount}
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} className="shad-input" />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant="primary"
            disabled={isSigningInAccount}
            className="mt-2"
          >
            {isLoading ? (
              <div className="flex justify-center items-center gap-2">
                <Loader />
                Loading...
              </div>
            ) : (
              "Log in"
            )}
          </Button>
        </form>

        <p className="text-sm text-light-2 text-center mt-1">
          Don't have an account?
          <Link to="/sign-up" className="text-primary ml-1">
            Sign up
          </Link>
        </p>
      </div>
    </Form>
  );
}
