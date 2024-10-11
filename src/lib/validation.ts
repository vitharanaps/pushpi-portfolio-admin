"use client"
 
import { z } from "zod"

// Hero section

export const HeroUsernameFormSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  })
   


export const HeroTextGeneratorFormSchema = z.object({
    textGenerator: z.string().min(2, {
      message: "Text Generator must be at least 2 characters.",
    }),
  })
   


export const HeroTextTypeFormSchema = z.object({
    textType: z.string().min(2, {
      message: "Text Type Effect must be at least 2 characters.",
    }),
  })
   
  // my Story

  
  export const myStoryFormSchema = z.object({
    aboutMyStory: z.string().min(2, {
      message: "Text Type Effect must be at least 2 characters.",
    }),
  })

  // Connect My Story

  
  export const ConnectMyStoryFormSchema = z.object({
    connectMyStory: z.string().min(2, {
      message: " connect My Story",
    }),
  })
  // Skills

  export const SkillsFormSchema = z.object({

    skill: z.string().min(2, {
      message: "Skill must be at least 2 characters.",
    }),
    icon: z.string().min(2, {
      message: "icon must be at least 2 characters.",
    }),
  })
  

  

  export const experienceFormSchema = z.object({
    companyName: z.string().min(2, {
      message: "Skill must be at least 2 characters.",
    }),
    startDate: z.string().min(2, {
      message: "Skill must be at least 2 characters.",
    }),
    endDate: z.string().min(2, {
      message: "Skill must be at least 2 characters.",
    }),
    location: z.string().min(2, {
      message: "Skill must be at least 2 characters.",
    }),
    jobRole: z.string().min(2, {
      message: "Skill must be at least 2 characters.",
    }),
  })

  export const educationFormSchema = z.object({
    instituteName: z.string().min(2, {
      message: "Skill must be at least 2 characters.",
    }),
    startDate: z.string().min(2, {
      message: "Skill must be at least 2 characters.",
    }),
    endDate: z.string().min(2, {
      message: "Skill must be at least 2 characters.",
    }),
    location: z.string().min(2, {
      message: "Skill must be at least 2 characters.",
    }),
    course: z.string().min(2, {
      message: "Skill must be at least 2 characters.",
    }),
  })