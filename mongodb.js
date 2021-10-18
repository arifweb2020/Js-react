1> go to cmd
2> type mongo and enter
3> to check db : show dbs
4> to create db : use products
5> to check what is inside in database : show collections
6> to create collections : db.createCollection('food')
7> to switch other database : use ecomm
8> to delete collection : db.food.drop()
9> to delete database : db.dropDatabase()
10> to check the data inside food collections : db.food.find()
11> to insert document in food collection : db.food.insertOne({name:'mango' , price:250})
12> to filter data in food collection : db.food.find({price:250})
13> return single document : db.food.findOne({price:250})
14> insert multiple documents : db.food.insertMany([{name:'mango' , price:250}, {name:'apple',price:400}])
15> for forammating data : db.food.find().pretty()
16> to update the field: db.food.update({_id:ObjectId("616d7af9b854bcf73998ac61")},{$set:{name:'papaya'}})
17> to delete particular field : db.food.deleteOne({_id:ObjectId("616d7af9b854bcf73998ac61")})
18> to delete Many filedd : db.food.deleteMany({
_id:{$in:[ObjectId("616d7af9b854bcf73998ac61"),ObjectId("616d7af9b854bcf73998ac61")]}
})
19> insert releated data : db.shoes.update({_id:ObjectId("616d7a84b854bcf73998ac60")},{$set:{reviews:[{review:'good'},{review:'bad'}]}})
20> equal operation : db.food.find({price:{$eq:5}})
21> greate than operation : db.food.find({price:{$gt:5}})
22> logical and operation (both condtion must be true) : db.shoes.find({$and:[{price:{$eq:10}}, {name:{$eq:'fila'}}]})
