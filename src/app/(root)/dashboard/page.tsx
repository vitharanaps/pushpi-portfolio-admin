"use client";
import CategoryCard from "@/components/CategoryCard";
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
import {
  HeroTextGeneratorFormSchema,
  HeroTextTypeFormSchema,
  HeroUsernameFormSchema,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { text } from "node:stream/consumers";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoCloseCircle } from "react-icons/io5";
import { string, z } from "zod";

const temporaryText = [
  { text: "Web Developer" },
  { text: "Mobile App Developer" },
  { text: "React Developer" },
];

const Home = () => {
  const [textTypeText, setTextTypeText] = useState<string[]>(
    temporaryText.map((item) => item.text) || []
  );

  console.log(textTypeText, "type text");

  const form = useForm<z.infer<typeof HeroUsernameFormSchema>>({
    resolver: zodResolver(HeroUsernameFormSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmitUserName(values: z.infer<typeof HeroUsernameFormSchema>) {
    console.log(values);
  }

  // Text Generator
  const form2 = useForm<z.infer<typeof HeroTextGeneratorFormSchema>>({
    resolver: zodResolver(HeroTextGeneratorFormSchema),
    defaultValues: {
      textGenerator: "",
    },
  });

  function onSubmitTextGenerate(
    values: z.infer<typeof HeroTextGeneratorFormSchema>
  ) {
    console.log(values, "form2");
  }

  // Text Generator
  const form3 = useForm<z.infer<typeof HeroTextTypeFormSchema>>({
    resolver: zodResolver(HeroTextTypeFormSchema),
    defaultValues: {
      textType: "",
    },
  });

  function onSubmitTextTypeEffect(
    values: z.infer<typeof HeroTextTypeFormSchema>
  ) {
    setTextTypeText([...textTypeText, values.textType]);
    form3.reset();
  }

  console.log(textTypeText);

  const handleClick = (text: string) => {
    const restTexts = textTypeText.filter((item) => item !== text);
    setTextTypeText(restTexts);
  };
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row bg-gray-100">
      {/* LEFT */}
      <div className="w-full flex flex-col gap-8">
        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
          <CategoryCard type="Skill" img="/skills.png" />
          <CategoryCard type="Experience" img="/experience.png" />
          <CategoryCard type="Education" img="/education.png" />
        </div>
        {/* MIDDLE CHARTS */}
        <div className="flex gap-4 flex-col items-center">
          {/* Hero Section Edit */}
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3">
            <div className=" w-full  bg-white px-3 py-5 rounded-lg md:items-center">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmitUserName)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="shadcn"
                            {...field}
                            className=" focus:ring-1 focus:ring-mySky md:px-3 md:w-full
                          "
                          />
                        </FormControl>
                        <FormDescription>
                          This is your hero Page display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Update</Button>
                </form>
              </Form>
            </div>
            <div className=" w-full bg-white px-3 py-5 rounded-lg md:items-center">
              <Form {...form2}>
                <form
                  onSubmit={form2.handleSubmit(onSubmitTextGenerate)}
                  className="space-y-8"
                >
                  <FormField
                    control={form2.control}
                    name="textGenerator"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Generate Text</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="shadcn"
                            {...field}
                            className=" focus:ring-1 focus:ring-mySky md:px-3 md:w-full
                          "
                          />
                        </FormControl>
                        <FormDescription>
                          This is your hero section text generate.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Update</Button>
                </form>
              </Form>
            </div>
          </div>
          <div className="flex flex-col-reverse md:flex-row w-full  gap-3">
            <div className=" w-full  bg-white px-3 py-5 rounded-lg md:items-center">
              <Form {...form3}>
                <form
                  onSubmit={form3.handleSubmit(onSubmitTextTypeEffect)}
                  className="space-y-8"
                >
                  <FormField
                    control={form3.control}
                    name="textType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type Text</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="shadcn"
                            {...field}
                            className=" focus:ring-1 focus:ring-mySky md:px-3 md:w-full
                            "
                          />
                        </FormControl>
                        <FormDescription>
                          This is your hero section text Type Effect.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Add</Button>
                </form>
              </Form>
            </div>
            <div className="w-full  bg-white px-3 py-5 rounded-lg md:items-center">
              <span className="text-lg font-semibold text-stale mb-5">
                Text Generator texts
              </span>
              <div className="flex flex-wrap w-full gap-2">
                {textTypeText.map((item, i) => (
                  <div
                    key={i}
                    className=" flex items-center gap-2 text-sm font-thin my-3 ml-4 bg-gray-200  w-fit px-3 py-1 rounded-md"
                  >
                    <p>{item}</p>
                    <IoCloseCircle
                      color="red"
                      size={24}
                      onClick={() => handleClick(item)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
