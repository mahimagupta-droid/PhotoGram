import type { postData } from "@/types/type";
import { app } from "@/firebaseConfig"; 
import { collection, addDoc, query, orderBy, getDoc, doc, deleteDoc } from "firebase/firestore";
const COLLECTION_NAME = "posts";
import { where } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const db = getDatabase(app) 

export const createPost = (post: postData) => {
    return addDoc(collection(db, COLLECTION_NAME), post);
}

export const getPosts = () => {
    const q = query(collection(db, COLLECTION_NAME), orderBy("date", "desc"));
    return getDoc(q);
}

export const getPostByUserId = (id: string) => {
    const q = query(collection(db, COLLECTION_NAME), where("userid", "==", id))
    return getDoc(q);
}

export const getSinglePost = (id: string) => {
    const docRef = doc(db, COLLECTION_NAME, id)
    return getDoc(docRef);
}
export const deletePost = (id:string) => {
    return deleteDoc(doc(db, COLLECTION_NAME, id));
}
