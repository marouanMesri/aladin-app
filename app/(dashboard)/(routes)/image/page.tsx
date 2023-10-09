"use client";
import Heading from "@/components/heading";
import { MessageSquare } from "lucide-react";
import Image from "next/image";
import { Download, ImageIcon } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema, amountOptions, resolutionOptions } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import axios from "axios";
import Empty from "@/components/empty";
import Loader from "@/components/Loader";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ImageGeneration = () => {
  const router = useRouter();
  const [images, setImages] = useState<String[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "256x256",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage = {
        role: "user",
        content: values.prompt,
      };

      const response = await axios.post("/api/images", {
        values,
      });
      console.log("RESPONSE : ", response.data);
      const imageURLs = response.data.map((item) => item.url);
      setImages(imageURLs);

      useEffect(() => {
        console.log("IMAGE : ", images);
      }, [images]);

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
          title="Générateur d'images"
          description="Des images créatives ou réalistes !"
          icon={MessageSquare}
          iconColor="text-orange-500"
          bgColor="bg-orange-500/10"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
        {isLoading && <Loader label="Je réfléchis un peu...." />}

        {images.map((src, key) => (
          <Card key={key} className="rounded-lg overflow-hidden">
            <div className="relative aspect-square">
              <Image fill alt="Generated" src={src} />
            </div>
            <CardFooter className="p-2">
              <Button
                onClick={() => window.open(src)}
                variant="secondary"
                className="w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </CardFooter>
          </Card>
        ))}
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
                <FormItem className="col-span-12 lg:col-span-3">
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
            <FormField
              name="amount"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <FormControl className="m-0 p-0">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={field.value} />
                      </SelectTrigger>
                      <SelectContent>
                        {amountOptions.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="resolution"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <FormControl className="m-0 p-0">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={field.value} />
                      </SelectTrigger>
                      <SelectContent>
                        {resolutionOptions.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="col-span-2 lg:col-span-2 w-full"
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

export default ImageGeneration;
