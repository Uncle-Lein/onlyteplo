import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { login, password } = body;

    const adminLogin = process.env.ADMIN_LOGIN;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminLogin || !adminPassword) {
      return NextResponse.json({ error: "Админ-доступ не настроен" }, { status: 500 });
    }

    if (login === adminLogin && password === adminPassword) {
      // Простой токен для сессии (можно сделать сложнее)
      const token = Buffer.from(`${login}:${password}`).toString("base64");
      return NextResponse.json({ success: true, token });
    }

    return NextResponse.json({ error: "Неверный логин или пароль" }, { status: 401 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}