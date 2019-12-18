const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
  } = require('graphql')

// dummy data
// 4 сущности - users, items, categories, orders
const users = [
	{ id: 1, name: 'Bob Dotson' },
	{ id: 2, name: 'Mike Puppet' },
	{ id: 3, name: 'Jane Doe' }
]

const items = [
	{ id: 1, name: 'Lego', catid: 1 },
	{ id: 2, name: 'Harry Potter', catid: 2 },
	{ id: 3, name: 'Jedi Knight', catid: 1 },
]

const categories = [
	{ id: 1, type: 'Toys'},
	{ id: 2, type: 'Books'},
]

const orders = [
    {id:1, userid: 1, itemid: 1 }
]

// code
const ItemType = new GraphQLObjectType({
  name: 'Item',
  description: 'Store Item',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    catid: { type: GraphQLNonNull(GraphQLInt) },
    category: {
      type: categoryType,
      resolve: (item) => {
        return categories.find(category => category.id === item.catid)
      }
    }
  })
})

const categoryType = new GraphQLObjectType({
    name: 'Category',
    description: 'Store Category',
    fields: () => ({
      id: { type: GraphQLNonNull(GraphQLInt) },
      type: { type: GraphQLNonNull(GraphQLString) },
      item: {
        type: ItemType,
        resolve: (category) => {
          return items.find(item => item.catid === category.id)
        }
      }
    })
  })

  const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Users',
    fields: () => ({
      id: { type: GraphQLNonNull(GraphQLInt) },
      name: { type: GraphQLNonNull(GraphQLString) },
    })
  })

  const OrderType = new GraphQLObjectType({
    name: 'Order',
    description: 'Orders',
    fields: () => ({
      id: { type: GraphQLNonNull(GraphQLInt) },
      user: {
        type: UserType,
        resolve: (element) => {
          return users.find(user => user.id === element.userid)
        }
      },
      item: {
        type: ItemType,
        resolve: (element) => {
          return items.find(item => item.id === element.itemid)
        }
      }
    })
  })

// 6 запросов - show single item, show all items, show all cats, show single user, show users, show orders  
const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    item: {
      type: ItemType,
      description: 'Single Item',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => items.find(item => item.id === args.id)
    },
    items: {
        type: new GraphQLList(ItemType),
        description: 'All Items',
        resolve: () => items
      },
    categories: {
        type: new GraphQLList(categoryType),
        description: 'All categories',
        resolve: () => categories
    },
    user: {
        type: UserType,
        description: 'Single User',
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (parent, args) => users.find(item => item.id === args.id)
      },
    users: {
        type: new GraphQLList(UserType),
        description: 'All users',
        resolve: () => users
    },
    orders: {
        type: new GraphQLList(OrderType),
        description: 'All orders',
        resolve: () => orders
    },
  })
})

// 1 мутация - add an order
const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    addOrder: {
      type: OrderType,
      description: 'Add an order',
      args: {
        userid: { type: GraphQLNonNull(GraphQLInt) },
        itemid: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve: (parent, args) => {
        const order = { id: orders.length + 1, userid: args.userid, itemid: args.itemid }
        orders.push(order)
        return order
      }
    },
  })
})

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})