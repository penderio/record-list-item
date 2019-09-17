import React from 'react'
import { css } from 'emotion'

const RecordTitle = ({ variant, children }) => (
    <div
        className={css`
            width: 100%;
            max-width: 100%;
            overflow: hidden;
            font-size: 16px;
            text-overflow: ellipsis;
            white-space: nowrap;
            ${variant !== 'empty' ? 'font-weight: 600;' : ''}
            ${variant === 'empty' ? 'font-style: italic;' : ''}
            ${variant === 'empty' ? 'color: rgba(0,0,0,0.75);' : 'color: #000;'}
        `}
    >
        {children}
    </div>
)

export default RecordTitle