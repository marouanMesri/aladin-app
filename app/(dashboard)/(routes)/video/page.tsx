"use client";
import Heading from "@/components/heading";
import { VideoIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import axios from "axios";
import Empty from "@/components/empty";
import Loader from "@/components/Loader";

const Chat = () => {
  const router = useRouter();
  const [video, setVideo] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo(undefined);

      const response = await axios.post("/api/video", values);

      setVideo(response.data[0]);
      form.reset();
    } catch (error: any) {
      // TODO : Open Pro Modal
      console.error(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="fixed top-0 mt-2 bg-white opacity-75 w-full backdrop-blur-sm ">
        <Heading
          title="Video"
          description="Génére tes vidéos à partir d'un texte"
          icon={VideoIcon}
          iconColor="text-orange-700"
          bgColor="bg-orange-700/10"
        />
      </div>
      <div className="space-y-4 mt-4 ">
        {isLoading && <Loader label="Je réfléchis un peu...." />}
        {!video && !isLoading && <Empty label="Aucune vidéo générée encore" />}
        {video && (
          <div className=" flex flex-col items-center justify-center">
            <video controls className="w-full">
              <source src={video} />
            </video>
          </div>
        )}
      </div>
      <div className="p-4 m-3 lg:px-8 bg-white fixed bottom-0 w-full ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-6">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:transparent"
                      placeholder="En quoi puis-je vous aider ?"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="col-span-12 lg:col-span-2 w-full"
              disabled={isLoading}
            >
              Générer
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Chat;
