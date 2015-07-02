![React Native DB Models](http://i58.tinypic.com/2akiqee.png) React Native DB Models
===================
![](https://travis-ci.org/darkrishabh/react-native-db-models.svg?branch=master) ![License](https://img.shields.io/badge/License-MIT-yellowgreen.svg)  [![npm version](https://badge.fury.io/js/react-native-db-models.svg)](http://badge.fury.io/js/react-native-db-models)
----------


This wrapper is built on top of [React Native Store](https://github.com/thewei/react-native-store) and provides a better and improved Database layer for asynchronous DB transactions.

React Native DB Models fixes a lot of problems in react native store and also the DB class on top helps to provide more functionality and easy developing options.

[![NPM](https://nodei.co/npm/react-native-db-models.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-native-db-models/)

**New Feature added**
DB Emitter added on all write operations to the models. Which helps you maintain a global storage and re-rendering capabilities for your app.

Check the new documentation

----------
Usage
======================

The ideal way to use this library is to have a db.js in your applications somewhere. Which will be required.

**DB.js**
```
var RNDBModel = require('react-native-db-models')

var DB = {
    "app": new RNDBModel.create_db('app'),
    "users": new RNDBModel.create_db('users'),
}

module.exports = DB
```
and require it in your code -

```
var React = require('react-native');
var DB = require('./db.js');
// DB Emitter Initialized

var DBEvents = require('react-native-db-models').DBEvents
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
    } = React;
    
// Only "all" event emitter is available

DBEvents.on("all", function(){
	console.log("Database changed");
})

var App = React.createClass({
	get_users: function(){
		DB.users.get_all(function(result){
			console.log(result);
		})
	},
	render: function(){
		return (
		<View>
			<Text onPress={this.get_users}> Hello </Text>
		</View>
		);
	}
});
```
All methods are async and therefore require a callback method.
======================
You can check all the returned data from the callback. The returned data is more than expected so modify it as per your needs.

----------
**get**

> **get(query_data, callback)**
> query_data: The data to be matched. (eg. {name: "John Doe"})

Example
```
DB.users.get({first_name: "Rishabh"}, function(results){
	console.log(results);
})
```
----------
**get_id**

> **get_id(id, callback)**
> id: ID of the object to be fetched.

Example
```
DB.users.get_id(10, function(results){
	console.log(results);
})
```

----------
**get_all**

> **get_all(callback)**
> Gets the complete table for you.

Example

```
DB.users.get_all(function(result){
			console.log(result);
		})
```

----------
**remove**

> **remove(query_data, callback)**
> query_data: The data to be matched. (eg. {name: "John Doe"})

Example
```
DB.users.remove({first_name: "Rishabh"}, function(removed_data){
	console.log(removed_data);
})
```

----------
**remove_id**

> **remove_id(id, callback)**
> id: ID of the object to be deleted.

Example
```
DB.users.remove({first_name: "Rishabh"}, function(removed_data){
	console.log(removed_data);
})
```
----------
**add**

> **add(data, callback)**
> data: The data to be added. (eg. {name: "John Doe", age: 56})

Example
```
DB.users.add({first_name: "Rishabh", age: 25}, function(added_data){
	console.log(added_data); 
})
```


----------
**update**

> **update(query_data, new_data, callback)**
> query_data: The data to be matched. (eg. {name: "John Doe"})
> new_data: The data to be updated. (eg. {age: 12})

Example
```
DB.users.update({first_name: "Rishabh"}, {age: 25}, function(updated_table){
	console.log(updated_table);
})
```

----------
**update_id**

> **update_id(id, new_data, callback)**
> id: The id of the data to be matched.
> new_data: The data to be updated. (eg. {name: "Ken"})

Example
```
DB.users.update_id(3, {name: "Ken", age: 12}, function(updated_table){
	console.log(updated_table);
})
```
----------
**erase_db**

> **erase_db(callback)**
> Erases the complete table.

Example
```
DB.users.erase_db(function(removed_data){
	console.log(removed_data);
})
```
 
 
 *More methods and features are gonna be added soon. Such as update, replace, constraints*

----------

