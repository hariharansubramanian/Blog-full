import React from 'react'
import {Alert, AlertColor, AlertTitle} from '@mui/material'
import {OverridableStringUnion} from '@mui/types'
import {AlertPropsVariantOverrides} from '@mui/material/Alert/Alert'

interface StatusAlertProps {
    text: string
    severity?: AlertColor
    variant?: OverridableStringUnion<'standard' | 'filled' | 'outlined', AlertPropsVariantOverrides>
    title?: string
}

const StatusAlert: React.FC<StatusAlertProps> = (props: StatusAlertProps) => {
    return (
        <Alert severity={props.severity} variant={props.variant}>
            {props.title && <AlertTitle>{props.title}</AlertTitle>}
            {props.text}
        </Alert>
    )
}
StatusAlert.defaultProps = {
    severity: 'info',
    title: undefined,
    variant: 'standard',
}
export default StatusAlert
