package com.nimrodshefi.expenseledger.controller;

import com.nimrodshefi.expenseledger.dto.SpendingDTO;
import com.nimrodshefi.expenseledger.model.Spending;
import com.nimrodshefi.expenseledger.service.ISpendingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/spending")
@RequiredArgsConstructor
public class SpendingApiController {

    private final ISpendingService _spendingService;

    @PostMapping
    public Spending create(@RequestBody @Valid SpendingDTO dto) {
        return _spendingService.save(dto);
    }

    @GetMapping
    public List<Spending> getAll() {
        return _spendingService.findAll();
    }

    // Read one by ID
    @GetMapping("/{id}")
    public Spending getById(@PathVariable Long id) {
        return _spendingService.findById(id)
                .orElseThrow(() -> new RuntimeException("Spending not found: " + id));
    }

    // Update
    @PutMapping("/{id}")
    public Spending update(@PathVariable Long id, @RequestBody @Valid SpendingDTO dto) {
        return _spendingService.update(id, dto);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        _spendingService.delete(id);
    }
}
