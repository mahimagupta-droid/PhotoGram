import FileUploader from "@/components/fileUploader";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUserContext } from "@/context/userAuthContext";
import { createPost } from "@/repository/post.service";
import { type postData } from "@/types/type"; // Fix casing
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const [photos, setPhotos] = useState<string[]>([])
  // State for the post metadata
  const [caption, setCaption] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!user) {
    navigate("/login");
    return;
  }

  if (photos.length === 0) {
    alert("Please upload at least one photo");
    return;
  }

  const finalPost: postData = {
    caption,
    photos, // 🔥 Firebase URLs
    likes: 0,
    userlikes: [],
    userid: user.uid,
    date: new Date(),
  };

  await createPost(finalPost);
  navigate("/");
};


  return (
    <Layout>
      <div className="flex justify-center">
        <div className="border max-w-3xl w-full">
          <h3 className="bg-slate-800 text-white text-center text-2xl p-4 font-bold">
            Create Post
          </h3>
        </div>
      </div>
      <div className="p-8 border max-w-3xl w-full mx-auto"> {/* Added mx-auto */}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <Label htmlFor="caption" className="mb-4">
              Add Caption
            </Label>
            <Textarea
              className="mb-8"
              id="caption"
              placeholder="What's in your photo?"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />

            <div className="flex flex-col">
              <Label className="mb-4" htmlFor="photos">
                Photos
              </Label>
            </div>

            <div className="mt-2 mb-2">
              
            </div>
            <FileUploader onUploadComplete={(url) => setPhotos((prev) => [...prev, url])}/>
            <Button className="mt-8 w-32" type="submit">
              Post
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreatePost;