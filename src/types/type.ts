import type { OutputFileEntry } from "@uploadcare/blocks";

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

export type FileEntry = {
    files: OutputFileEntry[]
}  

export type DocResponse = {
    id: string,
    caption: string,
    photos: PhotoMeta[],
    likes: number,
    userlikes: [],
    userid: string | null,
    date: Date
}