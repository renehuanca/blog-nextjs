import { MDXRemote } from 'next-mdx-remote'
import Image from 'next/image'

import { getFileBySlug, getFiles } from '@/utils/mdx'
import MDXComponents from '@/components/MDXComponents'
import Layout from '@/components/Layout'

interface PostProps {
  source: any
  frontmatter: {
    name: string
    title: string
    description: string
    date: string
  }
}

export default function Post ({ source, frontmatter }: PostProps): JSX.Element {
  return (
    <Layout title={frontmatter.title} description={frontmatter.description}>
      <div className="container mx-auto px-6 md:px-8 text-base lg:text-lg dark:text-gray-300">
        <div className='h-64 md:h-96 relative mt-4'>
          <Image
            className="h-full w-full inset-0 color-transparent absolute object-cover object-center rounded-lg"
            src={`/images/blog/${frontmatter.name}/_main.jpg`}
            alt={frontmatter.title}
            width={700}
            height={500}
          />
        </div>
        <div className="md:container md:mx-auto md:max-w-screen-md px-3 mt-4 markdown">
          <div className="uppercase text-primary-500 text-sm font-bold tracking-widest leading-loose">Technology and Programming</div>
          <div className="border-b-2 border-primary-500 w-8"></div>
          <div className="mt-4 uppercase text-gray-600 italic font-semibold text-sm">
            {frontmatter.date}
          </div>
          <h1 className="mt-8 text-4xl sm:text-5xl font-semibold">{frontmatter.title}</h1>
          <MDXRemote {...source} components={MDXComponents} />
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps ({ params }: any) {
  const { source, frontmatter } = await getFileBySlug(params.slug)

  return {
    props: {
      source,
      frontmatter
    }
  }
}

export async function getStaticPaths () {
  const posts = getFiles()
  const paths = posts.map((post) => ({
    params: {
      slug: post.replace(/\.mdx/, '')
    }
  }))

  return {
    paths,
    fallback: false
  }
}
