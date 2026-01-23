import Link from 'next/link'
import { useState } from 'react'
/**
 * 支持二级展开的菜单
 * @param {*} param0
 * @returns
 */
export const MenuItemDrop = ({ link }) => {
  const [show, changeShow] = useState(false)
  const hasSubMenu = link?.subMenus?.length > 0

  const url = link?.to || link?.href || link?.slug
  
  if (!link || !link.show) {
    return null
  }

  return (
    <div className='relative' onMouseOver={() => changeShow(true)} onMouseOut={() => changeShow(false)}>
      <Link
        href={url || '#'}
        target={link?.target}
        className='menu-link pl-2 pr-4 no-underline tracking-widest pb-1 flex items-center cursor-pointer'>
        {link?.icon && <i className={link?.icon + ' mr-2'} />}
        {link?.name}
        {hasSubMenu && (
          <i className={`ml-2 fa fa-angle-down duration-300 ${show ? 'rotate-180' : 'rotate-0'}`}></i>
        )}
      </Link>

        {/* 子菜单 */}
        {hasSubMenu && (
          <ul
            style={{ backdropFilter: 'blur(3px)' }}
            className={`${show ? 'visible opacity-100 top-10 pointer-events-auto' : 'invisible opacity-0 top-16 pointer-events-none'} drop-shadow-md overflow-hidden rounded-md text-black dark:text-white bg-white dark:bg-black transition-all duration-300 z-20 absolute block min-w-max`}>
            {link.subMenus.map((sLink, index) => (
              <li
                key={index}
                className='cursor-pointer hover:bg-indigo-500 hover:text-white tracking-widest transition-all duration-200 dark:border-gray-800 py-2 pr-8 pl-4'>
                <Link href={sLink.href} target={link?.target}>
                  <span className='text-sm text-nowrap font-extralight'>
                    {sLink?.icon && <i className={sLink?.icon + ' mr-2'}></i>}
                    {sLink.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
  )
}
