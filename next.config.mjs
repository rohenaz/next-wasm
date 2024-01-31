/** @type {import('next').NextConfig} */
import CopyPlugin from "copy-webpack-plugin";
const nextConfig = {
  webpack: function (config, { isServer }) {
    if (isServer) {
      config.plugins.push(
        new CopyPlugin({
          patterns: [
            {
              from: "node_modules/bsv-wasm/bsv_wasm_bg.wasm",
              to: "./vendor-chunks/bsv_wasm_bg.wasm",
            },
            {
              from: "node_modules/bsv-wasm/bsv_wasm_bg.wasm",
              to: "./app/bsv_wasm_bg.wasm",
            },
          ],
        })
      );
    }
    return config;
  },
};

export default nextConfig;
