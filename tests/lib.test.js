const mail = require("../mail")
const db = require("../db")
const { absolute, greet, getCurrencies, getProduct, registerUser, applyDiscount, notifyCustomer } = require("../lib");
const { expect } = require("@jest/globals");


describe("absolute", () => {
  it("Should return positive number if input is positive", () => {
    let result = absolute(1)
    expect(result).toEqual(1)
  });
  it("Should return positive number if input is negative", () => {
    let result = absolute(-1)
    expect(result).toEqual(1)
  });
  it("Should return zero if input is zero", () => {
    let result = absolute(0)
    expect(result).toBe(0)
  })
})

describe("greet", () => {
  it("Should return name plus Welcome when given a name input", () => {
    const result = greet("Assane")
    expect(result).toContain("Assane")
  })
})

describe("getCurrencies", () => {
  it("Should return an array containing currencies devise", () => {
    const result = getCurrencies(['USD', 'AUD', 'EUR'])
    expect(result).toEqual(expect.arrayContaining(['USD', 'AUD', 'EUR']))
  })
})

describe("getProduct", () => {
  it("Should return the product with the given ID", () => {
    const result = getProduct(1)
    expect(result).toEqual(expect.objectContaining({ id: 1, price: 10 }))
  })
})


describe("registerUser", () => {
  it("Should throw an error when username is falsy", () => {
    const args = [null, undefined, NaN, false, 0, ""]
    args.forEach(a => {
      expect(() => { registerUser(a) }).toThrow()
    })
  });
  it("Should return an  user object when given a valid username", () => {
    const result = registerUser("Assane")
    expect(result).toMatchObject({ username: "Assane" });
    expect(result.id).toBeGreaterThan(0)
  })
})

describe("applyDiscount", () => {
  it("Should apply 10% discount if customer has more than 10 points", () => {
    db.getCustomerSync = jest.fn().mockReturnValue({ id: 1, points: 20 })
    // db.getCustomerSync = (customerId) => {
    //   console.log("Reading from a fake database...")
    //   return { id: customerId, points: 20 }
    // };
    const order = { customerId: 1, totalPrice: 10 };
    applyDiscount(order)
    expect(order.totalPrice).toBe(9)
  })
})

describe("notifyCustomer", () => {
  it("Should send an email to the customer", () => {
    db.getCustomerSync = jest.fn().mockReturnValue({email: "assan.sav@gmail.com"})
    // db.getCustomerSync = (customerId) => {
    //   console.log("Reading a customer from a fake database...")
    //   return {}
    // };
    mail.send = jest.fn()
    // let mailSent = false
    // mail.send = (email, message) => {
    //   mailSent = true
    // };
    notifyCustomer({customerId: 1})
    expect(mail.send).toHaveBeenCalled();
    expect(mail.send.mock.calls[0][0]).toContain("assan.sav@gmail.com");
    expect(mail.send.mock.calls[0][1]).toMatch(/order/)
  })
})