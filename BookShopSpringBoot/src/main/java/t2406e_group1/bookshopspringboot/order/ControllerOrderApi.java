// package t2406e_group1.bookshopspringboot.order;

// public class ControllerOrderApi {

// }

package t2406e_group1.bookshopspringboot.order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import t2406e_group1.bookshopspringboot.order.details.EntityDetailsOrder;
import t2406e_group1.bookshopspringboot.order.details.ServiceDetailsOrder;
import t2406e_group1.bookshopspringboot.review.EntityReview;

// import t2406e_group1.bookshopspringboot.user.EntityUser;
// import t2406e_group1.bookshopspringboot.user.ServiceUser;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")

public class ControllerOrderApi {

    @Autowired
    private ServiceOrder serviceOrder;

    @Autowired
    private ServiceDetailsOrder serviceDetailsOrder;

    @GetMapping
    public List<EntityOrder> getAllOrders() {
        return serviceOrder.findAll();
    }

    @PostMapping("/with-details") // tạo đơn hàng
    public ResponseEntity<?> createOrderWithDetails(@RequestBody OrderWithDetailsRequest request) {
        EntityOrder savedOrder = serviceOrder.saveEntityOrder(request.getOrder());
        for (EntityDetailsOrder detail : request.getDetails()) {
            detail.setOrder(savedOrder);
            serviceDetailsOrder.save(detail);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Tạo đơn hàng thành công!");
        response.put("orderId", savedOrder.getId());// hiển thị ID đơn hàng đã tạo

        return ResponseEntity.ok(response);
    }

    @PutMapping("/details/{detailId}") // ✅ Cập nhật chi tiết đơn hàng
    public ResponseEntity<?> updateDetail(@PathVariable Long detailId, @RequestBody EntityDetailsOrder updatedDetail) {
        updatedDetail.setId(detailId);
        EntityDetailsOrder saved = serviceDetailsOrder.update(updatedDetail);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{orderId}") // ✅ Cập nhật thông tin đơn hàng
    public ResponseEntity<?> updateOrder(@PathVariable int orderId, @RequestBody EntityOrder updatedOrder) {
        try {
            EntityOrder saved = serviceOrder.updateOrder(orderId, updatedOrder);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @DeleteMapping("/{orderId}") // ✅ Xóa đơn hàng và chi tiết đi kèm
    public ResponseEntity<?> deleteOrder(@PathVariable int orderId) {
        Optional<EntityOrder> optionalOrder = serviceOrder.findById(orderId);
        if (!optionalOrder.isPresent()) {
            return ResponseEntity.status(404).body("Đơn hàng không tồn tại!");
        }

        // Xóa chi tiết đơn hàng trước
        serviceDetailsOrder.deleteByOrderId((long) orderId);
        serviceOrder.deleteById(orderId);
        return ResponseEntity.ok("Đơn hàng và chi tiết đã được xóa!");
    }

    @DeleteMapping("/details/{detailId}") // ✅ Xoá chi tiết đơn hàng nếu đơn chưa "Đã giao"
    public ResponseEntity<?> deleteOrderDetail(@PathVariable Long detailId) {
        Optional<EntityDetailsOrder> optionalDetail = serviceDetailsOrder.findById(detailId);
        if (optionalDetail.isEmpty()) {
            return ResponseEntity.status(404).body("Chi tiết đơn hàng không tồn tại!");
        }

        EntityDetailsOrder detail = optionalDetail.get();
        EntityOrder order = detail.getOrder();

        if (order.getStatus() != null && order.getStatus().equalsIgnoreCase("Đã giao")) {
            return ResponseEntity.status(403).body("Không thể xoá chi tiết vì đơn hàng đã giao!");
        }

        serviceDetailsOrder.deleteById(detailId);
        return ResponseEntity.ok("Đã xoá chi tiết đơn hàng có ID: " + detailId);
    }

    @GetMapping("/{id}/details") // ✅ Lấy chi tiết đơn hàng
    public ResponseEntity<?> getOrderAndDetails(@PathVariable int id) {
        Optional<EntityOrder> orderOpt = serviceOrder.findById(id);
        if (!orderOpt.isPresent()) {
            return ResponseEntity.status(404).body("Đơn hàng không tồn tại");
        }

        List<EntityDetailsOrder> details = serviceDetailsOrder.findByOrderId((long) id);
        return ResponseEntity.ok(Map.of(
                "order", orderOpt.get(),
                "details", details));
    }

    @GetMapping("/{id}") // ✅ Lấy thông tin đơn hàng
    public ResponseEntity<?> getOrderById(@PathVariable int id) {
        Optional<EntityOrder> optionalOrder = serviceOrder.findById(id);
        return optionalOrder.map(order -> ResponseEntity.ok(order))
                .orElseGet(() -> ResponseEntity.status(404).body(null));
    }

}
