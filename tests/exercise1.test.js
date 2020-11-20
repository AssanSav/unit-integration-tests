
const { fizzBuzz } = require("../exercise1")

describe("fizzBuzz", () => {
  it("Should throw an error if the input is only not a number", () => {
    expect(() => { fizzBuzz(!2) }).toThrow()
  });
  it("Should return FizzBuzz if the input is divisible by 3 and 5", () => {
    const result = fizzBuzz(15)
    expect(result).toEqual("FizzBuzz")
  });
  it("Should return Buzz if the input is only divisible by 5", () => {
    const result = fizzBuzz(5)
    expect(result).toEqual("Buzz")
  });
  it("Should return Fizz if the number is divisible by 3", () => {
    const result = fizzBuzz(3)
    expect(result).toEqual("Fizz")
  });
  it("Should return input if not divisible by either 3 or 5", () => {
    const result = fizzBuzz(1)
    expect(result).toEqual(1)
  });
})