import { Container, Typography, Grid, Card, CardContent, Box } from "@mui/material";

import PostTagsAndShare from '../../components/display/free/PostTagsAndShare'; // Các nút điều hướng mạng xã hội: VD facebook, twitter, linkedin, youtube
import InstagramGallery from "../../components/display/GroupItems/InstagramGallery";
import LatestPosts from "../../components/display/post/LatestPosts";
import BreadcrumbsComponent from '../../components/display/free/BreadcrumbsComponent'; // Component Breadcrumbs


const SinglePost = () => {
  return (
    <>
        <BreadcrumbsComponent         
        title="Post"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Post" },
          { label: "Post" } // Không có href → là trang hiện tại
        ]}/>
      <Container maxWidth="xl" sx={{ py: 4}}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Card sx={{boxShadow: "none"}}>
              <CardContent>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Feb 22, 2024 - <a href="blog.html">Books</a>
                  </Typography>
                </Box>
                <Typography variant="h4" sx={{ my: 2 }}>
                  Must read books if you like reading Sci-Fi Plot.
                </Typography>
                <Box component="img" src="/demo/images/single-post.jpg" alt="single-post" width="100%" sx={{ my: 2 }} />
                <Typography variant="body1" paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur facilisis vivamus massa magna. Blandit mauris libero condimentum commodo morbi consectetur sociis convallis sit. Magna diam amet justo sed vel dolor et volutpat integer. Iaculis sit sapien hac odio elementum egestas neque. Adipiscing purus euismod orci sem amet, et. Turpis erat ornare nisi laoreet est euismod.

                  Sit suscipit tortor turpis sed fringilla lectus facilisis amet. Ipsum, amet dolor curabitur non aliquet orci urna volutpat. Id aliquam neque, ut vivamus sit imperdiet enim, lacus, vel. Morbi arcu amet, nulla fermentum vitae mattis arcu mi convallis. Urna in sollicitudin in vestibulum erat. Turpis faucibus augue ipsum, at aliquam. Cras sagittis tellus nunc integer vitae neque bibendum eget. Tempus malesuada et pellentesque maecenas. Sociis porttitor elit tincidunt tellus sit ornare. Purus ut quis sed venenatis eget ut ipsum, enim lacus. Praesent imperdiet vitae eu, eu tincidunt nunc integer sit.
                </Typography>
                <blockquote>
                  <Typography variant="h6" fontStyle="italic">
                    “Sit suscipit tortor turpis sed fringilla lectus facilisis amet...
                  </Typography>
                </blockquote>
                <Typography variant="h5" sx={{ mt: 3 }}>
                  Is This Great?
                </Typography>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={12} sm={6}>
                    <ul>
                      <li>Blandit mauris libero condimentum commodo sociis convallis sit.</li>
                      <li>Laculis sit sapien hac odio elementum egestas neque.</li>
                      <li>Blandit mauris libero condimentum commodo sociis convallis sit.</li>
                      <li>Laculis sit sapien hac odio elementum egestas neque.</li>
                      <li>Blandit mauris libero condimentum commodo sociis convallis sit.</li>
                      <li>Laculis sit sapien hac odio elementum egestas neque.</li>
                    </ul>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <ul>
                      <li>Magna diam amet justo sed vel dolor et volutpat integer.</li>
                      <li>Laculis sit sapien hac odio elementum egestas neque.</li>
                      <li>Blandit mauris libero condimentum commodo sociis convallis sit.</li>
                      <li>Laculis sit sapien hac odio elementum egestas neque.</li>
                      <li>Blandit mauris libero condimentum commodo sociis convallis sit.</li>
                      <li>Laculis sit sapien hac odio elementum egestas neque.</li>
                    </ul>
                  </Grid>
                </Grid>
                <Typography variant="body1" paragraph>
                  Morbi arcu amet, nulla fermentum vitae mattis arcu mi convallis...Tortor diam dignissim amet, in interdum aliquet. Magnis dictum et eros purus fermentum, massa ullamcorper sit sollicitudin. Nascetur libero elementum adipiscing mauris maecenas et magna. Etiam nec, rutrum a diam lacus, nunc integer etiam. Mattis pulvinar non viverra donec pellentesque. Odio mi consequat libero dolor. Porta ut diam lobortis eget leo, lectus. Nunc tempus feugiat massa laoreet ultrices diam magna quam. Congue auctor auctor luctus neque. Enim lorem ultrices diam donec. Sed id placerat consectetur faucibus.
                </Typography>
                {/* <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}> */}
                {/* <Box
                    component="img"
                    src="/demo/images/post-img.jpg"
                    alt="post-image"
                    sx={{
                      width: "40%", // Chiếm 40% chiều ngang
                      borderRadius: 2, // Bo góc
                    }}
                  /> */}
                {/* <Box sx={{ flex: 1 }}> */}

                <Box
                  component="img"
                  src="/demo/images/post-img.jpg"
                  alt="post-image"
                  sx={{
                    width: "40%", // Chiếm 40% chiều ngang
                    float: "left", // Đưa ảnh sang bên trái
                    mr: 2, // Margin-right để tạo khoảng cách với text
                    mb: 1, // Margin-bottom để không bị đè bởi text phía dưới
                    borderRadius: 2, // Bo góc ảnh nhẹ nhàng
                  }}
                />
                <Typography variant="h5" sx={{ mt: 3 }}>
                  Velit, praesent pharetra malesuada
                </Typography>
                <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
                  Về phía ngành giao thông vận tải, ông Lương Duyên Thống, Trưởng phòng Quản lý vận tải phương tiện người lái,
                  Cục Đường bộ Việt Nam, cho biết hiện số phôi giấy phép đảm bảo cấp đủ cho các Sở Giao thông Vận tải.
                  Tuy nhiên, do nhiều người đi đổi giấy phép lái xe gây ùn ứ tại các Sở, trong khi nhân lực và thiết bị in giấy phép có hạn...
                  Giá vàng trong nước tăng 3 ngày liên tiếp, lên tổng cộng gần 1 triệu đồng/lượng. Nhiều người bày tỏ sự bất ngờ với đà phục hồi nhanh chóng của giá vàng.

                  Vào cuối tuần trước, giá vàng "bốc hơi" cả triệu đồng/lượng và nhiều nhà đầu tư kỳ vọng đà giảm có thể tiếp tục kéo giá vàng miếng SJC đi xuống. Có điều, giá vàng trong nước bất ngờ tăng mạnh vào cuối ngày theo đà đi lên của thế giới.

                  Trên thị trường quốc tế, giá vàng hôm nay được giao dịch quanh 2.911 USD/ounce, tăng khoảng chục USD/ounce so với phiên trước. Kim loại quý trên thị trường quốc tế tiếp tục phục hồi sau phiên lao dốc mạnh cuối tuần qua.

                  Giá vàng phục hồi cùng nhịp với đồng USD, khi chỉ số đồng USD trên thị trường quốc tế tăng lên 106,8 điểm (tăng 0,24% so với phiên trước). Dù vậy, chỉ số đồng USD vẫn đang ở mức thấp nhất trong khoảng 2 tháng qua.

                  Theo giới phân tích, đồng USD suy yếu và lợi suất trái phiếu Mỹ thấp đang hỗ trợ giá vàng tăng trở lại.
                  Vào cuối tuần trước, giá vàng "bốc hơi" cả triệu đồng/lượng và nhiều nhà đầu tư kỳ vọng đà giảm có thể tiếp tục kéo giá vàng miếng SJC đi xuống. Có điều, giá vàng trong nước bất ngờ tăng mạnh vào cuối ngày theo đà đi lên của thế giới.

                  Trên thị trường quốc tế, giá vàng hôm nay được giao dịch quanh 2.911 USD/ounce, tăng khoảng chục USD/ounce so với phiên trước. Kim loại quý trên thị trường quốc tế tiếp tục phục hồi sau phiên lao dốc mạnh cuối tuần qua.

                  Giá vàng phục hồi cùng nhịp với đồng USD, khi chỉ số đồng USD trên thị trường quốc tế tăng lên 106,8 điểm (tăng 0,24% so với phiên trước). Dù vậy, chỉ số đồng USD vẫn đang ở mức thấp nhất trong khoảng 2 tháng qua.

                  Theo giới phân tích, đồng USD suy yếu và lợi suất trái phiếu Mỹ thấp đang hỗ trợ giá vàng tăng trở lại.
                </Typography>
                {/* </Box>
                </Box> */}

              </CardContent>
            </Card>
          </Grid>
        </Grid>
      <PostTagsAndShare />

      </Container>

      <LatestPosts />
        <InstagramGallery />
    </>
  );
};

export default SinglePost;
