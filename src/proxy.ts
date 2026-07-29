// import { cookies } from 'next/headers';
import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
// import { getSubscriptionStatus } from "./app/(publicGroup)/_actions/getSubscriptionStatus";
// import { getNewAccessToken } from "./service/refreshToken";
import { jwtUtils } from "./lib/jwt";


const AUTH_ROUTES = ["/login", "/register"];
// const PUBLIC_ROUTES = ["/", "/news", "/login", "/register"]
const PUBLIC_ROUTES = ["/", "/gear"]

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const cookieStore = await cookies();
    // const accessToken = cookieStore.get("accessToken")?.value;

    

    const accessToken = request.cookies.get("accessToken")?.value;
    // const refreshToken = request.cookies.get("refreshToken")?.value;

    const decodedAccessToken = accessToken ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string) : null;

    // const decodedRefreshToken = refreshToken ? jwtUtils.verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET as string) : null;

    console.log({decodedAccessToken});
    

    let userRole = null;

    if(!decodedAccessToken?.success){
        //token has expired or is invalid, clear the cookies
        cookieStore.delete("accessToken");
        // return NextResponse.redirect(new URL('/login', request.url));
    }

    if(decodedAccessToken?.success && decodedAccessToken.data){
        userRole = (decodedAccessToken.data as JwtPayload).role;
    }

    //user is logged in and trying to access login or register page, redirect to dashboard or root home page
    if(accessToken && AUTH_ROUTES.includes(pathname)){
        if(userRole === "Customer"){
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }else if(userRole === "Admin"){
            return NextResponse.redirect(new URL('/admin-dashboard', request.url));
        }else if(userRole === "Customer"){
            return NextResponse.redirect(new URL('/provider-dashboard', request.url));
        }else{
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/"));

    const isAuthRoute = AUTH_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/"));

    // Authenticated Pages Protection : Authorization is not handled yet
    if(!accessToken && !isPublicRoute && !isAuthRoute){
        const loginUrl = new URL('/login', request.url)

        loginUrl.searchParams.set("redirectTo", pathname)

        return NextResponse.redirect(loginUrl);
    }

    // Authorization : Role based access control
    if(pathname.startsWith("/dashboard") && userRole !== "Customer"){
        return NextResponse.redirect(new URL('/not-found', request.url));
    }else if(pathname.startsWith("/admin-dashboard") && userRole !== "Admin"){
        return NextResponse.redirect(new URL('/not-found', request.url));
    }else if(pathname.startsWith("/provider-dashboard") && userRole !== "Provider"){
        return NextResponse.redirect(new URL('/not-found', request.url));
    }

    // const subscriptionStatus = await getSubscriptionStatus();

    // const isActive = Boolean(
    //     subscriptionStatus?.success && subscriptionStatus.data?.isSubscribed,
    // );

    // if(pathname === "/premium"){
    //     const subscriptionStatus = await getSubscriptionStatus();

    //     const isActive = Boolean(
    //         subscriptionStatus?.success && subscriptionStatus.data?.isSubscribed,
    //     );

    //     if(!isActive){
    //         return NextResponse.redirect(new URL("/payment", request.url))
    //     }
    // }

    // if(pathname === "/payment"){
    //     // const subscriptionStatus = await getSubscriptionStatus();

    //     // const isActive = Boolean(
    //     //     subscriptionStatus?.success && subscriptionStatus.data?.isSubscribed,
    //     // );

    //     if (isActive) {
    //         return NextResponse.redirect(new URL("/premium", request.url))
    //     }
    // }
    
    // return NextResponse.redirect(new URL('/', request.url))
    return NextResponse.next()
}

export const config = {
    matcher: [
        // '/dashboard/:path*',
        // '/admin-dashboard/:path*',
        '/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)'
    ],
}