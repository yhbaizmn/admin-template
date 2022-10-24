export interface TBaseFormItem {
  name: string
  key: string
  type: string
}

export interface TSelecct {
  label: string
  value: string
}

export interface TSelecctItem extends TBaseFormItem {
  tree: TSelecct[]
}

export interface TCheckBox {
  label: string
  disabled?: boolean
}

export interface TCheckBoxItem extends TBaseFormItem {
  tree: TCheckBox[]
}

export interface TRadio {
  label: string
  disabled?: boolean
}

export interface TRadioItem extends TBaseFormItem {
  tree: TRadio[]
}

export interface TDateItem extends TBaseFormItem {
  dateType: string
}

export interface TableConfig {
  prop: string
  label: string
  width?: string
}
