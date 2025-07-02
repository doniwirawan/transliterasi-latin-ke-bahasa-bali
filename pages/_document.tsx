import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                {/* Additional meta tags can be added here */}
                <meta charSet="utf-8" />

                {/* Preload critical fonts */}
                <link
                    rel="preload"
                    href="https://fonts.gstatic.com/s/notosansbalinese/v18/NaPwcH_SC65F4aFg5FlhMrONeFVbJp1qYMOBhVGpOzMO.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />

                {/* Performance optimizations */}
                <link rel="dns-prefetch" href="//fonts.googleapis.com" />
                <link rel="dns-prefetch" href="//fonts.gstatic.com" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}