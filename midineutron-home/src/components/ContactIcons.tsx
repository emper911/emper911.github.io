import React from 'react';
import { Box, IconButton } from '@mui/material';
import { Facebook, Instagram, Twitter, Email } from '@mui/icons-material';
import { motion } from 'framer-motion';

const ContactIcons: React.FC = () => {
  const icons = [
    { icon: <Facebook />, link: 'https://facebook.com/yourprofile' },
    { icon: <Instagram />, link: 'https://instagram.com/yourprofile' },
    { icon: <Twitter />, link: 'https://twitter.com/yourprofile' },
    { icon: <Email />, link: 'mailto:your.email@example.com' },
  ];

  return (
    <Box
      position="fixed"
      bottom={16}
      left="50%"
      style={{ transform: 'translateX(-50%)' }}
      display="flex"
      gap={2}
    >
      {icons.map((item, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <IconButton
            color="primary"
            onClick={() => window.open(item.link, '_blank')}
          >
            {item.icon}
          </IconButton>
        </motion.div>
      ))}
    </Box>
  );
};

export default ContactIcons;