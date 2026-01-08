import Layout from "@/components/layout";
import { useUserContext } from "@/context/userAuthContext";
import { getPostByUserId } from "@/repository/post.service";
import { type DocResponse, type postData } from "@/types/type";
import { useEffect, useState } from "react";

export default function MyPosts() {
  const { user } = useUserContext();
  const [data, setData] = useState<DocResponse[]>([]);

  const getAllPosts = async (id: string) => {
    try {
      const querySnapShot = await getPostByUserId(id);
      const tempArr: DocResponse[] = [];

      if (!querySnapShot.empty) {
        querySnapShot.forEach((doc) => {
          const post = doc.data() as postData;

          tempArr.push({
            id: doc.id,
            ...post,
          });
        });

        setData(tempArr);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderPosts = () => {
    return data.map((item) => {
      if (!item.photos || item.photos.length === 0) return null;

      return (
        <div key={item.id} className="relative group">
          <img
            src={item.photos[0]}   // ✅ Firebase URL directly
            alt="User post"
            className="w-full h-full object-cover rounded-sm"
          />
        </div>
      );
    });
  };

  useEffect(() => {
    if (user) {
      getAllPosts(user.uid);
    }
  }, [user]);

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="border max-w-3xl w-full">
          <h3 className="bg-slate-800 text-white text-center text-2xl p-4 font-bold">
            My Posts
          </h3>
        </div>
      </div>
      <div className="p-8 border max-w-3xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {data.length > 0 ? renderPosts() : <div>...Loading Posts</div>}
        </div>
      </div>
    </Layout>
  );
}
