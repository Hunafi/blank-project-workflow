
import { supabase } from "@/integrations/supabase/client";

export const passwordService = {
  async verifyPassword(password: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('editor_settings')
        .select('password')
        .eq('id', 1)
        .single();
      
      if (error) {
        console.error('Error verifying password:', error);
        return false;
      }
      
      return data?.password === password;
    } catch (error) {
      console.error('Error in password verification:', error);
      return false;
    }
  },
  
  async updatePassword(newPassword: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('editor_settings')
        .update({ password: newPassword })
        .eq('id', 1);
      
      if (error) {
        console.error('Error updating password:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error in password update:', error);
      return false;
    }
  }
};
