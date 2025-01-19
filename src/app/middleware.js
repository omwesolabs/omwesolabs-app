import {NextResponse} from "next/server";
import {createMiddlewareClient} from "@supabase/auth-helpers-nextjs";

const publicPaths = ['/', '/about', '/contact', '/login', '/support', '/careers']

export async function middleware(req) {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({req, res})
    const {data: {session}, error} = await supabase.auth.getSession()
    const isPublicPath = publicPaths.some(path => req.nextUrl.pathname.startsWith(path))
    if (!session && !isPublicPath) {
        const redirectUrl = new URL("/login", req.url)
        redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname)
        return NextResponse.redirect(redirectUrl)
    }
    return res
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|public/).*)'
    ]
}