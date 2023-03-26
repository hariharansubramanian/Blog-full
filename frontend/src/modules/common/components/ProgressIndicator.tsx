import React from 'react'
import {CircularProgress, Grid, GridDirection, LinearProgress, Typography} from '@mui/material'

export interface CircularProgressIndicatorProps {
    text: string
    direction?: GridDirection
}

export interface LinearProgressIndicatorProps {
    loadingText: string
    direction?: GridDirection
}

export function CircularProgressIndicator({text, direction}: CircularProgressIndicatorProps) {
    const dir = direction ?? 'column'
    return (
        <Grid direction={dir} alignItems='center' container justifyContent='center'>
            <Grid item>
                <CircularProgress/> &nbsp;&nbsp;
            </Grid>
            <Grid item>
                <Typography variant='overline'>{text}</Typography>
            </Grid>
        </Grid>
    )
}

export function LinearProgressIndicator({loadingText, direction}: LinearProgressIndicatorProps) {
    return (
        <Grid container direction='column'>
            <Grid item>
                <LinearProgress/>
            </Grid>
            <Grid item>
                <Typography variant='overline'>{loadingText}</Typography>
            </Grid>
        </Grid>
    )
}