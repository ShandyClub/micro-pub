const fsp = require('fs-promise')
const listen = require('test-listen')
const micro = require('micro')
const path = require('path')
const request = require('request-promise')
const test = require('ava')

test('micro-pub', async t => {

  // mock `micro` service
  const service = micro(async (req, res) => {

    const pub = await fsp.readFile(path.join(__dirname, 'fixtures', 'pub.json'))

    return JSON.parse(pub)

  })

  // generate ephemeral URL from mocked `micro` service
  const url = await listen(service)

  // mock HTTP request
  const body = await request({
    method: 'POST',
    uri: url,
    body: { id: '58a8645bf21dc3762074eade' },
    json: true,
  })

  t.deepEqual(body.name, 'Harp')

})
