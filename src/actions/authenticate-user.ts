"use server";

import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

const authenticateUser = async (email: string, password: string) => {
  try {
    const supabase = createClient();

    const { error } = await (
      await supabase
    ).auth.signInWithPassword({ email, password });

    if (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  } catch (err) {
    console.error(err);
    NextResponse.json({ message: err });
  }
};

export { authenticateUser };
