package com.nimrodshefi.expenseledger.repository;

import com.nimrodshefi.expenseledger.model.Spending;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpendingRepository extends JpaRepository<Spending, Long> {
}
