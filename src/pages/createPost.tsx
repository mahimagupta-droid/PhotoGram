import FileUploader from "@/components/fileUploader"; // Capital F usually
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUserContext } from "@/context/userAuthContext";
import { createPost } from "@/repository/post.service";
import { type FileEntry, type postData } from "@/types/type"; // Fix casing
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  // State for the uploaded files (Raw Uploadcare data)
  const [fileEntry, setFileEntry] = useState<FileEntry>({ files: [] });

  // State for the post metadata
  const [caption, setCaption] = useState("");

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 1. Convert Uploadcare files to your PhotoMeta format
    const photoMeta = fileEntry.files.map((file) => ({
      uuid: file.uuid,
      cdnUrl: file.cdnUrl,
      name: file.name,
    }));

    // 2. Create the final post object
    if (user != null) {
      const finalPost: postData = {
        caption: caption,
        photos: photoMeta,
        likes: 0,
        userlikes: [],
        userid: user?.uid || null, // Assuming user object has uid
        date: new Date(),
      };
      await createPost(finalPost);
      navigate("/")
    } else {
      navigate("/login");
    }
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
              <FileUploader fileEntry={fileEntry} onChange={setFileEntry} />
            </div>

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