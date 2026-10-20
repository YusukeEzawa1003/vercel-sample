import { NextResponse } from "next/server";

/**
 * GET /api/env-demo
 *
 * サーバーサイドでのみアクセスできるシークレット環境変数の利用例。
 * MY_SECRET_KEY はブラウザには公開されず、このサーバー関数内でのみ参照できる。
 *
 * 注意: 実際のアプリでは秘密情報をそのままレスポンスに含めないこと。
 * ここではデモ目的で "has_value" フラグのみ返す。
 */
export async function GET() {
  const secretKey = process.env.MY_SECRET_KEY;
  const databaseUrl = process.env.DATABASE_URL;

  return NextResponse.json({
    // シークレット値は返さず、設定されているかどうかだけ示す
    MY_SECRET_KEY: secretKey ? "✅ 設定済み (値は非公開)" : "❌ 未設定",
    DATABASE_URL: databaseUrl ? "✅ 設定済み (値は非公開)" : "❌ 未設定",
    // NEXT_PUBLIC_ 変数はサーバーからも参照可能
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME ?? "未設定",
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "未設定",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
}
