import type { OutputFileEntry } from "@uploadcare/react-uploader";

export type userLoginInfo = {
    email: string;
    password: string;
}

export type userSignUpInfo = {
    email: string;
    password: string;
    confirmPassword: string;
}

export type postData = {
    caption: string,
    photos: PhotoMeta[],
    likes: number,
    userlikes: [],
    userid: string | null,
    date: Date
}

export type PhotoMeta = {
    uuid: string,
    cdnUrl: string
}

export type fileEntry = {
    files: OutputFileEntry[]
}  