import React from 'react'
import Image from 'next/image'

export default function Logo() {
    return (
            <Image
                src='./images/panda.svg'
                alt="Panda with laptop"
                width={320}
                height={320}
                unoptimized
            />
    )
}
