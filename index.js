'use strict';

var ReactNativeStore = require('./asyncstore');
var Events = require('eventemitter3')
var RNDBModel = {};
RNDBModel.DBEvents = new Events()

RNDBModel.create_db = function(db){
    var me = this;
    me.db_name = db;

    /**
     * @description Finds all the objects based on the query
     * @param query_data
     * @param callback
     */
    me.get = function(query_data, callback){
        ReactNativeStore.table(me.db_name).then(function(collection){
            var results = collection.where(query_data).find();
            if(callback){
                callback(results)
            }
        });
    };

    /**
     * @description Finds by ID
     * @param id
     * @param callback
     */
    me.get_id = function(id, callback){
        ReactNativeStore.table(me.db_name).then(function(collection){
            var results = collection.get(id);
            if(callback){
                callback(results)
            }
        });
    };

    /**
     * @description Gets all the data of the table
     * @param callback
     */
    me.get_all = function( callback){
        ReactNativeStore.table(me.db_name).then(function(collection){
            var results = collection.databaseData[me.db_name];
            if(callback){
                callback(results)
            }
        });
    };

    /**
     * @description Adds data to the Table in the DB
     * @param data_to_add
     * @param callback
     */
    me.add = function(data_to_add, callback){
        ReactNativeStore.table(me.db_name).then(function(collection){
            // Add Data
            collection.add(data_to_add, function(added_data_id){
                if(callback){
                    callback(added_data_id)
                }
                RNDBModel.DBEvents.emit("all")
            });
        });
    };

    /**
     * @description Adds array of data to the Table in the DB
     * @param data_to_add
     * @param callback
     */
    me.add_all = function(data_to_add, callback){
        if(data_to_add.length <= 0) return null;
        
        var added_data = [];
        
        var addItem = function(data_to_add) {
          if(data_to_add.length == 0 && callback) { return callback(added_data); }
          var data = data_to_add.pop();

          me.add(data, function(data_added){
            addItem(data_to_add);
            added_data.push(data_added);
          });
        };

        addItem(data_to_add);
    };

    /**
     * @description Removes all the objects matching the query
     * @param query_data
     * @param callback
     */
    me.remove = function(query_data, callback){
        ReactNativeStore.table(me.db_name).then(function(collection){
            collection.where(query_data).remove(function(data_removed){
                if(callback){
                    callback(data_removed);
                }
            });
        });
    };

    /**
     * @description Removed object by ID
     * @param id
     * @param callback
     */
    me.remove_id = function(id, callback){
        ReactNativeStore.table(me.db_name).then(function(collection){
            collection.removeById(id, function(data_removed){
                if(callback){
                    callback(data_removed);
                }
                RNDBModel.DBEvents.emit("all")
            });
        });
    };

    /**
     * @description Erases the complete DB
     * @param callback
     */
    me.erase_db = function(callback){
        ReactNativeStore.table(me.db_name).then(function(collection){
            collection.remove(function(data_removed){
                if(callback){
                    callback(data_removed);
                }
                RNDBModel.DBEvents.emit("all")
            });
        });
    }
    /**
     * @description Updates the Table with the query
     * @param query_data
     * @param replace_data
     * @param callback
     */
    me.update = function(query_data, replace_data, callback){
        ReactNativeStore.table(me.db_name).then(function(collection){
            collection.where(query_data).update(replace_data, function(data){
                if(callback){
                    callback(data);
                }
                RNDBModel.DBEvents.emit("all")
            });
        });
    };

    /**
     * @description Updates the DB Object by ID
     * @param id
     * @param replace_data
     * @param callback
     */
    me.update_id = function(id, replace_data, callback){
        ReactNativeStore.table(me.db_name).then(function(collection){
            collection.updateById(id, replace_data, function(data){
                if(callback){
                    callback(data);
                }
                RNDBModel.DBEvents.emit("all")
            });
        });
    };

    /**
     * @description Removed object by ID
     * @param id
     * @param callback
     */
    me.remove_id = function(id, callback){
        ReactNativeStore.table(me.db_name).then(function(collection){
            collection.removeById(id, function(data_removed){
                if(callback){
                    callback(data_removed);
                }
                RNDBModel.DBEvents.emit("all")
            });
        });
    };

};

module.exports = RNDBModel;
