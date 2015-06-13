# react-native-db-models

**A Local DB Models for React Native **
Built on top of React Native Store Library. It fixes some problems that people might face in using the React Native Store.

React Native DB Models fixes a lot of problems in handling the promise response from the React AsyncStorage and also provides models like you would usually use.

It is in a very beginning stage, so it has following APIs

```
get  //get({key:value}, callback) - gets matching query tuple from the DB of that table

get_all //get_all(callback) - gets all the data from the DB of that table

add  //add(json_data, callback) - adds new data and return the newly added object in the callback

flush_db //flush_db(callback) - flushes the complete table in the DB
```

Will push the example of this soon


===

## Installation

```
npm install react-native-db-models

```

## Usage
create a DB file as per your choice and you need to create DB first before using it


```
var RNDBModel = require('react-native-db-models')
var DB = {
    "app": new RNDBModel.create_db('app'), // sample DATABASE
    "user": new RNDBModel.create_db('user') // sample DATABASE
};
```

### Add Data

```
//require your DB.js to get access to your databases
var DB = require('db.js')
//DB.<TABLE_NAME>.add(...)
DB.app.add({sample_key: "sample_data"}, function(added_data){
	console.log(added_data)
	

})

```

### Flush Table Data
```
//require your DB.js to get access to your databases
var DB = require('db.js')

//DB.<TABLE_NAME>.flush_db(...)
DB.app.flush_db(function(cleared_data){
	console.log(cleared_data)
})

```

More coming soon ...
