import { defineChain } from "viem";

export const chain = /*#__PURE__*/ defineChain({
  id: 74288634,
  name: "prueba 2",
  nativeCurrency: { name: "PRB 2", symbol: "PRB2", decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        "https://node.l1marketplace.com/ext/bc/PQbxcf1jtHYrjhtDEtJhL3U43su6LzcQQLxDPUBf59y8uCVmc/rpc",
      ],
    },
  },

  testnet: true,
});
