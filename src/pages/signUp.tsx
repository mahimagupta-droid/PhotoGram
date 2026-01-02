import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useUserContext } from "@/context/userAuthContext"
import { type userSignUpInfo } from "@/types"

import image1 from "/src/assets/images/image1.jpg"
import image2 from "/src/assets/images/image2.jpg"
import image3 from "/src/assets/images/image3.jpg"
import image4 from "/src/assets/images/image4.jpg"

export default function SignUp() {
  const authContext = useUserContext()

  const [userInfo, setUserInfo] = useState<userSignUpInfo>({
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (userInfo.password !== userInfo.confirmPassword) {
      alert("Passwords do not match")
      return
    }

    await authContext?.signUp(userInfo.email, userInfo.password)
  }

  return (
    <div className="min-h-screen bg-slate-800 flex items-center justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">

        {/* LEFT SIDE — IMAGES */}
        {/* LEFT SIDE — IMAGES */}
<div className="hidden lg:flex items-center justify-center">
  <div className="grid grid-cols-2 gap-4">
    {[image1, image2, image3, image4].map((img, index) => (
      <div
        key={index}
        className="w-48 h-48 rounded-3xl overflow-hidden"
      >
        <img
          src={img}
          alt={`preview-${index}`}
          className="w-full h-full object-cover"
        />
      </div>
    ))}
  </div>
</div>


        {/* RIGHT SIDE — SIGNUP FORM */}
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-sm rounded-xl shadow-md">
            <CardHeader>
              <CardTitle>Create your account</CardTitle>
              <CardDescription>
                Enter your email below to sign up
              </CardDescription>
              <CardAction>
                <Button variant="link">Log In</Button>
              </CardAction>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={userInfo.email}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, email: e.target.value })
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={userInfo.password}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, password: e.target.value })
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    required
                    value={userInfo.confirmPassword}
                    onChange={(e) =>
                      setUserInfo({
                        ...userInfo,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => authContext?.signUpWithGoogle()}
                  type="button"
                >
                  Sign up with Google
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>

      </div>
    </div>
  )
}
