import useEmblaCarousel from 'embla-carousel-react';
import { Container, createTheme, MantineProvider } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import classes from './slide.module.css';
import cx from 'clsx';
import '@mantine/core/styles.css';

type CatImage = {
  id: string;
  url: string;
};

type SlidesProps = {
  catimage: CatImage[];
};

const theme = createTheme({
  components: {
    Container: Container.extend({
      classNames: (_, { size }) => ({
        root: cx({ [classes.responsiveContainer]: size === 'xl' }),
      }),
    }),
  },
});

export function Slides({ catimage }: SlidesProps) {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: false,
      align: 'center',
      containScroll: 'trimSnaps',
    }
    // , [Autoplay({ stopOnInteraction: true })]
  );

  return (
    <MantineProvider theme={theme}>
      <Container size="responsive">
        <h1>Cat Slides</h1>
        <div className={classes.embla}>
          <div className={classes.viewport} ref={emblaRef}>
            <div className={classes.embla__container}>
              {catimage.map((cat) => (
                <div className={classes.embla__slide} key={cat.id}>
                  <img src={cat.url} alt="cat" className={classes.cat} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </MantineProvider>
  );
}
