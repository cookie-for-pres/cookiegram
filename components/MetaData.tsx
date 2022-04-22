import Head from 'next/head';

const MetaData = ({ title }: any) => {
  return (
    <>
      <Head>
        <title>
          {title === null ? 'CookieGram' : `CookieGram • ${title}`}
        </title>
        <link rel='icon' href='/favicon.ico' />
        <meta name='theme-color' content='#805AD5' />
        <meta name='description' content='CookieGram is a social media... i think?' />
        <link rel='apple-touch-icon' href='/images/apple-touch-icon.png' />
        <link rel='manifest' href='/site.webmanifest' />
      </Head>
    </>
  )
}

export default MetaData;