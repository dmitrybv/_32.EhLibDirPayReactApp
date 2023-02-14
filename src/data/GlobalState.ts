import { PaymentMethod, PaymentMethods } from "../data/PaymentMethods";
import { BusinessEntities, BusinessEntity } from "../data/BusinessEntities";
import { LicenceType, SoftLicenTypes, GetSoftLicenceTypeByID } from "../data/SoftLicenTypes";

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

  private _numberOfLicenses: number = 0;

  public get NumberOfLicenses(): number {
    return this._numberOfLicenses;
  }  
  
  public set NumberOfLicenses(value: number) {
    if (this._numberOfLicenses !== value)
    {
      this._numberOfLicenses = value;
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

}

export class GlobalStateType{
  public State : EditFormState = EditFormState.Edit;

  public FormData : MyFormValues = new MyFormValues();

  public SendingCompleted : boolean = false;
}

//let GlobalState : GlobalStateType = new GlobalStateType();
//export GlobalState; 