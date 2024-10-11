// import { UploadImageResponse } from "@/types";
// import { supabase } from "./supabase/client";

// export const uploadImage = async (file: File): Promise<UploadImageResponse> => {
//     const fileName = `${Date.now()}_${file.name}`;
  
//     const { data, error } = await supabase.storage
//       .from('exp') // Replace with your bucket name
//       .upload(fileName, file);
  
//     if (error) {
//       console.error('Error uploading file:', error.message);
//       return { data: null, publicURL: null, error: error.message };
//     }
  
//     const { publicURL } = supabase.storage
//       .from('exp')
//       .getPublicUrl(fileName);
  
//     return {
//       data,
//       publicURL: publicURL || null,
//       error: null,
//     };
//   };