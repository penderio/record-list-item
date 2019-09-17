import React from 'react'
import PropTypes from 'prop-types'
import { css, cx } from 'emotion'

import RecordTitle from './RecordTitle'
import defaultEmptyNameRenderer from './defaultEmptyNameRenderer'

const defaultCellDataGetter = ({ id, data }) => {
    return data ? data[id] : undefined
}

export default class RecordListItem extends React.Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        name: PropTypes.string,
        fields: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired
            })
        ),
        visibleFieldOrder: PropTypes.arrayOf(
            PropTypes.string.isRequired
        ),
        fieldRenderer: PropTypes.func,
        data: PropTypes.any,
        cellDataGetter: PropTypes.func,
        onClick: PropTypes.func,
        emptyNameRenderer: PropTypes.func,
        emptyNamePlaceholder: PropTypes.string
    }

    static defaultProps = {
        emptyNamePlaceholder: 'Untitled'
    }

    render() {

        const { name, fieldRenderer, visibleFieldOrder, recordId, emptyNamePlaceholder } = this.props

        const cellDataGetter = this.props.cellDataGetter || defaultCellDataGetter
        const emptyNameRenderer = this.props.emptyNameRenderer || defaultEmptyNameRenderer

        const fieldsById = this.props.fields.reduce((result, field) => {
            result[field.id] = field
            return result
        }, {})

        const fields = visibleFieldOrder.map(id => {
            return fieldsById[id]
        })

        return (
            <div
                className={cx(
                    css`
                        -webkit-user-select: none;
                        -moz-user-select: none;
                        -ms-user-select: none;
                        user-select: none;
                        height: 102px;
                        display: -webkit-box;
                        display: -webkit-flex;
                        display: -ms-flexbox;
                        display: flex;
                        background-color: #fff;
                        border-radius: 6px;
                        box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 2px 0px;
                    `,
                    this.props.onClick ? css`
                        cursor: pointer;
                        &:hover {
                            box-shadow: rgba(0, 0, 0, 0.25) 0px 2px 2px 0px;
                        }
                        &:active {
                            box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 2px 0px;
                        }
                    ` : null
                )}
                onClick={(e) => {

                    if (this.props.onClick) {
                        this.props.onClick({
                            id: this.props.id,
                            e
                        })
                    }
                }}
            >
                <div
                    className={css`
                        -webkit-flex: 1 1 auto;
                        -ms-flex: 1 1 auto;
                        flex: 1 1 auto;
                        min-width: 0;
                        min-height: 0;
                        padding: 16px;
                        width: 100%;
                    `}
                >
                    <div
                        className={css`
                            display: -webkit-inline-box;
                            display: -webkit-inline-flex;
                            display: -ms-inline-flexbox;
                            display: inline-flex;
                            width: 100%;
                        `}
                    >
                        <div
                            className={css`
                                width: 100%;
                                margin-bottom: 8px;
                            `}
                        >
                            {name ? (
                                <RecordTitle>
                                    {name}
                                </RecordTitle>
                            ) : emptyNameRenderer({
                                placeholder: emptyNamePlaceholder
                            })}
                        </div>
                    </div>
                    <div
                        className={css`
                            overflow: hidden;
                            display: -webkit-box;
                            display: -webkit-flex;
                            display: -ms-flexbox;
                            display: flex;
                            font-size: 13px;
                        `}
                    >
                        {fields.map((field, index) => (
                            <div
                                key={field.id}
                                className={css`
                                    -webkit-flex: none;
                                    -ms-flex: none;
                                    flex: none;
                                    width: 126px;
                                    overflow: hidden;
                                    padding-right: 8px;
                                `}
                            >
                                <div
                                    className={css`
                                        font-size: 12px;
                                        max-width: 100%;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        white-space: nowrap;
                                        line-height: 1.5;
                                        margin-bottom: 2px;
                                        font-weight: 600;
                                    `}
                                >
                                    {field.name}
                                </div>
                                <div
                                    className={css`
                                        width: 100%;
                                        max-width: 100%;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        white-space: nowrap;
                                        line-height: 1.5;
                                        -webkit-align-items: center;
                                        -webkit-box-align: center;
                                        -ms-flex-align: center;
                                        align-items: center;
                                        display: -webkit-inline-box;
                                        display: -webkit-inline-flex;
                                        display: -ms-inline-flexbox;
                                        display: inline-flex;
                                        cursor: pointer;
                                        height: 24px;
                                    `}
                                >
                                    {fieldRenderer({
                                        index,
                                        recordId,
                                        field,
                                        cellData: cellDataGetter({ id: field.id, data: this.props.data }),
                                        props: {
                                            id: field.id,
                                            contextId: 'recordListItem',
                                            roleId: 'readOnly'
                                        }
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}