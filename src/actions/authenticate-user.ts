"use server";

import { createClient } from "@/utils/supabase/server";

const authenticateUser = async (email: string, password: string) => {
  try {
    const supabase = createClient();

    const { error } = await (
      await supabase
    ).auth.signInWithPassword({ email, password });

    if (error) {
      console.error(error.message);
      throw error;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export { authenticateUser };
