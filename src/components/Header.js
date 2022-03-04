import React from 'react'
import { AppBar, Box, Toolbar, Typography, Button, InputLabel, MenuItem, FormControl, Select, Slider } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  title: {
    cursor: 'pointer',
    color: '#0D1929',
    fontSize: '18px !important',
    fontWeight: 'bold !important',
  },
  button: {
    backgroundColor: '#0D1929 !important',
    color: '#FFFFFF !important',
  },
  slider: {
    color: '#0D1929 !important'
  }
})

function Header(props) {
  const classes = useStyles();
  const openUrl = (url) => {
    window.open(url, '_blank')?.focus();
  };
  return (
    <Box>
      <AppBar style={{ backgroundColor: '#02E095' }} position="static">
        <Toolbar className={classes.root}>
          <Typography
            edge="start"
            className={classes.title}
            onClick={() => openUrl('https://github.com/mohitmurotiya')}
          >
            Sorting Algorithms Visualizer
          </Typography>
          <Box sx={{ minWidth: 200 }}>
            <FormControl variant="standard" fullWidth>
              <InputLabel style={{ fontSize: '1rem' }} className={classes.slider}>Select Algorithm</InputLabel>
              <Select className={classes.slider} value={props.currentAlgorithm}>
                {props.algorithms.map(function (algorithm, idx) {
                  return (
                    <MenuItem
                      key={idx}
                      value={algorithm}
                      onClick={() => props.onAlgorithmChange(algorithm)}
                    >
                      {algorithm}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Box>
          <Box width={200}>
            <Typography className={classes.slider}>Visualization Speed</Typography>
            <Slider
              className={classes.slider}
              disabled={props.isVisualizing}
              defaultValue={50}
              max={200}
              onChange={props.onSpeedChange}
            />
          </Box>
          <Box width={200}>
            <Typography className={classes.slider}>Array Size</Typography>
            <Slider
              className={classes.slider}
              disabled={props.isVisualizing}
              min={20}
              max={200}
              defaultValue={50}
              onChange={props.onInputSizeChanged}
            />
          </Box>
          <Button disabled={props.isVisualizing} className={classes.button} onClick={props.onRandomize}>Randomize</Button>
          <Button disabled={props.isVisualizing} className={classes.button} onClick={props.onStart}>
            {props.isVisualizing ? 'In-Progress' : 'Start'}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header