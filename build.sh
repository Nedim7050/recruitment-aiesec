#!/bin/bash
echo "🚀 Building AIESEC Carthage Website..."
echo "📁 Copying public files to output directory..."
cp -r public/* .
echo "✅ Build completed successfully!"
echo "📊 Files ready for deployment:"
ls -la
