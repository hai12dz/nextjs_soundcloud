import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
    const { searchParams } = new URL(request.url)
    return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${searchParams.get('audio')}`)
}








