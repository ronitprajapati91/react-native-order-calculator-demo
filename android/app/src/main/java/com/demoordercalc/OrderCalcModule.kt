package com.demoordercalc

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.math.BigDecimal
import java.math.RoundingMode

class OrderCalcModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "OrderCalc"

    @ReactMethod
    fun calculateTotal(subtotal: Double, taxRatePercent: Double, promise: Promise) {
        if (subtotal < 0 || taxRatePercent < 0) {
            promise.reject("INVALID_INPUT", "Subtotal and tax rate must not be negative")
            return
        }
        try {
            val base = BigDecimal.valueOf(subtotal).setScale(2, RoundingMode.HALF_UP)
            val tax = base
                .multiply(BigDecimal.valueOf(taxRatePercent))
                .divide(BigDecimal(100), 2, RoundingMode.HALF_UP)
            val total = base.add(tax)
            promise.resolve(total.toDouble())
        } catch (e: Exception) {
            promise.reject("CALC_ERROR", e.message, e)
        }
    }
}
