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

/**
 * This is an impure function who's side effect is to update the array of Modules with the specified Module.  
 * @param {Array} modules An array populated with objects representing a Module.
 * @param {Object} module Object that represents a Module.
 * @returns Null
 */
const updateModule = (modules, module) => {
    for (let i = 0; i < modules.length; i++) {
        if (modules[i].id === module.id) {
            modules[i] = module;
            break;
        }
    }
    return null;
}

module.exports = {
    getModuleById,
    calculateToggleState,
    updateModule
}