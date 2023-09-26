import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function QuiltedImageList() {
  return (
    <ImageList
      sx={{ width: 300, height: 375, marginLeft: 1, marginTop: 0 }}
      variant="quilted"
      cols={4}
      rowHeight={121}
    >
      {itemData.map((item) => (
        <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
          <img
            {...srcset(item.img, 121, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: "src/components/Images/confed5.jpg",
    title: 'Breakfast',
    rows: 2,
    cols: 2,
  },
  {
    img: "src/components/Images/confed5.jpg",
    title: 'Burger',
  },
  {
    img: "src/components/Images/confed5.jpg",
    title: 'Camera',
  },
  {
    img: "src/components/Images/confed5.jpg",
    title: 'Coffee',
    cols: 2,
  },
  {
    img: "src/components/Images/confed5.jpg",
    title: 'Hats',
    cols: 2,
  },
  {
    img: "src/components/Images/confed5.jpg",
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
  },
  {
    img: "src/components/Images/confed6.jpg",
    title: 'Basketball',
  },
  {
    img: "src/components/Images/confed5.jpg",
    title: 'Fern',
  },
  {
    img: "src/components/Images/confed5.jpg",
    title: 'Mushrooms',
    rows: 2,
    cols: 2,
  },
  {
    img: "src/components/Images/confed5.jpg",
    title: 'Tomato basil',
  },
  {
    img: "src/components/Images/confed5.jpg",
    title: 'Sea star',
  },
  {
    img: "src/components/Images/confed5.jpg",
    title: 'Bike',
    cols: 2,
  },
];
