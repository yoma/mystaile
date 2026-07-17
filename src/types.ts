export type Occasion = 'werk' | 'weekend' | 'avond'
export type Budget = 'scherp' | 'normaal' | 'ruim'

export type View =
  | 'start'
  | 'photo'
  | 'intent'
  | 'looks'
  | 'detail'

export interface Intent {
  occasion: Occasion | null
  budget: Budget | null
}

export interface ShopItem {
  id: string
  name: string
  brand: string
  price: number
  shop: string
  url: string
  role: 'top' | 'bottom' | 'shoes' | 'layer' | 'accessory'
}

export interface Look {
  id: string
  title: string
  tagline: string
  why: string
  image: string
  occasions: Occasion[]
  budgets: Budget[]
  items: ShopItem[]
}
