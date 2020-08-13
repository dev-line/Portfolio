import dynamic from "next/dynamic";
import 'jodit/build/jodit.min.css';
import 'flatpickr/dist/themes/light.css'
import '@latticejs/froala-editor/styles/css/style.css';
dynamic(import('froala-editor/js/plugins.pkgd.min'),{ssr: false})
dynamic(import('froala-editor/js/languages/ar'),{ssr: false})
dynamic(import('froala-editor/js/plugins/image.min'),{ssr: false})
dynamic(import('froala-editor/js/plugins/image_manager.min'),{ssr: false})
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
