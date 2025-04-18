import React, { useState, useEffect  } from "react";
import {
  Dialog,
  DialogContent,
  Tabs,
  Tab,
  Box,
  TextField,
  Button,
  Checkbox,
  Typography,
  FormControlLabel,

} from "@mui/material";

const UserModal = ({ open, onClose, onLoginSuccess }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false); // Trạng thái Remember Me
  const [error, setError] = useState("");

  // Chỉ điền thông tin đăng nhập nếu Remember Me đã được bật trước đó
  // useEffect(() => {
  //   const savedRememberMe = localStorage.getItem("rememberMe") === "true";
  //   if (savedRememberMe) {
  //     const savedUsername = localStorage.getItem("username") || "";
  //     const savedPassword = localStorage.getItem("password") || "";
  //     setCredentials({ username: savedUsername, password: savedPassword });
  //     setRememberMe(true);
  //   }
  // }, []);

  useEffect(() => {
    // Chỉ lấy dữ liệu từ localStorage nếu rememberMe đã được bật trước đó
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";
    if (savedRememberMe) {
      setRememberMe(true);
      setCredentials({
        username: localStorage.getItem("username") || "",
        password: localStorage.getItem("password") || "",
      });
    } else {
      setCredentials({ username: "", password: "" });
    }
  }, [open]); // Chạy lại khi mở modal


 // Cách cũ, auto lưu thông tin đăng nhập
  // const handleLogin = () => {
  //   if (credentials.username === "admin" && credentials.password === "123456") {
  //     onLoginSuccess(); // Cập nhật trạng thái đăng nhập
  //   } else {
  //     alert("Invalid username or password");
  //   }
  // };
 
  const handleLogin = () => {
    if (credentials.username === "admin" && credentials.password === "123456") {
      onLoginSuccess(); // Cập nhật trạng thái đăng nhập

      if (rememberMe) {
        localStorage.setItem("username", credentials.username);
        localStorage.setItem("password", credentials.password);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
        localStorage.removeItem("rememberMe");
      }

      onClose(); // Đóng modal sau khi đăng nhập
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <Tabs value={tabIndex} onChange={(e, newIndex) => setTabIndex(newIndex)} centered>
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>

        {tabIndex === 0 && (
          <Box sx={{ p: 2 }}>
            <TextField
              fullWidth
              label="Username"
              margin="normal"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()} // Bắt sự kiện Enter
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()} // Bắt sự kiện Enter
              sx={{ mb: 2 }}
            />

        {/* Remember Me */}
            {error && <Typography color="error" mt={1}>{error}</Typography>}
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
              }
              label="Remember me"
              sx={{ mt: 1 }}
            />
        {/* Remember Me */}

            <Button variant="contained" fullWidth onClick={handleLogin} sx={{ mt: 2 }}>
              Login
            </Button>
          </Box>
        )}

        {tabIndex === 1 && (
          <Box sx={{ p: 2 }}>
            <TextField fullWidth label="Username" margin="normal" />
            <TextField fullWidth label="Email" margin="normal" />
            <TextField fullWidth label="Password" type="password" margin="normal" />
            <Button variant="contained" fullWidth sx={{ mt: 2 }}>
              Register
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserModal;
