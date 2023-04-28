import { PaymentMethod, PaymentMethods } from "../data/PaymentMethods";
import { BusinessEntities, BusinessEntity } from "../data/BusinessEntities";
import { LicenceType, SoftLicenTypes } from "../data/SoftLicenTypes";

export enum EditFormState { Edit, PreviewToPost, ShowResult, NewOrder };

export class MyFormValues {
  // softLicenceTypeDescription: string = ''; //Описание лицензии
  // softLicenTypeName: string = '';
  // licensePrice: number = 0;
  // licensePriceText: string = '';
  // prevLicNumberIsNeeded: boolean = false;
  // softLicencePriceComment: string = '';

  // numberOfLicenses: number = 1;
  // paymentMethodName: string = '';
  // buyerEntityName: string = '';

  // OrderPrice: number = 0;
  // OrderPriceText: string = "";

  //Тип лицензии: SoftLicenTypeID
  private _softLicenTypeID: string = '';

  public set SoftLicenTypeID(value: string) {
    if (this._softLicenTypeID !== value)
    {
      this._softLicenTypeID = value;
      this.OnSoftLicenTypeIDChanged();
    }
  }  

  public get SoftLicenTypeID(): string {
    return this._softLicenTypeID;
  }  

  private OnSoftLicenTypeIDChanged()
  {
    let slt: LicenceType | undefined = SoftLicenTypes.find(element => element.LicenceTypeID === this._softLicenTypeID);
    if (slt !== undefined) {
      this.SoftLicenceTypeName = slt.LicenceTypeName;
      this.LicencePrice = slt.PriceFinal;
      this.PrevLicNumberIsNeeded = slt.PrevLicNumberIsNeeded;
      this.SoftLicenceTypeDescription = slt.LicenceTypeDescription;
      this.SoftLicencePriceComment = slt.PriceComment;
    } 
    else
    {
      this.SoftLicenceTypeName = "";
      this.LicencePrice = 0;
      this.PrevLicNumberIsNeeded = false;
      this.SoftLicenceTypeDescription = "";
      this.SoftLicencePriceComment = "";
      //throw new Error('private OnPaymentMethodIDChanged: (pm == undefined) ');
    }
  }

  SoftLicenceTypeName: string = '';
  SoftLicenceTypeDescription: string = '';
  SoftLicencePriceComment: string = '';

  private _licencePrice: number = 0;

  public get LicencePrice(): number {
    return this._licencePrice;
  }  

  public set LicencePrice(value: number) {
    if (this._licencePrice !== value)
    {
      this._licencePrice = value;
      this._licencePriceText = this._licencePrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // "1,234.57"

      this.UpdateOrderPrice();
    }
  }  

  private _licencePriceText = "";
  public get LicencePriceText(): string
  {
    return this._licencePriceText;
  } 

  public PrevLicNumberIsNeeded: boolean = false;

  //numberOfLicenses As Str
  private _numberOfLicensesAsStr: string = '1';
  public get NumberOfLicensesAsStr(): string {
    return this._numberOfLicensesAsStr;
  }  
  
  public set NumberOfLicensesAsStr(value: string) {
    if (this._numberOfLicensesAsStr !== value)
    {
       let result = parseInt(value);
      // if (isNaN(result)) {
      //   throw Error(`set NumberOfLicensesAsStr: "${value}" value is not an integer!`);   
      // }

      if (isNaN(result)) {
        this.NumberOfLicenses = 0;
        this._numberOfLicensesAsStr = value;
      } else {
        this.NumberOfLicenses = result;
      }
    }
  }  

  //numberOfLicenses As number
  private _numberOfLicenses: number = 1;

  public get NumberOfLicenses(): number {
    return this._numberOfLicenses;
  }  
  
  public set NumberOfLicenses(value: number) {
    if (this._numberOfLicenses !== value)
    {
      this._numberOfLicenses = value;
      this._numberOfLicensesAsStr = value.toString();
      this.UpdateOrderPrice();
    }
  }  

  private UpdateOrderPrice(): void
  {
    this._orderPrice = this.LicencePrice * this.NumberOfLicenses;
    this._orderPriceText = this._orderPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // "1,234.57"
  }

  private _orderPrice: number = 0;

  public get OrderPrice(): number {
    return this._orderPrice;
  }  

  private _orderPriceText: string = "";
  public get OrderPriceText(): string {
    return this._orderPriceText;
  }  


  //Способ оплаты : PaymentMethodID
  private _paymentMethodID: string = '';

  public set PaymentMethodID(value: string) {
    if (this._paymentMethodID !== value)
    {
      this._paymentMethodID = value;
      this.OnPaymentMethodIDChanged();
    }
  }  

  public get PaymentMethodID(): string {
    return this._paymentMethodID;
  }  

  private OnPaymentMethodIDChanged()
  {
    let pm: PaymentMethod | undefined = PaymentMethods.find(element => element.PaymentMethodID === this._paymentMethodID);
    if (pm === undefined) {
      this._paymentMethodName = "";
      //throw new Error('private OnPaymentMethodIDChanged: (pm == undefined) ');
    } 
    else
    {
      this._paymentMethodName = pm.PaymentMethodName;
    }
  }

  private _paymentMethodName: string = "";

  public get PaymentMethodName(): string {
    return this._paymentMethodName;
  }  

    //Данные покупателя
  //buyerEntityID
  private _buyerEntityID: string = '';

  public set BuyerEntityID(value: string) {
    if (this._buyerEntityID !== value)
    {
      this._buyerEntityID = value;
      this.OnBuyerEntityIDChanged();
    }
  }  

  public get BuyerEntityID(): string {
    return this._buyerEntityID;
  }  

  private OnBuyerEntityIDChanged()
  {
    let be: BusinessEntity | undefined = BusinessEntities.find(e => e.EntityID === this._buyerEntityID);
    if (be === undefined) {
      this._buyerEntityName = "";
      //throw new Error('private OnPaymentMethodIDChanged: (pm == undefined) ');
    } 
    else
    {
      this._buyerEntityName = be.EntityName;
    }

    this.PaymentMethodID = "";
  }

  private _buyerEntityName: string = "";

  public get BuyerEntityName(): string {
    return this._buyerEntityName;
  }  

  public BuyerFirstName: string = "";
  public BuyerLastName: string = "";
  public BuyerEmail: string = "";
  public BuyerPhone: string = "";
  public BuyerINN: string = "";
  public BuyerActualCountry: string = "";
  public BuyerActualCity: string = "";
  public BuyerActualAddress: string = "";

  public BuyerCompName: string = "";
  public BuyerCompKPP: string = "";

  public BuyerLegalAddress: string = "";

  //Данные пользователя лицензии

  // Оформить лицензию на другое лицо или компанию
  public BuyerForOtherEntity: boolean = false;
  
    //Данные покупателя
    private _softUserEntityID: string = '';

    public set SoftUserEntityID(value: string) {
      if (this._softUserEntityID !== value)
      {
        this._softUserEntityID = value;
        this.OnSoftUserEntityIDChanged();
      }
    }  
  
    public get SoftUserEntityID(): string {
      return this._softUserEntityID;
    }  
  
    private OnSoftUserEntityIDChanged()
    {
      let be: BusinessEntity | undefined = BusinessEntities.find(e => e.EntityID === this._softUserEntityID);
      if (be === undefined) {
        this.SoftUserEntityName = "";
        //throw new Error('private OnPaymentMethodIDChanged: (pm == undefined) ');
      } 
      else
      {
        this.SoftUserEntityName = be.EntityName;
      }
    }
  
    public SoftUserEntityName: string = "";  //'IND' 'LEG'

    public SoftUserFirstName: string = "";
    public SoftUserLastName: string = "";
    public SoftUserEmail: string = "";
    public SoftUserPhone: string = "";
    public SoftUserINN: string = "";
    public SoftUserActualCountry: string = "";
    public SoftUserActualCity: string = "";
    public SoftUserActualAddress: string = "";

    public SoftUserCompName: string = "";
    public SoftUserCompKPP: string = "";
    public SoftUserLegalAddress: string = "";

    //Дополнительные данные
    public PreviousLicenseNumber: string = "";	//- Previous license number.Specified when renewing a license.
    public OrderComment: string = "";
    public PaymentCardNumber: string = "";   //Последние 4 цифры номера карты, с которого будет произведена покупка.Для физ.Лиц.

    public OrderCreatedDateTimeSys: Date = new Date(0);
    public OrderCreatedDateTimeValue: string = "";

  // Others
  public Clear()
  {
    // this.firstName = '';
    // this.lastName = '';
    // this.email = '';
  
    // this.numberOfLicenses = 1;
    // this.paymentMethodName = '';
    // this.buyerEntityName = '';
  
    // this.OrderPrice = 0;
    // this.OrderPriceText = '';

    this.BuyerEntityID = '';
    this.PaymentMethodID = '';
    this.SoftLicenTypeID = '';

  }

  toJSON() {
    return {
      SoftLicenTypeID: this.SoftLicenTypeID, 
      SoftLicenceTypeName: this.SoftLicenceTypeName, 
      SoftLicenceTypeDescription: this.SoftLicenceTypeDescription,
      SoftLicencePriceComment: this.SoftLicencePriceComment,
      LicencePrice: this.LicencePrice,
      PrevLicNumberIsNeeded: this.PrevLicNumberIsNeeded,
      NumberOfLicenses: this.NumberOfLicenses,
      OrderPrice: this.OrderPrice,
      PaymentMethodID: this.PaymentMethodID,
      PaymentMethodName: this.PaymentMethodName,
      BuyerEntityID: this.BuyerEntityID,
      BuyerEntityName: this.BuyerEntityName,

      BuyerFirstName: this.BuyerFirstName,
      BuyerLastName: this.BuyerLastName,
      BuyerEmail: this.BuyerEmail,
      BuyerPhone: this.BuyerPhone,
      BuyerINN: this.BuyerINN,
      BuyerActualCountry: this.BuyerActualCountry,
      BuyerActualCity: this.BuyerActualCity,
      BuyerActualAddress: this.BuyerActualAddress,
      BuyerCompName: this.BuyerCompName,
      BuyerCompKPP: this.BuyerCompKPP,
      BuyerLegalAddress: this.BuyerLegalAddress,
      BuyerForOtherEntity: this.BuyerForOtherEntity,
      
      SoftUserEntityID: this.SoftUserEntityID,
      SoftUserEntityName: this.SoftUserEntityName,
      SoftUserFirstName: this.SoftUserFirstName,
      SoftUserLastName: this.SoftUserLastName,
      SoftUserEmail: this.SoftUserEmail,
      SoftUserPhone: this.SoftUserPhone,
      SoftUserINN: this.SoftUserINN,
      SoftUserActualCountry: this.SoftUserActualCountry,
      SoftUserActualCity: this.SoftUserActualCity,
      SoftUserActualAddress: this.SoftUserActualAddress,
      SoftUserCompName: this.SoftUserCompName,
      SoftUserCompKPP: this.SoftUserCompKPP,
      SoftUserLegalAddress: this.SoftUserLegalAddress,
      PreviousLicenseNumber: this.PreviousLicenseNumber,
      OrderComment: this.OrderComment,
      PaymentCardNumber: this.PaymentCardNumber,
      OrderCreatedDateTimeSys: this.OrderCreatedDateTimeSys,
      OrderCreatedDateTimeValue: this.OrderCreatedDateTimeValue,
    }
  }

}

export class GlobalStateType{
  public State : EditFormState = EditFormState.Edit;

  public FormData : MyFormValues = new MyFormValues();

  public SendingCompleted : boolean = false;
}

//let GlobalState : GlobalStateType = new GlobalStateType();
//export GlobalState; 