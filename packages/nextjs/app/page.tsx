"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { hardhat } from "viem/chains";
import { useAccount } from "wagmi";
import { BoltIcon, BookOpenIcon, BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === hardhat.id;
  const explorerUrl = isLocalNetwork ? "/blockexplorer" : targetNetwork.blockExplorers?.default.url;

  return (
    <div className="flex flex-col flex-grow">
      <section className="flex flex-col items-center px-5 pb-14 pt-12 text-center sm:pb-20 sm:pt-16">
        <p className="m-0 text-sm font-semibold uppercase tracking-[0.24em] text-secondary">Monad Blitz Shanghai</p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">Block Relay</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-base-content/80 sm:text-xl">
          A focused starter workspace for building and testing an onchain relay on Monad.
        </p>

        <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row">
          <span className="badge badge-secondary badge-lg h-auto px-4 py-2 font-medium">{targetNetwork.name}</span>
          {connectedAddress ? (
            <div className="flex items-center gap-2 rounded-full border border-base-100/60 px-4 py-2">
              <span className="text-sm text-base-content/70">Connected</span>
              <Address address={connectedAddress} size="sm" />
            </div>
          ) : (
            <span className="text-sm text-base-content/70">Connect a wallet to continue</span>
          )}
        </div>
      </section>

      <section className="flex-grow bg-base-300 px-5 py-10 sm:px-8 sm:py-14">
        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex min-h-52 flex-col items-center justify-center rounded-3xl border-2 border-base-100 bg-base-200 px-7 py-9 text-center">
            <BoltIcon className="h-8 w-8" />
            {isLocalNetwork ? (
              <p className="leading-7">Use the faucet icon in the header to fund your local wallet.</p>
            ) : (
              <p className="leading-7">
                Get MON for testing from the{" "}
                <Link href="https://testnet.monad.xyz" className="link" target="_blank" rel="noreferrer">
                  Monad Faucet
                </Link>
                .
              </p>
            )}
          </div>

          <div className="flex min-h-52 flex-col items-center justify-center rounded-3xl border-2 border-base-100 bg-base-200 px-7 py-9 text-center">
            <BugAntIcon className="h-8 w-8" />
            <p className="leading-7">
              Inspect and interact with deployed contracts in{" "}
              <Link href="/debug" className="link">
                Debug Contracts
              </Link>
              .
            </p>
          </div>

          <div className="flex min-h-52 flex-col items-center justify-center rounded-3xl border-2 border-base-100 bg-base-200 px-7 py-9 text-center">
            <MagnifyingGlassIcon className="h-8 w-8" />
            <p className="leading-7">
              Review activity in the{" "}
              {explorerUrl ? (
                <Link
                  href={explorerUrl}
                  className="link"
                  target={isLocalNetwork ? undefined : "_blank"}
                  rel={isLocalNetwork ? undefined : "noreferrer"}
                >
                  {isLocalNetwork ? "local explorer" : "Monad explorer"}
                </Link>
              ) : (
                "network explorer"
              )}
              .
            </p>
          </div>

          <div className="flex min-h-52 flex-col items-center justify-center rounded-3xl border-2 border-base-100 bg-base-200 px-7 py-9 text-center">
            <BookOpenIcon className="h-8 w-8" />
            <p className="leading-7">
              Read the{" "}
              <Link href="https://docs.monad.xyz" className="link" target="_blank" rel="noreferrer">
                Monad developer docs
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
