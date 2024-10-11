"use client";
import Image from "next/image";
import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { IoClose, IoCloseCircle, IoLocationSharp } from "react-icons/io5";
import Search from "@/components/Search";
import { PlusCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SkillsFormSchema, experienceFormSchema } from "@/lib/validation";
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
import { TbCalendarRepeat } from "react-icons/tb";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdCastForEducation } from "react-icons/md";
import { supabase } from "@/utils/supabase/client";
import { title } from "process";
import { useToast } from "@/hooks/use-toast";

const Experience = () => {
  const [expModelOpen, setExpModelOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>();
    const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  // 1. Define your form.
  const form = useForm<z.infer<typeof experienceFormSchema>>({
    resolver: zodResolver(experienceFormSchema),
    defaultValues: {
      companyName: "",
      startDate: "",
      endDate: "",
      location: "",
      jobRole: "",
    },
  });

  async function onSubmit(values: z.infer<typeof experienceFormSchema>) {

   if (file) {
   const imgUrl = await uploadImage(file);

   const { data, error } = await supabase
   .from("experiences")
   .insert({ ...values, img: imgUrl })
   .select();
 if (data) {
   toast({
     title: "Experience added Successfully !",
   });
   form.reset();
   setExpModelOpen(!expModelOpen);
   setFile(null);
   setImagePreview("")

 } else {
   toast({
     title: "Something went Wrong !",
   });
 }
    } else {
      toast({
        title: "Please select an image to upload!"
      });
      return ;
    }


  }

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      // Set the selected file to state
      setFile(selectedFile);

      // Create a preview URL for the selected image
      const previewUrl = URL.createObjectURL(selectedFile);
      setImagePreview(previewUrl);
      setError(null); // Clear any previous errors
    }

  };
  // const handleUploadClick = () => {
  //   if (file) {
  //     uploadImage(file);
  //   } else {
  //     toast({
  //       title: "Please select an image to upload!"
  //     });
  //   }
  // };


  const uploadImage = async(file :File) =>{
    const fileName = Date.now().toString();
    const fileExt = fileName.split(".").pop();
    const {data, error} = await supabase.storage.from("exp").upload(`${fileName}`,file, {
      contentType :`image/${fileExt}`, 
      upsert:false
    })
    if(error){
      toast({
        title:"Some thing went wrong Image Uploading"!
      })
    }else{
      const imageUrl =process.env.NEXT_PUBLIC_IMAGE_EXP_URL+fileName;
      return imageUrl;
    }
  }
console.log(imagePreview, "image preview")
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row bg-gray-100 h-full">
      {/* LEFT */}
      <div className="flex gap-4 flex-col items-center justify-center w-full relative">
        <div className="w-full flex justify-between items-center bg-white py-4 px-4 gap-3">
          <Search />
          <div
            className="flex items-center justify-center gap-2 bg-myYellow px-2 py-2 rounded-md cursor-pointer"
            onClick={() => setExpModelOpen(true)}
          >
            <PlusCircleIcon size={24} color="green" />
            <span className="text-sm text-gray-500 hidden md:block">
              Add New Experience
            </span>
          </div>
        </div>
        <div className="w-full flex  items-center bg-white py-4 px-4 gap-3">
          <MdCastForEducation size={30} color="gray" />
          <span className=" md:text-md text-slate-500 ">
            Experience Dashboard
          </span>
        </div>
        <div className="flex gap-4 justify-between flex-wrap">
          <div className="relative flex flex-1 min-w-[80%] sm:min-w-[300px] items-center justify-center flex-col bg-white p-4 space-y-3 rounded-md">
            <Image
              src={ "/react.png"}
              width={150}
              height={150}
              alt=""
              className="flex items-center justify-center h-[180px]  object-contain"
            />
            <span className="text-center text-lg font-[400] text-gray-700">
              University Of Ruhuna - Faculty Of Science
            </span>
            <p className="tex-sm text-gray-500 text-center">
              Bsc In Computer Science, Mathematics, Physics
            </p>
            <span className="text-xs text-gray-400 flex items-center justify-center gap-2">
              {" "}
              <FaRegCalendarAlt size={18} color="gray" /> Start Date - End Date
            </span>
            <span className="text-xs text-gray-400 flex items-center justify-center gap-2">
              {" "}
              <IoLocationSharp size={18} color="gray" />
              Matara - Sri Lanka
            </span>
            <div className="flex items-center justify-center gap-3">
              <IoClose
                color="red"
                size={40}
                className="px-2 py-1 bg-yellow-100 rounded-full cursor-pointer"
              />
              <BiEdit
                color="blue"
                size={40}
                className="px-2 py-1 bg-yellow-100 rounded-full cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {expModelOpen && (
        <div className="w-full h-full bg-black/80 z-20 absolute top-0 left-0 overflow-y-scroll pt-20">
          <div className="w-[60%] h-[80%] bg-white absolute top-[5%] left-[20%] md:top-[10%] ms:left-[30%] md:max-w-3xl rounded-md py-3 px-3 shadow-lg ">
            <IoCloseCircle
              size={24}
              color="red"
              onClick={() => setExpModelOpen(!expModelOpen)}
              className="absolute right-0 top-0 cursor-pointer"
            />
            <div className="w-full h-full flex items-center flex-col gap-1 md:justify-between md:flex-row md:gap-3">
              {/* Image Container */}
              <div className="flex flex-1 h-full w-full items-center justify-center flex-col pb-4">
                <Image
                  src={imagePreview ||"/noImage.png"}
                  alt="img"
                  width={150}
                  height={150}
                  className="w-[150px] h-[150px]  md:w-[50%] ms:h-[50%]"
                />
                <input
                  type="file"
                  id="uploadImage"
                  onChange={handleChangeFile}
                  accept="image/png , image/gif, image/jpg, image/jpeg"
                  hidden
                />
              
                <label
                  htmlFor="uploadImage"
                  className="text-gray-400 text-sm cursor-pointer px-3 py-1 rounded-md ring-1 ring-slate-400"
                >
                  Upload Image
                </label>
              </div>
              {/* form Container */}
              <div className="flex flex-1 h-full w-full items-center justify-center overflow-y-scroll pt-[250px] md:pt-[180px]">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 px-2"
                  >
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input placeholder="abc company" {...field} />
                          </FormControl>
                          <FormDescription>
                            This is your Experience Section Company Name.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Date</FormLabel>
                            <FormControl>
                              <Input placeholder="2024-Jan-20" {...field} />
                            </FormControl>
                            <FormDescription>
                              This is your Experience Section Start Date.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>End Date</FormLabel>
                            <FormControl>
                              <Input placeholder="2024-Jan-4" {...field} />
                            </FormControl>
                            <FormDescription>
                              This is your Experience Section End Date.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Colombo 10- Sri Lanka"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            This is your Experience Section Company Name.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="jobRole"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Role</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Software Developer"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            This is your Experience Section Position.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      // disabled={file === null}
                    >
                      Add Experience
                    </Button>
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

export default Experience;
