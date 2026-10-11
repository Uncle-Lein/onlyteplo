import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: NextRequest) {
  try {
    console.log("📥 API /upload: получен запрос");

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const type = formData.get("type") as string;

    console.log("📁 Файл:", file?.name, file?.size, "Тип:", type);

    if (!file) {
      return NextResponse.json({ error: "Файл не передан" }, { status: 400 });
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${type}/${fileName}`;

    console.log("📂 Путь в Storage:", filePath);

    const { error: uploadError } = await supabase.storage
      .from("invites")
      .upload(filePath, file);

    if (uploadError) {
      console.error("❌ Ошибка Supabase:", uploadError);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: urlData } = supabase.storage
      .from("invites")
      .getPublicUrl(filePath);

    console.log("✅ Публичный URL:", urlData.publicUrl);

    return NextResponse.json({ url: urlData.publicUrl });
  } catch (err: any) {
    console.error("💥 Ошибка API:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}