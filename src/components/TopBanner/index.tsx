import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import Arrow from './Arrow'
import { Banner, } from './Banner'
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

// style의 동적 제어 필요

// 화면 size만큼 이동해야 한다.

// 화면 size가 변경될 때마다 슬라이더와 이미지 크기가 변한다.

// 첫번째 배너와 마지막 배너에 도착했을 때만 

// transformX를 갖고 논다.



const TopBanner = () => {
  // 이전 translateX를 보관하고 싶다.
  const [currImg, setCurrImg] = useState(1);
  const [resizer, setResizer] = useState(1);
  const [transition, setTransition] = useState('transform 0.2s');

  const docWidth = document.documentElement.offsetWidth;
  const onMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const slider = e.currentTarget;
    const mouseX = e.clientX;
    const currentX = slider.style.transform.match(/\d+/) ? +(slider.style.transform.match(/-{0,1}\d+/) as string[])[0] : 0;

    const onMouseMove: Parameters<typeof slider.addEventListener>[1] = (e) => {

      function onMouseUp() {
        const moveDistance = (e as MouseEvent).clientX - mouseX
        if (moveDistance > docWidth * 0.3) {
          setCurrImg(currImg - 1)
        } else if (moveDistance < -docWidth * 0.3) {
          setCurrImg(currImg + 1)
        } else {

          slider.style.transform = `translateX(${currentX}px)`
        }

        slider.removeEventListener('mousemove', onMouseMove);
        slider.removeEventListener('mouseup', onMouseUp);
        slider.removeEventListener('mouseleave', onMouseleave)
      }

      function onMouseleave() {
        const moveDistance = (e as MouseEvent).clientX - mouseX
        if (moveDistance > docWidth * 0.3) {
          setCurrImg(currImg - 1)
        } else if (moveDistance < -docWidth * 0.3) {
          setCurrImg(currImg + 1)
        } else {

          slider.style.transform = `translateX(${currentX}px)`
        }
        slider.removeEventListener('mousemove', onMouseMove);
        slider.removeEventListener('mouseup', onMouseUp);
        slider.removeEventListener('mouseleave', onMouseleave)

      }


      slider.style.transform = `translateX(${currentX + (e as MouseEvent).clientX - mouseX}px)`

      slider.addEventListener('mouseup', onMouseUp)
      slider.addEventListener('mouseleave', onMouseleave)


    }
    slider.addEventListener("mousemove", onMouseMove)

  }

  useEffect(() => {

    if (currImg === 7) {
      setTimeout(res => {
        setTransition("none");
        setCurrImg(currImg - 6);
      }, 300)
      return;
    }

    if (currImg === 0) {
      setTimeout(res => {
        setTransition("none");
        setCurrImg(currImg + 6);
      }, 300)
      return;
    }
    if (transition !== "transform 0.2s")
      new Promise((res) => {
        setTransition('transform 0.2s');
        return;
      })
  }, [transition, currImg])


  const sliderRef = useRef() as MutableRefObject<HTMLDivElement>

  const onArrowClick = (direction: "left" | "right") => {




    setCurrImg((currImage) => {
      if (direction === "left") {


        return currImage - 1;

      } else {


        return currImage + 1;

      }
    })
  }
  const medianWidth = docWidth / 2;
  const initialX = medianWidth - (1050 / 2);

  const onResize = () => {
    setResizer(resizer + 1);
    console.log('resizing');
    window.removeEventListener('resize', onResize);
  }
  window.addEventListener('resize', onResize)
  return (
    <>
      <div className='slider' onMouseDown={onMouseDown} style={{ transform: `translateX(${initialX - 1050 * (currImg + 5)}px )`, transition }} ref={sliderRef} >

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
