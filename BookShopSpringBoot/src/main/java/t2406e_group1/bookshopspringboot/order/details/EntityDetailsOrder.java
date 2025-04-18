package t2406e_group1.bookshopspringboot.order.details;

import jakarta.persistence.*;
import java.io.Serializable;
import t2406e_group1.bookshopspringboot.order.EntityOrder;
import t2406e_group1.bookshopspringboot.product.EntityProduct;

@Entity
@Table(name = "OrderDetails")
public class EntityDetailsOrder implements Serializable { // khi truyền dữ liệu qua mạng thì cần phải implement
                                                          // Serializable

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private EntityOrder order;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private EntityProduct product;

    @Column(name = "quantity", nullable = false)
    private int quantity;

    @Column(name = "price", nullable = false)
    private double price;

    public EntityDetailsOrder() {
    }

    public EntityDetailsOrder(
            EntityOrder order, EntityProduct product,
            int quantity, double price) {
        this.order = order;
        this.product = product;
        this.quantity = quantity;
        this.price = price;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EntityOrder getOrder() {
    return order;
    }

    public void setOrder(EntityOrder order) {
    this.order = order;
    }

    public EntityProduct getProduct() {
    return product;
    }

    public void setProduct(EntityProduct product) {
    this.product = product;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @Override
    public String toString() {// hiển thị chi tiết đơn hàng
        return "EntityDetailsOrder{" +
                "id=" + id +
                ", order=" + order +
                ", product=" + product +
                ", quantity=" + quantity +
                ", price=" + price +
                '}';
    }
}
