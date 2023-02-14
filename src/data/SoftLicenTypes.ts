export type LicenceType =
{
  LicenceTypeID: string;
  LicenceTypeName: string;
  LicenceTypeDescription: string;
  Price0: number;
  Price1: number;
  Price2: number;
  PriceFinal: number;
  PriceComment: string;
  PrevLicNumberIsNeeded: boolean;
}

export function GetSoftLicenceTypeByID(licenceTypeID: string): LicenceType
{
  let licTyp: LicenceType | undefined = SoftLicenTypes.find(element => element.LicenceTypeID === licenceTypeID);
  if (licTyp == undefined) {
    throw new Error('function GetSoftLicenceTypeByID: licTyp == undefined ');
  } 
  else
  {
    return licTyp;
  }
}

export const SoftLicenTypes: Array<LicenceType> =
[
  { LicenceTypeID: "RUS-STD",
    LicenceTypeName: "EhLib.VCL Standard",
    LicenceTypeDescription: "Лицензия без исходных кодов на 1 год",
    Price0: 18500,
    Price1: 0,
    Price2: 0,
    PriceFinal: 16500,
    PriceComment: "Цена с учетом скидки 10%",
    PrevLicNumberIsNeeded: false 
  },

  { LicenceTypeID: "RUS-PRO",
    LicenceTypeName: "EhLib.VCL Professional",
    LicenceTypeDescription: "Лицензия с исходными кодами на 1 год",
    Price0: 26000,
    Price1: 0,
    Price2: 0,
     PriceFinal: 23000,
    PriceComment: "Цена с учетом скидки 10%",
    PrevLicNumberIsNeeded: false },

  { LicenceTypeID: "RUS-STD+1Y",
    LicenceTypeName: "EhLib.VCL Standard +1",
    LicenceTypeDescription: "Продление лицензии без исходных кодов на 1 год",
    Price0: 10500,
    Price1: 0,
    Price2: 0,
    PriceFinal: 9400,
    PriceComment: "Цена с учетом скидки 10%",
    PrevLicNumberIsNeeded: true },

  { LicenceTypeID: "RUS-PRO+1Y",
    LicenceTypeName: "EhLib.VCL Professional +1",
    LicenceTypeDescription: "Продление лицензии с исходными кодами на 1 год",
    Price0: 14500,
    Price1: 0,
    Price2: 0,
    PriceFinal: 13000,
    PriceComment: "Цена с учетом скидки 10%",
    PrevLicNumberIsNeeded: true },

  { LicenceTypeID: "RUS-STD-TO-PRO",
    LicenceTypeName: "EhLib.VCL Upgrade from Standard to Professional",
    LicenceTypeDescription: "Переход с версии EhLib.VCL Standard на версию EhLib.VCL Professional",
    Price0: 7500,
    Price1: 0,
    Price2: 0,
    PriceFinal: 6700,
    PriceComment: "Цена с учетом скидки 10%",
    PrevLicNumberIsNeeded: true },

  { LicenceTypeID: "RUS-STD+1Y-AND-TO-PRO",
    LicenceTypeName: "EhLib.VCL Standard +1 и Переход на Professional",
    LicenceTypeDescription: "Продление лицензии и одновременный переход с версии Standard на версию Professional",
    Price0: 18000,
    Price1: 0,
    Price2: 0,
    PriceFinal: 16000,
    PriceComment: "Цена с учетом скидки 10%",
    PrevLicNumberIsNeeded: true },

//EhLib.VCL Корпоративная лицензия
  { LicenceTypeID: "RUS-PRO-SITE",
    LicenceTypeName: "EhLib.VCL Professional Site (Корпоративная лицензия)",
    LicenceTypeDescription: "Корпоративная лицензия c исходными кодами на 1 год",
    Price0: 135000,
    Price1: 0,
    Price2: 0,
    PriceFinal: 121000,
    PriceComment: "Цена с учетом скидки 10%",
    PrevLicNumberIsNeeded: false },

  { LicenceTypeID: "RUS-PRO-SITE+1Y",
    LicenceTypeName: "EhLib.VCL Professional Site +1 (Продление корпоративной лицензии на 1 год)",
    LicenceTypeDescription: "Продление корпоративной лицензии с исходными кодами на 1 год",
    Price0: 76000,
    Price1: 0,
    Price2: 0,
    PriceFinal: 68000,
    PriceComment: "Цена с учетом скидки 10%",
    PrevLicNumberIsNeeded: true },

//EhLib.WinForms
  { LicenceTypeID: "RUS-WFM-STD",
    LicenceTypeName: "EhLib.WinForms Standard",
    LicenceTypeDescription: "Лицензия без исходных кодов на 1 год",
    Price0: 5600,
    Price1: 0,
    Price2: 0,
    PriceFinal: 5600,
    PriceComment: "",
    PrevLicNumberIsNeeded: false },

  { LicenceTypeID: "RUS-WFM-PRO",
    LicenceTypeName: "EhLib.WinForms Professional",
    LicenceTypeDescription: "Лицензия с исходными кодами на 1 год",
    Price0: 8600,
    Price1: 0,
    Price2: 0,
    PriceFinal: 8600,
    PriceComment: "",
    PrevLicNumberIsNeeded: false },

  { LicenceTypeID: "RUS-WFM-STD+1Y",
    LicenceTypeName: "EhLib.WinForms Standard +1",
    LicenceTypeDescription: "Продление лицензии без исходных кодов на 1 год",
    Price0: 3100,
    Price1: 0,
    Price2: 0,
    PriceFinal: 3100,
    PriceComment: "",
    PrevLicNumberIsNeeded: true },

  { LicenceTypeID: "RUS-WFM-PRO+1Y",
    LicenceTypeName: "EhLib.WinForms Professional +1",
    LicenceTypeDescription: "Продление лицензии с исходными кодами на 1 год",
    Price0: 4100,
    Price1: 0,
    Price2: 0,
    PriceFinal: 4100,
    PriceComment: "",
    PrevLicNumberIsNeeded: true }
]