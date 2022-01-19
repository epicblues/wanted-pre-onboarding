import React, { MutableRefObject, useRef, useState } from 'react'
import Arrow from './Arrow'
import { Banner, BannerProps } from './Banner'
import "./index.scss"

// Loop 돌려서 얻을 데이터 작성
// 실시간으로 UI 크기 구하기

const banners: BannerProps[] = []

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

  const onMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const slider = e.currentTarget;
    const mouseX = e.clientX;
    const currentX = slider.style.transform.match(/\d+/) ? +(slider.style.transform.match(/-{0,1}\d+/) as string[])[0] : 0;

    const onMouseMove: Parameters<typeof slider.addEventListener>[1] = (e) => {

      function onMouseUp() {

        slider.removeEventListener('mousemove', onMouseMove);
        slider.style.transform = `translateX(${currentX + (e as MouseEvent).clientX - mouseX}px)`
        slider.removeEventListener('mouseup', onMouseUp);
        slider.removeEventListener('mouseleave', onMouseleave)
      }

      function onMouseleave() {
        slider.removeEventListener('mousemove', onMouseMove);
        slider.style.transform = `translateX(${currentX + (e as MouseEvent).clientX - mouseX}px)`
        slider.removeEventListener('mouseup', onMouseUp);
        slider.removeEventListener('mouseleave', onMouseleave)

      }


      slider.style.transform = `translateX(${currentX + (e as MouseEvent).clientX - mouseX}px)`
      console.log(slider.style.transform);
      slider.addEventListener('mouseup', onMouseUp)
      slider.addEventListener('mouseleave', onMouseleave)


    }
    slider.addEventListener("mousemove", onMouseMove)

  }

  const isExtra: boolean = currImg <= 2 || currImg > banners.length - 1

  const docWidth = document.documentElement.offsetWidth;

  const sliderRef = useRef() as MutableRefObject<HTMLDivElement>

  const onArrowClick = (direction: "left" | "right") => {


    const slider = sliderRef.current;
    const currentX = slider.style.transform.match(/\d+/) ? +(slider.style.transform.match(/-{0,1}\d+/) as string[])[0] : 0;
    const docWidth = 1020 + 30;
    slider.style.transform = `translateX(${direction === "right" ? currentX - docWidth : currentX + docWidth}px)`
    setCurrImg(currImg + direction === "right" ? 1 : -1)
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
      <div className='slider' onMouseDown={onMouseDown} style={{ transform: `translateX(${initialX - 1050 * banners.length}px )`, }} ref={sliderRef} >

        {isExtra && banners.map(data => (<Banner {...data} key={data.title} />))}
        {banners.map(data => (<Banner {...data} key={data.title} />))}
      </div>
      <Arrow direction='left' onClick={onArrowClick} />
      <Arrow direction='right' onClick={onArrowClick} />
    </>
  )
}

export default TopBanner
