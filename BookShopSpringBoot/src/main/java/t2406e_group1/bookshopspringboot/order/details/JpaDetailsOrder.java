package t2406e_group1.bookshopspringboot.order.details;





import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface JpaDetailsOrder extends JpaRepository<EntityDetailsOrder, Long> {

    // Tìm danh sách chi tiết đơn hàng theo ID đơn hàng
    List<EntityDetailsOrder> findByOrderId(Long orderId);

    // Tìm danh sách chi tiết đơn hàng theo ID sản phẩm
    List<EntityDetailsOrder> findByProductId(Long productId);
}
