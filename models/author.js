var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
    first_name: {type: String, required: true, maxlength: 10},
    family_name: {type: String, required: true, maxlength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
});

// virtual generates fields on the fly
AuthorSchema
    .virtual('name')
    .get(() => {
        if (this.first_name && this.family_name) {
            return this.first_name + ' ' + this.family_name;
        } else {
            return ' '
        }
    });

AuthorSchema
    .virtual('lifespan')
    .get(() => {
        return (this.date_of_death.getUTCFullYear() - this.date_of_birth.getUTCFullYear()).toString()
    });

// Virtual for author's URL
AuthorSchema
    .virtual('url')
    .get(() => {
        return '/catalog/author/' + this._id;
    });

//Export model
module.exports = mongoose.model('Author', AuthorSchema);