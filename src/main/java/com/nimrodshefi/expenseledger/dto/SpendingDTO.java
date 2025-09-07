package com.nimrodshefi.expenseledger.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.time.LocalDate;

@Data
public class SpendingDTO {
    @NotNull(message = "Date is required")
    @PastOrPresent(message = "Date cannot be in the future")
    private LocalDate date;

    @NotNull(message = "Amount is required")
    @Positive(message = "Amount must be positive")
    private Double amount;

    @NotNull(message = "Category is required")
    private String category;
    
    private String comment;
}
