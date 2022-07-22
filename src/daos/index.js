import dotenv from 'dotenv'
dotenv.config()

let productsDao

switch (process.env.DB_PRODUCTS_NAME) {
    case 'mongoDB':
        import('./products/mongoDBProducts.js').then(({ MongoDBProducts }) => {
            productsDao = new MongoDBProducts()
        })
        break;

    default:
        console.log("switch de databases para products en default")
        break;
}
export { productsDao }


let usersDao

switch (process.env.DB_USERS_NAME) {
    case 'mongoDB':
        import('./users/mongoDBUsers.js').then(({ MongoDBUsers }) => {
            usersDao = new MongoDBUsers()
        })
        break;

    default:
        console.log("switch de databases para users en default")
        break;
}
export { usersDao }

/* export let cartsDao = async function(){
    switch (process.env.DB_CARTS_NAME) {
        case "mongoDB":
            const {MongoDBCarts} = await import('./carts/mongoDBCarts.js')
            return new MongoDBCarts()
    
        default:
            console.log("switch de databases para carts en default")
            break;
    }
} */