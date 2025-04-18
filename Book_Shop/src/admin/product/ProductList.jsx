
import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import ConfirmDeleteModal from './ConfirmDeleteModal'; // Gọi modal xác nhận xóa
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductList = () => {
  const [rows, setRows] = useState([
    // Sample data
    {
      id: 1,
      name: 'Product 1',
      images: ['./demo/images/category2.jpg', 'image2.jpg'],
      productPrice: 100,
      quantity: 80,
      // discount: 20,
      // weight: 1,
      // salePerMonth: 10,
      dateAdded: '2023-01-01',
      author: 'author 1',
      // description: 'Description 1',
      // ingredient: 'Ingredient 1',
      category: 'category 1',
      status: 'status 1',
    },
    {
      id: 2,
      name: 'Product 2',
      images: ['./demo/images/category2.jpg', 'image4.jpg'],
      productPrice: 200,
      quantity: 150,
      // discount: 25,
      // weight: 2,
      // salePerMonth: 20,
      dateAdded: '2023-02-01',
      author: 'author 2',
      // description: 'Description 2',
      // ingredient: 'Ingredient 2',
      category: 'category 2',
      status: 'status 2',
    },
  ]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate('/admin/addproduct'); // Chuyển hướng đến trang thêm sản phẩm
  };

  const handleDelete = (id) => {
    setSelectedProductId(id);
    setOpenModal(true); // Hiện xác nhận Modal xoa sản phẩm
  };

  const confirmDelete = () => {
    setRows(rows.filter((row) => row.id !== selectedProductId)); // Cập nhật danh sách sản phẩm
    setOpenModal(false);
  };

  const cancelDelete = () => {
    setOpenModal(false); // Đóng modal nếu cancel
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Product Name', width: 300 },
    {
      field: 'images',
      headerName: 'Images',
      width: 100,
      renderCell: (params) => {
        const firstImage = params.row.images[0]; // Lấy ảnh đầu tiên trong mảng
        return (
          <img
            src={`http://localhost:3000/${firstImage}`}
            alt="Product"
            style={{ width: 50, height: 50, objectFit: 'cover' }}
          />
        );
      },
    },
    { field: 'productPrice', headerName: 'Product Price', type: 'number', width: 130 },
    { field: 'quantity', headerName: 'Quantity', type: 'number', width: 130 },
    // { field: 'discount', headerName: 'Discount', type: 'number', width: 90 },
    // { field: 'weight', headerName: 'Weight', type: 'number', width: 90 },
    // { field: 'salePerMonth', headerName: 'Sale Per Month', type: 'number', width: 90 },
    { field: 'dateAdded', headerName: 'Date Create', width: 200 },
    { field: 'author', headerName: 'Author', width: 150 },
    // { field: 'description', headerName: 'Description', width: 90 },
    // { field: 'ingredient', headerName: 'Ingredient', width: 90 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 50,
      renderCell: (params) => <ActionsMenu id={params.row.id} handleDelete={handleDelete} />,
    },
  ];

  return (
    <div style={{ margin: '20px' }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddProduct}
        style={{ marginBottom: '10px' }}
      >
        Add New Product
      </Button>
      <Paper sx={{ height: 700, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
          pageSizeOptions={[10, 20]}
          checkboxSelection
          sx={{ border: 0}}
        />
      </Paper>

      {/* Tác vụ xử lý ở MODAL */}
      <ConfirmDeleteModal
        open={openModal}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

const ActionsMenu = ({ id, handleDelete }) => {  // Nhận dữ liệu id từ state
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleView = () => {
    // console.log('Viewing item with id:', id);
    navigate(`/admin/productview`); // Chuyển hướng đến trang chi tiết sản phẩm
    // navigate(`/admin/viewProduct/${id}`);
    handleClose();
  };

  const handleEdit = () => {
    // console.log('Editing item with id:', id);
    navigate(`/admin/editproduct`);
    // navigate(`/admin/editproduct/${id}`);
    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: '15ch',
          },
        }}
      >
        <MenuItem onClick={handleView}><VisibilityIcon sx={{ mr: 1 }} />View</MenuItem>
        <MenuItem onClick={handleEdit}><EditIcon sx={{ mr: 1 }} />Edit</MenuItem>
        <MenuItem onClick={() => handleDelete(id)}><DeleteIcon sx={{ mr: 1 }} />Delete</MenuItem>
      </Menu>
    </div>
  );
};

export default ProductList;


// import React, { useState } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import { Box, Typography } from "@mui/material";

// import Paper from '@mui/material/Paper';
// import { useNavigate } from 'react-router-dom';
// import IconButton from '@mui/material/IconButton';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import Button from '@mui/material/Button';
// import ConfirmDeleteModal from './ConfirmDeleteModal'; // Giả định bạn đã có component này
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

// // Dữ liệu mẫu
// const products = [
//   {
//     id: 1,
//     name: 'Sách A',
//     productPrice: 50000,
//     quantity: 100,
//     dateAdded: '2023-01-01',
//     author: 'Tác giả A',
//     description: 'Mô tả sách A',
//     content: 'Nội dung sách A',
//     language: 'Tiếng Việt',
//     category: 'Văn học',
//     status: 'Còn hàng',
//     images: ['/images/product1.jpg'], // Giả định từ bảng ProductImage
//   },
//   {
//     id: 2,
//     name: 'Sách B',
//     productPrice: 75000,
//     quantity: 50,
//     dateAdded: '2023-02-01',
//     author: 'Tác giả B',
//     description: 'Mô tả sách B',
//     content: 'Nội dung sách B',
//     language: 'Tiếng Anh',
//     category: 'Khoa học',
//     status: 'Hết hàng',
//     images: ['/images/product2.jpg'],
//   },
// ];

// const ProductList = () => {
//   const navigate = useNavigate();
//   const [rows, setRows] = useState(products);
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedProductId, setSelectedProductId] = useState(null);

//   const handleAddProduct = () => {
//     navigate('/admin/create-product');
//   };

//   const handleDelete = (id) => {
//     setSelectedProductId(id);
//     setOpenModal(true);
//   };

//   const confirmDelete = () => {
//     setRows(rows.filter((row) => row.id !== selectedProductId));
//     setOpenModal(false);
//   };

//   const cancelDelete = () => {
//     setOpenModal(false);
//   };

//   const columns = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'name', headerName: 'Tên sản phẩm', width: 200 },
//     {
//       field: 'images',
//       headerName: 'Ảnh',
//       width: 100,
//       renderCell: (params) => {
//         const firstImage = params.row.images[0];
//         return (
//           <img
//             src={firstImage}
//             alt="Product"
//             style={{ width: 50, height: 50, objectFit: 'cover' }}
//           />
//         );
//       },
//     },
//     { field: 'productPrice', headerName: 'Giá sản phẩm', type: 'number', width: 100 },
//     { field: 'quantity', headerName: 'Số lượng', type: 'number', width: 100 },
//     { field: 'dateAdded', headerName: 'Ngày thêm', width: 100 },
//     { field: 'author', headerName: 'Tác giả', width: 100 },
//     { field: 'description', headerName: 'Mô tả', width: 100 },
//     { field: 'content', headerName: 'Nội dung', width: 100 },
//     { field: 'language', headerName: 'Ngôn ngữ', width: 100 },
//     { field: 'category', headerName: 'Danh mục', width: 100 },
//     { field: 'status', headerName: 'Trạng thái', width: 100 },
//     {
//       field: 'actions',
//       headerName: 'Hành động',
//       width: 70,
//       renderCell: (params) => (
//         <ActionsMenu id={params.row.id} handleDelete={handleDelete} />
//       ),
//     },
//   ];

//   return (
//     <Box sx={{ m: 2 }}>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//         <Typography variant="h5">Danh sách sản phẩm</Typography>
//         <Button variant="contained" color="primary" onClick={handleAddProduct}>
//           Thêm sản phẩm
//         </Button>
//       </Box>
//       <Paper sx={{ height: 700, width: '100%' }}>
//         <DataGrid
//           rows={rows}
//           columns={columns}
//           initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
//           pageSizeOptions={[10, 20]}
//           checkboxSelection
//           sx={{ border: 0 }}
//         />
//       </Paper>
//       <ConfirmDeleteModal open={openModal} onClose={cancelDelete} onConfirm={confirmDelete} />
//     </Box>
//   );
// };

// const ActionsMenu = ({ id, handleDelete }) => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);
//   const navigate = useNavigate();

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleView = () => {
//     navigate(`/admin/view-product/${id}`);
//     handleClose();
//   };

//   const handleEdit = () => {
//     navigate(`/admin/edit-product/${id}`);
//     handleClose();
//   };

//   return (
//     <div>
//       <IconButton
//         aria-label="more"
//         aria-controls="long-menu"
//         aria-haspopup="true"
//         onClick={handleClick}
//       >
//         <MoreVertIcon />
//       </IconButton>
//       <Menu
//         id="long-menu"
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         PaperProps={{
//           style: {
//             maxHeight: 48 * 4.5,
//             width: '15ch',
//           },
//         }}
//       >
//         <MenuItem onClick={handleView}>
//           <VisibilityIcon sx={{ mr: 1 }} /> Xem
//         </MenuItem>
//         <MenuItem onClick={handleEdit}>
//           <EditIcon sx={{ mr: 1 }} /> Sửa
//         </MenuItem>
//         <MenuItem onClick={() => handleDelete(id)}>
//           <DeleteIcon sx={{ mr: 1 }} /> Xóa
//         </MenuItem>
//       </Menu>
//     </div>
//   );
// };

// export default ProductList;
