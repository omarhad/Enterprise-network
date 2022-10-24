const mongoose = require('mongoose'); // MongoDB : gestionnaire de base de données
const uniqueValidator = require('mongoose-unique-validator'); // MongoDB : validation unique
const bcrypt = require('bcrypt'); // Bcrypt : gestionnaire de hashage

// -----------------------------------------------------------------------------------------------
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024,
        trim: true
    },
    birthday: {
        type: Date,
        format: "%d/%m/%Y",
        date: "$timestamp"
    },
    job: {
        type: String,
        minlength: 2,
        maxlength: 50,
        trim: true
    },
    image: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    },
    bio: {
        type: String,
        maxlength: 1024
    },
    likes: {
        type: [String],
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Pre-save hook : before saving the user, hash the password
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
}).plugin(uniqueValidator); // Add the uniqueValidator plugin

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({
        email : email
    });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('Invalid password');
    }
    throw Error('Invalid email');
};

const UserModel = mongoose.model('User', userSchema); // create a model from userSchema

module.exports = UserModel; // export the model