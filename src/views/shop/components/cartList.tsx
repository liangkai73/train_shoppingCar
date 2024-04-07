import { Button } from 'antd'

export default function CardList(props: any) {
  const { cartItems, handleAddToCart, handleRemoveToCart, handleDetelteToCaet, showConfirm } = props

  return (
    <div className='w-full h-full flex flex-col'>
      <div className='flex-1 w-full px-[15px] py-[15px] overflow-y-auto'>
        {cartItems.map((item: shop.cartItem) => {
          return (
            <div
              key={item.size + item.id}
              className='car-item w-full py-2  flex flex-row justify-center items-center'
              style={{ borderBottom: '1px solid #ddd' }}
            >
              <div className='w-[60px] h-[90px] bg-cover' style={{ backgroundImage: `url(${item.imgurl})` }}></div>
              <div className='flex-1 pl-[5px]'>
                <p className='font-[600] text-[18px]'>{item.title}</p>
                <p className='text-[#ccc]'>
                  <span>{item.size}</span>
                  <span>|</span>
                  <span>{item.style}</span>
                </p>
                <div className='flex flex-row items-center'>
                  <span>Quantity:{item.quantity}</span>
                </div>
              </div>
              <div className='w-[90px] flex flex-col'>
                <span
                  className='cursor-pointer text-[red]'
                  onClick={() => {
                    handleDetelteToCaet(item)
                  }}
                >
                  delete
                </span>
                <span>
                  {item.currencyFormat}
                  {item.price.toFixed(2)}
                </span>

                <div>
                  <Button
                    size='small'
                    style={{ width: '25px' }}
                    onClick={() => {
                      handleRemoveToCart(item)
                    }}
                  >
                    {' '}
                    -{' '}
                  </Button>
                  <Button
                    size='small'
                    data-test-id='btn-addcartnum'
                    style={{ width: '25px' }}
                    onClick={() => {
                      handleAddToCart(item)
                    }}
                  >
                    {' '}
                    +{' '}
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className='h-[200px] w-full py-[20px] px-[20px]  bg-[#ddd] flex flex-col'>
        <div className='flex flex-row  mt-[10px]'>
          <p className='flex1'>SUBTOTAL</p>
          <p>
            <span>${props.children}</span>
          </p>
        </div>
        <span className='flex-1'></span>
        <Button
          block
          data-test-id='btn-settlement'
          size='large'
          disabled={props.children == 0}
          className='mb-[15px]'
          onClick={showConfirm}
          type='primary'
        >
          settlement
        </Button>
      </div>
    </div>
  )
}
