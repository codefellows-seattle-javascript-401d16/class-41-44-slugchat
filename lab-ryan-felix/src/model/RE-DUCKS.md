I'm trying out a different way of structuring Redux.

The re-ducks proposal is [here](https://github.com/alexnm/re-ducks). Lengthy justification is in [this blog post](https://medium.freecodecamp.org/scaling-your-redux-app-with-ducks-6115955638be). It's based off the original "ducks" proposal [here](https://github.com/erikras/ducks-modular-redux).

Basically:

* The directory structure is feature-first, not function-first. Instead of "action", "reducer" folders, we have a folder for each feature ("user", "product", "comment", etc.) which contains everything necessary to manage that feature's state.
* Each re-ducks folder MUST contain an `index.js` file.
* This `index.js` file should implement the original "ducks" spec:
  * `index.js` must `export default` a function called `reducer`
  * `index.js` must `export` its operations, and selectors - its public interface
  * `index.js` *may* `export` its actions, if neccessary
* To make things more manageable, instead of writing everything in one file, files are split by function:
  * `index.js` does no work, it simply `import`s and `export`s the required items
  * `types.js` exports the actions
  * `actions.js` exports action creators
  * `operations.js` defines the public interface of this slice of state; it exports vanilla actions or thunks/sagas/functions that dispatch one or more actions, as appropriate
    * vanilla actions are simply links to functions defined in `actions.js`
  * `reducers.js` defines the reducers
  * `selectors.js` adds to the public interface by defining functions to obtain derived data our components may require
    * optional; not necessary for simple slices of state or features where components are simple functions of state
  * `utils.js` defines utility functions
    * optional
  * `foo.test.js` defines tests for this slice of state
* This is all intended to make the app more maintainable and extensible

Personal observations/opinions:

* It would make more sense to me if the public interface (`operations.js` + `selectors.js`) were `export`ed `default` from each re-duck's `index.js`. Reducers are only used internally within the state manager, while the public interface is used all over the app.
* I like the broad strokes of this setup; it makes more sense to me to keep things that are related to each other close to each other.
* I don't think it should be considered necessary to rigidly adhere to the file structure listed above. It's overkill for less complicated state slices, like the `route` one in this app. I think in those cases we could combine actions/operations/types/selectors into one `interface.js`. The downside is having to rewrite boilerplate (imports) if a state slice does become complex enough that splitting those into their own files is justified.
