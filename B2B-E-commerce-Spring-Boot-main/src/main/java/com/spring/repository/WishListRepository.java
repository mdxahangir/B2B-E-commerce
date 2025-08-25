package com.spring.repository;

import com.spring.model.WishList;
import com.spring.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface WishListRepository extends JpaRepository<WishList, Long> {
    List<WishList> findByUser(User user);
    boolean existsByUserIdAndProductId(Long userId, Long productId);
}
