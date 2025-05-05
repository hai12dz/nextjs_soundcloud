"use client";
import { use, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js'
const WaveTrack = () => {

    useEffect(() => {
        const element = document.getElementById("haidaoit");
        if (element) {
            WaveSurfer.create({
                container: element,
                waveColor: 'rgb(200, 0, 200)',
                progressColor: 'rgb(100, 0, 100)',
                url: '/audio/PARTY.mp3',
            })
        }
    }, [])
    return (
        <div id="haidaoit">

        </div>
    );
}
export default WaveTrack;