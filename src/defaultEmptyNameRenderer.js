import React from 'react'
import RecordTitle from './RecordTitle'

const defaultEmptyNameRenderer = ({ placeholder }) => (
    <RecordTitle variant={'empty'}>
        {placeholder}
    </RecordTitle>
)

export default defaultEmptyNameRenderer