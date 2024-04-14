"use client";

import { User } from "next-auth";
import Link from "next/link";

import { Button } from "@/components/Button/Button";

import { BackgroundBeams } from "./BackgroundBeams";

type Props = { user?: User };

export function Hero({ user }: Props) {
  return (
    <div className="relative flex h-full w-screen flex-col items-center justify-center rounded-md antialiased">
      <div className="mx-auto max-w-2xl p-4 text-center">
        <h1 className="relative z-10 bg-gradient-to-b from-neutral-200 to-neutral-600 bg-clip-text text-center font-sans text-lg font-bold text-transparent md:text-7xl">
          EchoWave
        </h1>
        <p className="mb-5 text-neutral-400">The future of connection is here.</p>
        <p className="relative z-10 mx-auto my-2 mb-5 max-w-lg text-center text-sm text-neutral-500">
          Welcome to the beta version of EchoWave, your new hub for seamless social interactions. Simplify your digital
          life with our intuitive design and user-friendly features. Join us on the journey to refine and perfect the
          experience of staying connected.
        </p>
        {user ? (
          <Link href="/chat">
            <Button className="relative z-10 ">Go to chat</Button>
          </Link>
        ) : (
          <Link href="/register">
            <Button className="relative z-10 ">Sign up to try the app&apos;s features</Button>
          </Link>
        )}
      </div>
      <BackgroundBeams />
    </div>
  );
}
