package t2406e_group1.bookshopspringboot.order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceOrder {

    @Autowired
    private JpaOrder jpaOrder;

    public ServiceOrder(JpaOrder jpaOrder) {
        this.jpaOrder = jpaOrder;
    }

    public List<EntityOrder> findAll() {
        return jpaOrder.findAll();
    }

    public Optional<EntityOrder> findById(int id) {
        return jpaOrder.findById( id); // ép kiểu vì jpaOrder dùng Long
    }

    public EntityOrder saveEntityOrder(EntityOrder entityOrder) {
        return jpaOrder.save(entityOrder);
    }

    public void deleteById(int id) {
        jpaOrder.deleteById( id); // ép kiểu Long cho đúng với ID của entity
    }

    // ✅ Thêm hàm update đơn hàng
    public EntityOrder updateOrder(int orderId, EntityOrder updatedOrder) {
        Optional<EntityOrder> optionalOrder = jpaOrder.findById( orderId);
        if (optionalOrder.isEmpty()) {
            throw new RuntimeException("Đơn hàng không tồn tại!");
        }

        EntityOrder existingOrder = optionalOrder.get();
        existingOrder.setOrderDate(updatedOrder.getOrderDate());
        existingOrder.setStatus(updatedOrder.getStatus());
        existingOrder.setPhoneNumber(updatedOrder.getPhoneNumber());

        return jpaOrder.save(existingOrder);
    }
}
