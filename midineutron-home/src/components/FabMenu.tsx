import { FC, useState } from 'react';
import { Box, Fab } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import StoreIcon from '@mui/icons-material/Store';
import { CategoryType } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface FabMenuProps {
  onNavigationItemClick: (selectedCategory: CategoryType) => void;
  dragConstraints: React.MutableRefObject<null>;
}

const FabMenu: FC<FabMenuProps> = ({ onNavigationItemClick, dragConstraints }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = (categoryType: CategoryType) => {
    onNavigationItemClick(categoryType);
    setShowMenu(false); // Optionally close the menu after selection
  };

  // Define the positions for the orbiting FABs
  const fabRadius = 80; // Adjust the radius as needed
  const fabPositions: { icon: JSX.Element; label: string; category: CategoryType; angle: number }[] = [
    { icon: <LibraryMusicIcon />, label: 'Art', category: CategoryType.Art, angle: -90 },
    { icon: <LocalActivityIcon />, label: 'Shows', category: CategoryType.Show, angle: 30 },
    { icon: <StoreIcon />, label: 'Merch', category: CategoryType.Merch, angle: 150 },
  ];

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 50,
        right: 50,
        width: 100,
        height: 100,
        zIndex: 1000,
        cursor: 'pointer',
      }}
      ref={dragConstraints}
    >
      <AnimatePresence>
        {showMenu &&
          fabPositions.map((fab, index) => {
            const radians = (fab.angle * Math.PI) / 180;
            const x = fabRadius * Math.cos(radians);
            const y = fabRadius * Math.sin(radians);

            return (
              <motion.div
                key={fab.category}
                initial={{ opacity: 0, x: 0, y: 0 }}
                animate={{ opacity: 1, x: x, y: y }}
                exit={{ opacity: 0, x: 0, y: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30, delay: index * 0.05 }}
                style={{ position: 'absolute' }}
              >
                <Fab
                  size="small"
                  color="primary"
                  onClick={() => handleClick(fab.category)}
                  aria-label={fab.label}
                >
                  {fab.icon}
                </Fab>
              </motion.div>
            );
          })}
      </AnimatePresence>

      {/* Central Menu Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Fab color="secondary" onClick={() => setShowMenu((prev) => !prev)}>
          <MenuIcon />
        </Fab>
      </motion.div>
    </Box>
  );
};

export default FabMenu;