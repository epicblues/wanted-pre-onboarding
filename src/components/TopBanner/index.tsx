import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import Arrow from './Arrow'
import { Banner } from './Banner'
import "./index.scss"

// Loop 돌려서 얻을 데이터 작성
// 실시간으로 UI 크기 구하기

const banners: { title: string, contents: string, src: string }[] = []

for (let i = 0; i <= 5; i++) {
  banners.push({
    title: `배너 타이틀 ${i + 1} `,
    contents: `배너 내용 ${i + 1}`,
    src: `/${i + 1}.jpg`
  })
}


interface BannerState {
  currImg: number;
  transition: "transform 0.2s" | "none";
}

const TopBanner = () => {
  // 이전 translateX를 보관하고 싶다.

  const [resizer, setResizer] = useState(1);
  const [{ currImg, transition }, setState] = useState<BannerState>({ currImg: 1, transition: "transform 0.2s" });
  const setCurrImg = (num: number) => {
    setState(state => {
      return { ...state, currImg: num };
    })
  }

  const setTransition = (str: BannerState['transition']) => {
    setState(s => ({ ...s, transition: str }));
  }

  const docWidth = document.documentElement.offsetWidth;
  const realWidth = docWidth >= 1200 ? 1050 : (docWidth) * 15 / 18;

  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {

    const slider = e.currentTarget
    const pointerX = e.clientX;
    const currentX = slider.style.transform.match(/\d+/) ? +(slider.style.transform.match(/-{0,1}\d+/) as string[])[0] : 0;
    console.log(slider)
    const onPointerMove: Parameters<typeof slider.addEventListener>[1] = (e) => {
      console.log("PointerMove")

      function onPointerUp() {
        const moveDistance = (e as PointerEvent).clientX - pointerX
        console.log("pointerup");
        if (moveDistance > docWidth * 0.3) {
          setCurrImg(currImg - 1)
        } else if (moveDistance < -docWidth * 0.3) {
          setCurrImg(currImg + 1)
        } else {

          slider.style.transform = `translateX(${currentX}px)`
        }

        slider.removeEventListener('pointermove', onPointerMove);
        slider.removeEventListener('pointerup', onPointerUp);
        slider.removeEventListener('pointerleave', onPointerleave)
      }

      function onPointerleave() {
        const moveDistance = (e as PointerEvent).clientX - pointerX
        if (moveDistance > docWidth * 0.3) {
          setCurrImg(currImg - 1)
        } else if (moveDistance < -docWidth * 0.3) {
          setCurrImg(currImg + 1)
        } else {

          slider.style.transform = `translateX(${currentX}px)`
        }
        slider.removeEventListener('pointermove', onPointerMove);
        slider.removeEventListener('pointerup', onPointerUp);
        slider.removeEventListener('pointerleave', onPointerleave)
        console.log("pointerLeave")
      }


      slider.style.transform = `translateX(${currentX + (e as PointerEvent).clientX - pointerX}px)`

      slider.addEventListener('pointerup', onPointerUp)
      slider.addEventListener('pointerleave', onPointerleave)


    }
    slider.addEventListener("pointermove", onPointerMove)

  }

  useEffect(() => {

    if (currImg === 7) {
      setTimeout(res => {
        setState({ currImg: currImg - 6, transition: "none" })
      }, 300)
      return;
    }

    if (currImg === 0) {
      setTimeout(res => {
        setState({ currImg: currImg + 6, transition: "none" })
      }, 300)
      return;
    }
    if (transition !== "transform 0.2s")
      new Promise((res) => {
        setTransition('transform 0.2s');
        return;
      })
    const interval = setInterval(() => {
      setCurrImg(currImg + 1);
    }, 3000)

    return () => {
      clearInterval(interval);
    }
  }, [transition, currImg])


  const sliderRef = useRef() as MutableRefObject<HTMLDivElement>

  const onArrowClick = (direction: "left" | "right") => {


    setCurrImg(direction === "left" ? currImg - 1 : currImg + 1)
  }
  const medianWidth = docWidth / 2;
  const initialX = medianWidth - (realWidth / 2);

  const onResize = () => {
    setResizer(resizer + 1);
    console.log('resizing');
    window.removeEventListener('resize', onResize);
  }
  window.addEventListener('resize', onResize)
  return (
    <>
      <div className='slider' onPointerDown={onPointerDown} style={{ transform: `translateX(${initialX - realWidth * (currImg + 5)}px )`, transition }} ref={sliderRef} >

        {banners.map((data, index) => (<Banner {...data} key={data.title} index={index} current={currImg} />))}
        {banners.map((data, index) => (<Banner {...data} key={data.title} index={index} current={currImg} />))}
        {banners.map((data, index) => (<Banner {...data} key={data.title} index={index} current={currImg} />))}

      </div>
      <Arrow direction='left' onClick={onArrowClick} />
      <Arrow direction='right' onClick={onArrowClick} />
    </>
  )
}

export default TopBanner
