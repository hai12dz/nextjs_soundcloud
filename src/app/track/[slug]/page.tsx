"use client"
import { useSearchParams } from "next/navigation"

const DetailTrackPage = (props: any) => {
    const searchParams = useSearchParams()
    const { params } = props
    const search = searchParams.get('search')
    const slug = params.slug


    return (
        <div>
            <h1>Detail Track Page</h1>
        </div>
    )
}
export default DetailTrackPage