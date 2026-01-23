import Collapse from '@/components/Collapse'
import Link from 'next/link'
import { useState } from 'react'

/**
 * 折叠菜单
 * @param {*} param0
 * @returns
 */
export const MenuItemCollapse = props => {
  const { link } = props
  const [show, changeShow] = useState(false)
  const hasSubMenu = link?.subMenus?.length > 0
  const url = link?.to || link?.href || link?.slug

  const [isOpen, changeIsOpen] = useState(false)

  const toggleShow = () => {
    changeShow(!show)
  }

  const toggleOpenSubMenu = () => {
    changeIsOpen(!isOpen)
  }

  if (!link || !link.show) {
    return null
  }

  return (
    <>
      <div
        className='w-full px-8 py-3 dark:hover:bg-indigo-500  hover:bg-indigo-500 hover:text-white text-left dark:bg-hexo-black-gray flex justify-between items-center'
        onClick={toggleShow}>
        <Link
          href={url || '#'}
          target={link?.target}
          className='font-extralight flex-grow pl-2 pr-4 dark:text-gray-200 no-underline tracking-widest pb-1'>
          <span className='transition-all items-center duration-200'>
            {link?.icon && <i className={link.icon + ' mr-4'} />}
            {link?.name}
          </span>
        </Link>
        {hasSubMenu && (
          <div
            onClick={(e) => {
              e.stopPropagation()
              toggleOpenSubMenu()
            }}
            className='p-2 cursor-pointer'>
            <i
              className={`fas fa-chevron-left transition-all duration-200 ${isOpen ? '-rotate-90' : ''} text-gray-400`}></i>
          </div>
        )}
      </div>

      {/* 折叠子菜单 */}
      {hasSubMenu && (
        <Collapse isOpen={isOpen} onHeightChange={props.onHeightChange}>
          {link.subMenus.map((sLink, index) => (
            <div
              key={index}
              className='dark:hover:bg-indigo-500 hover:bg-indigo-500 hover:text-white dark:bg-black dark:text-gray-200 text-left px-10 justify-start bg-gray-50 tracking-widest transition-all duration-200 py-3 pr-6'>
              <Link href={sLink.href} target={link?.target}>
                <span className='text-sm ml-4 whitespace-nowrap'>
                  {sLink?.icon && <i className={sLink.icon + ' mr-2'} />}
                  {sLink.title}
                </span>
              </Link>
            </div>
          ))}
        </Collapse>
      )}
    </>
  )
}
