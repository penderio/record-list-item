# RecordListItem

[![Greenkeeper badge](https://badges.greenkeeper.io/entercosmos/record-list-item.svg)](https://greenkeeper.io/)

[![npm package][npm-badge]][npm]

Used for displaying a record as a list item.	

## Getting started

````
npm install @cmds/record-list-item --save
````

### Prop Types

| Property | Type | Required? | Description |
|:---|:---|:---:|:---|
| recordId | String | ✓ | Unique id for the instance of this record |
| primaryFieldId | String | ✓ | Used for rendering the value of the primary field as record name |
| fields | Array | ✓ | A list of fields |
| visibleFieldOrder | Array | ✓ | A list of ids for the fields that need to be displayed and in which order |
| fieldRenderer | Function | ✓ | Responsible for rendering a field given it's configuration: `({recordId: string, index: number, field: object}): jsx` [Learn more](#fieldRenderer) |
| onClick | Function | ✓ | Triggers when the user clicks the record list item: `({id: string, e: ClickEvent})` |

#### fieldRenderer

Responsible for rendering a field given it's configuration.

```jsx harmony
import SingleLineTextField from '@cmds/single-line-text-field'
// import all other fields that need to be supported...

const renderers = {
    singleLineText: ({props}) => (
        <SingleLineTextField
            {...props}
            text={'Luke Skywalker'}
            onChange={({id, text}) => {
                
                // store new value
            }}
        />
    ),
    // and all other fields that need to be supported
}

function fieldRenderer({recordId, index, field, props}) {

    const renderer = renderers[field.typeId]
    
    if (!renderer) {
        throw new Error(`Renderer for typeId '${field.typeId}' not found`)
    }
    
    /**
     * Note — props already contains properties
     * related to the context in which the field
     * gets rendered.
     * 
     * {
     *      id: 'fld1', // the field's id
     *      contextId: 'recordListItem',
     *      roleId: 'readOnly'
     * }
     */
    
    return renderer({ 
        recordId, 
        field,
        props
    })
}
```

### More information

This component is designed and developed as part of [Cosmos Design System][cmds]. 

[cmds]: https://github.com/entercosmos/cosmos
[npm-badge]: https://img.shields.io/npm/v/@cmds/record-list-item.svg
[npm]: https://www.npmjs.org/package/@cmds/record-list-item
