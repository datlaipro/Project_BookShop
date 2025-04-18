// Service xử lý chi tiết đơn hàng
package t2406e_group1.bookshopspringboot.order.details;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

import java.util.List;

@Service
public class ServiceDetailsOrder {

    @Autowired
    private JpaDetailsOrder jpaDetailsOrder;

    // Lưu chi tiết đơn hàng mới
    public EntityDetailsOrder save(EntityDetailsOrder detail) {
        return jpaDetailsOrder.save(detail);
    }

    // Cập nhật chi tiết đơn hàng
    public EntityDetailsOrder update(EntityDetailsOrder detail) {
        return jpaDetailsOrder.save(detail);
    }

    // Xóa chi tiết theo ID
    public void deleteById(Long id) {
        jpaDetailsOrder.deleteById(id);
    }

    // Xóa tất cả chi tiết theo ID đơn hàng
    public void deleteByOrderId(Long orderId) {
        List<EntityDetailsOrder> details = jpaDetailsOrder.findByOrderId(orderId);
        jpaDetailsOrder.deleteAll(details);
    }

    // Lấy danh sách chi tiết theo ID đơn hàng
    public List<EntityDetailsOrder> findByOrderId(Long orderId) {
        return jpaDetailsOrder.findByOrderId(orderId);
    }

    // Thêm vào ServiceDetailsOrder.java
    public Optional<EntityDetailsOrder> findById(Long id) {
        return jpaDetailsOrder.findById(id);
    }

}
