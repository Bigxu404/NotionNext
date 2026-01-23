import Comment from '@/components/Comment'
import replaceSearchResult from '@/components/Mark'
import NotionPage from '@/components/NotionPage'
import ShareBar from '@/components/ShareBar'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { isBrowser } from '@/lib/utils'
import { Transition } from '@headlessui/react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useRef } from 'react'
import ArticleAdjacent from './components/ArticleAdjacent'
import ArticleCopyright from './components/ArticleCopyright'
import { ArticleLock } from './components/ArticleLock'
import ArticleRecommend from './components/ArticleRecommend'
import BlogPostArchive from './components/BlogPostArchive'
import BlogPostCard from './components/BlogPostCard'
import BlogPostListPage from './components/BlogPostListPage'
import BlogPostListScroll from './components/BlogPostListScroll'
import ButtonJumpToComment from './components/ButtonJumpToComment'
import ButtonRandomPostMini from './components/ButtonRandomPostMini'
import Card from './components/Card'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import PostHero from './components/PostHero'
import RightFloatArea from './components/RightFloatArea'
import SearchButton from './components/SearchButton'
import SearchInput from './components/SearchInput'
import SearchNav from './components/SearchNav'
import SideRight from './components/SideRight'
import SlotBar from './components/SlotBar'
import TagItemMini from './components/TagItemMini'
import TocDrawer from './components/TocDrawer'
import TocDrawerButton from './components/TocDrawerButton'
import CONFIG from './config'
import { Style } from './style'

const AlgoliaSearchModal = dynamic(
  () => import('@/components/AlgoliaSearchModal'),
  { ssr: false }
)

// 主题全局状态
const ThemeGlobalHexo = createContext()
export const useHexoGlobal = () => useContext(ThemeGlobalHexo)

/**
 * 基础布局 采用左右两侧布局，移动端使用顶部导航栏
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const LayoutBase = props => {
  const { post, children, slotTop, className } = props
  const { onLoading, fullWidth } = useGlobal()
  const router = useRouter()
  const showRandomButton = siteConfig('HEXO_MENU_RANDOM', false, CONFIG)

  const headerSlot = post ? (
    <PostHero {...props} />
  ) : router.route === '/' &&
    siteConfig('HEXO_HOME_BANNER_ENABLE', null, CONFIG) ? (
    <Hero {...props} />
  ) : null

  const drawerRight = useRef(null)
  const tocRef = isBrowser ? document.getElementById('article-wrapper') : null

  // 悬浮按钮内容
  const floatSlot = (
    <>
      {post?.toc?.length > 1 && (
        <div className='block lg:hidden'>
          <TocDrawerButton
            onClick={() => {
              drawerRight?.current?.handleSwitchVisible()
            }}
          />
        </div>
      )}
      {post && <ButtonJumpToComment />}
      {showRandomButton && <ButtonRandomPostMini {...props} />}
    </>
  )

  // Algolia搜索框
  const searchModal = useRef(null)

  return (
    <ThemeGlobalHexo.Provider value={{ searchModal }}>
      <div
        id='theme-hexo'
        className={`${siteConfig('FONT_STYLE')} dark:bg-black scroll-smooth`}>
        <Style />

        {/* 顶部导航 */}
        <Header {...props} />

        {/* 顶部嵌入 */}
        <div className='header-wrapper'>
          <Transition
            show={!onLoading}
            appear={true}
            enter='transition ease-in-out duration-700 transform order-first'
            enterFrom='opacity-0 -translate-y-16'
            enterTo='opacity-100'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='opacity-100'
            leaveTo='opacity-0 translate-y-16'
            unmount={false}>
            {headerSlot}
          </Transition>
        </div>

        {/* 主区块 */}
        <main
          id='wrapper'
          className={`${siteConfig('HEXO_HOME_BANNER_ENABLE', null, CONFIG) ? '' : 'pt-16'} bg-hexo-background-gray dark:bg-black w-full py-8 md:px-8 lg:px-24 min-h-screen relative`}>
          <div
            id='container-inner'
            className={
              (JSON.parse(siteConfig('LAYOUT_SIDEBAR_REVERSE'))
                ? 'flex-row-reverse'
                : '') +
              ' w-full mx-auto lg:flex lg:space-x-4 justify-center relative z-10'
            }>
            <div
              className={`${className || ''} w-full ${fullWidth ? '' : 'max-w-4xl'} h-full overflow-hidden`}>
              <Transition
                show={!onLoading}
                appear={true}
                enter='transition ease-in-out duration-700 transform order-first'
                enterFrom='opacity-0 translate-y-16'
                enterTo='opacity-100'
                leave='transition ease-in-out duration-300 transform'
                leaveFrom='opacity-100 translate-y-0'
                leaveTo='opacity-0 -translate-y-16'
                unmount={false}>
                {/* 主区上部嵌入 */}
                {slotTop}

                {children}
              </Transition>
            </div>

            {/* 右侧栏 */}
            <SideRight {...props} />
          </div>
        </main>

        <div className='block lg:hidden'>
          <TocDrawer post={post} cRef={drawerRight} targetRef={tocRef} />
        </div>

        {/* 悬浮菜单 */}
        <RightFloatArea floatSlot={floatSlot} />

        {/* 全文搜索 */}
        <AlgoliaSearchModal cRef={searchModal} {...props} />

        {/* 页脚 */}
        <Footer title={siteConfig('TITLE')} />
      </div>
    </ThemeGlobalHexo.Provider>
  )
}

/**
 * 首页
 * 是一个博客列表，嵌入一个Hero大图
 * @param {*} props
 * @returns
 */
const LayoutIndex = props => {
  return <LayoutPostList {...props} className='pt-8' />
}

/**
 * 博客列表
 * @param {*} props
 * @returns
 */
const LayoutPostList = props => {
  return (
    <div className='pt-8'>
      <SlotBar {...props} />
      {siteConfig('POST_LIST_STYLE') === 'page' ? (
        <BlogPostListPage {...props} />
      ) : (
        <BlogPostListScroll {...props} />
      )}
    </div>
  )
}

/**
 * 搜索
 * @param {*} props
 * @returns
 */
const LayoutSearch = props => {
  const { keyword } = props
  const router = useRouter()
  const currentSearch = keyword || router?.query?.s

  useEffect(() => {
    if (currentSearch) {
      replaceSearchResult({
        doms: document.getElementsByClassName('replace'),
        search: keyword,
        target: {
          element: 'span',
          className: 'text-red-500 border-b border-dashed'
        }
      })
    }
  })

  return (
    <div className='pt-8'>
      {!currentSearch ? (
        <SearchNav {...props} />
      ) : (
        <div id='posts-wrapper'>
          {' '}
          {siteConfig('POST_LIST_STYLE') === 'page' ? (
            <BlogPostListPage {...props} />
          ) : (
            <BlogPostListScroll {...props} />
          )}{' '}
        </div>
      )}
    </div>
  )
}

/**
 * 归档
 * @param {*} props
 * @returns
 */
const LayoutArchive = props => {
  const { archivePosts, categoryOptions, tagOptions } = props
  const { locale } = useGlobal()
  const totalPosts = archivePosts ? Object.values(archivePosts).reduce((acc, curr) => acc + (curr?.length || 0), 0) : 0

  return (
    <div className='pt-8'>
      <Card className='w-full'>
        <div className='bg-white md:p-12 p-3 min-h-full dark:bg-hexo-black-gray'>
          {/* 顶部标题与统计区 */}
          <div className='flex flex-col md:flex-row md:items-end justify-between mb-8 border-b pb-6'>
            <div>
              <div className='text-2xl font-bold dark:text-gray-300 mb-2'>
                <i className='mr-3 fas fa-archive text-indigo-500' />
                {locale?.MENU?.ARCHIVE || '归档'}
              </div>
              <div className='text-sm text-gray-500 dark:text-gray-400'>
                📊 共计 <span className='font-bold text-indigo-500'>{totalPosts}</span> 篇内容
              </div>
            </div>
          </div>

          {/* 筛选区：分类与标签区分展示 */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-12'>
            {/* 左侧：分类 */}
            <div>
              <div className='text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider flex items-center'>
                <i className='mr-2 fas fa-folder-open' /> 分类浏览
              </div>
              <div className='flex flex-wrap gap-3'>
                {categoryOptions?.map(category => (
                  <Link key={category.name} href={`/category/${category.name}`} passHref legacyBehavior>
                    <div className='group flex items-center px-3 py-1.5 bg-indigo-50 dark:bg-gray-800 rounded-lg text-sm hover:bg-indigo-500 transition-all cursor-pointer'>
                      <span className='text-indigo-600 dark:text-indigo-300 group-hover:text-white'>{category.name}</span>
                      <span className='ml-2 text-xs text-indigo-300 dark:text-gray-500 group-hover:text-indigo-100'>{category.count}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 右侧：标签 */}
            <div>
              <div className='text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider flex items-center'>
                <i className='mr-2 fas fa-tags' /> 热门标签
              </div>
              <div className='flex flex-wrap gap-2'>
                {tagOptions?.map(tag => (
                  <Link key={tag.name} href={`/tag/${tag.name}`} passHref legacyBehavior>
                    <div className='text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded hover:text-indigo-500 transition-all cursor-pointer'>
                      # {tag.name}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* 归档列表 */}
          <div className='archive-list space-y-10'>
            {archivePosts && Object.keys(archivePosts).length > 0 ? (
              Object.keys(archivePosts).map(archiveTitle => (
                <div key={archiveTitle}>
                  <div className='text-2xl font-bold mb-6 flex items-center dark:text-gray-300'>
                    <div className='w-2 h-8 bg-indigo-500 mr-4 rounded-full'></div>
                    {archiveTitle}
                  </div>
                  <div className='grid grid-cols-1 gap-6'>
                    {archivePosts[archiveTitle]?.map(post => (
                      <BlogPostCard key={post.id} post={post} showSummary={true} />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className='text-center py-20 text-gray-400'>
                正在加载文章内容...
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}

/**
 * 文章详情
 * @param {*} props
 * @returns
 */
const LayoutSlug = props => {
  const { post, lock, validPassword } = props
  const router = useRouter()
  const waiting404 = siteConfig('POST_WAITING_TIME_FOR_404') * 1000
  useEffect(() => {
    // 404
    if (!post) {
      setTimeout(
        () => {
          if (isBrowser) {
            const article = document.querySelector('#article-wrapper #notion-article')
            if (!article) {
              router.push('/404').then(() => {
                console.warn('找不到页面', router.asPath)
              })
            }
          }
        },
        waiting404
      )
    }
  }, [post])
  return (
    <>
      <div className='w-full lg:hover:shadow lg:border rounded-t-xl lg:rounded-xl lg:px-2 lg:py-4 bg-white dark:bg-hexo-black-gray dark:border-black article'>
        {lock && <ArticleLock validPassword={validPassword} />}

        {!lock && post && (
          <div className='overflow-x-auto flex-grow mx-auto md:w-full md:px-5 '>
            <article
              id='article-wrapper'
              itemScope
              itemType='https://schema.org/Movie'
              className='subpixel-antialiased overflow-y-hidden'>
              {/* Notion文章主体 */}
              <section className='px-5 justify-center mx-auto max-w-2xl lg:max-w-full'>
                {post && <NotionPage post={post} />}
              </section>

              {/* 分享 */}
              <ShareBar post={post} />
              {post?.type === 'Post' && (
                <>
                  <ArticleCopyright {...props} />
                  <ArticleRecommend {...props} />
                  <ArticleAdjacent {...props} />
                </>
              )}
            </article>

            <div className='pt-4 border-dashed'></div>

            {/* 评论互动 */}
            <div className='duration-200 overflow-x-auto bg-white dark:bg-hexo-black-gray px-3'>
              <Comment frontMatter={post} />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

/**
 * 404
 * @param {*} props
 * @returns
 */
const Layout404 = props => {
  const router = useRouter()
  const { locale } = useGlobal()
  useEffect(() => {
    // 延时3秒如果加载失败就返回首页
    setTimeout(() => {
      if (isBrowser) {
        const article = document.querySelector('#article-wrapper #notion-article')
        if (!article) {
          router.push('/').then(() => {
            // console.log('找不到页面', router.asPath)
          })
        }
      }
    }, 3000)
  })
  return (
    <>
      <div className='text-black w-full h-screen text-center justify-center content-center items-center flex flex-col'>
        <div className='dark:text-gray-200'>
          <h2 className='inline-block border-r-2 border-gray-600 mr-2 px-3 py-2 align-top'>
            404
          </h2>
          <div className='inline-block text-left h-32 leading-10 items-center'>
            <h2 className='m-0 p-0'>{locale.COMMON.NOT_FOUND}</h2>
          </div>
        </div>
      </div>
    </>
  )
}

/**
 * 分类列表
 * @param {*} props
 * @returns
 */
const LayoutCategoryIndex = props => {
  const { categoryOptions } = props
  const { locale } = useGlobal()
  return (
    <div className='mt-8'>
      <Card className='w-full min-h-screen'>
        <div className='dark:text-gray-200 mb-5 mx-3'>
          <i className='mr-4 fas fa-th' /> {locale.COMMON.CATEGORY}:
        </div>
        <div id='category-list' className='duration-200 flex flex-wrap mx-8'>
          {categoryOptions?.map(category => {
            return (
              <Link
                key={category.name}
                href={`/category/${category.name}`}
                passHref
                legacyBehavior>
                <div
                  className={
                    ' duration-300 dark:hover:text-white px-5 cursor-pointer py-2 hover:text-indigo-400'
                  }>
                  <i className='mr-4 fas fa-folder' /> {category.name}(
                  {category.count})
                </div>
              </Link>
            )
          })}
        </div>
      </Card>
    </div>
  )
}

/**
 * 标签列表
 * @param {*} props
 * @returns
 */
const LayoutTagIndex = props => {
  const { tagOptions } = props
  const { locale } = useGlobal()
  return (
    <div className='mt-8'>
      <Card className='w-full'>
        <div className='dark:text-gray-200 mb-5 ml-4'>
          <i className='mr-4 fas fa-tag' /> {locale.COMMON.TAGS}:
        </div>
        <div id='tags-list' className='duration-200 flex flex-wrap ml-8'>
          {tagOptions.map(tag => (
            <div key={tag.name} className='p-2'>
              <TagItemMini key={tag.name} tag={tag} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}
