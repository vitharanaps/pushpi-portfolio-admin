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
  ConnectMyStoryFormSchema,
  HeroTextGeneratorFormSchema,
  HeroTextTypeFormSchema,
  HeroUsernameFormSchema,
  myStoryFormSchema,
} from "@/lib/validation";
import { supabase } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { text } from "node:stream/consumers";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoCloseCircle } from "react-icons/io5";
import { string, z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { cursorTextTypes, infoTypes } from "@/types";
import { Textarea } from "@/components/ui/textarea";

const Home = () => {
  const temporaryText = [{ text: "" }];
  const [info, setInfo] = useState<infoTypes[]>();

  const { toast } = useToast();
  const [textTypeText, setTextTypeText] = useState<string[]>(
    // (cursorGeneratorText &&
    //   cursorGeneratorText.length > 0) ?
    //   cursorGeneratorText.map((item) => item.text) :
    //   []
    temporaryText.map((item) => item.text)
  );

  useEffect(() => {
    getInfo();
    getTextGeneratorData();
  }, []);

  // get Info

  const getInfo = async () => {
    const { data: info, error } = await supabase.from("info").select("*");

    if (info && info.length > 0) {
      setInfo(info);
    } else {
      console.log(error, "Something went Wrong");
    }
  };

  const getTextGeneratorData = async () => {
    let { data: cursorGenerator, error } = await supabase
      .from("cursorGenerator")
      .select("text");

    if (cursorGenerator && cursorGenerator.length > 0) {
      setTextTypeText(cursorGenerator.map((item) => item.text));
    }

    console.log(cursorGenerator, "cursor generator");
  };

  const form = useForm<z.infer<typeof HeroUsernameFormSchema>>({
    resolver: zodResolver(HeroUsernameFormSchema),
    defaultValues: {
       username : info?.[0]?.username
        },
  });
  async function onSubmitUserName(
    values: z.infer<typeof HeroUsernameFormSchema>
  ) {
    const { data, error } = await supabase
      .from("info")
      .update({ username: values.username })
      .eq("id", 1)
      .select();

    if (data) {
      toast({
        title: "Username Successfully Updated !",
      });
    }
    form.reset();
  }

  // Text Generator
  const form2 = useForm<z.infer<typeof HeroTextGeneratorFormSchema>>({
    resolver: zodResolver(HeroTextGeneratorFormSchema),
    defaultValues: {
      textGenerator: info?.[0]?.textGenerator,
    },
  });

  async function onSubmitTextGenerate(
    values: z.infer<typeof HeroTextGeneratorFormSchema>
  ) {
    const { data, error } = await supabase
      .from("info")
      .update({ textGenerator: values.textGenerator })
      .eq("id", 1)
      .select();

    if (data) {
      toast({
        title: "Text Generator Successfully Updated !",
      });
    }
    form2.reset();
  }

  // about my story
  const form4 = useForm<z.infer<typeof myStoryFormSchema>>({
    resolver: zodResolver(myStoryFormSchema),
    defaultValues: {
      aboutMyStory: info?.[0]?.myDesc,
    },
  });

  async function onSubmitMyStory(values: z.infer<typeof myStoryFormSchema>) {
    const { data, error } = await supabase
      .from("info")
      .update({ myDesc: values.aboutMyStory })
      .eq("id", 1)
      .select();

    if (data) {
      toast({
        title: "My Story Successfully Updated !",
      });
    }
    form4.reset();
  }

  // Text Generator
  const form3 = useForm<z.infer<typeof HeroTextTypeFormSchema>>({
    resolver: zodResolver(HeroTextTypeFormSchema),
    defaultValues: {
      textType: "",
    },
  });

  async function onSubmitTextTypeEffect(
    values: z.infer<typeof HeroTextTypeFormSchema>
  ) {
    const { data, error } = await supabase
      .from("cursorGenerator")
      .insert([{ text: values.textType }])
      .select();

    setTextTypeText([...textTypeText, values.textType]);
    form3.reset();

    if (data) {
      toast({
        title: "Cursor Generator  Text Successfully Updated !",
      });
    }
    form2.reset();
  }

  const handleClick = async (text: string) => {
    const restTexts = textTypeText.filter((item) => item !== text);
    setTextTypeText(restTexts);

    const { error } = await supabase
      .from("cursorGenerator")
      .delete()
      .eq("text", text);

    if (!error) {
      toast({
        title: "Text Generator Successfully Removed from List Updated !",
      });
    }
    form2.reset();
  };


  // Connect my Desc
  const form5 = useForm<z.infer<typeof ConnectMyStoryFormSchema>>({
    resolver: zodResolver(ConnectMyStoryFormSchema),
    defaultValues: {
      connectMyStory: info?.[0]?.connectDesc,
    },
  });

  async function onSubmitConnectMyStory(values: z.infer<typeof ConnectMyStoryFormSchema>) {
    const { data, error } = await supabase
      .from("info")
      .update({ "connectDesc": values.connectMyStory })
      .eq("id", 1)
      .select();

    if (data) {
      toast({
        title: "My Connect Story Successfully Updated !",
      });
    }
    form2.reset();
  }

  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row bg-gray-100">
      {/* LEFT */}
      <div className="w-full flex flex-col gap-8">
        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
          <CategoryCard type="Skill" img="/skills.png" count={10}/>
          <CategoryCard type="Experience" img="/experience.png"  count={5}/>
          <CategoryCard type="Education" img="/education.png" count={3}/>
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
                            placeholder="P S Witharana"
                            {...field}
                            className=" focus:ring-1 focus:ring-mySky md:px-3 md:w-full
                          "
                         defaultValue={info?.[0]?.username}
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
                            placeholder="Java Scripts"
                            {...field}
                            className=" focus:ring-1 focus:ring-mySky md:px-3 md:w-full
                          "
                          defaultValue={info?.[0]?.textGenerator}
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
                            placeholder="Java Scripts "
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
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3">
            <div className=" w-full  bg-white px-3 py-5 rounded-lg md:items-center">
              <Form {...form4}>
                <form
                  onSubmit={form4.handleSubmit(onSubmitMyStory)}
                  className="space-y-8"
                >
                  <FormField
                    control={form4.control}
                    name="aboutMyStory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>About My Story</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Type your Story" {...field} defaultValue={info?.[0]?.myDesc} />
                        </FormControl>
                        <FormDescription>
                          This is about your story.
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
              <Form {...form5}>
                <form
                  onSubmit={form5.handleSubmit(onSubmitConnectMyStory)}
                  className="space-y-8"
                >
                  <FormField
                    control={form5.control}
                    name="connectMyStory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Connect My Desc</FormLabel>
                        <FormControl>
                        <Textarea  placeholder="Connect Desc"  {...field} defaultValue={info?.[0]?.connectDesc} />

                     
                        
                        </FormControl>
                        <FormDescription>
                          This is your Footer section Connect Description.
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
        </div>
      </div>
    </div>
  );
};

export default Home;
