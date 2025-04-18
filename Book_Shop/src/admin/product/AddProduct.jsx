import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Chip } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import { Autocomplete } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  palette: {
    primary: {
      main: '#3498db',
    },
    secondary: {
      main: '#E1306C',
    },
  },
});

function AddProduct() {
  const [name, setName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [weight, setWeight] = useState('');
  const [salePerMonth, setSalePerMonth] = useState('');
  const [dateImport, setdateImport] = useState('');
  const [supplier, setSupplier] = useState('');
  const [description, setDescription] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [recipe, setRecipe] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // TẢI ẢNH LÊN TRÊN FORM
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(previewUrls);
  };

  // KHAI BÁO ĐỂ NHẬP NHIỀU TAG
  const [tags, setTags] = useState([]);
  const handleTagsChange = (event, value) => { setTags(value); };
  const availableTags = ["Whole Spices", "Spice Blends", "Powdered Spices"];

  // KHAI BÁO PHƯƠNG THỨC FORM DATA
  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess('Product added successfully');
    setError('');
    // RESET CÁC Ô NHẬP DỮ LIỆU VỀ BAN ĐẦU
    setName(''); 
    setProductPrice(''); 
    setSalePrice(''); 
    setDiscount(''); 
    setWeight(''); 
    setSalePerMonth(''); 
    setdateImport(''); 
    setSupplier(''); 
    setDescription(''); 
    setIngredient(''); 
    setRecipe(''); 
    setTags([]); 
    setImages([]); 
    setPreviewUrls([]);
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ backgroundImage: 'url(https://obi.vn/wp-content/uploads/2023/02/top-50-y-tuong-hinh-nen-trang-dep-tinh-khoi-cuc-ky-doc-dao_1.jpg)', height: '100vh', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          background: 'rgba(227, 244, 251, 0.5)',
        }}></div>

        <Box sx={{ flexGrow: 1, padding: 5 }}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h4" component="h1" gutterBottom color="#0c4646">ADD NEW PRODUCT FORM</Typography>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ paddingY: 1.5, fontSize: '16px', mt: 2 }}
            >
              ADD NEW
            </Button>

            {error && <Typography variant="body2" color="error">{error}</Typography>}
            {success && <Typography variant="body2" color="primary">{success}</Typography>}

            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} alignItems="stretch" justifyContent="center">
              <Grid item size={{ xs: 2, sm: 4, md: 4 }}>
                <TextField
                  fullWidth
                  label="Product Name"
                  placeholder="Name of Product"
                  variant="outlined"
                  margin="normal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Grid>
              <Grid item size={{ xs: 2, sm: 4, md: 4 }}>
                <TextField
                  fullWidth
                  label="Product Price"
                  placeholder="Product Price USD Unit"
                  variant="outlined"
                  type="number"
                  margin="normal"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  required
                />
              </Grid>
              <Grid item size={{ xs: 2, sm: 4, md: 4 }}>
                <TextField
                  fullWidth
                  label="Promotional Price"
                  placeholder="Sale Price USD Unit"
                  variant="outlined"
                  margin="normal"
                  type="number"
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                  required
                />
              </Grid>

              <Grid item size={{ xs: 2, sm: 2, md: 2 }}>
                <TextField
                  fullWidth
                  label="Discount"
                  placeholder="Discount %"
                  variant="outlined"
                  type="number"
                  margin="normal"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  required
                />
              </Grid>

              <Grid item size={{ xs: 2, sm: 2, md: 2 }}>
                <TextField
                  fullWidth
                  label="Weight"
                  placeholder="Product Weight gram"
                  type="number"
                  variant="outlined"
                  margin="normal"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                />
              </Grid>

              <Grid item size={{ xs: 2, sm: 2, md: 2 }}>
                <TextField
                  fullWidth
                  label="Sales Per Month"
                  placeholder="Sales Per Month"
                  type="number"
                  variant="outlined"
                  margin="normal"
                  value={salePerMonth}
                  onChange={(e) => setSalePerMonth(e.target.value)}
                  required
                />
              </Grid>

              <Grid item size={{ xs: 2, sm: 2, md: 2 }}>
                <TextField
                  fullWidth
                  label="Date of import"
                  margin="normal"
                  placeholder="Date of import"
                  variant="outlined"
                  type="date"
                  value={dateImport}
                  onChange={(e) => setdateImport(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item size={{ xs: 2, sm: 4, md: 4 }}>
                <TextField
                  fullWidth
                  label="Supplier"
                  placeholder="Supplier Code"
                  type="number"
                  variant="outlined"
                  margin="normal"
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                  required
                />
              </Grid>

              <Grid item size={{ xs: 2, sm: 4, md: 4 }}>
                <TextField
                  fullWidth
                  label="Description"
                  variant="outlined"
                  margin="normal"
                  placeholder="Enter Product Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  multiline
                  rows={1}
                />
              </Grid>
              <Grid item size={{ xs: 2, sm: 4, md: 4 }}>
                <TextField
                  fullWidth
                  label="Ingredient"
                  variant="outlined"
                  margin="normal"
                  placeholder="Ingredient of Product"
                  value={ingredient}
                  onChange={(e) => setIngredient(e.target.value)}
                  required
                  multiline
                  rows={1}
                />
              </Grid>
              <Grid item size={{ xs: 2, sm: 4, md: 4 }}>
                <TextField
                  fullWidth
                  label="Recipe"
                  variant="outlined"
                  margin="normal"
                  placeholder="Recipe of Product"
                  value={recipe}
                  onChange={(e) => setRecipe(e.target.value)}
                  required
                  multiline
                  rows={1}
                />
              </Grid>
            </Grid>

            <Grid container spacing={{ xs: 5, md: 10 }} columns={{ xs: 4, sm: 8, md: 12 }} alignItems="stretch" justifyContent="center" sx={{ padding: '30px' }}>
              <Grid item size={{ xs: 12, sm: 4, md: 4 }}>
                <Autocomplete
                  multiple
                  margin="normal"
                  id="tags-filled"
                  options={availableTags}
                  freeSolo
                  value={tags}
                  onChange={handleTagsChange}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Tags"
                      placeholder="Add tags"
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid container spacing={{ xs: 5, md: 10 }} columns={{ xs: 4, sm: 8, md: 12 }} alignItems="stretch" justifyContent="center">
              <Grid item size={{ xs: 4, sm: 8, md: 12 }}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="raised-button-file"
                  multiple
                  type="file"
                  onChange={handleImageChange}
                />
                <label htmlFor="raised-button-file">
                  <Button variant="contained" color="primary" component="span"> Upload Images </Button>
                </label>

                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {previewUrls.map((url, index) => (
                      <img key={index} src={url} alt={`Preview ${index}`} style={{ width: 50, height: 50, objectFit: 'cover' }} />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default AddProduct;
