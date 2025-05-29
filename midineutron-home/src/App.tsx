import { FC, useRef, useState } from 'react';
// import { Container, Grid2 as Grid } from '@mui/material';
// import CategoryCard from './components/CategoryCard';
// import ContactIcons from './components/ContactIcons';
// import artData from './data/art.json';
// import showsData from './data/shows.json';
// import merchData from './data/merch.json';
import { motion } from 'framer-motion';
import BackgroundCanvas from './components//BackgroundCanvas';
import { Html, useProgress } from '@react-three/drei';
// import { ArtItem, CategoryType, MerchItem, ShowItem } from './types';
// import FabMenu from './components/FabMenu';

// interface CategoryDisplayProps {
  // category: CategoryType;
// }
// const CategoryDisplay: FC<CategoryDisplayProps> = ({ category }) => {
//   switch (category) {
//     case 'show':
//       return <CategoryCard title="Shows" data={showsData as ShowItem[]} />;
//     case 'merch':
//       return <CategoryCard title="Merch" data={merchData as MerchItem[]} />;
//     default:
//       return <CategoryCard title="Art" data={artData as ArtItem[]} />;
//   };
// }

const App: FC = () => {
  // const [category, setCategory] = useState(CategoryType.Art);

  // const handleNavigationItemClick = (selectedCategory: CategoryType): void => {
  //   setCategory(selectedCategory);
  // };

  // const dragConstraintsRef = useRef(null);


  return (
  <motion.div
    style={{ height: '100vh', width: '100vw' }}
    transition={{ ease: "easeOut", duration: 2  }}
  >
      {/* R3F Background Canvas */}
      <BackgroundCanvas />

      {/* Main Content */}
      {/* <motion.div
        className="container"
        style={{ height: '100vh', width: '100vw' }}

      >
        <Container
          maxWidth="sm"
          sx={{
            paddingTop: '2rem',
            paddingBottom: '4rem',
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
            borderRadius: '8px',
            boxShadow: 3,
          }}
        >
          <motion.div>

          </motion.div>
          
          {/* <Grid container spacing={2} ref={dragConstraintsRef}>
            <CategoryDisplay category={category} />
          </Grid>
        
          <FabMenu onNavigationItemClick={handleNavigationItemClick} dragConstraints={dragConstraintsRef} /> 
          <ContactIcons />  
        </Container> 
      </motion.div> */}
    </motion.div>
  );
};

export default App;