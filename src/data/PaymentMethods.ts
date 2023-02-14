export type PaymentMethod =
{
  PaymentMethodID: string;
  PaymentMethodName: string;
  AllowForEntityID: string;
}

export const PaymentMethods: Array<PaymentMethod> =
[
  { PaymentMethodID: "BANKPLAT", 
    PaymentMethodName: "Банковский платеж (для юр. лиц и ИП)",
    AllowForEntityID: "LEG" },

  { PaymentMethodID: "BANKCARD", 
    PaymentMethodName: "Банковская карта (Visa, MasterCard, МИР, ...)",
    AllowForEntityID: "IND" },

  { PaymentMethodID: "YANMONEY", 
    PaymentMethodName: "Яндекс Деньги (ЮMoney)",
    AllowForEntityID: "IND" },

  { PaymentMethodID: "CASH", 
    PaymentMethodName: "Наличные",
    AllowForEntityID: "IND" },

  { PaymentMethodID: "OTHER", 
    PaymentMethodName: "Другой способ оплаты",
    AllowForEntityID: "IND" }
];
