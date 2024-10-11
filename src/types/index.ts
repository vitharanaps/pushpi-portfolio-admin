export interface cursorTextTypes {
  created_at: string;
  id: number;
  text: string;
}

export interface UploadImageResponse {
  data: {
    path: string;
    size: number;
    type: string;
  } | null;
  publicURL: string | null;
  error: string | null;
}

// home
export interface infoTypes {
  connectDesc?: string ;
  created_at: string | null;
  github?: string | null;
  id: number;
  linkedIn?: string | null;
  myDesc: string ;
  myImage?: string | null;
  textGenerator?: string;
  username: string ;
}
