const { assert } = require('chai')

const Decentragram = artifacts.require('./Decentragram.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Decentragram', ([deployer, author, tipper]) => {
  let decentragram

  before(async () => {
    decentragram = await Decentragram.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await decentragram.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await decentragram.name()
      assert.equal(name, 'Decentragram')
    })
  })

  describe('images', async () => {
    let result ,imageCounter
    const hash="hello user"

    before(async () => {
      result = await decentragram.uploadImage(hash,'imge description',{from: author})
        imageCounter=await decentragram.imageCount();
    })

    it('create image', async () => {
      assert.equal(imageCounter,1)
      const event=result.logs[0].args
    //on failed
    await decentragram.undefined('','image description' , {from: author}).should.be.rejected
    })
  })
})  