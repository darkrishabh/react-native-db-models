'use strict';

var ReactNativeStore = require('./asyncstore');
var RNDBModel = {};
RNDBModel.create_db = function(db){
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

    me.get_id = function(id, callback){
        ReactNativeStore.table(me.db_name).then(function(collection){
            var results = collection.get(id);
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
            collection.add(data_to_add, function(added_data_id){
                if(callback){
                    callback(added_data_id)
                }
            });
        });
    }
    me.remove = function(query_data, callback){
        ReactNativeStore.table(me.db_name).then(function(collection){
            collection.where(query_data).remove(function(data_removed){
                if(callback){
                    callback(data_removed);
                }
            });
        });
    };
    me.remove_id = function(id, callback){
        ReactNativeStore.table(me.db_name).then(function(collection){
            collection.removeById(id, function(data_removed){
                if(callback){
                    callback(data_removed);
                }
            });
        });
    };

    me.flush_db = function(callback){
        ReactNativeStore.table(me.db_name).then(function(collection){
            collection.remove(function(data_removed){
                if(callback){
                    callback(data_removed);
                }
            });
        });
    }
};

module.exports = RNDBModel;