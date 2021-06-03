const { PubSub } = require('apollo-server');

const moduleDummyData = require('./moduleData.json');
const { getModuleById, calculateToggleState, updateModule } = require('./utils')

const pubsub = new PubSub();

const resolvers = {
    Module: {
        __resolveType(obj, context, info) {
            if (obj.state || obj.iconRef) {
                return 'Toggle';
            }
            return null;
        }
    },
    Subscription: {
        moduleUpdated: {
            subscribe: () => pubsub.asyncIterator(['MODULE_UPDATED'])
        }
    },
    Query: {
        availableModules() {
            return moduleDummyData;
        }
    },
    Mutation: {
        toggle(parent, args, context, info) {
            const { toggleModuleId } = args;
            // Find requested module (A?C?)
            const module = getModuleById(moduleDummyData, toggleModuleId);

            // Determine intermediate state (C)
            const changingModule = calculateToggleState(module, 'CHANGING');

            // Update module state (A)
            updateModule(moduleDummyData, changingModule);

            // Determine final module state
            const newModule = calculateToggleState(module, (module.state === 'ON' ? 'OFF' : 'ON'))

            // Update module state
            updateModule(moduleDummyData, newModule);

            // Find requested module in updated data
            const updatedModule = getModuleById(moduleDummyData, toggleModuleId);

            // Publish to the subscription
            pubsub.publish('MODULE_UPDATED', { moduleUpdated: updatedModule })

            return updatedModule;
        },
    }
}

module.exports = { resolvers }