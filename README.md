# Module API

## Usage

### Queries

* `availableModules` as defined in `resolvers.js` returns all of the available modules.

### Mutation

* `toggle(toggleModuleId: ID)` as defined in `resolvers.js` changes the state of a single toggle module specified by its ID. It returns the updated module.

### Subscription

* `moduleUpdated` returns the individual module that has been changed. 

Example:

```gql
subscription {
  moduleUpdated {
    id
    # other Module fields
    ... on Toggle {
      state
      # other Toggle specific fields
    }
  }
}
```

### utility functions

Definitions and documentation for utility functions can be found in `utils.js`.

### Module objects and data

*For a programmatic definition refer to schema.js*

A simple **Module object** simply contains an `ID` and `nameRef`. All objects in `moduleData.json` must contain an `ID` and a `nameRef` properties with their corresponding values.

A **Toggle module** extends the Module object. The unique property of a Toggle is `state` which can have one of four enumerators: 'ON', 'OFF', 'CHANGING', or 'DISABLED'. This module also has a `iconRef` property which is currently not in use.