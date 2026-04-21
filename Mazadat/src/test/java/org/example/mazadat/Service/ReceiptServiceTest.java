package org.example.mazadat.Service;

import org.example.mazadat.Repository.AuctionRepository;
import org.example.mazadat.Repository.BuyerRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
class ReceiptServiceTest {

    @Mock
    private AuctionRepository auctionRepository;

    @Mock
    private BuyerRepository buyerRepository;

    @InjectMocks
    private ReceiptService receiptService;

    @Test
    void resolveTextsReturnsArabicStringsForArabicLanguage() {
        ReceiptTexts texts = receiptService.resolveTexts("ar-SA");

        assertEquals("إيصال مزاد مزادات", texts.title());
        assertEquals("تفاصيل المزاد", texts.auctionDetailsTitle());
        assertEquals("معلومات البائع", texts.sellerInformationTitle());
        assertEquals("شكراً لاستخدام مزادات! هذا إيصال رسمي.", texts.footer());
    }

    @Test
    void resolveTextsFallsBackToEnglishForNonArabicLanguage() {
        ReceiptTexts texts = receiptService.resolveTexts("en-US");

        assertEquals("MAZADAT AUCTION RECEIPT", texts.title());
        assertEquals("AUCTION DETAILS", texts.auctionDetailsTitle());
        assertEquals("SELLER INFORMATION", texts.sellerInformationTitle());
        assertEquals("Thank you for using Mazadat! This is an official receipt.", texts.footer());
    }
}

