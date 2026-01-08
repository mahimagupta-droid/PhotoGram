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
  caption: string;
  photos: string[];     // ✅ Firebase URLs
  likes: number;
  userlikes: string[];
  userid: string;
  date: any;
};

export type DocResponse = postData & {
  id: string;
};
