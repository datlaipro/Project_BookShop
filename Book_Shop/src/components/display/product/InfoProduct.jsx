import React from 'react';
import {
  Container,
  Box,
  Tabs,
  Tab,
  Typography,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Rating,
  Paper,
  IconButton,
} from '@mui/material';
import { Star as StarIcon } from '@mui/icons-material';

const InfoProduct = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          variant='fullWidth'
          value={value}
          onChange={handleChange}
          aria-label="product tabs"
          centered
          TabIndicatorProps={{ style: { backgroundColor: '#F86D72' } }}
        >
          <Tab
            label={<Typography variant="h6" style={{ color: value === 0 ? '#F86D72' : 'inherit' }}>Description</Typography>}
          />
          <Tab
            label={<Typography variant="h6" style={{ color: value === 1 ? '#F86D72' : 'inherit' }}>Information</Typography>}
          />
          <Tab
            label={<Typography variant="h6" style={{ color: value === 2 ? '#F86D72' : 'inherit' }}>Shipping & Return</Typography>}
          />
          <Tab
            label={<Typography variant="h6" style={{ color: value === 3 ? '#F86D72' : 'inherit' }}>Reviews (02)</Typography>}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Typography variant="h6">Product Description</Typography>
        <br />
        <Typography variant="h6">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros.
          Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede.
          Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim
          pellentesque felis. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula
          vulputate sem tristique cursus.
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            {/* <ListItemText primary="Donec nec justo eget felis facilisis fermentum." /> */}
            <Typography variant="h6">Donec nec justo eget felis facilisis fermentum.</Typography>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            {/* <ListItemText primary="Suspendisse urna viverra non, semper suscipit pede." /> */}
            <Typography variant="h6">Suspendisse urna viverra non, semper suscipit pede.</Typography>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            {/* <ListItemText primary="Aliquam porttitor mauris sit amet orci." /> */}
            <Typography variant="h6">Aliquam porttitor mauris sit amet orci.</Typography>
          </ListItem>
        </List>
        <Typography variant="h6">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros.
          Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede.
          Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim
          pellentesque felis. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula
          vulputate sem tristique cursus.
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography variant="h6">It is Comfortable and Best</Typography>
        <Typography variant="h6">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography variant="h6">Returns Policy</Typography>
        <Typography variant="h6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eros justo, accumsan non dui sit amet.
          Phasellus semper volutpat mi sed imperdiet. Ut odio lectus, vulputate non ex non, mattis sollicitudin purus.
          Mauris consequat justo a enim interdum, in consequat dolor accumsan. Nulla iaculis diam purus, ut vehicula
          leo efficitur at.
        </Typography>
        <Typography variant="h6">
          Interdum et malesuada fames ac ante ipsum primis in faucibus. In blandit nunc enim, sit amet pharetra erat aliquet ac.
        </Typography>
        <Typography variant="h6">Shipping</Typography>
        <Typography variant="h6">
          Pellentesque ultrices ut sem sit amet lacinia. Sed nisi dui, ultrices ut turpis pulvinar. Sed fringilla ex eget
          lorem consectetur, consectetur blandit lacus varius. Duis vel scelerisque elit, et vestibulum metus. Integer sit
          amet tincidunt tortor. Ut lacinia ullamcorper massa, a fermentum arcu vehicula ut. Ut efficitur faucibus dui
          Nullam tristique dolor eget turpis consequat varius. Quisque a interdum augue. Nam ut nibh mauris.
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ReviewBox />
      </TabPanel>
    </Container>
  );
};

const TabPanel = ({ children, value, index, ...other }) => (
  <Box
    role="tabpanel"
    hidden={value !== index}
    id={`tabpanel-${index}`}
    aria-labelledby={`tab-${index}`}
    {...other}
  >
    {value === index && (
      <Box sx={{ p: 3 }}>
        <Typography>{children}</Typography>
      </Box>
    )}
  </Box>
);

const ReviewBox = () => ( // Box này sẽ hiển thị thông tin review, dữ liệu review, và form review
  <Box>
    <ReviewItem
      imageSrc="/demo/images/review-image1.jpg"
      author="Tom Johnson"
      date="07/05/2022"
      text="Vitae tortor condimentum lacinia quis vel eros donec ac. Nam at lectus urna duis convallis convallis"
    />
    <ReviewItem
      imageSrc="/demo/images/review-image2.jpg"
      author="Jenny Willis"
      date="07/05/2022"
      text="Vitae tortor condimentum lacinia quis vel eros donec ac. Nam at lectus urna duis convallis convallis"
    />
    <AddReview />
  </Box>
);

const ReviewItem = ({ imageSrc, author, date, text }) => (
  <Box display="flex" mb={3}>
    <Paper>
      <img src={imageSrc} alt="review" style={{ width: 100, height: 100, objectFit: 'cover' }} />
    </Paper>
    <Box ml={2}>
      <Rating value={5} readOnly />
      <Typography variant="subtitle1">{author}</Typography>
      <Typography variant="body1" color="textSecondary">
        {date}
      </Typography>
      <Typography variant="h6">{text}</Typography>
    </Box>
  </Box>
);

const AddReview = () => (
  <Box mt={3}>
    <Typography variant="h6">Add a review</Typography>
    <Typography variant="h6">Your email address will not be published. Required fields are marked *</Typography>
    <Box component="form" mt={2}>
      <Box display="flex" gap={2} mb={2}>
        <TextField name="name" label="Write your name here *" fullWidth />
        <TextField name="email" label="Write your email here *" fullWidth />
      </Box>
      <TextField
        name="review"
        label="Write your review here *"
        multiline
        rows={4}
        fullWidth
        margin="normal"
      />
      <FormControlLabel
        control={<Checkbox required />}
        label="Save my name, email, and website in this browser for the next time."
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  </Box>
);

export default InfoProduct;
