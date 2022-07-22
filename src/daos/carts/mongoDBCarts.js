import MongoClass from "../../containers/mongoClass"

export class MongoDBCarts extends MongoClass {
    constructor() {
        super('carts', {
            productos: [
                {
                    producto: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "productos"
                    },
                    cantidad: {
                        type: Number,
                        required: true,
                        default: 1
                    }
                }
            ],
        })
    }
}