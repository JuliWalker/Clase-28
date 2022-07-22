import MongoClass from "../../containers/mongoClass.js"
import mongoose from "mongoose";
import bcrypt from "bcrypt"

const usuariosSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

usuariosSchema.methods.encriptarPassword = async (password) => {
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8));
}
usuariosSchema.methods.compararPassword = async (password) => {
    return bcrypt.compareSync(password,this.password);
}


export class MongoDBUsers extends MongoClass {
    constructor() {
        super('users', usuariosSchema );
    }

    async getByName(name) {
        try{
            const user = await this.collection.findOne( {nombre:name} )
            return user
        }catch(err){
            throw new Error(err)
        }
    }

    async getByMail(mail) {
        try{
            const user = await this.collection.findOne( {email:mail} )
            return user
        }catch(err){
            throw new Error(err)
        }
    }

}