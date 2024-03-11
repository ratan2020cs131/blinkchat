import Room from '@/components/Room'
import React from 'react'
import styles from '@/app/page.module.css'

export const metadata = {
    title: "Blinkchat",
    description: "Join this room to chat",
};

const page = ({ params }) => {
    return (
        <main className={styles.main}>
            <Room />
        </main>
    )
}

export default page
