import React from 'react';
import { Card, CardContent, Typography, Grid2 as Grid} from '@mui/material';
import { motion } from 'framer-motion';
import ItemCard from './ItemCard';

interface Item {
  id: number;
  name?: string;
  title?: string;
  price?: string;
  venue?: string;
  mediaType?: 'image' | 'video';
  mediaUrl?: string;
  description: string;
  link?: string;
  linkTitle?: string;
}

interface CategoryCardProps {
  title: string;
  data: Item[];
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, data }) => {

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}

    >
      <Card variant="outlined" sx={{ cursor: 'pointer' }}>
        <CardContent>
          <Typography variant="h5" component="div" align="center">
            {title}
          </Typography>
        </CardContent>
          <CardContent>
            <Grid container spacing={2}>
              {data.map(item => (
                <Grid key={item.id}>
                  <ItemCard item={item} category={title.toLowerCase()} />
                </Grid>
              ))}
            </Grid>
          </CardContent>
      </Card>
    </motion.div>
  );
};

export default CategoryCard;