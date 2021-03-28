const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const port = 5000;

require('dotenv').config()

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });


const app = express()
//middle ware
app.use(bodyParser.json());
app.use(cors());



// app.get('/', (req, res) => {
//     res.send('hello world');
// })



client.connect(err => {
  const productsCollection = client.db("ema-john").collection("products");
  const ordersCollection = client.db("ema-john").collection("orders");
    console.log("DB connected");
    // add product
        app.post('/addProducts', (req, res) => {
            const products = req.body
             
       productsCollection.insertOne(products)
        .then(result => {
            console.log(result.insertedCount);
            res.send(result.insertedCount)
           
        })
        })
        // orders information
        app.post('/addOrders', (req, res) => {
            const products = req.body
             
       ordersCollection.insertOne(products)
        .then(result => {
            console.log(result.insertedCount);
            res.send(result.insertedCount)
           
        })
        })
    
    // review product
    app.post('/productsByKeys', (req, res) => {
        const productKeys = req.body;
        productsCollection.find({
            key: {
            $in:productKeys
            }
        }).toArray((err, docs) => {
            res.send(docs)
        })
    })

    // get products

       app.get('/getProducts', (req, res) => {
        productsCollection.find({})
        .toArray( (err, documents) => {
            res.send(documents);
        })
    })

       app.get('/getProduct:key', (req, res) => {
        productsCollection.find({key:req.params.key})
        .toArray( (err, documents) => {
            res.send(documents[0]);
        })
    })

});


/*

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.swu9d.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log('uri', uri);

const app = express()

app.use(bodyParser.json());
app.use(cors());

const port = 5000;

app.get('/', (req, res) => {
    res.send('hello world');
})

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log('err khaise mongodb connection', err);
  const productsCollection = client.db("emaJohnStore").collection("products");
  const ordersCollection = client.db("emaJohnStore").collection("orders");
  
    app.post('/addProduct', (req, res) => {
        const products = req.body;
        productsCollection.insertOne(products)
        .then(result => {
            console.log(result.insertedCount);
            res.send(result.insertedCount)
        })
    })

    app.get('/products', (req, res) => {
        productsCollection.find({})
        .toArray( (err, documents) => {
            res.send(documents);
        })
    })

    app.get('/product/:key', (req, res) => {
        productsCollection.find({key: req.params.key})
        .toArray( (err, documents) => {
            res.send(documents[0]);
        })
    })

    app.post('/productsByKeys', (req, res) => {
        const productKeys = req.body;
        productsCollection.find({key: { $in: productKeys} })
        .toArray( (err, documents) => {
            res.send(documents);
        })
    })

    app.post('/addOrder', (req, res) => {
        const order = req.body;
        ordersCollection.insertOne(order)
        .then(result => {
            res.send(result.insertedCount > 0)
        })
    })

});


app.listen(process.env.PORT || port)
*/
app.listen(process.env.PORT || port)