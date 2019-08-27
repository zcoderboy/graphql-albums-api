const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client')

const resolvers = {
    Query: {
        artist: (parent, { where: { id } }, context) => {
            return context.prisma.artist({
                id: id
            })
        },
        genres: (parent, { where: { id } }, context) => {
            return context.prisma.genres()
        }
    },
    Mutation: {
        createArtist: (parent, args, context, info) => {
            return context.prisma.createArtist({
                name: args.name,
                age: args.age
            })
        },
        createAlbum: (parent, args, context, info) => {
            return context.prisma.createAlbum({
                name: args.data.name,
                genre: {
                    connect: {
                        id: args.data.genre.connect.id,
                    },
                },
                artist: {
                    connect: {
                        id: args.data.artist.connect.id,
                    },
                },
            })
        },
        createGenre: (parent, args, context, info) => {
            return context.prisma.createGenre({
                name: args.data.name
            })
        },
        deleteArtist: (parent, args, context) => {
            return context.prisma.deleteArtist({
                where: {
                    id: args.where.id
                }
            })
        },
        deleteAlbum: (parent, args, context) => {
            return context.prisma.deleteAlbum({
                where: {
                    id: args.where.id
                }
            })
        },
        deleteGenre: (parent, args, context) => {
            return context.prisma.deleteGenre({
                where: {
                    id: args.where.id
                }
            })
        },
        updateArtist: (parent, args, context) => {
            return context.prisma.updateArtist({
                data: {
                    name: args.data.name,
                    age: args.data.age
                },
                where: {
                    id: args.where.id
                }
            })
        },
        updateAlbum: (parent, args, context) => {
            return prisma.updateAlbum({
                data: {
                    name: args.data.name,
                    genre: {
                        connect: {
                            id: args.data.genre.connect.id
                        }
                    },
                    artist: {
                        connect: {
                            id: args.data.artist.connect.id
                        }
                    }
                },
                where: {
                    id: args.where.id
                }
            })
        },
        updateGenre: (parent, args, context) => {
            return context.prisma.updateGenre({
                data: {
                    name: args.data.name,
                },
                where: {
                    id: args.where.id
                }
            })
        },
    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: { prisma }
}).start(() => console.log(`Server is running on http://localhost:4000`))