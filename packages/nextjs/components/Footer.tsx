import React from "react";
import Link from "next/link";
import { hardhat } from "viem/chains";
import { CurrencyDollarIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Faucet } from "~~/components/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { useGlobalState } from "~~/services/store/store";

/**
 * Site footer
 */
export const Footer = () => {
  const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrency.price);
  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === hardhat.id;

  return (
    <footer className="min-h-0 px-4 py-6">
      <div className="fixed bottom-0 left-0 z-10 hidden w-full items-center justify-between p-4 pointer-events-none lg:flex">
        <div className="flex gap-2 pointer-events-auto">
          {nativeCurrencyPrice > 0 && (
            <div className="btn btn-primary btn-sm font-normal gap-1 cursor-auto">
              <CurrencyDollarIcon className="h-4 w-4" />
              <span>{nativeCurrencyPrice.toFixed(2)}</span>
            </div>
          )}
          {isLocalNetwork && (
            <>
              <Faucet />
              <Link href="/blockexplorer" className="btn btn-primary btn-sm font-normal gap-1">
                <MagnifyingGlassIcon className="h-4 w-4" />
                <span>Block Explorer</span>
              </Link>
            </>
          )}
        </div>
      </div>

      <nav className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-sm text-base-content/80">
        <span className="font-medium text-base-content">Block Relay</span>
        <span aria-hidden="true">·</span>
        <a href="https://github.com/SYSUww/block-relay" target="_blank" rel="noreferrer" className="link">
          GitHub
        </a>
        <span aria-hidden="true">·</span>
        <a href="https://docs.monad.xyz" target="_blank" rel="noreferrer" className="link">
          Monad Docs
        </a>
        <span aria-hidden="true">·</span>
        <span>Monad Blitz Shanghai</span>
      </nav>
    </footer>
  );
};
