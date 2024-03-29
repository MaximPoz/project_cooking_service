import {MongoClient, ServerApiVersion } from 'mongodb'

const url = process.env.DBURL
const client = new MongoClient(url, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
})

try {
    await client.connect()
    await client.db("users").command({ ping:1 })
    console.log('Пингуется БД')
} catch (error) {
    console.error(err)
}

let db = client.db('users')

export default db