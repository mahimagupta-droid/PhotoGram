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

      // 1. FIX: Check 'empty', not 'data.length'
      if (!querySnapShot.exists) {
        
        // 2. FIX: Iterate using 'forEach' directly on the snapshot
        querySnapShot.forEach((doc) => {
          const data = doc.data() as postData;
          const responseObj: DocResponse = {
            id: doc.id,
            ...data,
          };
          tempArr.push(responseObj);
        });

        console.log("User data received: ", tempArr);
        setData(tempArr);
      } else {
        console.log("no such data entry");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderPosts = () => {
    return data.map((item) => {
      // 3. FIX: Add a safety check to ensure photos exist
      if (!item.photos || item.photos.length === 0) return null;

      return (
        <div key={item.photos[0].uuid} className="relative group">
          <img
            // 4. FIX: Corrected URL syntax. Added '/-/' before scale_crop
            src={`${item.photos[0].cdnUrl}/-/progressive/yes/-/scale_crop/300x300/center/`}
            alt="User post"
            className="w-full h-full object-cover rounded-sm"
          />
        </div>
      );
    });
  };

  useEffect(() => {
    if (user != null) {
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
          {/* Ensure the function is called properly */}
          {data.length > 0 ? renderPosts() : <div>...Loading Posts</div>}
        </div>
      </div>
    </Layout>
  );
}