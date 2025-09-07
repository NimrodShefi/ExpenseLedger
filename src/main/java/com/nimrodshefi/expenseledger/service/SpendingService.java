package com.nimrodshefi.expenseledger.service;

import com.nimrodshefi.expenseledger.dto.SpendingDTO;
import com.nimrodshefi.expenseledger.model.Spending;
import com.nimrodshefi.expenseledger.repository.SpendingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SpendingService implements ISpendingService {
    private final SpendingRepository spendingRepository;

    @Override
    public Spending save(SpendingDTO dto) {
        Spending spending = Spending.builder()
                .date(dto.getDate())
                .amount(dto.getAmount())
                .category(dto.getCategory())
                .comment(dto.getComment())
                .build();
        return spendingRepository.save(spending);
    }

    @Override
    public List<Spending> findAll() {
        return spendingRepository.findAll();
    }

    @Override
    public Optional<Spending> findById(Long id) {
        return spendingRepository.findById(id);
    }

    @Override
    public Spending update(Long id, SpendingDTO dto) {
        return spendingRepository.findById(id)
                .map(sp -> {
                    sp.setDate(dto.getDate());
                    sp.setAmount(dto.getAmount());
                    sp.setCategory(dto.getCategory());
                    sp.setComment(dto.getComment());
                    return spendingRepository.save(sp);
                }).orElseThrow(() -> new RuntimeException("Spending not found: " + id));
    }

    @Override
    public void delete(Long id) {
        spendingRepository.deleteById(id);
    }
}