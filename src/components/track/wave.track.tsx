"use client";
import { useSearchParams } from 'next/navigation';
import { use, useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js'
const WaveTrack = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const searchParams = useSearchParams()
    const fileName = searchParams.get('audio')


    useEffect(() => {
        if (containerRef.current) {
            WaveSurfer.create({
                container: containerRef.current,
                waveColor: 'rgb(200, 0, 200)',
                progressColor: 'rgb(100, 0, 100)',
                url: `/api?audio=${fileName}`,
            })
        }
    }, [])
    return (
        <div ref={containerRef}>

        </div>
    );
}
export default WaveTrack;