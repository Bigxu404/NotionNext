import Link from 'next/link'

/**
 * 博客归档列表
 * @param posts 所有文章
 * @param archiveTitle 归档标题
 * @returns {JSX.Element}
 * @constructor
 */
const BlogPostArchive = ({ posts = [], archiveTitle }) => {
  if (!posts || posts.length === 0) {
    return <></>
  } else {
    return (
      <div>
        <div
          className='pt-16 pb-4 text-3xl dark:text-gray-300'
          id={archiveTitle}>
          {archiveTitle}
        </div>
        <ul>
          {posts?.map(post => {
            return (
              <li
                key={post.id}
                className='border-l-2 p-1 text-xs md:text-base items-center  hover:scale-x-105 hover:border-indigo-500 dark:hover:border-indigo-300 dark:border-indigo-400 transform duration-500'>
                <div id={post?.publishDay} className='flex items-center'>
                  <span className='text-gray-400 shrink-0'>{post.date?.start_date}</span>
                  &nbsp;
                  <Link
                    href={post?.href}
                    passHref
                    className='dark:text-gray-400 dark:hover:text-indigo-300 overflow-x-hidden hover:underline cursor-pointer text-gray-600 flex-grow'>
                    {post.title}
                  </Link>
                  {post.category && (
                    <Link href={`/category/${post.category}`} passHref>
                      <span className='ml-2 px-2 py-0.5 text-xs bg-indigo-50 text-indigo-500 dark:bg-gray-800 dark:text-indigo-300 rounded hover:bg-indigo-500 hover:text-white transition-all cursor-pointer shrink-0'>
                        {post.category}
                      </span>
                    </Link>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default BlogPostArchive
