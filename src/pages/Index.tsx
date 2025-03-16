
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl w-full"
      >
        <span className="text-sm uppercase tracking-widest text-muted-foreground">Project</span>
        <h1 className="text-4xl font-medium mt-2 mb-6">Workflow System</h1>
        <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
          <p className="text-lg text-balance mb-6">
            Welcome to your new project. This is a blank canvas for your workflow system. 
            Check the workflow.md file for instructions on how to proceed.
          </p>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <p>Define your workflow</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <p>Edit workflow.md with your requirements</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <p>Build your system step by step</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
