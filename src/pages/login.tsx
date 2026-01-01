import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useUserContext } from "@/context/userAuthContext"
import {type userLoginInfo} from "@/types"
export default function LogIn() {
  const authContext = useUserContext();
  const initialValue: userLoginInfo = {
    email: "",
    password: ""}
  const [userInfo, setUserInfo] = useState<userLoginInfo>(initialValue)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await authContext?.logIn(userInfo.email, userInfo.password)
    } catch (error) {
      console.log("Login error:", error)
    }
  }
  const handleGoogleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      await authContext?.signUpWithGoogle()
    } catch (error) {
      console.log("Google Sign-In error:", error)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={userInfo.email}
                onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input 
                id="password" 
                type="password" 
                required 
                value={userInfo.password}
                onChange={(e) => setUserInfo({...userInfo, password: e.target.value})}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button 
          type="submit" 
          className="w-full"
       >
          Login
        </Button>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={handleGoogleSubmit}
        >
          Login with Google
        </Button>
      </CardFooter>
    </Card>
    </div>
  )
}
