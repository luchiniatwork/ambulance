const moduleDummyData = require('./moduleData.json');
const { getModuleById, calculateToggleState, updateModule } = require('./utils')

const resolvers = {
    Module: {
        __resolveType(obj, context, info) {
            if (obj.state || obj.iconRef) {
                return 'Toggle';
            }
            return null;
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
            const newModule = {
                ...module,
                state: (module.state === 'ON' ? 'OFF' : 'ON')
            }

            // Update module state
            updateModule(moduleDummyData, newModule);

            // Find requested module in updated data
            const updatedModule = getModuleById(moduleDummyData, toggleModuleId);

            return updatedModule;
        }
    }
}

module.exports = { resolvers }