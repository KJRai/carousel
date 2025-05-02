import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'

type CatImage = {
  id: string
  url: string
}

type SlidesProps = {
  catimage: CatImage[]
}

const useWindowSize = () => {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return width
}



export function EmblaCarousel({ catimage }: SlidesProps) {
  const width = useWindowSize()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const axis: 'x' | 'y' = width < 400 ? 'y' : 'x'
  const options = useMemo(() => ({ loop: true, axis }), [axis])
  
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ stopOnInteraction: true })
  ])
  

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())

    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    onSelect()

    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi])

  return (
    <div className="page">
      <div className="card">

        <>
          <div className={`embla ${axis === 'y' ? 'vertical' : 'horizontal'}`} ref={emblaRef} key={axis}>
            <div className="embla__container">
              {catimage.map((cat: { id: string, url: string }) => (
                <div className="embla__slide" key={cat.id}>
                  <img src={cat.url} alt="cat" className="cat-image" />
                </div>
              ))}
            </div>
          </div>


          <div className="buttons">
            <button onClick={scrollPrev} className="nav-button">
              <img src="src/assets/lefticon.svg" alt="Prev" />
            </button>
            <button onClick={scrollNext} className="nav-button">
              <img src="src/assets/righticon.svg" alt="Next" />
            </button>

            <div className="dots">
              {catimage.map((_: any, index: number) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`dot-button ${index === selectedIndex ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>
        </>

      </div>
    </div>
  )
}
