import { useEditorStore } from "@/store/editorStore";
import PasswordProtection from "@/components/PasswordProtection";
import Editor from "@/components/Editor";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const isAuthenticated = useEditorStore(state => state.isAuthenticated);
  const isPasswordProtected = useEditorStore(state => state.isPasswordProtected);

  // If the editor is password protected and the user is not authenticated,
  // show the password protection screen
  if (isPasswordProtected && !isAuthenticated) {
    return (
      <div className="flex flex-col items-center">
        <PasswordProtection />
        <div className="mt-4">
          <Link to="/landing">
            <Button variant="ghost">Back to Landing Page</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Otherwise, show the editor
  return <Editor />;
};

export default Index;
