import Foundation
import React

@objc(OrderCalc)
class OrderCalc: NSObject {

  @objc static func requiresMainQueueSetup() -> Bool { false }

  @objc(calculateTotal:taxRatePercent:resolve:reject:)
  func calculateTotal(_ subtotal: Double,
                      taxRatePercent: Double,
                      resolve: @escaping RCTPromiseResolveBlock,
                      reject: @escaping RCTPromiseRejectBlock) {
    if subtotal < 0 || taxRatePercent < 0 {
      reject("INVALID_INPUT", "Subtotal and tax rate must be non-negative", nil)
      return
    }

    let base = NSDecimalNumber(value: subtotal)
    let rate = NSDecimalNumber(value: taxRatePercent)
    let hundred = NSDecimalNumber(value: 100)
    let tax = base.multiplying(by: rate).dividing(by: hundred)

    // .plain rounds half up, matching BigDecimal HALF_UP on Android
    let rounding = NSDecimalNumberHandler(roundingMode: .plain, scale: 2,
                                          raiseOnExactness: false,
                                          raiseOnOverflow: false,
                                          raiseOnUnderflow: false,
                                          raiseOnDivideByZero: false)
    let total = base.adding(tax).rounding(accordingToBehavior: rounding)
    resolve(total.doubleValue)
  }
}