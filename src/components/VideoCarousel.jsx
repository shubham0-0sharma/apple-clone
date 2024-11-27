import { useEffect, useRef,useState } from 'react'
import { hightlightsSlides } from '../constants'
import { ScrollTrigger } from 'gsap/all'
gsap.registerPlugin(ScrollTrigger)
import gsap from 'gsap/all'
import { useGSAP } from '@gsap/react'

const VideoCarousel = () => {
    const videoRef = useRef([])
    // video and indicator
    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false,
    })
    const [loadedData, setLoadedData] = useState([])
    const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video

    useGSAP(() => {
        gsap.to('#video', {
   
            onComplete: () => {
                setVideo((pre) => ({
                    ...pre,
                    startPlay: true,
                    isPlaying: true,
                }))
            },
        })
    })

    useEffect(() => {
        if (loadedData.length > 3) {

            if (!isPlaying) {
                videoRef.current[videoId].pause()
            } else {
                startPlay && videoRef.current[videoId].play()
            }
        }
    }, [startPlay, videoId, isPlaying, loadedData])
    const handleLoadedMetaData = (i, e) => setLoadedData((prev) => [...prev, e])
    return (
        <>
            <div className="flex items-center">
                {hightlightsSlides.map((list, i) => (
                    <div key={list.id} id="slider" className="sm:pr-20 pr-10">
                        <div className=" video-carousel_container">
                            <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                                <video
                                    id="video"
                                    playsInline={true}
                                    muted
                                    type="video/mp4"
                                    ref={(el) => {
                                        videoRef.current[i] = el
                                    }}
                                    onLoadedMetadata={(e) =>
                                        handleLoadedMetaData(i, e)
                                    }
                                >
                                    <source src={list.video} type="video/mp4" />
                                </video>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default VideoCarousel
