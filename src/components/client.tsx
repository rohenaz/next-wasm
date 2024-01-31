"use client";

import { useSignal, useSignals } from "@preact/signals-react/runtime";
import init, { Transaction } from "bsv-wasm-web";
import { useEffect } from "react";

interface ClientComponentProps {
  txProp: string;
}

const ClientComponent: React.FC<ClientComponentProps> = ({ txProp }) => {
  useSignals();
  // Trying to access Transaction before it's initialized will throw an error
  // ex const tx = useSignal<Transaction | null>(Transacation.from_hex(txProp));
  const tx = useSignal<Transaction | null>(null);
  const initialized = useSignal<boolean>(false);

  useEffect(() => {
    const fetchTransaction = async () => {
      // initialize bsv-wasm-web
      await init();
      const t = Transaction.from_hex(txProp);
      tx.value = t;
    };

    if (!initialized.value) {
      initialized.value = true;
      fetchTransaction();
    }
  }, [initialized, tx, txProp]);

  return (
    <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
      Parsed via bsv-wasm-web&nbsp;
      <code className="font-mono font-bold">{tx.value?.get_id_hex()}</code>
    </p>
  );
};

export default ClientComponent;
