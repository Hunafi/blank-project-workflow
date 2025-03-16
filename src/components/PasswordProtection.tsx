
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEditorStore } from "@/store/editorStore";
import { useToast } from "@/components/ui/use-toast";

const PasswordProtection = () => {
  const [password, setPassword] = useState("");
  const authenticate = useEditorStore(state => state.authenticate);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isValid = authenticate(password);
    
    if (!isValid) {
      toast({
        title: "Authentication Failed",
        description: "The password you entered is incorrect.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>3D Asset Editor</CardTitle>
          <CardDescription>
            Please enter the password to access the editor.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Access Editor
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default PasswordProtection;
