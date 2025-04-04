import { describe, expect, it } from "vitest";
import { twneat } from "../src/twneatClient";
import type { BreakpointClasses } from "../src/utils";

describe("twneat", () => {
  it("should take in BreakpointClasses and return a string of tailwind classes", () => {
    const input: BreakpointClasses = {
      base: "text-blue-500 p-4",
      sm: "text-red-500 p-6",
      md: "text-green-500 p-8",
      lg: 'hidden text-[100px] text-["#000"]',
      xl: "h-[calc(100%-4px)] w-[calc(100%-4px)]",
    };

    const result = twneat(input);
    const expectedOutput = `text-blue-500 p-4 sm:text-red-500 sm:p-6 md:text-green-500 md:p-8 lg:hidden lg:text-[100px] lg:text-["#000"] xl:h-[calc(100%-4px)] xl:w-[calc(100%-4px)]`;
    expect(typeof result).toBe("string");
    expect(result).toBe(expectedOutput);
  });
});
