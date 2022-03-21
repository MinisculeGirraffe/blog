import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head > 
        <link
          href={`https://unpkg.com/prismjs@0.0.1/themes/prism-tomorrow.css`}
          rel="stylesheet"
        />

        </Head>
        <body className="min-h-screen bg-stone-600 text-gray-100/80">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
