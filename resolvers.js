const moduleDummyData = require('./moduleData.json');

/**
 * The objects that represent a Module must have an "id" property at the root level.
 * @param {Array} modules An array of objects that represent a Module.
 * @param {String} id The ID of the module that will be returned.
 * @returns A single object that represent a Module.
 */
const getModuleById = (modules, id) => {
    return modules.find(module => module.id === id);
}

/**
 * Calculates the a new object that represents a Module.
 * @param {Object} module Object that represents a Module
 * @param {String} state The state that will be changed to."ON", "OFF", "CHANGING", or "DISABLED"
 * @returns Object that represents a module with the changed state. 
 */
const calculateToggleState = (module, state) => {
    return {
        ...module,
        state: state
    }
}

const updateModule = (modules, module) => {
    for (let i = 0; i < modules.length; i++) {
        if (modules[i].id === module.id) {
            modules[i] = module;
            break;
        }
    }
    return null;
}

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
            const m = moduleDummyData.find(module => module.id === args.toggleModuleId);

            return m;
        }
    }
}

module.exports = { resolvers }