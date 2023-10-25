"use client";

import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";

export function Hydrate({ children }: { children: ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? (
    <>{children}</>
  ) : (
    <nav className="fixed top-0 w-full flex items-center py-2 px-8 justify-between z-50 bg-slate-800 text-gray-300">
      <Link
        href="/"
        className="uppercase font-bold text-md h-12 flex items-center"
      >
        Next Store
      </Link>
      <div className="flex items-center gap-8">
        <button className="border rounded-md border-gray-400 px-3 py-2">
          Fazer login
        </button>
      </div>
    </nav>
  );
}
