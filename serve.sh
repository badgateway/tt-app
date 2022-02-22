#!/bin/bash
npx esbuild --servedir=public --bundle --outfile=public/script.js --serve=8902 src/app.tsx
