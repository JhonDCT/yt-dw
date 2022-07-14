const server = require('../index')
const supertest = require('supertest')
const requestWithSupertest = supertest(server)

describe('Downloader', () => {
  it('GET /get-files should show all files', async () => {
    const res = await requestWithSupertest.get('/get-files?path=.')
    expect(res.status).toEqual(200)
    expect(res.body.length).toBeGreaterThan(0)
  })
})
