export type BusinessEntity =
{
  EntityID: string;
  EntityName: string;
}

export const BusinessEntities: Array<BusinessEntity> =
[
  { EntityID: "IND", 
    EntityName: "Физическое лицо"
  },

  { EntityID: "LEG", 
    EntityName: "Юридическое лицо или ИП"
  },
];
