import { useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Container, createTheme, MantineProvider, rem } from '@mantine/core';
import classes from './slide.module.css';
import '@mantine/core/styles.css';
import Autoplay from 'embla-carousel-autoplay';

type CatImage = {
  id: string;
  url: string;
};


type SlidesProps = {
  catimage: CatImage[];
};

const CONTAINER_SIZES: Record<string, number> = {
  xxs: 300,
  xs: 400,
  sm: 500,
  md: 600,
  lg: 700,
  xl: 800,
  xxl: 900,
};

const theme = createTheme({
  components: {
    Container: Container.extend({
      vars: (_, { size, fluid }) => ({
        root: {
          '--container-size': fluid
            ? '100%'
            : size !== undefined && size in CONTAINER_SIZES
              ? rem(CONTAINER_SIZES[size])
              : rem(size),
        },
      }),
    }),
  },
});


export function Slides({ catimage }: SlidesProps) {

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: false,
      align: 'center',
    }
    , [Autoplay({ stopOnInteraction: true })]
  );
 
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);
  
    const measureContainer = () => {
      if (containerRef.current) {
        const sizeKey = containerRef.current.dataset.size;
        if (sizeKey && sizeKey in CONTAINER_SIZES) {
          const newWidth = CONTAINER_SIZES[sizeKey];
          setContainerWidth(newWidth);
        }
      }
    };
  
    useEffect(() => {
      measureContainer();
    })

      useEffect(()=>{
      const handleResize = () => {
        measureContainer();
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
      }, []);

    useEffect(() => {
      if (emblaApi && containerWidth > 0) {
        emblaApi.reInit();  
      }
    }, [containerWidth, emblaApi]);
  
    return (
      <MantineProvider theme={theme}>
        <Container size="xl" ref={containerRef}>
          <h1>Cat Slides</h1>
        </Container>
  
        <div
          style={{
            width: `${containerWidth}px`,
            paddingInline: 16,
            margin: '0 auto',
          }}
        >
  
        <div className={classes.viewport} ref={emblaRef}>
          <div className={classes.embla__container}>
            {catimage.map((cat) => (
              <div key={cat.id} className={classes.embla__slide}>
                <img src={cat.url} alt="cat" className={classes.cat} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </MantineProvider>
  );
}
