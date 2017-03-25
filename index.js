const { json } = require('micro')
const { MongoClient, ObjectID } = require('mongodb')

module.exports = async (req, res) => {

  // connect to database
  const db = await MongoClient.connect(process.env.MONGO_URL, { promiseLibrary: global.Promise })

  // parse request body
  const data = await json(req)

  // execute database query
  const pub = await db.collection('pubs').findOne({ _id: ObjectID(data.id) })

  // return response body
  return pub

}
