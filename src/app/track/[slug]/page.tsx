"use client"
import WaveTrack from "@/components/track/wave.track"
import { useSearchParams } from "next/navigation"

const DetailTrackPage = (props: any) => {
    const searchParams = useSearchParams()
    const { params } = props
    const search = searchParams.get('audio')
    const slug = params.slug


    return (
        <div>
            <div>
                <WaveTrack />
            </div>
        </div>
    )
}
export default DetailTrackPage