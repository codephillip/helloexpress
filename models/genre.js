var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GenreSchema = new Schema({
    name: {type: String, required: true, maxlength: 100, minlength: 3},
    // book: [{type: Schema.Types.ObjectId, ref: 'Book', required: true}]
});

GenreSchema
    .virtual('url')
    .get(() => {
       return '/catalog/genre/' + this._id;
    });

module.exports = mongoose.model('Genre', GenreSchema);