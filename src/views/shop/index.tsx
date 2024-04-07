import { useEffect, useState, useReducer } from 'react'
import Card from './components/card'
import Header from './components/head'
import Cartlist from './components/cartList'
import { Drawer, ConfigProvider, Spin, Modal, Button } from 'antd'
import cartReducer from './cartReducer'
import style from './index.module.scss'
import { products } from './mock'
import store from '@/utils/store/localStore'

const { confirm } = Modal

interface SizeItem {
  size: string
  isActive: boolean
}
interface priceSortItem {
  code: string
  isActive: boolean
}
interface sizeItem {
  size: string
  isActive: boolean
}

const initSizeList: Array<SizeItem> = [
  { size: 'XS', isActive: false },
  { size: 'S', isActive: false },
  { size: 'M', isActive: false },
  { size: 'ML', isActive: false },
  { size: 'L', isActive: false },
  { size: 'XL', isActive: false },
  { size: 'XXL', isActive: false }
]
const initPriceSort: Array<priceSortItem> = [
  { code: 'order', isActive: false },
  { code: 'reverse', isActive: false }
]

const initCartItems = store.getCartInfo()

export default function ShoppingCar() {
  const [sizes, setSize] = useState(initSizeList)
  const [priceSort, setPriceSort] = useState(initPriceSort)
  const [proList, setProlist]: any[] = useState([])
  const [open, setOpen] = useState(false)
  const [bottomOpen, setBottomOpen] = useState(false)
  const [loadsatus, setLoadsatus]: any = useState(false)

  const [cartItems, dispatch] = useReducer(cartReducer, initCartItems)
  const [activItem, setActiveItem]: any = useState(null)
  const [sizeList, setSizeList]: any[] = useState([])
  const [totalNum, setTotalNum] = useState(0)
  const [tatolPrice, setTatolPrice]: any = useState(0)

  const classNames = {
    body: style['car-drawer-boby'],
    header: style['car-drawer-header'],
    content: style['car-drawer-content']
  }

  // 确认购买
  const showConfirm = () => {
    confirm({
      title: 'Do you Want to settlement?',
      content: `Please confirm that you want to purchase ${totalNum} items with a total price of $${tatolPrice}`,
      onOk() {
        console.log('OK')
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }

  // drawer 开关
  const isShowDrawer = (bo: boolean) => {
    setOpen(bo)
  }
  // 型号changeFn
  function changeSize(size: string) {
    const sizeList = sizes.map(i => {
      if (i.size == size) {
        return {
          ...i,
          isActive: !i.isActive
        }
      } else {
        return {
          ...i
        }
      }
    })
    setSize(sizeList)
  }
  // 价格排序Fn
  function changePriceSort(code: string) {
    const newPriceSort = priceSort.map(i => {
      if (i.code == code) {
        return {
          ...i,
          isActive: !i.isActive
        }
      } else {
        return {
          ...i,
          isActive: false
        }
      }
    })
    setPriceSort(newPriceSort)
  }

  useEffect(() => {
    getProdList().then((res: any) => {
      const newProlist = res.filter((item: shop.prodItem) => {
        const activeArr = sizes.filter(size => {
          return size.isActive
        })
        let isFilter = false
        activeArr.length == 0 && (isFilter = true)
        activeArr.forEach((node: any) => {
          if (item.availableSizes.includes(node.size)) {
            isFilter = true
          }
        })
        return isFilter
      })
      const Sort = priceSort.filter(i => i.isActive)
      if (Sort[0]) {
        Sort[0].code == 'order' && newProlist.sort((a: shop.prodItem, b: shop.prodItem) => a.price - b.price)
        Sort[0].code == 'reverse' && newProlist.sort((a: shop.prodItem, b: shop.prodItem) => b.price - a.price)
      }
      setProlist(newProlist)
    })
  }, [sizes, priceSort])
  // 总数&总价
  useEffect(() => {
    let num = 0
    let total: any = 0
    cartItems.forEach(i => {
      num += i.quantity
      total += i.quantity * i.price * 100
    })
    setTotalNum(num)
    total = (total / 100).toFixed(2)
    setTatolPrice(total)
  }, [cartItems])
  // active商品
  useEffect(() => {
    if (activItem) {
      const newSizeArr = activItem.availableSizes.map((n: string) => {
        return {
          size: n,
          isActive: false
        }
      })
      setSizeList(newSizeArr)
    }
  }, [activItem])
  // 选择尺寸到购物车
  function handleSureCart() {
    const activeSize = sizeList.filter((n: sizeItem) => n.isActive)
    const data = { ...activItem, ...{ size: activeSize[0].size, quantity: 1 } }
    addToCar(data)
    setBottomOpen(false)
  }
  // choseSize
  function choseSize(size: string) {
    const newSizeList = sizeList.map((i: sizeItem) => {
      if (i.size == size) {
        return {
          ...i,
          isActive: !i.isActive
        }
      } else {
        return {
          ...i,
          isActive: false
        }
      }
    })
    setSizeList(newSizeList)
  }
  // 获取商品列表
  async function getProdList() {
    setLoadsatus(true)
    const isSuccess = true

    return new Promise((resolve, reject) => {
      if (isSuccess) {
        setTimeout(() => {
          setLoadsatus(false)
          return resolve(products)
        }, 1000)
      } else {
        setTimeout(() => {
          setLoadsatus(false)
          return reject(products)
        }, 1000)
      }
    })
  }
  //
  function prodListDom() {
    if (!loadsatus) {
      return proList.map((item: shop.prodItem) => {
        return (
          <Card
            handleAddToCart={addToCar}
            setActiveItem={setActiveItem}
            setBottomOpen={setBottomOpen}
            filterSizes={sizes}
            proInfo={item}
            key={item.id}
          ></Card>
        )
      })
    }
    return (
      <div className='w-full h-[400px] flex flex-row justify-center items-center'>
        <Spin size='large' />
      </div>
    )
  }

  // 添加购物车
  function addToCar(data: shop.cartItem) {
    dispatch({
      type: 'add',
      data
    })
  }
  // 减少购物车商品
  function removeToCar(data: shop.cartItem) {
    dispatch({
      type: 'remove',
      data
    })
  }
  // 删除购物车某商品
  function deleteToCar(data: shop.cartItem) {
    confirm({
      title: 'delete Product',
      content: `Please confirm that you want to delete this item`,
      onOk() {
        dispatch({
          type: 'delete',
          data
        })
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }

  return (
    <>
      <Header isShowDrawer={isShowDrawer}>{totalNum}</Header>
      <div className='w-full h-[100vh] m-auto mt-[50px] md:mt-0 md:pt-[70px] overflow-y-auto   md:flex md:flex-row md:justify-center '>
        {/* size */}
        <div className='py-[15px] px-[15px] md:max-w-[240px] md:w-[20%]'>
          <p className='text-[20px] font-[600]'>Sizes:</p>
          <ul className='flex flex-row justify-center  md:flex-wrap md:justify-start'>
            {sizes.map(item => {
              return (
                <li
                  onClick={() => changeSize(item.size)}
                  key={item.size}
                  className={` ${item.isActive == true ? 'bg-[#000] text-white' : 'bg-[#ececec]'} w-[35px] mt-3 h-[35px] hover:border cursor-pointer border-[#000] flex flex-row justify-center items-center  rounded-full mr-2`}
                >
                  <span>{item.size}</span>
                </li>
              )
            })}
          </ul>
          {/* price */}
          <p className='text-[20px] font-[600] pt-5'>priceSort:</p>
          <ul className='flex flex-row justify-center  md:flex-wrap md:justify-start'>
            {priceSort.map(item => {
              return (
                <li
                  onClick={() => changePriceSort(item.code)}
                  key={item.code}
                  className={` ${item.isActive == true ? 'bg-[#000] text-white' : 'bg-[#ececec]'} w-[100px] mt-3 h-[35px] hover:border cursor-pointer border-[#000] flex flex-row justify-center items-center  rounded-[10px] mr-2`}
                >
                  <span>{item.code}</span>
                </li>
              )
            })}
          </ul>
        </div>

        {/* prodlist*/}

        <div className={`${style['shop-car']} w-full md:max-w-[960px]`}>
          <p className='px-[10px] my-[15px]'>{proList.length} Product(s) found</p>
          <div className='flex flex-row flex-wrap'>{prodListDom()}</div>
        </div>
      </div>
      <ConfigProvider
        drawer={{
          classNames
        }}
      >
        <Drawer
          title='SHOPPINGCART'
          onClose={() => {
            isShowDrawer(false)
          }}
          open={open}
        >
          <Cartlist
            handleAddToCart={addToCar}
            handleRemoveToCart={removeToCar}
            handleDetelteToCaet={deleteToCar}
            showConfirm={showConfirm}
            cartItems={cartItems}
          >
            {tatolPrice}
          </Cartlist>
        </Drawer>
      </ConfigProvider>
      {/* size选择 */}
      <Drawer title='Chose Size' placement='bottom' closable={false} onClose={() => {}} open={bottomOpen}>
        <div className='w-full h-full flex flex-col'>
          <div className='flex-1 w-full'>
            <ul className='w-full flex flex-row flex-wrap px-[5px] py-[5px]'>
              {sizeList.map((item: sizeItem) => {
                return (
                  <li
                    key={item.size}
                    onClick={() => {
                      choseSize(item.size)
                    }}
                    className={` ${item.isActive == true ? 'bg-[#000] text-white' : 'bg-[#ececec]'} w-[35px] mt-3 h-[35px] hover:border cursor-pointer border-[#000] flex flex-row justify-center items-center  rounded-full mr-2 chose-size`}
                  >
                    <span>{item.size}</span>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className='h-[100px] flex flex-row'>
            <span className='flex1'></span>
            <Button
              type='primary'
              size='large'
              className='mr-3'
              onClick={() => {
                setBottomOpen(false)
              }}
            >
              Cancle
            </Button>
            <Button
              data-test-id='btn-suretocart'
              type='primary'
              size='large'
              disabled={sizeList.filter((n: sizeItem) => n.isActive).length == 0}
              onClick={handleSureCart}
            >
              Add To Cart
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  )
}
