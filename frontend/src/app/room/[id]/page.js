import Room from '@/components/Room'
import React from 'react'
import styles from '@/app/page.module.css'

const page = ({ params }) => {
    return (
        <main className={styles.main}>
            <Room />
        </main>
    )
}

export default page
