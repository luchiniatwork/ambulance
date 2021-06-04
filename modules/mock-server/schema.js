const { gql } = require('apollo-server');

const typeDefs = gql`
    enum ToggleState {
        ON
        OFF
        CHANGING
        DISABLED
    }

    # union Type = Toggle

    interface Module {
        id: ID!
        nameRef: String!
    }

    type Toggle implements Module {
        id: ID!
        nameRef: String!
        iconRef: String!
        state: ToggleState!
    }

    type Query {
        availableModules: [Module]
    }
    type Mutation {
        toggle(toggleModuleId: ID!): Toggle
    }
    type Subscription {
        moduleUpdated: Module
    }
`;

module.exports = { typeDefs }