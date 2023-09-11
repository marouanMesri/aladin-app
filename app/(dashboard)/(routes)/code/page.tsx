"use client";
import Heading from "@/components/heading";
import { Code2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

import axios from "axios";
import Empty from "@/components/empty";
import Loader from "@/components/Loader";
import BotAvatar from "@/components/bot-avatar";
import UserAvatar from "@/components/user-avatar";

const Code = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/code", {
        messages: newMessages,
      });

      console.log("RESPONSE-DATA :", response.data);

      setMessages((current) => [...current, userMessage, response.data]);
      form.reset();
      console.log("MESSAGES :", messages);
    } catch (error: any) {
      // TODO : Open Pro Modal
      console.error(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="h-screen flex flex-col mb-96 ">
      <div className="fixed top-0  bg-white opacity-75 w-full backdrop-blur-sm ">
        <Heading
          title="Générateur de code"
          description="Génère du code dans le langage de votre choix.."
          icon={Code2}
          iconColor="text-emerald-400"
          bgColor="bg-emerald-400/10"
        />
      </div>
      <div className="space-y-4 mt-20 pb-20 ">
        {isLoading && <Loader label="Je réfléchis un peu...." />}
        {messages.length === 0 && !isLoading && (
          <Empty label="Aucune recherche effectuée encore" />
        )}
        <div className="flex flex-col flex-grow overflow-y-auto p-3 m-3 gap-y-4 ">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`rounded-lg flex items-start gap-x-8 m-1 p-4 ${
                  message.role === "assistant"
                    ? "bg-emerald-400/10 text-emerald-400"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <ReactMarkdown
                  components={{
                    pre: ({ node, ...props }) => (
                      <div className="overflow-auto w-full my-2 bg-black text-white p-2 rounded-lg  ">
                        <pre {...props} />
                      </div>
                    ),
                    code: ({ node, ...props }) => (
                      <code
                        className="bg-black text-white rounded-lg p-1 "
                        {...props}
                      />
                    ),
                  }}
                  className="text-sm overflow-hidden leading-7 "
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-3 lg:px-8 bg-white fixed bottom-0 w-full ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:transparent"
                      placeholder="Un caroussel un ReactJS..."
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

export default Code;
