import {cookies} from "next/headers";
import {createRouteHandlerClient} from "@supabase/auth-helpers-nextjs";
import {NextResponse} from "next/server";

export const dynamic = "force-dynamic"

export async function GET(request) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get("code")
    if (code) {
        const cookieStore = cookies()
        const supabase = createRouteHandlerClient({cookies: () => cookieStore})
        try {
            await supabase.auth.exchangeCodeForSession(code)
        } catch (error) {
            return NextResponse.redirect(new URL('/login?error=failed', request.url)
            )
        }
    }
    return NextResponse.redirect(new URL("/", request.url))
}