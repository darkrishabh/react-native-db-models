jest.dontMock('../index');

describe('db_model', function() {
    it('adds 1 + 2 to equal 3', function() {
        var RNDBModel = require('../index');
        var DB = {
            "user": new RNDBModel.create_db('user')
        };
        console.log(DB.user);
    });
});
