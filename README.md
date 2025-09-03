# Hashira Placements Assignment Solution

This repository contains a JavaScript solution for the Hashira Placements Assignment, which involves finding the constant term of a polynomial using Lagrange interpolation based on given roots in various numerical bases.

## Problem Overview

The task requires reading input from JSON files containing:

- `n`: Number of roots provided.
- `k`: Minimum number of roots needed to solve for the polynomial coefficients (where `k = m + 1`, and `m` is the polynomial degree).
- Roots in the format of key-value pairs, where each key is the x-coordinate, and the value includes a base and a string representing the y-coordinate in that base.

The goal is to compute the constant term of the polynomial using Lagrange interpolation with the first `k` points.

## Solution Approach

The solution is implemented in JavaScript and uses the following approach:

1. **Input Parsing**:

   - The JSON input is read using the `fs` module.
   - Each root is processed by extracting the x-coordinate (key) and converting the y-coordinate from its given base to decimal using `parseInt(value, base)`.

2. **Lagrange Interpolation**:

   - The algorithm selects the first `k` points from the input.
   - For each point `[x_i, y_i]`, it computes the Lagrange basis polynomial contribution: `y_i * product((-x_j) / (x_i - x_j))` for all `j != i`.
   - The sum of these contributions yields the constant term of the polynomial.
   - The result is rounded to the nearest integer using `Math.round`.

3. **Error Handling**:

   - Checks if there are sufficient points (`n >= k`) to solve the polynomial.
   - Handles file reading and JSON parsing errors gracefully.

4. **Execution**:
   - The script processes two test case files (`testCase1.json` and `testCase2.json`).
   - Outputs the constant term for each test case to the console.

## Code Structure

- **convertToDecimal(value, base)**: Converts a string value from the given base to a decimal number.
- **lagrangeInterpolation(points)**: Implements Lagrange interpolation to compute the constant term using an array of `[x, y]` pairs.
- **solvePolynomial(data)**: Parses the JSON data, extracts points, and applies Lagrange interpolation.
- **Main Loop**: Reads JSON files and processes them to output results.

## How to Run

1. Ensure Node.js is installed.
2. Place the test case JSON files (`testCase1.json` and `testCase2.json`) in the same directory as the script.
3. Run the script using:
   ```bash
   node sol1.js
   ```
4. The constant term for each test case will be printed to the console.

## Dependencies

- Node.js (for file system operations and JSON parsing).

## Notes

- The solution avoids using Python as per the assignment constraints.
- The code assumes valid JSON input and sufficient points (`n >= k`).
- For large numbers or bases, ensure JavaScript's `parseInt` can handle the conversions accurately.
