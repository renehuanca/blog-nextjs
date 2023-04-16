import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import mdxPrism from 'mdx-prism'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

const root = process.cwd()

export const getFiles = () => fs.readdirSync(path.join(root, 'src/data'))

export const getFileBySlug = async (slug: string) => {
  const mdxSource = fs.readFileSync(
    path.join(root, 'src/data', `${slug}.mdx`),
    'utf-8'
  )
  const { data, content } = matter(mdxSource)
  const source = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [mdxPrism, rehypeRaw]
    }
  })

  return {
    source,
    frontmatter: {
      slug,
      ...data
    }
  }
}

export const getAllFilesMetaData = () => {
  const files = getFiles()

  return files.reduce((allPosts: any, postSlug) => {
    const mdxSource = fs.readFileSync(path.join(root, 'src/data', postSlug), 'utf-8')
    const { data } = matter(mdxSource)

    return [{ ...data, slug: postSlug.replace('.mdx', '') }, ...allPosts]
  }, [])
}
