var ReactNativeStore = require('react-native-store');

var DB_Model = function(db){
    var me = this;
    me.db_name = db;

    me.get = function(query_data, callback){
        ReactNativeStore.table(me.db_name).then(function(collection){
            var results = collection.where(query_data).find();
            if(callback){
                callback(results)
            }
        });
    }

    me.get_all = function( callback){
        ReactNativeStore.table(me.db_name).then(function(collection){
            var results = collection.databaseData[me.db_name];
            if(callback){
                callback(results)
            }
        });
    }

    me.add = function(data_to_add, callback){
        ReactNativeStore.table(me.db_name).then(function(collection){
            // Add Data
            var id = collection.add(data_to_add, function(data){
                if(callback){
                    callback(data)
                }
            });
        });
    }

    me.flush_db = function(callback){
        ReactNativeStore.table(me.db_name).then(function(collection){
            collection.where({}).remove(function(d){
                if(callback){
                    callback(d);
                }
            });
        });
    }
};

module.export = DB_Model;