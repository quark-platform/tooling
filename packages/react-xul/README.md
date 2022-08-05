# React XUL

A react renderer for XUL elements

## Usage

```jsx
import { render, injectDevTools } from 'react-xul'

render(<description value="Hello world!" />, document.getElementById('root'))

// If you want live refresh to work
//
// Note that you will need to symlink your build directory to its correct
// location in the build tree, otherwise it will not work
injectDevTools()
```
