"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { IoClose, IoCloseCircle } from "react-icons/io5";
import Search from "@/components/Search";
import { PlusCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SkillsFormSchema } from "@/lib/validation";
import { z } from "zod";
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
import { supabase } from "@/utils/supabase/client";
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import { useToast } from "@/hooks/use-toast";
import { title } from "process";

interface technologyTypes {
  id: number;
  skill: string;
  icon_name: string;
}

const Skills = () => {

  const iconLibraries: { [key: string]: any } = {
    ...FaIcons,
    ...SiIcons,
    ...AiIcons,
    ...MdIcons,
  };

  const { toast } = useToast();
  const [skillModelOpen, setSkillModelOpen] = useState(false);
  const [technologiesDb, setTechnologiesDb] = useState<technologyTypes[]>();
  const [editSkillModal, setEditSkillModal] = useState(false);
  const [editSkillRow, setEditSkillRow] = useState<technologyTypes>();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SkillsFormSchema>>({
    resolver: zodResolver(SkillsFormSchema),
    defaultValues: {
      skill: "",
      icon: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SkillsFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const { data, error } = await supabase
      .from("technologies")
      .insert([{ skill: values.skill, icon_name: values.icon }])
      .select();

    if (data) {
      toast({
        title: "Skill Successfully Added !",
      });
    }
  //  setSkillModelOpen(!skillModelOpen)
    fetchSkills();
    form.reset();
  }

  // 1. Define your form.
  const form2 = useForm<z.infer<typeof SkillsFormSchema>>({
    resolver: zodResolver(SkillsFormSchema),
    defaultValues: {
      skill: editSkillRow?.skill && editSkillRow.skill,
      icon: editSkillRow?.icon_name && editSkillRow.icon_name,
    },
  });

  // 2. Define a submit handler.
  async function onSubmitEditSkill(values: z.infer<typeof SkillsFormSchema>) {
    const { data, error } = await supabase
      .from("technologies")
      .update({ skill: values?.skill, icon_name: values?.icon })
      .eq("id", editSkillRow?.id)
      .select();
    if (data) {
      toast({
        title: "Skill Successfully Updated !",
      });
    }
    fetchSkills();
    setEditSkillModal(!editSkillModal)
  }

  useEffect(() => {
    fetchSkills();
  }, []);
  const fetchSkills = async () => {
    const { data, error } = await supabase.from("technologies").select("*");
    if (error) {
      console.error("Error fetching skills:", error);
    } else {
      console.log(data, "data");
      setTechnologiesDb(data);
    }
  };

  const deleteSkill = async (id: number) => {
    const { error } = await supabase.from("technologies").delete().eq("id", id);
    if (!error) {
      toast({
        title: "Skill Successfully Deleted !",
      });
    }
    fetchSkills();
  };

  // update Skills

  //   const editSkill  = async (id:number)=>{

  // const { data, error } = await supabase
  // .from('technologies')
  // .update({"skill" : '' })
  // .eq('id', id)
  // .select()

  //   }

  const editSkill = async (id: number) => {
    await fetchSpecificSkill(id);
    setEditSkillModal(true);
  };

  // fetch Specific Skill
  const fetchSpecificSkill = async (id: number) => {
    let { data: technologies, error } = await supabase
      .from("technologies")
      .select("*")
      .eq("id", id);

    if (error) {
      console.log(error);
    }
    if (technologies) {
      setEditSkillRow(technologies[0]);
    }
  };

  console.log(editSkillRow, "Edit Skill Row");

  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row bg-gray-100">
      {/* LEFT */}
      <div className="flex gap-4 flex-col items-center justify-center w-full relative">
        <div className="w-full flex justify-between items-center bg-white py-4 px-4 gap-3">
          <Search />
          <div
            className="flex items-center justify-center gap-2 bg-myYellow px-2 py-2 rounded-md cursor-pointer"
            onClick={() => setSkillModelOpen(true)}
          >
            <PlusCircleIcon size={24} color="green" />
            <span className="text-sm text-gray-500 hidden md:block">
              Add New Skill
            </span>
          </div>
        </div>
        <div className="flex gap-4 justify-between flex-wrap">
          {technologiesDb?.map((item) => {
            // const IconComponent = (FaIcons | SiIcons as any)[item.icon_name]; // dynamically get the icon component
            const IconComponent = iconLibraries[item.icon_name];
            return (
              <div className="relative flex flex-1 min-w-[45%] sm:min-w-[200px] items-center justify-center flex-col bg-white p-4 space-y-3 rounded-md">
                {IconComponent ? (
                  <IconComponent size={40} color="purple" />
                ) : (
                  <span>Icon not found</span>
                )}
                <span className="text-center text-sm text-gray-400">
                  {item?.skill}
                </span>
                <div className="flex items-center justify-center gap-3">
                  <IoClose
                    color="red"
                    size={40}
                    onClick={() => deleteSkill(item.id)}
                    className="px-2 py-1 bg-yellow-100 rounded-full cursor-pointer"
                  />
                  <BiEdit
                    color="blue"
                    size={40}
                    onClick={() => editSkill(item.id)}
                    className="px-2 py-1 bg-yellow-100 rounded-full cursor-pointer"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {skillModelOpen && (
        <div className="w-full h-full bg-black/80 z-20 absolute top-0 left-0 ">
          <div className="w-[60%] h-[60%] bg-white absolute top-[10%] left-[20%] md:top-[20%] ms:left-[30%] md:max-w-2xl rounded-md py-3 px-3 shadow-lg ">
            <IoCloseCircle
              size={24}
              color="red"
              onClick={() => setSkillModelOpen(!skillModelOpen)}
              className="absolute right-0 top-0 cursor-pointer"
            />
            <div className="w-full h-full flex items-center flex-col gap-1 sm:justify-between sm:flex-row sm:gap-3">
              {/* Image Container */}
              {/* <div className="flex flex-1 h-full w-full items-center justify-center flex-col">
                <Image
                  src={"/noImage.png"}
                  alt="img"
                  width={150}
                  height={150}
                  className="w-[150px] h-[150px]  md:w-[50%] ms:h-[50%]"
                />
                <input type="file" id="uploadImage" hidden />
                <label
                  htmlFor="uploadImage"
                  className="text-gray-400 text-sm cursor-pointer px-3 py-1 rounded-md ring-1 ring-slate-400"
                >
                  Upload Image
                </label>
              </div> */}
              {/* form Container */}
              <div className="flex flex-1 h-full w-full items-center justify-center">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 px-2"
                  >
                    <FormField
                      control={form.control}
                      name="skill"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Add Your Skill</FormLabel>
                          <FormControl>
                            <Input placeholder="React Js" {...field} />
                          </FormControl>
                          <FormDescription>
                            This is your skill Section Skill List.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="icon"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Add Your Icon</FormLabel>
                          <FormControl>
                            <Input placeholder="FaReact" {...field} />
                          </FormControl>
                          <FormDescription>
                            This is your skill Section Skill Icon.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Add Skill</Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      )}

      {editSkillModal && (
        <div className="w-full h-full bg-black/80 z-20 absolute top-0 left-0 ">
          <div className="w-[60%] h-[60%] bg-white absolute top-[10%] left-[20%] md:top-[20%] ms:left-[30%] md:max-w-2xl rounded-md py-3 px-3 shadow-lg ">
            <IoCloseCircle
              size={24}
              color="red"
              onClick={() => setEditSkillModal(!editSkillModal)}
              className="absolute right-0 top-0 cursor-pointer"
            />
            <div className="w-full h-full flex items-center flex-col gap-1 sm:justify-between sm:flex-row sm:gap-3">
              {/* Image Container */}
              {/* <div className="flex flex-1 h-full w-full items-center justify-center flex-col">
            <Image
              src={"/noImage.png"}
              alt="img"
              width={150}
              height={150}
              className="w-[150px] h-[150px]  md:w-[50%] ms:h-[50%]"
            />
            <input type="file" id="uploadImage" hidden />
            <label
              htmlFor="uploadImage"
              className="text-gray-400 text-sm cursor-pointer px-3 py-1 rounded-md ring-1 ring-slate-400"
            >
              Upload Image
            </label>
          </div> */}
              {/* form Container */}
              <div className="flex flex-1 h-full w-full items-center justify-center">
                <Form {...form}>
                  <form
                    onSubmit={form2.handleSubmit(onSubmitEditSkill)}
                    className="space-y-8 px-2"
                  >
                    <FormField
                      control={form2.control}
                      name="skill"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Edit Your Skill</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="React Js"
                              defaultValue={editSkillRow?.skill}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            This is your skill Section Skill List.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form2.control}
                      name="icon"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Add Your Icon</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="FaReact"
                              {...field}
                              defaultValue={editSkillRow?.icon_name}
                            />
                          </FormControl>
                          <FormDescription>
                            This is your skill Section Skill Icon.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Edit Skill</Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Skills;
