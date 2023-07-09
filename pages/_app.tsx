import '@/styles/globals.css'
import '@/styles/style.css'
import type { AppProps } from 'next/app'
import { ReactDOM } from 'react';
import FormSkincare from './index';

// export default function ProfileForm() {
//   return (
//     <FormSkincare />
//     )
 
// }

export default function MyApp({Component,pageProps}) {
  return <Component {...pageProps}/>
  }