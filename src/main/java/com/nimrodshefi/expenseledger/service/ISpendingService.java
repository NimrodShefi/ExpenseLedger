package com.nimrodshefi.expenseledger.service;

import com.nimrodshefi.expenseledger.dto.SpendingDTO;
import com.nimrodshefi.expenseledger.model.Spending;

import java.util.List;
import java.util.Optional;

public interface ISpendingService {
    Spending save(SpendingDTO dto);
    List<Spending> findAll();
    Optional<Spending> findById(Long id);
    Spending update(Long id, SpendingDTO dto);
    void delete(Long id);
}
