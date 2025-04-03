# vite-plugin-twneat

A Vite plugin that organizes Tailwind responsive prefixes into a neat and readable format.

> [!NOTE]
> Works for Tailwind v4 only.

## Problem

When working with responsive designs in Tailwind CSS, your markup can quickly become cluttered and difficult to read:

```jsx
<div className="flex h-[20px] w-[40px] sm:h-[30px] md:h-[40px] lg:h-[50px] sm:w-[50px] md:w-[60px] lg:w-[70px] xl:hidden max-sm:flex-col max-sm:gap-2">
  Content
</div>
```

Tailwind also does not allow you to create dynamic classes. It reads all your files and extracts all valid classes written in plain text.

Previously the idea of a safelist seemed to be supported explicitly in v3 _(I think)_ but it seems to not be the case anymore in v4 as it moved to a pure CSS config.

## Solution

Chuck a bunch of classes into a text file and Tailwind will pick it up. (`vite-plugin-twneat` automates this for you!)

`vite-plugin-twneat` helps you organize your responsive classes by breakpoint, making your code more readable and maintainable:

```jsx
<div
  className={twneat({
    base: "flex h-[20px] w-[40px]",
    sm: "h-[30px] w-[50px]",
    md: "h-[40px] w-[60px]",
    lg: "h-[50px] w-[70px]",
    xl: "hidden",
    "max-sm": "flex-col gap-2",
  })}
>
  Content
</div>
```

The plugin automatically generates the necessary Tailwind classes and creates safelist files to ensure all classes are available during build time.

## Installation

```bash
npm install vite-plugin-twneat --save-dev
```

## Setup

### 1. Add the plugin to your Vite config

```js
// vite.config.js / vite.config.ts
import { defineConfig } from "vite";
import twneatPlugin from "vite-plugin-twneat";

export default defineConfig({
  plugins: [
    twneatPlugin({
      // Optional custom configuration
      srcDir: "src", // Default is 'src'
      twneatDir: "src/twneat", // Default is 'src/twneat'
    }),
    // Make sure to add the Tailwind plugin AFTER twneat
    // ...other plugins
  ],
});
```

### 2. Import the `twneat` utility in your components

```jsx
import { twneat } from "vite-plugin-twneat";

function MyComponent() {
  return (
    <div
      className={twneat({
        base: "text-blue-500 p-4",
        sm: "text-red-500 p-6",
        md: "text-green-500 p-8",
        lg: "hidden text-[100px]",
        xl: "h-[calc(100%-4px)] w-[calc(100%-4px)]",
      })}
    >
      Hello World
    </div>
  );
}
```

## How It Works

1. The plugin uses a regex to extract all objects with the signature `twneat({})`, then generates safelist files using the extracted objects.
2. The `twneat()` function concatenates the breakpoint with the classes, then runs `clsx` over it and passes it to `className` or whatever you are using.
3. All safelist files are placed in a single directory with the original file's path and filename (slashes replaced with underscores) and then given the extension `.twneat`.
4. During development, the plugin automatically updates the safelist files when you modify your code. During build, it pre-processes all files to generate safelists.
5. `sm: "h-4 p-4"` becomes `sm:h-4 sm:p-4` but `base: "h-4 p-4"` becomes `h-4 p-4` - the `base` is dropped.

## Important Details

1. You can't add the `twneat` directory in `.gitignore` - Tailwind will ignore it in tandem if you do that.
2. I have only tested this for React and Astro. However it should work on any framework.

## License

MIT
