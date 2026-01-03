import FileUploader from "@/components/fileUploader"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const Home = () => {
  return (
    <Layout>
      <div className="flex justify-center">
        <div className="border max-w-3xl w-full">
          <h3 className="bg-slate-800 text-white text-center text-2xl p-4 font-bold">Create Post</h3>
        </div>
      </div>
      <div className="p-8 border">
        <form action="">
          <div className="flex flex-col">
            <Label htmlFor="caption" className="mb-4">Add Caption</Label>
            <Textarea className="mb-8" id="caption" placeholder="What's in your photo?"/>
            <div className="flex flex-col">
              <Label className="mb-4" htmlFor="photos">Photos</Label>
            </div>
            <div className="mt-2 mb-2">
              <FileUploader />
            </div>
            <Button className="mt-8 w-32" type="submit">Post</Button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default Home