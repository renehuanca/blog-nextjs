import Head from 'next/head'

interface Props {
  children: JSX.Element | string | JSX.Element[]
  title: string
  description: string
}

export default function Layout ({
  children,
  title,
  description
}: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=''>{children}</main>
    </>
  )
}
