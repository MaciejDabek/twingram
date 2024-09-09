import { useNavigate } from "react-router-dom";
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
import { Textarea } from "../ui/textarea";
import FileUploaderArea from "../shared/FileUploaderArea";
import Loader from "../shared/Loader";
import { useCreatePost, useUpdatePost } from "../../lib/router/hooksPosts";
import { useAccountUser } from "../../lib/router/hooksAuth";
import { IPost } from "../../types";

const PostSchema = z.object({
  file: z.custom<File[]>(),
  caption: z
    .string()
    .min(2, { message: "Minimum 2 characters" })
    .max(2200, { message: "Maximum 2200 characters" }),
  location: z.string(),
  tags: z.string(),
});

type PostFormProps = {
  type: "create" | "update";
  post?: IPost;
};

const buttonLabel = {
  create: "Create",
  update: "Update",
};

const buttonLoadingLabel = {
  create: "Creating...",
  update: "Updating...",
};

export default function PostForm({ type, post }: PostFormProps) {
  const navigate = useNavigate();
  const { currentUser } = useAccountUser();

  const { createPost, isCreatingPost } = useCreatePost();
  const { updatePost, isUpdatingPost } = useUpdatePost();
  const isLoading = isCreatingPost || isUpdatingPost;

  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post.tags.join(",") : "",
    },
  });

  async function handlePost(value: z.infer<typeof PostSchema>) {
    if (!currentUser) return;

    switch (type) {
      case "create": {
        createPost(
          { ...value, creatorId: currentUser.$id },
          {
            onSuccess: () => {
              navigate("/");
            },
          }
        );
        break;
      }
      case "update": {
        if (!post) return;

        updatePost(
          {
            postId: post.$id,
            post: { ...value, imageId: post.imageId, imageUrl: post.imageUrl },
          },
          {
            onSuccess: () => {
              navigate(`/posts/${post.$id}`);
            },
          }
        );
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handlePost)}
        className="w-full max-w-[640px] flex flex-col gap-4"
      >
        <FormField
          disabled={isLoading}
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="shad-form_label">Add photos</FormLabel>
              <FormControl>
                <FileUploaderArea
                  onChange={field.onChange}
                  imageUrl={post?.imageUrl || ""}
                  type="image"
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          disabled={isLoading}
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="shad-form_label">Add caption</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="shad-textarea custom-scrollbar"
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          disabled={isLoading}
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="shad-form_label">Add location</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="shad-textarea custom-scrollbar"
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="shad-form_label">Add tags</FormLabel>
              <FormControl>
                <Input {...field} className="shad-input" />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <div className="flex justify-between mt-3">
          <Button
            type="button"
            variant="secondary"
            disabled={isLoading}
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? (
              <Loader text={buttonLoadingLabel[type]} />
            ) : (
              buttonLabel[type]
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
