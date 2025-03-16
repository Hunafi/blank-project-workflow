import { useEditorStore } from "@/store/editorStore";
import PasswordProtection from "@/components/PasswordProtection";
import Editor from "@/components/Editor";

const Index = () => {
  const isAuthenticated = useEditorStore(state => state.isAuthenticated);
  const isPasswordProtected = useEditorStore(state => state.isPasswordProtected);

  // If the editor is password protected and the user is not authenticated,
  // show the password protection screen
  if (isPasswordProtected && !isAuthenticated) {
    return <PasswordProtection />;
  }

  // Otherwise, show the editor
  return <Editor />;
};

export default Index;
