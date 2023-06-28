import React, { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";

const MachineLearning = ({ trainingData, onModelReady, onEpochFinished }) => {
  const [epoch, setEpoch] = useState(0);
  const [model, setModel] = useState(null);

  useEffect(() => {
    const trainModel = async () => {
      const inputSize = trainingData[0].input.length;
      const outputSize = trainingData[0].output.length;
      const inputTensor = tf.tensor2d(
        trainingData.map((item) => item.input),
        [trainingData.length, inputSize]
      );
      const outputTensor = tf.tensor2d(
        trainingData.map((item) => item.output),
        [trainingData.length, outputSize]
      );

      const model = tf.sequential();
      model.add(tf.layers.dense({ units: 64, activation: "relu", inputShape: [inputSize] }));

      model.add(tf.layers.dense({ units: outputSize, activation: "softmax" }));
      model.compile({ loss: "meanSquaredError", optimizer: "adam" });

      const numEpochs = 100;
      let completedEpochs = 0;
      for (let i = 1; i <= numEpochs; i++) {
        await model.fit(inputTensor, outputTensor, { epochs: 1 });

        setEpoch(i);


        if (onEpochFinished) {
          onEpochFinished(i);
        }

      
        await new Promise((resolve) => setTimeout(resolve, 100));

        completedEpochs = i;

   
        if (completedEpochs === numEpochs) {
          break;
        }
      }

   
      await model.save("localstorage://my-model");

      
      setModel(model);
      if (onModelReady) {
        onModelReady(model);
      }
    };

    if (trainingData && trainingData.length > 0) {
      trainModel();
    }
  }, [trainingData, onModelReady, onEpochFinished]);

  return (
    <div>
      <div>Epoch: {epoch}</div>
      {model && <div>Training complete! Model is ready.</div>}
    </div>
  );
};

export default MachineLearning;