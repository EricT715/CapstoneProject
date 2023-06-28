import React, { useState, useEffect, useMemo } from "react";
import * as tf from "@tensorflow/tfjs";
import Game from "../game/game";
import MachineLearning from "../MachineLearning/MachineLearning";

const WatchLearning = () => {
  const [isTraining, setIsTraining] = useState(false);
  const [trainedModel, setTrainedModel] = useState(null);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [trainingData, setTrainingData] = useState([]);

  useEffect(() => {

    const initialTrainingData = [
      { input: [0, 0], output: [0] },
      { input: [0, 1], output: [0] }, 
      { input: [1, 0], output: [1] }, 
      { input: [0, 1], output: [1] }, 
      { input: [1, 0], output: [1] }, 
    
    ];

    setTrainingData(initialTrainingData);
  }, []);

  const handleEpochFinished = (epoch) => {
    console.log(`Epoch ${epoch} finished.`);
    setCurrentEpoch(epoch);
   
  };

  const predictAction = (gameState) => {
    if (trainedModel) {
      const inputTensor = tf.tensor2d([[gameState.blockLeft, gameState.blockHeight]]);
      const prediction = trainedModel.predict(inputTensor);
      const actionIndex = tf.argMax(prediction).dataSync()[0];

      const actions = ["No Jump", "Jump"]; 
      const predictedAction = actions[actionIndex];

      return predictedAction;
    }

    return null;
  };

  const startTraining = async () => {
    setIsTraining(true);
    setTrainedModel(null);
    setCurrentEpoch(0);

    const model = await tf.loadLayersModel("localstorage://my-model");
    setTrainedModel(model);
    setIsTraining(false);
  };

  const handleModelReadyCallback = (model) => {
    setTrainedModel(model);
  };

  const machineLearningComponent = useMemo(() => {
    if (isTraining) {
      return (
        <MachineLearning
          trainingData={trainingData}
          onModelReady={handleModelReadyCallback}
          onEpochFinished={handleEpochFinished}
        />
      );
    }

    return null;
  }, [isTraining, trainingData]);

  return (
    <div>
      <h1>Watch Learning Page</h1>
      {isTraining ? (
        <p>Training in progress... Epoch: {currentEpoch}</p>
      ) : (
        <p>Training complete! Model is ready.</p>
      )}

      {!isTraining && trainedModel && <Game predictAction={predictAction} trainedModel={trainedModel} />}

      {isTraining ? (
        <button onClick={startTraining} disabled>
          Training in Progress
        </button>
      ) : (
        <button onClick={startTraining} disabled={isTraining || trainedModel}>
          Start Training
        </button>
      )}

      {machineLearningComponent}
    </div>
  );
};

export default WatchLearning;
