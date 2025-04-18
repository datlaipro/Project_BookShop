import React from 'react';
import { IconButton, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';

const CardActions = ({ sx, className }) => {
  return (
    <Box
    className={className} // Thêm className để hỗ trợ sử dụng CSS selectors
      sx={{
        display: 'flex',
        gap: 1,
        justifyContent: 'center',
        ...sx, // Cho phép tùy chỉnh style từ bên ngoài
        // có thể nhận custom styles thông qua sx props:
      }}
    >
      {/* Nút giỏ hàng */}
      <IconButton
        color="primary"
        sx={{
            bgcolor: '#455a64',
          color: 'white',
          '&:hover': {
            bgcolor: 'rgba(248, 109, 114, 1)',
          },
        }}
      >
        <ShoppingCartIcon />
      </IconButton>

      {/* Nút XEM NHANH */}
      <IconButton
        color="secondary"
        sx={{
          bgcolor: '#455a64',
        //   bgcolor: 'rgba(97, 97, 97, 1)',
          color: 'white',
          '&:hover': {
            bgcolor: 'rgba(248, 109, 114, 1)',
          },
        }}
      >
        <VisibilityIcon />
      </IconButton>
    </Box>
  );
};

export default CardActions;


// PHIÊN BẢN CŨ

// import React from 'react';
// import { IconButton, Box } from '@mui/material';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import FavoriteIcon from '@mui/icons-material/Favorite';

// const CardActions = () => {
//   return (
//     <Box
//       sx={{
//         position: 'absolute',
//         top: 8, // Khoảng cách với mép trên
//         left: 0,
//         right: 0,
//         display: 'flex',
//         gap: 1, // Khoảng cách giữa các nút
//         justifyContent: 'center',
//         zIndex: 2,
//       }}
//     >
//       {/* Nút thêm vào giỏ hàng */}
//       <IconButton
//         color="primary"
//         sx={{
//           bgcolor: 'rgba(0,0,0,0.7)',
//           color: 'white',
//           '&:hover': {
//             bgcolor: 'rgba(0,0,0,0.9)',
//           },
//         }}
//       >
//         <ShoppingCartIcon />
//       </IconButton>

//       {/* Nút thêm vào danh sách yêu thích */}
//       <IconButton
//         color="secondary"
//         sx={{
//           bgcolor: 'rgba(0,0,0,0.7)',
//           color: 'white',
//           '&:hover': {
//             bgcolor: 'rgba(0,0,0,0.9)',
//           },
//         }}
//       >
//         <FavoriteIcon />
//       </IconButton>
//     </Box>
//   );
// };

// export default CardActions;

