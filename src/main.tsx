import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { EmblaCarousel } from './App'
import axios from 'axios'
import { Slides } from './title'

type CatImage = {
  id: string
  url: string
}


function MainApp() {
  const [cats, setCats] = useState<CatImage[]>([])

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await axios.get('https://api.thecatapi.com/v1/images/search?limit=10')
        setCats(res.data)
      } catch (err) {
        console.error('Error fetching cats:', err)
      }
    }

    fetchCats()
  }, [])

  return (
    <>
      <EmblaCarousel catimage={cats} />
      <Slides catimage={cats} />    
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <MainApp />
  </StrictMode>
)
