'use client'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { useState } from "react"



let images = [
  "/images/1.png",
  "/images/2.png",
  "/images/3.png",
  "/images/4.png",

]

let collapsedAspectRatio = 1 / 3
let fullAspectRatio = 3 / 2
let margin = 12
let gap = 2



export default function Page() {
  let [index, setIndex] = useState(0)

  // useKeypress('ArrowRight', () => {
  //   if(index < images.length - 1){
  //     setIndex(index + 1)
  //   }
  // })

  // useKeypress('ArrowLeft', () => {
  //   if(index > 0){
  //     setIndex(index - 1)
  //   }
  // })

  return (
    <MotionConfig transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
      <div className="h-full bg-black">
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-center">
          <div className="relative overflow-hidden">
            <motion.div animate={{ x: `-${index * 100}%` }} className='flex'>
              {images.map((image, i) =>
                <motion.img key={image} src={image} alt="Foto nova" className="aspect-[3/2] object-cover" animate={{ opacity: i === index ? 1 : 0.3 }} />
              )}
            </motion.div>
            <AnimatePresence initial={false}>
              {
                index > 0 && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    exit={{ opacity: 0, pointerEvents: "none" }}
                    whileHover={{ opacity: 1 }}

                    className="absolute left-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/40 "
                    onClick={() => setIndex(index - 1)}
                  >
                    <ChevronLeftIcon className="h-6 w-6" />
                  </motion.button>
                )}
            </AnimatePresence>
            <AnimatePresence initial={false}>
              {
                index + 1 < images.length && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    exit={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}

                    className="absolute right-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/40"
                    onClick={() => setIndex(index + 1)}
                  >
                    <ChevronRightIcon className="h-6 w-6 " />
                  </motion.button>
                )
              }
            </AnimatePresence>
          </div>

          <div className='absolute inset-x-0 bottom-6 flex h-14  justify-center overflow-hidden'>
            <motion.div
              animate={{ x: `-${index * 100 * (collapsedAspectRatio / fullAspectRatio) + margin + index * gap}%` }}
              initial={false}
              style={{
                aspectRatio: fullAspectRatio,
                gap: `${gap}%`
              }}
              className='flex'
            >
              {images.map((image, i) => (
                <motion.button
                  onClick={() => setIndex(i)}
                  initial={false}
                  whileHover={{ opacity: 1 }}
                  animate={i === index ? 'active' : 'inactive'}
                  variants={{
                    active: {
                      aspectRatio: fullAspectRatio,
                      marginLeft: `${margin}%`,
                      marginRight: `${margin}%`,
                      opacity: 1
                    },
                    inactive: {
                      aspectRatio: collapsedAspectRatio,
                      marginLeft: 0,
                      marginRight: 0,
                      opacity: 0.5
                    }
                  }}
                  className="shrink-0"
                  key={image}>
                  <img src={image} alt="Foto nova" className="object-cover h-full" />
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </MotionConfig>
  )
}
