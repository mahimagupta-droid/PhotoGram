import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useUserContext } from "@/context/userAuthContext"
import { type userSignUpInfo } from "@/types"
export default function SignUp() {
  const initialValue: userSignUpInfo = {
    email: "",
    password: "",
    confirmPassword: ""
  }
  const authContext = useUserContext();
  const [userInfo, setUserInfo] = useState<userSignUpInfo>(initialValue)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    return await authContext?.signUp(userInfo.email, userInfo.password)
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign Up your account</CardTitle>
        <CardDescription>
          Enter your email below to sign up
        </CardDescription>
        <CardAction>
          <Button variant="link">Log In</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
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
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Confirm Password</Label>
              </div>
              <Input 
                id="confirmPassword" 
                type="password" 
                required 
                value={userInfo.confirmPassword}
                onChange={(e) => setUserInfo({...userInfo, confirmPassword: e.target.value})}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button 
          type="submit" 
          className="w-full"
          onSubmit={handleSubmit}
        >
          Sign Up
        </Button>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => authContext?.signUpWithGoogle()}
          >
          SignIn with Google
        </Button>
      </CardFooter>
    </Card>
    </div>
  )
}
