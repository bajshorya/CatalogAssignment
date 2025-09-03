const fs = require("fs");

function convertToDecimal(value, base) {
  return parseInt(value, base); // Converts the value to decimal based on the given base
}

function lagrangeInterpolation(points) {
  // points is an array of [x, y] pairs so points is [[x0, y0], [x1, y1], ..., [xk-1, yk-1]]
  let result = 0;
  const n = points.length;

  for (let i = 0; i < n; i++) {
    let term = points[i][1]; // y_i value
    for (let j = 0; j < n; j++) {
      if (j !== i) {
        term *= -points[j][0] / (points[i][0] - points[j][0]); // Lagrange basis polynomial calculation
      }
    }
    result += term; // Summing up the terms
  }

  return result; // This gives us the constant term of the polynomial
}

function solvePolynomial(data) {
  const n = data.keys.n;
  const k = data.keys.k;
  let points = [];

  for (let key in data) {
    if (key !== "keys") {
      let x = Number(key);

      // Get the base and value
      let base = Number(data[key].base);
      let valueStr = data[key].value;

      let y = convertToDecimal(valueStr, base); // Convert to decimal using the above function
      points.push([x, y]);
    }
  }

  if (points.length < k) {
    throw new Error("Not enough points to solve the polynomial!");
  }

  // Only use the first k points (because we only need k points)
  // Make a new array with just first k points
  let pointsToUse = [];
  for (let i = 0; i < k; i++) {
    pointsToUse.push(points[i]);
  }

  let constantTerm = lagrangeInterpolation(pointsToUse); // Get the constant term using Lagrange interpolation

  let answer = Math.round(constantTerm);

  return answer;
}

// Reading the JSON files
for (let index = 1; index <= 2; index++) {
  fs.readFile(`testCase${index}.json`, "utf8", (err, jsonString) => {
    if (err) {
      console.log("Unable to read the files:", err);
      return;
    }
    try {
      const res = JSON.parse(jsonString);
      const finalResult = solvePolynomial(res);
      console.log(`The answer for testCase${index}.json is:`, finalResult);
    } catch (err) {
      console.log("Unable to parse JSON string:", err);
    }
  });
}
