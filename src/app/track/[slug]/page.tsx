"use client"
import WaveTrack from "@/components/track/wave.track"
import { Container } from "@mui/material"
import { useSearchParams } from "next/navigation"

const DetailTrackPage = (props: any) => {
    const searchParams = useSearchParams()
    const { params } = props
    const search = searchParams.get('audio')
    const slug = params.slug
    console.log('slug', slug)

    return (
        <Container>
            <div>
                <WaveTrack />
            </div>
        </Container>
    )
}
export default DetailTrackPage