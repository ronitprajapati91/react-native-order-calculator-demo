#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(OrderCalc, NSObject)

RCT_EXTERN_METHOD(calculateTotal:(double)subtotal
                  taxRatePercent:(double)taxRatePercent
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)

@end