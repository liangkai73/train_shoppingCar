import { useRef, useEffect, useState } from 'react'
import style from '../index.module.scss'
interface sizeItem {
  size: string
  isActive: boolean
}
export default function Card(props: any) {
  const { proInfo, setBottomOpen, setActiveItem, filterSizes } = props

  const [sizeList, setSizeList]: any[] = useState([])

  const itemBg: any = useRef(null)
  // const [messageApi, contextHolder] = message.useMessage()

  // function checkSize(): boolean {
  //   if (sizeList.filter((i: sizeItem) => i.isActive).length == 0) {
  //     message.warning('Please select the specifications first!')
  //     return false
  //   }
  //   return true
  // }

  // 添加到size选择暂存
  function addToCar(item: shop.prodItem) {
    setActiveItem(item)
    setBottomOpen(true)
  }
  //  get size
  useEffect(() => {
    const newSizeArr = proInfo.availableSizes.map((n: string) => {
      return {
        size: n,
        isActive: false
      }
    })
    newSizeArr.forEach((item: sizeItem) => {
      filterSizes.forEach((node: sizeItem) => {
        if (item.size == node.size && node.isActive) {
          item.isActive = true
        }
      })
    })

    setSizeList(newSizeArr)
  }, [proInfo, filterSizes])

  // getDom
  useEffect(() => {
    if (itemBg.current != null) {
      itemBg.current.addEventListener('mouseenter', (e: any) => {
        e.target.style.backgroundImage = `url(${proInfo.imgurl_re})`
      })
      itemBg.current.addEventListener('mouseleave', (e: any) => {
        e.target.style.backgroundImage = `url(${proInfo.imgurl})`
      })
    }
  }, [])

  return (
    <div className='w-[50%] md:w-[33%] lg:w-[25%] px-[10px]  mb-[30px] text-center '>
      <div className='relative shadow'>
        <p className='bg-[#000] text-white absolute right-0 top-0 py-1 px-[4px]'>Free shipping</p>
        <div
          ref={itemBg}
          className={`${style['pro-item']}  w-full h-[270px] overflow-hidden flex flex-col`}
          style={{ backgroundImage: `url(${proInfo.imgurl})` }}
        >
          <span className='flex-1'></span>
          <ul className='w-full flex flex-row flex-wrap px-[5px] py-[5px]'>
            {sizeList.map((item: sizeItem) => {
              return (
                <li
                  key={item.size}
                  className={`${item.isActive == true ? 'bg-[#000] text-white' : 'bg-[rgba(255,255,255,0.7)]'} w-[35px] mt-3 h-[35px]  flex flex-row justify-center items-center  rounded-full mr-2`}
                >
                  <span>{item.size}</span>
                </li>
              )
            })}
          </ul>
        </div>
        <p className={`${style['item-title']} mt-[16px] px-[20px] h-[45px]`}> {proInfo.title}</p>
        <p>
          <span>{proInfo.currencyFormat}</span>
          <span className='text-[20px] font-[600]'>{proInfo.price.toString().split('.')[0]}</span>
          <span>{proInfo.price.toFixed(2).split('.')[1] ? '.' + proInfo.price.toFixed(2).split('.')[1] : ''}</span>
        </p>
        <p>
          <span className='text-[#9c9b9b]'>
            or {proInfo.installments} x {proInfo.currencyFormat}
            {Math.ceil((proInfo.price / proInfo.installments) * 100) / 100}
          </span>
        </p>
        <div
          className='w-full h-[48px] mt-5 transition-all duration-200 leading-[48px] hover:bg-[#eabf00] cursor-pointer  text-center bg-[#000] text-white'
          onClick={() => {
            addToCar(proInfo)
          }}
        >
          <span>Add to Cart</span>
        </div>
      </div>
    </div>
  )
}
