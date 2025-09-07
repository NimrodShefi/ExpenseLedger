package com.nimrodshefi.expenseledger.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpendingWebController {

    @GetMapping
    public String index() {
        return "index.html";
    }
}
