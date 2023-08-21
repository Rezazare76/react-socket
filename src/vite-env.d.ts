/// <reference types="vite/client" />
import { defineConfig } from "vite";
import React from "@vitejs/plugin-react";
export default defineConfig({
  base: "/react-socket/",
  Plugin: [React],
});
