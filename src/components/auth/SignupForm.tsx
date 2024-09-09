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

import {
  useCreateAccountUser,
  useSignInAccount,
} from "../../lib/router/hooksAuth";
import LogoLink from "../shared/LogoLink";

const SignupSchema = z
  .object({
    name: z
      .string()
      .min(4, { message: "Name must be at least 4 characters." })
      .max(40, { message: "Name must be at most 40 characters." }),
    username: z
      .string()
      .min(4, { message: "Username must be at least 4 characters." })
      .max(40, { message: "Username must be at most 40 characters." }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .max(16, { message: "Password must be at most 16 characters." }),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not much.",
    path: ["confirm"],
  });

export default function SignupForm() {
  const navigate = useNavigate();
  const { createUserAccount, isCreatingUserAccount } = useCreateAccountUser();
  const { signInAccount, isSigningInAccount } = useSignInAccount();

  const isLoading = isCreatingUserAccount || isSigningInAccount;

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirm: "",
    },
  });

  async function handleSignup(values: z.infer<typeof SignupSchema>) {
    const newUser = await createUserAccount(values);

    if (!newUser) {
      return;
    }

    const newSession = await signInAccount(values);

    if (!newSession) {
      return;
      navigate("/sign-in");
    }

    form.reset();

    navigate("/");
  }

  return (
    <Form {...form}>
      <div className="sm:w-[400px] flex flex-col justify-center items-center">
        <LogoLink size="lg" className="mb-3" />

        <h3 className="h3 mb-2">Create new account</h3>

        <p className="text-sm text-light-3 mb-3">
          To use Twingram, please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(handleSignup)}
          className="w-full flex flex-col gap-2 mb-3"
        >
          <FormField
            disabled={isLoading}
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="shad-form_label">Name</FormLabel>
                <FormControl>
                  <Input {...field} className="shad-input" />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />

          <FormField
            disabled={isLoading}
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="shad-form_label">Username</FormLabel>
                <FormControl>
                  <Input {...field} className="shad-input" />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />

          <FormField
            disabled={isLoading}
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
            disabled={isLoading}
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

          <FormField
            disabled={isLoading}
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="shad-form_label">
                  Confirm password
                </FormLabel>
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
            disabled={isLoading}
            className="mt-2"
          >
            {isLoading ? (
              <div className="flex justify-center items-center gap-2">
                <Loader />
                Loading...
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        </form>

        <p className="text-sm text-light-2 text-center mt-1">
          Already have an account?
          <Link to="/sign-in" className="text-primary ml-1">
            Log in
          </Link>
        </p>
      </div>
    </Form>
  );
}
