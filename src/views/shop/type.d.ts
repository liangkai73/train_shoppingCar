declare namespace shop {
  interface prodItem {
    availableSizes: Array<any>
    currencyFormat: '$'
    currencyId: 'USD'
    description: string
    id: number
    imgurl: string
    imgurl_re: string
    installments: number
    isFreeShipping: boolean
    price: number
    sku: number
    style: string
    title: string
  }
  interface cartItem extends prodItem {
    quantity: number
    size: string
  }
}
