import FileUploader from "@/components/fileUploader"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useUserContext } from "@/context/userAuthContext"
import { type fileEntry, type postData } from "@/types"
import { useState } from "react"

const Home = () => {
  const { user } = useUserContext()
  const [fileEntry, setFileEntry] = useState<fileEntry>({ files: [] })
  const [post, setPost] = useState<postData>({
    caption: "",
    photos: [],
    likes: 0,
    userlikes: [],
    userid: null,
    date: new Date()
  })
  const handleSubmit = async(e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("uploaded file entry: ", fileEntry)
    console.log("Created post: ", post)
  }
  return (
    <Layout>
      <div className="flex justify-center">
        <div className="border max-w-3xl w-full">
          <h3 className="bg-slate-800 text-white text-center text-2xl p-4 font-bold">Create Post</h3>
        </div>
      </div>
      <div className="p-8 border">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <Label htmlFor="caption" className="mb-4">Add Caption</Label>
            <Textarea 
              className="mb-8"    
              id="caption" 
              placeholder="What's in your photo?" 
              value={post.caption}
              onChange={(e) => setPost({...post, caption: e.target.value})}
              />
            <div className="flex flex-col">
              <Label className="mb-4" htmlFor="photos">Photos</Label>
            </div>
            <div className="mt-2 mb-2">
              <FileUploader fileEntry={fileEntry} onChange={setFileEntry}/>
            </div>
            <Button className="mt-8 w-32" type="submit">Post</Button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default Home