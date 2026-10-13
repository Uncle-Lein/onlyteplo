import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

function checkAuth(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return false;
  try {
    const decoded = Buffer.from(authHeader.replace("Bearer ", ""), "base64").toString();
    const [login, password] = decoded.split(":");
    return login === process.env.ADMIN_LOGIN && password === process.env.ADMIN_PASSWORD;
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Неавторизован" }, { status: 401 });
  }

  // Общая статистика
  const { count: invitesCount } = await supabase.from("invites").select("*", { count: "exact", head: true });
  const { count: answersCount } = await supabase.from("answers").select("*", { count: "exact", head: true });
  const { count: viewedCount } = await supabase.from("invites").select("*", { count: "exact", head: true }).not("viewed_at", "is", null);

  // Список всех приглашений
  const { data: invites } = await supabase
    .from("invites")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  // Список всех ответов
  const { data: answers } = await supabase
    .from("answers")
    .select(`*, invites!inner(recipient_name, custom_options)`)
    .order("created_at", { ascending: false })
    .limit(100);

  return NextResponse.json({
    stats: {
      invites: invitesCount || 0,
      answers: answersCount || 0,
      viewed: viewedCount || 0,
      conversion: invitesCount ? Math.round(((answersCount || 0) / invitesCount) * 100) : 0,
    },
    invites: invites || [],
    answers: answers || [],
  });
}