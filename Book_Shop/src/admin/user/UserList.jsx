// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   Button,
//   Avatar,
// } from '@mui/material';

// // Dữ liệu mẫu (thay bằng API thực tế)
// const users = [
//   {
//     id: 1,
//     name: 'User 1',
//     email: 'user1@gmail.com',
//     phoneNumber: '0901234567',
//     address: '123 Đường A, TP.HCM',
//     birthDay: '1990-01-01',
//     gender: 'Male',
//     avata: 'https://via.placeholder.com/40',
//     roles: ['Admin'],
//   },
//   {
//     id: 2,
//     name: 'User 2',
//     email: 'user2@gmail.com',
//     phoneNumber: '0909876543',
//     address: '456 Đường B, Hà Nội',
//     birthDay: '1995-05-10',
//     gender: 'Female',
//     avata: 'https://via.placeholder.com/40',
//     roles: ['User'],
//   },
// ];

// function UserList() {
//   const navigate = useNavigate();

//   const handleEditUser = (userId) => {
//     navigate(`/admin/user/${userId}`);
//   };
//   // Nút "Chỉnh sửa" sẽ chuyển hướng đến trang chỉnh sửa với URL /admin/user/:userId.

//   const handleViewOrders = (userId) => {
//     navigate(`/admin/user/${userId}/orders`);
//   };
// // Truyền userId cho trang xem các đơn hàng của ID user tương ứng

//   return (
//     <Box sx={{ mt: 8 }}>
//       <Typography variant="h5" gutterBottom>
//         Danh sách người dùng
//       </Typography>
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label="user table">
//           <TableHead>
//             <TableRow>
//               <TableCell>Ảnh đại diện</TableCell>
//               <TableCell>Tên</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Số điện thoại</TableCell>
//               <TableCell>Địa chỉ</TableCell>
//               <TableCell>Ngày sinh</TableCell>
//               <TableCell>Giới tính</TableCell>
//               <TableCell>Vai trò</TableCell>
//               <TableCell>Hành động</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {users.map((user) => (
//               <TableRow key={user.id}>
//                 <TableCell>
//                   <Avatar src={user.avata} alt={user.name} />
//                 </TableCell>
//                 <TableCell>{user.name}</TableCell>
//                 <TableCell>{user.email}</TableCell>
//                 <TableCell>{user.phoneNumber}</TableCell>
//                 <TableCell>{user.address}</TableCell>
//                 <TableCell>{user.birthDay}</TableCell>
//                 <TableCell>{user.gender}</TableCell>
//                 <TableCell>{user.roles.join(', ')}</TableCell>
//                 <TableCell>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     size="small"
//                     onClick={() => handleEditUser(user.id)}
//                   >
//                     Chỉnh sửa
//                   </Button>
//                   <Button
//                     variant="contained"
//                     color="secondary"
//                     size="small"
//                     onClick={() => handleViewOrders(user.id)}
//                   >
//                     Đơn hàng
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// }

// export default UserList;

// Cái cũ đẹp hơn

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
} from '@mui/material';

// Dữ liệu mẫu
const users = [
  {
    id: 1,
    name: 'User 1',
    email: 'user1@gmail.com',
    phoneNumber: '0901234567',
    address: '123 Đường A, TP.HCM',
    birthDay: '1990-01-01',
    gender: 'Male',
    avata: 'https://via.placeholder.com/40',
    roles: ['Admin'],
  },
  {
    id: 2,
    name: 'User 2',
    email: 'user2@gmail.com',
    phoneNumber: '0909876543',
    address: '456 Đường B, Hà Nội',
    birthDay: '1995-05-05',
    gender: 'Female',
    avata: 'https://via.placeholder.com/40',
    roles: ['User'],
  },
];

function UserList() {
  const navigate = useNavigate();

  const handleEditUser = (userId) => {
    navigate(`/admin/edit-user/${userId}`);
  };

  const handleDeleteUser = (userId) => {
    console.log(`Xóa user với ID: ${userId}`);
    // Gọi API để xóa user tại đây
  };

  const handleAddUser = () => {
    navigate('/admin/create-user');
  };

  return (
    <Box sx={{ mt: 8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Danh sách người dùng</Typography>
        <Button variant="contained" color="primary" onClick={handleAddUser}>
          Thêm người dùng
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleEditUser(user.id)}
                    sx={{ mr: 1 }}
                  >
                    Sửa
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default UserList;
