import { FC, useEffect, useRef, useState } from "react";

import bg1 from './backgrounds/bg1.png'
import bg2 from './backgrounds/bg2.png'
import bg3 from './backgrounds/bg3.png'
import bg4 from './backgrounds/bg4.png'


const VideoPlayer: FC<{ src?: string, background_name: string }> = ({ src, background_name }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoTime, setVideoTime] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [mouseDown, setMouseDown] = useState(false)
  const [draggerPos, setDraggerPos] = useState(-4)

  const videoHandler = (control: string) => {
    if (videoRef.current) {
      if (control === "play") {
        (videoRef.current as HTMLVideoElement).play();
        setPlaying(true);
        var vid = document.getElementById("videoItem");
        setVideoTime((videoRef.current as HTMLVideoElement).duration);
      } else if (control === "pause") {
        (videoRef.current as HTMLVideoElement).pause();
        setPlaying(false);
      }
    }
  };

  const fastForward = () => {
    if (videoRef.current)
      (videoRef.current as HTMLVideoElement).currentTime += 5;
  };

  const revert = () => {
    if (videoRef.current)
      (videoRef.current as HTMLVideoElement).currentTime -= 5;
  };

  // window.setInterval(function () {
  //   if (videoRef.current) {
  //     setCurrentTime((videoRef.current as HTMLVideoElement)?.currentTime);
  //     setProgress(((videoRef.current as HTMLVideoElement)?.currentTime / videoTime) * 100);
  //   }
  // }, 1000);

  const mouseMoveListener = (e: MouseEvent) => {
    // if(mouseDown) {
      const progressElem = e.target as HTMLProgressElement
      if(progressElem.offsetParent) {
        const pos =
          (e.pageX - progressElem.offsetLeft - progressElem.getBoundingClientRect().x) / progressElem.offsetWidth;
        if (videoRef.current)
          (videoRef.current as HTMLVideoElement).currentTime = pos * videoTime;
      }
    // }
  }

  const onLoad = () => {
    if (videoRef.current) {
      setVideoTime((videoRef.current as HTMLVideoElement).duration);
    }
  }

  useEffect(() => {
    if (videoRef.current) {
      (videoRef.current as HTMLVideoElement).addEventListener('timeupdate', () => {
        if (videoRef.current) {
          setCurrentTime((videoRef.current as HTMLVideoElement)?.currentTime);
          setProgress(((videoRef.current as HTMLVideoElement)?.currentTime / videoTime) * 100);
        }
      })
    }
  })

  useEffect(() => {
    if(progress == 100) {
      setPlaying(false)
    }
  }, [progress])

  const bg_1_classNames = "scale-[1.9] scale-x-[-1.9] relative top-[-24px] left-[13px]"
  const bg_2_classNames = "scale-[1.8] scale-x-[-1.8] relative top-[-56px] left-[1px]"
  const bg_3_classNames = "scale-[1.9] scale-x-[-1.9] relative top-[-24px] left-[-6px]"
  const bg_4_classNames = "scale-[2.0] scale-x-[-2.0] relative top-[-45px] left-[2px]"

  return (
    <div>
      <div className='flex w-full h-[346px] bg-white overflow-hidden mx-auto'>
        <div className="flex flex-col h-[346px]">
          <div className="relative h-[346px] overflow-hidden">
            <div className="flex items-center h-full w-full bg-[#000] ">
              <video 
                ref={videoRef}
                onLoadedMetadata={onLoad}
                width="660"
                style={{ height: '126px' }}
                className={`
                  ${background_name === 'video_bg1' && bg_1_classNames}
                  ${background_name === 'video_bg2' && bg_2_classNames}
                  ${background_name === 'video_bg3' && bg_3_classNames}
                  ${background_name === 'video_bg4' && bg_4_classNames}
                `}>
                <source className="w-30 h-30" src={src} type='video/mp4' />
              </video>
            </div>
            
            <div className="absolute bottom-0 w-full h-full flex justify-center">
                {background_name === 'video_bg1' && <img src={bg1} style={{height: '100%', width: 'auto'}} />}
                {background_name === 'video_bg2' && <img src={bg2} style={{height: '100%', width: 'auto'}} />}
                {background_name === 'video_bg3' && <img src={bg3} style={{height: '100%', width: 'auto'}} />}
                {background_name === 'video_bg4' && <img src={bg4} style={{height: '100%', width: 'auto'}} />}
            </div>
            
            <div className="absolute bottom-0 w-full bg-[#000]">
              <div>
                <div className="relative h-1 bg-gray-200">
                  <input onChange={(e) => {
                    setProgress(Number(e.target.value))
                    if (videoRef.current)
                      (videoRef.current as HTMLVideoElement).currentTime = Number(e.target.value) / 100 * videoTime;
                  }} id="small-range" type="range" value={progress} className="absolute w-full flex items-center justify-end cursor-pointer h-1 range-xs dark:bg-gray-700" />
                </div>
              </div>
              <div className="flex text-xs gap-2 font-medium text-gray-500 py-2 px-3">
                <div className="flex space-x-3">
                  <button className="focus:outline-none hover:opacity-50" onClick={() => revert()}>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg>
                  </button>
                  <button className="rounded-full w-4 h-4 flex items-center justify-center pl-0.5 ring-1 ring-white focus:outline-none hover:opacity-50" onClick={() => {
                    if (playing)
                      videoHandler('pause');
                    else
                      videoHandler('play')
                  }}>
                    {!playing ? <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                      : <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#fff" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14 5.25v13.5m-7.5-13.5v13.5" />
                      </svg>
                    }
                  </button>
                  <button className="focus:outline-none hover:opacity-50" onClick={() => fastForward()}>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>
                  </button>
                </div>
                <div>
                  {Math.floor(currentTime / 60) + ":" + ("0" + Math.floor(currentTime % 60)).slice(-2)}
                </div>
                <div className="ml-[auto]">
                  {Math.floor(videoTime / 60) + ":" + ("0" + Math.floor(videoTime % 60)).slice(-2)}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;