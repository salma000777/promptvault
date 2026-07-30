"use client";

import { motion, animate } from "framer-motion";
import { useEffect, useState } from "react";

import type { PromptOptimization } from "@/types/ai";

import {
  getScoreDescription,
  getScoreLabel,
} from "./studio-utils";

type ScorePanelProps = {
  result: PromptOptimization;
};

export default function ScorePanel({
  result,
}: ScorePanelProps) {
  const safeScore = Math.min(
    100,
    Math.max(0, result.score)
  );

  const [displayScore, setDisplayScore] =
    useState(0);

  useEffect(() => {
    const controls = animate(0, safeScore, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate(value) {
        setDisplayScore(Math.round(value));
      },
    });

    return () => controls.stop();
  }, [safeScore]);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 24,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.55,
      }}
      whileHover={{
        y: -2,
      }}
      className="overflow-hidden rounded-[30px]
      border border-white/[0.08]
      bg-gradient-to-br
      from-white/[0.04]
      via-white/[0.025]
      to-transparent
      shadow-2xl
      shadow-violet-950/10
      backdrop-blur-3xl"
    >
      <div className="p-7 md:p-8">

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center">

          <motion.div
            initial={{
              scale: .8,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              delay: .15,
              duration: .5,
            }}
            className="relative
            flex
            h-36
            w-36
            shrink-0
            items-center
            justify-center"
          >

            <motion.div
              animate={{
                scale: [1,1.06,1],
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
              }}
              className="absolute
              inset-0
              rounded-full
              bg-violet-500/10
              blur-3xl"
            />

            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                background: `conic-gradient(rgb(139 92 246) ${safeScore * 3.6}deg, rgba(255,255,255,.06) 0deg)`,
              }}
              transition={{
                duration: 1.3,
                ease: "easeOut",
              }}
            />

            <div
              className="
              absolute
              inset-[7px]
              rounded-full
              bg-background"
            />

            <div className="relative text-center">

              <motion.span
                layout
                className="block text-5xl font-bold tracking-tight"
              >
                {displayScore}
              </motion.span>

              <span
                className="
                mt-1
                block
                text-[11px]
                uppercase
                tracking-[0.18em]
                text-muted-foreground"
              >
                out of 100
              </span>

            </div>

          </motion.div>

          <div className="flex-1 min-w-0">

            <motion.div
              initial={{
                opacity:0,
                y:12,
              }}
              animate={{
                opacity:1,
                y:0,
              }}
              transition={{
                delay:.25,
              }}
              className="flex flex-wrap items-center gap-3"
            >

              <span
                className="
                rounded-full
                border
                border-violet-400/20
                bg-violet-500/10
                px-3
                py-1
                text-xs
                font-semibold
                text-violet-300"
              >
                {getScoreLabel(safeScore)}
              </span>

              <span
                className="
                text-xs
                text-muted-foreground"
              >
                Prompt quality score
              </span>

            </motion.div>

            <motion.h2
              initial={{
                opacity:0,
                y:12,
              }}
              animate={{
                opacity:1,
                y:0,
              }}
              transition={{
                delay:.35,
              }}
              className="
              mt-5
              text-3xl
              font-semibold
              tracking-tight"
            >
              {getScoreDescription(safeScore)}
            </motion.h2>

            <motion.p
              initial={{
                opacity:0,
                y:12,
              }}
              animate={{
                opacity:1,
                y:0,
              }}
              transition={{
                delay:.45,
              }}
              className="
              mt-4
              max-w-2xl
              text-sm
              leading-7
              text-muted-foreground"
            >
              {result.summary}
            </motion.p>
                        <div className="mt-8">

              <div
                className="
                mb-3
                flex
                items-center
                justify-between"
              >

                <span
                  className="
                  text-xs
                  font-medium
                  text-muted-foreground"
                >
                  Overall prompt quality
                </span>

                <motion.span
                  layout
                  className="
                  text-sm
                  font-semibold
                  text-foreground"
                >
                  {displayScore}%
                </motion.span>

              </div>

              <div
                className="
                h-2.5
                overflow-hidden
                rounded-full
                bg-white/[0.06]"
              >

                <motion.div
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: `${safeScore}%`,
                  }}
                  transition={{
                    duration: 1.2,
                    ease: "easeOut",
                  }}
                  className="
                  h-full
                  rounded-full
                  bg-gradient-to-r
                  from-violet-600
                  via-fuchsia-500
                  to-cyan-400"
                />

              </div>

            </div>

            <motion.div
              initial={{
                opacity:0,
                y:15,
              }}
              animate={{
                opacity:1,
                y:0,
              }}
              transition={{
                delay:.55,
              }}
              className="
              mt-8
              grid
              grid-cols-3
              gap-4"
            >

              <div
                className="
                rounded-2xl
                border
                border-white/[0.08]
                bg-white/[0.03]
                p-4"
              >
                <p
                  className="
                  text-[11px]
                  uppercase
                  tracking-[0.18em]
                  text-muted-foreground"
                >
                  Clarity
                </p>

                <p
                  className="
                  mt-2
                  text-xl
                  font-semibold"
                >
                  {Math.min(
                    100,
                    Math.round(safeScore * 0.98)
                  )}
                </p>
              </div>

              <div
                className="
                rounded-2xl
                border
                border-white/[0.08]
                bg-white/[0.03]
                p-4"
              >
                <p
                  className="
                  text-[11px]
                  uppercase
                  tracking-[0.18em]
                  text-muted-foreground"
                >
                  Structure
                </p>

                <p
                  className="
                  mt-2
                  text-xl
                  font-semibold"
                >
                  {Math.min(
                    100,
                    Math.round(safeScore * 1.01)
                  )}
                </p>
              </div>

              <div
                className="
                rounded-2xl
                border
                border-white/[0.08]
                bg-white/[0.03]
                p-4"
              >
                <p
                  className="
                  text-[11px]
                  uppercase
                  tracking-[0.18em]
                  text-muted-foreground"
                >
                  Precision
                </p>

                <p
                  className="
                  mt-2
                  text-xl
                  font-semibold"
                >
                  {Math.min(
                    100,
                    Math.round(safeScore * 1.03)
                  )}
                </p>
              </div>

            </motion.div>

          </div>

        </div>

      </div>

    </motion.div>
  );
}