import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { IUser } from "../../types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

import Loader from "../shared/Loader";
import FileUploaderArea from "../shared/FileUploaderArea";

import { useUpdateUser } from "../../lib/router/hooksUsers";

const UserSchema = z.object({
  file: z.custom<File[]>(),
  name: z
    .string()
    .min(4, { message: "Name must be at least 4 characters." })
    .max(40, { message: "Name must be at most 40 characters." }),
  username: z
    .string()
    .min(4, { message: "Username must be at least 4 characters." })
    .max(40, { message: "Username must be at most 40 characters." }),
  email: z.string().optional(),
  bio: z
    .string()
    .max(2200, { message: "Bio must be at most 2200 characters." }),
});

type UserFormProps = {
  user: IUser;
};

export default function UserForm({ user }: UserFormProps) {
  const navigate = useNavigate();
  const { updateUser, isUpdatingUser } = useUpdateUser();

  const isLoading = isUpdatingUser;

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      file: [],
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio || "",
    },
  });

  function handleUpdate(values: z.infer<typeof UserSchema>) {
    const { email, ...updateValues } = values;
    updateUser(
      {
        userId: user.$id,
        user: {
          ...updateValues,
          imageId: user.imageId,
          imageUrl: user.imageUrl,
        },
      },
      {
        onSuccess: () => {
          navigate(`/user/${user.$id}`);
        },
      }
    );
  }

  return (
    <Form {...form}>
      <div className="w-full max-w-[640px] flex flex-col justify-center items-center">
        <form
          onSubmit={form.handleSubmit(handleUpdate)}
          className="w-full flex flex-col gap-2 mb-3"
        >
          <FormField
            disabled={isLoading}
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormControl>
                  <FileUploaderArea
                    onChange={field.onChange}
                    imageUrl={user.imageUrl}
                    type={"avatar"}
                  />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />

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
            disabled={true}
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
            name="bio"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="shad-form_label">Bio</FormLabel>
                <FormControl>
                  <Textarea {...field} className="shad-input" />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <Button
              type="button"
              variant="secondary"
              disabled={isLoading}
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>

            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? <Loader text="Updating..." /> : "Update"}
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
}
