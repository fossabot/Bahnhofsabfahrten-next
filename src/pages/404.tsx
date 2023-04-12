import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Departures.module.css'
import Header from '../../components/Header/header'
import { useRouter } from 'next/router'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Seite nicht gefunden</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header></Header>
      <main className={inter.className}>
        <h1 className={styles.headline}>Seite nicht gefunden</h1>
        <p className={styles.text}>Die gesuchte Seite existiert nicht oder es ist ein anderer Fehler aufgetreten.</p>
        <div className={styles.button}>
            <Link className={styles.link} href="/">Home</Link>
        </div>
      </main>
    </>
  )
}
