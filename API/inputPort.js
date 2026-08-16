const expect = require('chai').expect

const InputPort = require('@fbpx/flow').InputPort

const inPort = new InputPort({
  name: 'in',
  type: 'string'
})

expect(inPort.fills).to.eql(0)
expect(inPort.reads).to.eql(0)

inPort.fill('test')

expect(inPort.fills).to.eql(1)
expect(inPort.reads).to.eql(0)
expect(inPort.isFilled()).to.greaterThan(0)

console.log(inPort.isFilled())
console.log(inPort.read().read())

expect(inPort.fills).to.eql(1)
expect(inPort.reads).to.eql(1)
expect(inPort.isFilled()).to.eql(0)

inPort.fill('1')
inPort.fill('2')
inPort.fill('3')
inPort.fill('4')
inPort.fill('5')

expect(inPort.data.length).to.eql(5)
console.log(inPort.read().read())
console.log(inPort.read().read())
console.log(inPort.read().read())

expect(inPort.data.length).to.eql(2)
console.log(inPort.read().read())
console.log(inPort.read().read())

expect(inPort.data.length).to.eql(0)

inPort.setContext('###')

expect(inPort.data.length).to.eql(0)

console.log(inPort.read().read())
console.log(inPort.read().read())
console.log(inPort.read().read())

inPort.fill('!!!')
console.log(inPort.read().read())

console.log(inPort.read().read())

inPort.clearContext()

expect(() => inPort.read()).to.throw(/Unable to read port data/)

inPort.fill(':-)')

console.log(inPort.read().read())

// inPort.persist = true

inPort.fill(':-)')

// Persist only works if there is a connection.
// console.log(inPort.read().read())
// console.log(inPort.read().read())
