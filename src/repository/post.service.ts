import type { postData } from "@/types/type";
import { app } from "@/firebaseConfig"; 
import { collection, addDoc, query, orderBy, getDoc, doc, deleteDoc, getDocs } from "firebase/firestore";
const COLLECTION_NAME = "posts";
import { where } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const db = getFirestore(app) 

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

export const getAllPosts = async (): Promise<postData[]> => {
  const postsRef = collection(db, "posts");
  const q = query(postsRef, orderBy("date", "desc"));
  const snapshot = await getDocs(q);
  const posts: postData[] = snapshot.docs.map((doc) => ({
    id: doc.id,        // 🔥 VERY IMPORTANT
    ...(doc.data() as postData),
  }));
  return posts;
};
