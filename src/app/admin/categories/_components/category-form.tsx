import { LoaderIcon } from "lucide-react";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import "@/app/globals.css";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateCategorySchema } from "@/schemas/create-category.schema";

export const CategoryForm = ({
  form,
  onSubmit,
  defaultValues,
}: {
  form: ReturnType<typeof useForm<CreateCategorySchema>>;
  onSubmit: SubmitHandler<CreateCategorySchema>;
  defaultValues: CreateCategorySchema | null;
}) => {
  const isSubmitting = form.formState.isSubmitting;

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    } else {
      form.reset({ name: "", image: undefined });
    }
  }, [defaultValues, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input disabled={isSubmitting} placeholder="Name" {...field} />
              </FormControl>
              <FormDescription>Category Name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  {...form.register("image")}
                  onChange={(event) => {
                    field.onChange(event.target.files?.[0]);
                  }}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormDescription>Category Image</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant={"outline"} disabled={isSubmitting} type="submit">
          {isSubmitting ? <LoaderIcon className="w-4 h-4" /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};
