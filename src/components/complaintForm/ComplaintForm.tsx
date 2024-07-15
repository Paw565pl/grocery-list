"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import complaintSchema, { ComplaintData } from "@/schemas/complaintSchema";
import { useMemo, useState } from "react";

const ComplaintForm = () => {
  const [descriptionFieldLength, setDescriptionFieldLength] =
    useState<number>(0);
  const form = useForm<ComplaintData>({
    resolver: zodResolver(complaintSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const { toast } = useToast();

  const descriptionFieldLimit = useMemo(
    () =>
      (
        complaintSchema.shape.description._def.checks.find(
          ({ kind }) => kind === "max",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ) as any
      ).value,
    [],
  );

  const resetForm = () => {
    setDescriptionFieldLength(0);
    form.reset();
  };

  const onSubmit = () => {
    toast({
      title: "Thank you for your feedback!",
      description: "Your complaint has been issued successfully.",
    });
    resetForm();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 xl:w-7/12"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage role="alert" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Description</FormLabel>
                <FormDescription className="text-xs">
                  {descriptionFieldLength} / {descriptionFieldLimit}
                </FormDescription>
              </div>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="tell us more about your complaint"
                  onChange={(e) => {
                    field.onChange(e);
                    setDescriptionFieldLength(e.target.value.length);
                  }}
                />
              </FormControl>
              <FormMessage role="alert" />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
          <Button
            type="reset"
            variant="destructive"
            onClick={() => resetForm()}
          >
            Reset
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default ComplaintForm;
