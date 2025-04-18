// DTO trung gian nhận đơn hàng và chi tiết đơn hàng từ client
package t2406e_group1.bookshopspringboot.order;

import java.util.List;
import t2406e_group1.bookshopspringboot.order.details.EntityDetailsOrder;

public class OrderWithDetailsRequest {
    private EntityOrder order; // Đơn hàng chính
    private List<EntityDetailsOrder> details; // Danh sách chi tiết đơn hàng

    public EntityOrder getOrder() {
        return order;
    }

    public void setOrder(EntityOrder order) {
        this.order = order;
    }

    public List<EntityDetailsOrder> getDetails() {
        return details;
    }

    public void setDetails(List<EntityDetailsOrder> details) {
        this.details = details;
    }
}