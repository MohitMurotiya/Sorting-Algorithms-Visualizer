import React, { useState } from 'react';
import Header from './components/Header';
import generateRandomArray from './helper/randomArray'
import bubbleSort from './algorithms/bubbleSort'
import SortingBar from './components/SortingBar'
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    backgroundColor: '#0D1929',
    display: 'flex',
    height: '100%',
    width: '100%',
    alignItems: 'end',
    padding: '0px 0px 0px 0px',
  },
  bars: {
    height: '100%',
    display: 'flex',
    alignItems: 'end',
  }
})

export default function App() {
  const classes = useStyles();
  const arraySize = 50;
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [randomArray, setRandomArray] = useState(generateRandomArray(arraySize));
  const [colorsArray, setColorsArray] = useState(new Array(randomArray.length).fill(0));
  const [visualizationSpeed, setVisualizationSpeed] = useState(30);
  const [maxItem, setMaxItem] = useState(Math.max(...randomArray));
  const [currentAlgorithm, setCurrentAlgorithm] = useState('Bubble Sort');
  const algorithms = [
    'Bubble Sort',
    'Selection Sort'
  ];

  const handleRandomize = () => {
    if (isVisualizing) return;
    const newRandomArray = generateRandomArray(randomArray.length);
    setRandomArray(newRandomArray);
    setMaxItem(Math.max(...newRandomArray));
    setColorsArray(new Array(newRandomArray.length).fill(0));
  };

  const handlerBarSize = (event, newValue) => {
    if (isVisualizing) return;
    const newRandomArray = generateRandomArray(newValue);
    setRandomArray(newRandomArray);
    setMaxItem(Math.max(...newRandomArray));
    setColorsArray(new Array(newRandomArray.length).fill(0));
  };

  const handleSpeedChange = (event, newValue) => {
    if (isVisualizing) return;
    setVisualizationSpeed(100 - newValue + 1);
  };

  const onVisualize = async () => {
    if (isVisualizing) return;
    setIsVisualizing(true);
    switch (currentAlgorithm) {
      case 'Bubble Sort':
        await bubbleSort({
          array: randomArray,
          setArray: setRandomArray,
          visualizationSpeed: visualizationSpeed,
          setColorsArray: setColorsArray,
        });
        break;
      default:
        break;
    }
    setIsVisualizing(false);
  };

  return (
    <div className={classes.root}>
      <Header 
        algorithms={algorithms}
        onAlgorithmChange={setCurrentAlgorithm}
        currentAlgorithm={currentAlgorithm}
        onRandomize={handleRandomize}
        onInputSizeChanged={handlerBarSize}
        onSpeedChange={handleSpeedChange}
        onStart={onVisualize}
        isVisualizing={isVisualizing}
      />
      <div className={classes.content}>
        {randomArray.map((item, index) => {
          const height = ((item + 5)/ maxItem) * 100;
          const width = (1 / randomArray.length) * 100;
          return (
            <div className={classes.bars} style={{width: `${width}%`}}>
              <SortingBar 
                colorCode={colorsArray[index]}
                style={{
                  height: `calc(${height}% - 20px)`,
                  width: '100%',
                  margin: 'auto 10% 0 10%'
                }}
              />
            </div>
          )
        })}
      </div>
    </div>
  );
}

